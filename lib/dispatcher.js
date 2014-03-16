var fs = require('fs');
var jade = require('jade');

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
		var path = 'site/index.jade';

		if (!req.cookies.userid) {
			path = 'site/signup.jade';
		}

		req.session.userId = decodeURIComponent( req.cookies.userid );
		html = jade.renderFile(__dirname + '/../' + path, {
			env: process.env.NODE_ENV
		});
		renderHtml(html);
	} else {
		serverError(404, '404 Bad Request');
	}
}
