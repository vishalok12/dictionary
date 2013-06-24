var app = app || {};

app.WordView = Backbone.View.extend({
	tagName: 'section',

	className: 'word-card',

	template: _.template( $( '#wordTemplate' ).html() ),

	events: {
		'click .front-face': "flip",
		'click .back-face': "flipBack"
	},

	initialize: function() {
		// this.listenTo(this.model, "add", this.render);
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "remove", this.remove);
	},

	render: function() {
		//this.el is what we defined in tagName. use $el to get access to jQuery html() function
		this.$el.html( this.template( this.model.toJSON() ) );

		return this;
	},

	// remove: function() {
	// 	this.$el.remove();
	// },

	flip: function() {
		this.$el.find('.front-face').css('-webkit-transform', 'rotateY(180deg)');
		this.$el.find('.back-face').css('-webkit-transform', 'rotateY(0deg)');
	},

	flipBack: function() {
		this.$el.find('.front-face').css('-webkit-transform', 'rotateY(0deg)');
		this.$el.find('.back-face').css('-webkit-transform', 'rotateY(180deg)');
	}

});
