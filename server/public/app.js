
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
   connection.query('SELECT * FROM sensor_info;', function (error, rows, fields) { 
         res.writeHead(200, {'Content-Type': 'text/plain'});
         var str='';
         for(var i=0;i<rows.length;i++)
			str = str + rows[i].product_name +'\n';
			res.end( str);
      }); 
});
app.get('/dbtest2', function (req, res) {
   connection.query('SELECT * FROM sensor_info;', function (error, rows, fields) { 
         res.writeHead(200, {'Content-Type': 'text/plain'});
         var str='';
         for(var i=0;i<rows.length;i++)
			str = str + rows[i].product_name +'\n';
			res.end( str);
      }); 
});
//////////////////////////////////////////////////////////////////////////


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

