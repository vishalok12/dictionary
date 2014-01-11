(function() {
	app = app || {};

	app.Search = Backbone.Model.extend({
		defaults: {
			words: []
		},

		// root: this.parseWordsToTree(this.words),

		parseWordsToTree: function() {
			var root = new Node();
			var word, node;
			var i, j;
			var words = this.get('words');
			
			for (i = 0; i < words.length; i++) {
				word = words[i].toLowerCase();
				node = root;
				for (j = 0; j < word.length; j++) {
					if (!node.next) {
						node.next = [];
					}
					// node.next[ word[j].charCodeAt() - 97 ] = new Node();
					node = node.setNextAtIndex( word[j].charCodeAt() - 97, i );
				}
				node.indexes.push(i);
			}
			
			this.set( 'root', root );
		},

		getMatchedWords: function(substring) {
			var i = 0;
			var root = this.get('root');
			var words = this.get('words');

			if (typeof root === "undefined") {
				this.parseWordsToTree();
				root = this.get('root');
			}

			var node = root;
			var s = substring.toLowerCase();
			
			while (i < s.length && node) {
				node = node.next ? node.next[ s[i].charCodeAt() - 97 ] : null;
				i++;
			}
			
			if (node) return node.indexes.map(function(index) {
				return words[index];
			});
			return [];
		},

		addWord: function(word) {
			this.get('words').push(word);
			this.parseWordsToTree();
		},

		removeWord: function(word) {
			var words = this.get('words');
			words.splice( words.indexOf(word), 1 );
			this.parseWordsToTree();
		}
	});

	function Node() {
		this.indexes = [];
		this.next = null;
	}

	Node.prototype.setNextAtIndex = function(i, id) {
		this.indexes.push(id);
		if ( !this.next ) {
			this.next = [];
		}
		if ( !this.next[i] ) {
			this.next[i] = new Node();
		}
		
		return this.next[i];
	}
})();
