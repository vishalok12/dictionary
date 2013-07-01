(function() {
window.app = app || {};

app.DictionaryView = Backbone.View.extend({
	el: '#wrapper',

	events: {
		'click .add-word .front-face': "checkAndFlip",
		'keypress #name': "flipBack",
		'click .add-word .back': "flipFront",
		'click #new-word-btn': "getParams"
	},

	initialize: function(words) {
		this.$dictionary = this.$el.find('#dictionary');
		this.$addWord = this.$el.find('.add-word');
		
		this.collections = new app.Dictionary();
		this.collections.fetch({
			reset: true
		});

		this.listenTo(this.collections, "add", this.renderWord);
		
		this.render();
	},

	render: function() {
		this.$dictionary.html('');
		remembered = app.wordType === "remembered" ? true : false;
		//this.el is what we defined in tagName. use $el to get access to jQuery html() function
		this.collections.where( {remembered: remembered} ).map(function(word) {
			this.renderWord(word);
		}, this);

		return this;
	},

	renderWord: function(word) {
		var wordView = new app.WordView({ model: word });
		this.$dictionary.append( wordView.render().el );
	},

	checkAndFlip: function(e) {
		var clickedElement = e.originalEvent.srcElement;
		var $input = $('#name');

		if ( $input.val().trim() === '' || clickedElement === $input[0] ) { return; }
		flip( e.currentTarget );
		$('#meaning').focus();

		return false;
	},

	flipBack: function(e) {
		if ( e.keyCode === 13 && $('#name').val().trim() ) {
			flip( $(e.currentTarget).parent() );
			$('#meaning').focus();
		}
	},

	flipFront: function(e) {
		flip( $(e.currentTarget).parent() );

		$('#name').focus();

		return false;
	},

	getParams: function() {
		var wordName = $('#name').val().trim();
		var meaning = $('#meaning').val().trim();

		if (!wordName || !meaning) {
			return;
		}
		
		this.collections.create({
			name: wordName,
			meaning: meaning
		});

		$('#name').val('');
		$('#meaning').val('');

		flip( $('.add-word .back-face') );
	}

});

function flip(elem) {
	$(elem).css('-webkit-transform', 'rotateY(180deg)');
	$(elem).siblings().css('-webkit-transform', 'rotateY(0deg)');
}
})();
