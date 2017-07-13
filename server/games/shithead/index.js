var deck = require('../misc/deck');
var Guid = require('guid');
var ranks = [2, 3, 10, 7, 8, 13, 12, 11, 14, 9, 6, 5, 4];

var Shithead = function(players) {
	var self = this;
	this.data = {
		guid: Guid.create(),
		players: [],
		playlersCount: 0,
		deck: new deck(),
		cardsOnTable: [],
		currentPlayerIndex: null
	};
	this.data.playlersCount = players.length;
	players.forEach(function(player) {
		self.data.players.push({
			id: player,
			name: player,
			topThree: [],
			bottomThree: [],
			hand: []
		});
	});
}

Shithead.prototype.shuffle = function() {
	var self = this;
	for (var i = 0; i < 3; i++) {
		self.data.players.forEach(function(player) {
			var card = self.data.deck.deal();
			player.bottomThree.push(card)
		})

		self.data.players.forEach(function(player) {
			var card = self.data.deck.deal();
			player.topThree.push(card)
		})

		self.data.players.forEach(function(player) {
			var card = self.data.deck.deal();
			player.hand.push(card)
		})
	}
}

Shithead.prototype.play = function(card, callback) {

}


/*
Shithead.prototype.switchCards = function() {
	var dummies = game.players.filter(function(player) {
		return player.isDummy;
	})

	dummies.forEach(function(player) {
		player.topThree.forEach(function(card) {
			console.log(card);
		})

		player.hand.forEach(function(card) {
			console.log(card);
		})

		console.log('-------------------------');

		var cards = player.topThree.concat(player.hand);

		var sorted = cards.sort(function(card, card2) {
			var number1 = card[0].number;
			var number2 = card2[0].number;
			if (number1 && number2) {
				var index = ranks.indexOf(number1);
				var index2 = ranks.indexOf(number2);
				return index < index2 ? 1 : 0;
			}

			return -1
		});


		player.topThree = sorted.splice(0, 3);
		player.hand = sorted;

		player.topThree.forEach(function(card) {
			console.log(card);
		});

		player.hand.forEach(function(card) {
			console.log(card);
		});
	})
}
*/

module.exports = Shithead;
