/* js tanks server
 * 7/23/2011
 * aizuwakamatsu, fukushimaken, japan
 */

var admin = require('./admin.js');
// NODE LIBRARIES ////////////////////////////////////////////////////////////
var http	= require('http');
var fs 		= require('fs');
var url 	= require('url');

// uses socket.io 1.0!
var sio		= require('socket.io');

// CONSTANTS /////////////////////////////////////////////////////////////////
const LOG_FILE = "stats.json";
var port	= process.env.PORT || 3001;

// DATA STRUCTURES ///////////////////////////////////////////////////////////
var uid		= 1;	// unique id counter
var clients	= [];	// array of socket.io client objects

// default stats
var stats;

// load data
var loadedStats = false;
try {
	var text = fs.readFileSync(LOG_FILE);
	stats = JSON.parse(text);
	if (text && stats) loadedStats = true;
} catch (e) { }
if (!loadedStats) {
	stats = {
		currentUsers: 0,
		totalUsers: 0,
		log: []
	};
}
// log message
function statlog(msg) {
	stats.log.push("(" + new Date().toLocaleString() + ") " + msg);
}

// startup
stats.currentUsers = 0;

statlog("Spinning up.");

// PROTOCOL //////////////////////////////////////////////////////////////////
//
// SERVER -> CLIENT:
//   {event: 'hi', id: u_id}
//
// CLIENT -> SERVER:
//   {event: 'pos', blah blah}	- rebroadcast message volatile
//   {blah blah blah}			- rebroadcast message
//

function debug(message)
{
	console.log("error: " + message);
}

var mime_types = 
{
	html:"text/html",
	htm:"text/html",
	css:"text/css",
	js:"text/javascript",
	png:"image/png",
	jpg:"image/jpeg",
	ico:"image/vnd.microsoft.icon",
	txt:"text/plain"
};

// SERVER HANDLERS ///////////////////////////////////////////////////////////

function staticFileHandler(filename)
{
	// cache the data ahead of time
	var file = fs.readFileSync(filename, "binary");
	var stats = fs.statSync(filename);
	var etag = '"' + stats.ino + '-' + stats.size + '-' + Date.parse(stats.mtime) + '"';
	
	var i = filename.lastIndexOf(".");
	var content_type = "text/plain";
	if (i != -1) 
	{
		var extension = filename.substring(i+1);
		if (extension != "" && mime_types[extension] != undefined)
			content_type = mime_types[extension];
	}	
	
	var header = {
		"Server": 			"tank-game",
		"ETag": 			etag,
		"Content-Type": 	content_type,
		"Content-Length": 	file.length
	}
	
	return function(request, response)
	{
		if (request.headers['if-none-match'] != undefined && 
			request.headers['if-none-match'].indexOf(etag) != -1)
		{
			response.writeHead(304);
			response.end();
			return;
		}

		response.writeHead(200, header);  
		response.write(file, "binary");  
		response.end();
	};
}

var root = staticFileHandler("index.html");
var handler = {};

function listFile(file) { handler[file] = staticFileHandler(file); }

// list of files on the server
handler["index.html"] 	= root;
handler["socket.io.js"] = staticFileHandler("node_modules/socket.io-client/socket.io.js");
listFile("favicon.ico");
listFile("server.js");
listFile("game.js");
listFile("tedge.js");
listFile("meshes.js");
listFile("glMatrix-0.9.5.min.js");
listFile("thick.png");
listFile("thin.png");

handler["admin"] = admin(stats, statlog);

// FILE SERVER ///////////////////////////////////////////////////////////////
server = http.createServer(function(req, resp)
{
	var uri = url.parse(req.url).pathname;
	var filename = uri.substring(1);

	if (filename)
	{
		if (handler[filename])
		{
			handler[filename](req, resp);
		}
		else
		{		
			resp.writeHead(404, {"Content-Type": "text/plain"});  
			resp.write("Error 404: file not found");  
			resp.end();
			debug("requested invalid file: '" + filename + "'");			
		}
	}
	else
	{
		root(req, resp);
	}
});

server.listen(port);

// SOCKET.IO SERVER //////////////////////////////////////////////////////////

function broadcastSend(data, except) {
	clients.map(function (C) {
		if (C != except) {
			C.volatile.emit('message', data);
		}
	});
}

var io = sio(server); 
io.on('connection', function(client)
{ 
	var request = client.request;
	var IP = request.headers['x-forwarded-for'] || 
		request.connection.remoteAddress || 
		request.socket.remoteAddress ||
		request.connection.socket.remoteAddress || "none";
	statlog("New connection from " + IP);
	// new player connected
	var user_id = uid++;
	clients[user_id] = client;

	stats.totalUsers++;
	stats.currentUsers++;
	
	// incoming ajax
	client.on('message', function(msg)
	{
		//console.log(msg);
		var cast = {};
		cast["event"] = msg["event"];
		if ("pos" in msg) cast["pos"] = msg["pos"];
		if ("vel" in msg) cast["vel"] = msg["vel"];
		if ("accl" in msg) cast["accl"] = msg["accl"];
		if ("rot" in msg) cast["rot"] = msg["rot"];
		if ("rotv" in msg) cast["rotv"] = msg["rotv"];
		if ("isPlane" in msg) cast["isPlane"] = msg["isPlane"];
		if ("roll" in msg) cast["roll"] = msg["roll"];
		if ("pitch" in msg) cast["pitch"] = msg["pitch"];
		if ("keys" in msg) cast["keys"] = msg["keys"];
		if ("id" in msg) cast["id"] = msg["id"];
		if ("side" in msg) cast["side"] = msg["side"];
    
		// client.broadcast.json.send(cast);
		broadcastSend(cast, client);
	}); 
	
	// client disconnect
	client.on('disconnect', function()
	{
		statlog(user_id + " disconnected. [" + IP + "]");
		console.log(user_id + " disconnected.");
		delete clients[user_id];
		stats.currentUsers--;
	});
	
	// begin the handshake
	client.emit('message', {event: "hi", id: user_id});
	
	console.log("New player with id " + user_id);
}); 

// heroku shutdown
process.on('SIGTERM', function () {
	statlog("Spinning down.");
	try {
		var s = JSON.stringify(stats);
		fs.writeFileSync(LOG_FILE, s);
	} catch (e) { }
	server.close(function () {
		io.close();
		process.exit(0);
	});
});