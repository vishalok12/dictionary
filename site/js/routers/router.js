(function () {
app = app || {};

app.Router = Backbone.Router.extend({
	routes: {
		'name/:name': 'getWordByName',
		'remembered': 'showRemembered',
		'all': 'showAll',
		'play/:name': 'playGame',
		'*actions': 'showToRemember'
	},

	getWordByName: function(name) {
		alert("name: " + name);
	},

	showRemembered: function() {
		app.wordType = "remembered";
		if (app.dictionaryView) {
			app.dictionaryView.render();
		}
	},

	showToRemember: function() {
		app.wordType = '';
		if (app.dictionaryView){
			app.dictionaryView.render();
		}
	},

	showAll: function() {
		app.wordType = 'all';
		if (app.dictionaryView) {
			app.dictionaryView.render();
		}
	},

	playGame: function(name) {
		new app.GameView({
			type: name
		});
	}
});

var router = new app.Router();

Backbone.history.start();
})();
