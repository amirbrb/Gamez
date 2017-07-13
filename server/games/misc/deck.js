var Deck = function() {
	this.cards = [];
	var self = this;
	var types = ['h', 'd', 'c', 's'];
	var numbers = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

	types.forEach(function(type) {
		numbers.forEach(function(number) {
			self.cards.push({
				path: number + type,
				number: number,
				type: type
			});
		});
	});
}

Deck.prototype.deal = function() {
	var randomCardIndex = Math.floor(Math.random() * this.cards
		.length - 1);

	var card = this.cards.splice(randomCardIndex, 1)[0];
	return card;
}

module.exports = Deck;
