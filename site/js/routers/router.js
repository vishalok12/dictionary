(function () {
app = app || {};

app.Router = Backbone.Router.extend({
	routes: {
		'name/:name': 'getWordByName',
		'remembered': 'showRemembered'
	},

	getWordByName: function(name) {
		alert("name: " + name);
	},

	showRemembered: function() {
		app.wordType = "remembered";
		app.dictionaryView && app.dictionaryView.render();
	}
});

var router = new app.Router;

Backbone.history.start();
})();
