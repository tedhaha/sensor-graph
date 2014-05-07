
/**
 * Module dependencies.
 */
 
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');

var app = express();

app.set('views', __dirname + '/views');
//app.set('javascripts', __dirname + '/public/javascripts');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);



app.get('/', function(request, response) {
    response.send('<h3><a href="http://sensor-monitor.herokuapp.com/sensor_monitor.html">http://sensor-monitor.herokuapp.com/sensor_monitor.html</a></h3>'
                 +'</p>http://sensor-monitor.herokuapp.com/daily_temp_chart.html'
                 +'</p>http://sensor-monitor.herokuapp.com/realtime_temp_chart.html'
                 +'</p>http://sensor-monitor.herokuapp.com/signal_generator.html'
                 +'</p>http://sensor-monitor.herokuapp.com/dbtest'
                 +'</p>http://sensor-monitor.herokuapp.com/rest/daily_sensordata/1/2013-10-03'
                 );
});
 
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Express server listening on port ' + app.get('port'));
});



/////////////////////////////////////////////////////////////////////////////////
// database
//
// http://www.phloxblog.in/developing-web-application-node-js-express-js-mysql/#.UkCHDoZUS3U
/////////////////////////////////////////////////////////////////////////////////

var mysql = require('mysql');
var application_root = __dirname;

var connection = mysql.createConnection({
host : 'us-cdbr-east-04.cleardb.com',
user : 'bfd543c5b107bb',
password : '3dcb9eea',
database: "heroku_41d2cd0add6785d"
});


app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


app.get('/dbtest', function (req, res) {
    try{
       connection.query('SELECT * FROM sensor_info;', function (error, rows, fields) { 
             res.writeHead(200, {'Content-Type': 'text/plain'});
             var str='';
             for(var i=0;i<rows.length;i++)
    			str = str + rows[i].product_name +'\n';
    			res.end( str);
        }); 
    } catch (exeception) {
        console.log(exeception);
        res.send(404);
    } 
});

var database_query = require('./database_query');
app.get('/dbtest2', function (req, res) {
    try{
       connection.query(database_query.selectAll_sensor_info, function (error, rows, fields) { 
            res.writeHead(200, {'Content-Type': 'text/plain'});
            var str='';
            for(var i=0;i<rows.length;i++)
                str = str + rows[i].product_name +'\n';
            res.end( str);
        }); 
    } catch (exeception) {
        console.log(exeception);
        res.send(404);
    } 
});
app.get('/dbtest3', function (req, res) {
    try{
       connection.query(database_query.getDaily_sensor_data(1,'2013-10-03'), function (error, rows, fields) { 
            res.writeHead(200, {'Content-Type': 'text/plain'});
            var str='';
            for(var i=0;i<rows.length;i++)
                str = str + rows[i].avg +'\n';
            res.end( str);
          }); 
    } catch (exeception) {
        console.log(exeception);
        res.send(404);
    } 
});
app.get('/dbtest4', function (req, res) {
    try {
        connection.query(database_query.getDaily_sensor_data(1,'2013-10-03'), function (error, rows, fields) { 
             res.writeHead(200, {'Content-Type': 'text/plain'});
            var str='';
            for(var i=0;i<rows.length;i++)
                str = str + rows[i].avg +'\n';
            res.end( str);
          }); 
    } catch (exeception) {
        console.log(exeception);
        res.send(404);
    } 
});

/*
// TYPE 1 (RESTful) : call "/rest/daily_sensordata/1/2013-10-03"
// returns full JSON
    app.get('/rest/daily_sensordata/:id/:date', function(req, res) {
        var taskId = req.params.id;
        var taskDate = req.params.date;
        try {
             connection.query(database_query.getDaily_sensor_data(taskId,taskDate), function (error, rows, fields) { 
                res.json(JSON.stringify(rows));
            });
        } catch (exeception) {
            res.send(404);
        }        
});
*/

    app.get('/rest/getAll_sensor_info', function(req, res) {
       try {
            var json_data = [];
            connection.query(database_query.getAll_sensor_info(), function (error, rows, fields) {
                for(var i=0;i<rows.length;i++){
                    json_data.push(rows[i]);
                }
                console.log("all: "+JSON.stringify(json_data));
                res.json(JSON.stringify(json_data));
            });
        } catch (exeception) {
            console.log(exeception);
            res.send(404);
        }
    });


    
