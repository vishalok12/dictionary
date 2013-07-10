var app = app || {};

app.Word = Backbone.Model.extend({
	defaults: {
		name: 'Word',
		meaning: 'Meaning comes here...',
		remembered: false
	},
	parse: function (response) {
		response.id = response._id;
		return response;
	}
});
