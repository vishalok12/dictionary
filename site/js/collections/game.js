var app = app || {};

app.Game = Backbone.Collection.extend({
	url: 'api/words',
	model: app.Word

	// localStorage: new Backbone.LocalStorage('Dictionary')
});
