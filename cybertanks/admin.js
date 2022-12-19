var crypto  = require('crypto');
var qs = require('querystring');

var stats, statlog;

function GET_POST(req, resp, callback) {
	if (req.method === 'POST') {
		var body = '';
		req.on('data', function (data) {
			body += data;
		});

		req.on('end', function () {
			var post = qs.parse(body);
			callback(post);
		});
	} else {
		callback(null);
	}
}

// /admin page request.
function adminPage(req, resp) {
	GET_POST(req, resp, function (post) {
		if (post && post['key']) {
			var hash = crypto.createHash('sha256');
			hash.update(post['key'] + process.env.SALT);
			var keyhash = hash.digest('hex');
			if (keyhash === process.env.ADMIN_KEY) {
				resp.writeHead(200, {"Content-Type": "text/html"});
				resp.write("<!doctype html><h1>Admin Panel</h1><h2>Welcome</h2>");
				resp.write("<h3>Current Users</h3>" + stats.currentUsers);
				resp.write("<h3>Total Users</h3>" + stats.totalUsers);
				var log = "";
				stats.log.map((value) => log += "<p>" + value + "</p>\n");
				resp.write("<h3>Log</h3>"+log+"</p>");
				resp.end();
			} else {
				var ip = req.headers['x-forwarded-for'] || 
     				req.connection.remoteAddress || 
     				req.socket.remoteAddress ||
     				req.connection.socket.remoteAddress;
				console.log("Unauthorized admin login attempt: " + ip + " " + keyhash);
				statlog("Unauthorized admin login attempt: " + ip + " " + keyhash);
				resp.writeHead(401, {"Content-Type": "text/html"});
				resp.write("<!doctype html><h1>Unauthorized.</h1>");
				resp.end();
			}

		} else {
			resp.writeHead(200, {"Content-Type": "text/html"});
			resp.write("<!doctype html><form action='/admin' method='post'>Administrator Password: <input name='key' type='password'><input type='submit' value='Enter'></form>");
			resp.end();
		}
	});
};


module.exports = function (statsObject, statLogFn) {
	stats = statsObject;
	statlog = statLogFn;
	return adminPage;
}
