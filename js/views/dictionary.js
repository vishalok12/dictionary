var app = app || {};

app.DictionaryView = Backbone.View.extend({
	el: '#dictionary',

	initialize: function(words) {
		this.collections = new app.Dictionary();
		this.collections.fetch({
			reset: true
		});
		this.listenTo(this.collections, "add", this.renderWord);
		this.render();
	},

	render: function() {
		//this.el is what we defined in tagName. use $el to get access to jQuery html() function
		this.collections.each(function(word) {
			this.renderWord(word);
		}, this);

		return this;
	},

	renderWord: function(word) {
		var wordView = new app.WordView({ model: word });
		wordView.model.save();
		this.$el.append( wordView.render().el );
	}

});
