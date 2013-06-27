var app = app || {};

app.Dictionary = Backbone.Collection.extend({
	model: app.Word,
	localStorage: new Backbone.LocalStorage('Dictionary')
});
