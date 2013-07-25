var fs = require('fs');

var actions = {
	'view' : function(user) {
		return '<h1>Todos for ' + user + '</h1>';
	}
}

this.dispatch = function(req, res) {

	//some private methods
	var serverError = function(code, content) {
		res.writeHead(code, {'Content-Type': 'text/plain'});
		res.end(content);
	}

	var renderHtml = function(content) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(content, 'utf-8');
	}

	var parts = req.url.split('/');

	if (req.url == "/") {
		var path = 'site/index.html';
		if (!req.cookies.userid) {
			path = 'site/signup.html';
		} else {
			req.session.userId = decodeURIComponent( req.cookies.userid );
		}
		fs.readFile(path, function(error, content) {
			if (error) {
				serverError(500);
			} else {
				renderHtml(content);
			}
		});
	} else {
		serverError(404, '404 Bad Request');
	}
}
