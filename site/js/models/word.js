var app = app || {};

app.Word = Backbone.Model.extend({
	defaults: {
		name: 'Word',
		meaning: 'Meaning comes here...',
		remembered: false
	}
});
