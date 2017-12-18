var express = require('express')
var app = express();
var http = require('http').createServer(app);
module.exports = http;

app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});
app.use(express.static('css'));

var startSocket = require(__dirname + '/router/io.js');
startSocket();

http.listen(7777, function(){
    console.log('listen *:7777');
});