// TYPE 2 (RESTful) : call "/rest/daily_sensordata/1/2013-10-03"
// returns only data
    app.get('/rest/daily_sensordata/:id/:date', function(req, res) {
        var lock = 4;
        var sensor_id = req.params.id;
        var taskDate = req.params.date;
        try { 
            var json_data = {   
                                "id": sensor_id,
                                "taskDate": taskDate,
                                "daily_avg_data": [],
                                "daily_max_data": [],
                                "daily_min_data": [],
                                "sensor_info": {},
                            };
            var daily_data = [];             
            connection.query(database_query.getDaily_sensor_data(sensor_id,taskDate, 'avg'), function (error, rows, fields) { 
                daily_data = [];
                for(var i=0;i<rows.length;i++){
                    daily_data.push(rows[i].avg);
                }
                console.log("avg: "+daily_data);
                json_data.daily_avg_data = daily_data;
                
                lock -= 1;
                if (lock === 0){
                    finishRequest();
                }
            });
            connection.query(database_query.getDaily_sensor_data(sensor_id,taskDate,'max'), function (error, rows, fields) { 
                daily_data = [];
                for(var i=0;i<rows.length;i++){
                    daily_data.push(rows[i].max);
                }
                console.log("max: "+daily_data);
                json_data.daily_max_data = daily_data;
                
                lock -= 1;
                if (lock === 0){
                    finishRequest();
                }
            });            
            connection.query(database_query.getDaily_sensor_data(sensor_id,taskDate,'min'), function (error, rows, fields) { 
                daily_data = [];
                for(var i=0;i<rows.length;i++){
                    daily_data.push(rows[i].min);
                }
                console.log("min: "+daily_data);
                json_data.daily_min_data = daily_data;
                
                lock -= 1;
                if (lock === 0){
                    finishRequest();
                }
            });  

            connection.query(database_query.getOne_sensor_info(sensor_id), function (error, rows, fields) { 
                console.log("sensor_info: "+rows[0]);
                json_data.sensor_info = rows[0];
                
                lock -= 1;
                if (lock === 0){
                    finishRequest();
                }
            });             
            function finishRequest(){
                console.log("all: "+JSON.stringify(json_data));
                res.json(JSON.stringify(json_data));    
            }
        } catch (exeception) {
            console.log(exeception);
            res.send(404);
        }
        
    
});


//////////////////////////////////////////////////////////////////////////
/*

var io;
io = require('socket.io').listen(21000);
io.sockets.on('connection', function(socket) {
    //connection message
	io.sockets.sockets[socket.id].emit('server_msg', '[SERVER] socket server connected....');

	socket.on('sensor_on',function(data){
		console.log('[SENSOR_MANAGER] sensor_connected : '+data);
		socket.broadcast.emit('sensor_on',data);
	});

	socket.on('sensor_off',function(data){
		console.log('[SENSOR_MANAGER] sensor_disconnected : '+data);
		socket.broadcast.emit('sensor_off',data);
	});

	socket.on('sensor_data',function(data){
		console.log('[SENSOR_MANAGER] sensor data emitted : '+data);
		socket.broadcast.emit('sensor_data',data);
	});
});
*/



// http://stackoverflow.com/questions/9499854/node-js-serialport-module-event-types
/*
var myParser = function(emitter, buffer) {
  // Inspect buffer, emit on emitter:
  if(buffer.toString("utf8", 0, 3) === "foo")
    emitter.emit("foo", buffer);
  else
    emitter.emit("data", buffer);
};
var serialport = new SerialPort("/dev/foo", { parser: myParser });
*/

