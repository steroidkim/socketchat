// control io event
var ioEventHandler = function (){
    var http = require('../server.js');
    var io = require('socket.io')(http);
    var numOfUser = 0;

    io.on('connection', function(res){
        console.log('guest coming');
        ++numOfUser;
        io.emit('user count', numOfUser);
        res.on('disconnect', function(){
            --numOfUser;
            io.emit('user count', numOfUser);
            console.log('count: ' + numOfUser);
        });
        res.on('chat message', function(msg) {
            console.log('msg: ' + msg);
            io.emit('chat message', msg);
        });
        console.log('count: ' + numOfUser);
    });
}

module.exports = ioEventHandler;