var app = app || {};

app.Dictionary = Backbone.Collection.extend({
	url: 'api/words',
	model: app.Word
	// localStorage: new Backbone.LocalStorage('Dictionary')
});
