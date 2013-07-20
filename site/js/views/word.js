var app = app || {};

app.WordView = Backbone.View.extend({
	tagName: 'section',

	className: 'word-card',

	template: _.template( $( '#wordTemplate' ).html() ),

	events: {
		'click .front-face': "flip",
		'click .back-face': "flipBack",
		'click .remove': "deleteWord",
		'click .done-mark': "toggleRemembered"
	},

	initialize: function() {
		// this.listenTo(this.model, "add", this.render);
		this.listenTo(this.model, "change", this.render);
		// this.listenTo(this.model, "remove", this.remove);
	},

	render: function() {
		//this.el is what we defined in tagName. use $el to get access to jQuery html() function
		this.$el.html( this.template( this.model.toJSON() ) )
						.toggleClass('hide', this.isHidden());

		return this;
	},

	deleteWord: function() {
		this.model.destroy();
		this.remove();
	},

	toggleRemembered: function() {
		this.model.save({
			remembered: !this.model.get('remembered')
		});
		return false;
	},

	isHidden: function() {
		if (app.wordType === 'all') return false;
		var remembered = this.model.get('remembered');
		return (remembered && app.wordType !== "remembered") ||
			(!remembered && app.wordType === "remembered");
	},

	flip: function() {
		this.$el.find('.front-face').css('-webkit-transform', 'rotateY(180deg)');
		this.$el.find('.back-face').css('-webkit-transform', 'rotateY(360deg)');
	},

	flipBack: function() {
		this.$el.find('.front-face').css('-webkit-transform', 'rotateY(0deg)');
		this.$el.find('.back-face').css('-webkit-transform', 'rotateY(180deg)');
	}

});
