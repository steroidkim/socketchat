var express = require('express')
var app = express();
var http = require('http').createServer(app);

app.get('/sock', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});
app.use(express.static('css'));
app.use(express.static('views'));

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

http.listen(7777, function(){
    console.log('listen *:7777');
});
