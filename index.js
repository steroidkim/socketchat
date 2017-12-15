var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

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

http.listen(7777, function(){
    console.log('listen *:7777');
});
