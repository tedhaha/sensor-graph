// npm install serialport

// 시리얼통신 기초자료
// http://blog.daum.net/jis3380/2218785

function serialListener()
{
    var receivedData = "";
    serialPort = new SerialPort(portName, {
        baudrate: 9600,
        // defaults for Arduino serial communication
         dataBits: 8, 
         parity: 'none', 
         stopBits: 1, 
         flowControl: false 
    });
 
    serialPort.on("open", function () {
      console.log('open serial communication');
         // Listens to incoming data
        serialPort.on('data', function(data) { 
             receivedData += data.toString();
          if (receivedData .indexOf('E') >= 0 && receivedData .indexOf('B') >= 0) {
         // save the data between 'B' and 'E'
           sendData = receivedData .substring(receivedData .indexOf('B') + 1, receivedData .indexOf('E'));
           receivedData = '';
         }
         // send the incoming data to browser with websockets.
       socketServer.emit('update', sendData);
      });  
    });  
}





/*
// https://github.com/voodootikigod/node-serialport
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty-usbserial1", {
  baudrate: 57600
});

var events = require('events');
var util = require('util');

var SerialProxy = function(serialport){
  events.EventEmitter.call(this);
  var self = this;
  serialport.on("data", function(data) {
    // Inspect data to see which event to emit
    // data is a Buffer object
    var prefix = data.toString("utf8", 0, 3);
    if(prefix === "foo")
      self.emit("foo", data.toString("utf8", 3));
    else if(prefix === "bar")
      self.emit("bar", data.toString("utf8", 3));
    else
      self.emit("data", data.toString("utf8"));
  });
};

util.inherits(SerialProxy, events.EventEmitter);

var serialProxy = new SerialProxy(serialPort);

serialProxy.on("foo", function(data) {
  // ...
});

serialProxy.on("bar", function(data) {
  // ...
});

serialProxy.on("data", function(data) {
  // ...
});
*/
// http://stackoverflow.com/questions/17603304/read-serialport-with-node-serial


// http://www.barryvandam.com/arduino/node-js-communicating-with-arduino/
