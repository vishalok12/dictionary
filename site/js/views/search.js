var app = app || {};

app.SearchView = Backbone.View.extend({
	el: '#nav-search',

	events: {
		'keyup #word-search': "filterWords"
	},

	initialize: function() {
		this.$input = this.$el.find('#word-search');
	},

	filterWords: function(e) {
		var searchKey = this.$input.val();
		var words = this.model.getMatchedWords(searchKey);
		app.dictionaryView.render(words);
	}

});
