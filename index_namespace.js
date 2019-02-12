var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.get(['/','/index_namespace.html'], function(req, res){
	res.sendFile(__dirname + '/index_namespace.html');
});

var namespace = io.of('/my')
namespace.on('connection', function(socket){
	socket.on('chat message', function(msg){
		namespace.emit('chat message', msg);
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
