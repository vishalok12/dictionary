var app = app || {};

app.WordView = Backbone.View.extend({
	tagName: 'section',

	className: 'word-card',

	template: _.template( $( '#wordTemplate' ).html() ),

	events: {
		'click .front-face': "flip",
		'click .back-face': "flipBack",
		'click .remove': "deleteWord",
		'click .done-mark': "toggleRemembered",
		'click .word label': "pronounceWord",
		'transitionend .front-face': "performRestAnimation"
	},

	initialize: function() {
		// this.listenTo(this.model, "add", this.render);
		this.listenTo(this.model, "change", this.render);
		this.audio = new Audio();
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

	pronounceWord: function() {
		this.audio.src = "https://ssl.gstatic.com/dictionary/static/sounds/de/0/" + 
			this.model.get('name').toLowerCase() + ".mp3";
		this.audio.play();

		return false;
	},

	isHidden: function() {
		if (app.wordType === 'all') return false;
		var remembered = this.model.get('remembered');
		return (remembered && app.wordType !== "remembered") ||
			(!remembered && app.wordType === "remembered");
	},

	flip: function() {
		this.animationType = "back";
		this.$el.find('.front-face').css({
			'-webkit-transform': 'rotateY(90deg)',
			'-moz-transform': 'rotateY(90deg)'
		});
		this.$el.find('.back-face').css({
			'-webkit-transform': 'rotateY(270deg)',
			'-moz-transform': 'rotateY(270deg)'
		});
	},

	flipBack: function() {
		this.animationType = "front";
		this.$el.find('.front-face').css({
			'-webkit-transform': 'rotateY(90deg)',
			'-moz-transform': 'rotateY(90deg)'
		});
		this.$el.find('.back-face').css({
			'-webkit-transform': 'rotateY(270deg)',
			'-moz-transform': 'rotateY(270deg)'
		});
	},

	performRestAnimation: function() {
		var frontFaceAngle, backFaceAngle;
		if (this.animationType === "back") {
			frontFaceAngle = 180;
			backFaceAngle = 360;
			zIndexFront = 0;
			zIndexBack = 1;
		} else {
			frontFaceAngle = 0;
			backFaceAngle = 180;
			zIndexFront = 1;
			zIndexBack = 0;
		}

		this.$el.find('.front-face').css({
			'-webkit-transform': 'rotateY(' + frontFaceAngle + 'deg)',
			'-moz-transform': 'rotateY(' + frontFaceAngle + 'deg)',
			'z-index': zIndexFront
		});
		this.$el.find('.back-face').css({
			'-webkit-transform': 'rotateY(' + backFaceAngle + 'deg)',
			'-moz-transform': 'rotateY(' + backFaceAngle + 'deg)',
			'z-index': zIndexBack
		});
	}

});
