var app = app || {};

app.Word = Backbone.Model.extend({
	defaults: {
		remembered: false,
		synonyms: []
	},
	parse: function (response) {
		response.id = response._id;
		return response;
	},
	validate: function(attributes, options) {
		if (!attributes.name || !attributes.meaning) {
			return 'name and meaning both should be passed';
		}
	}
});
