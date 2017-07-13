<template>
    <div>
        <waiters :waiters="waiters" :maxplayers="4" v-if="iswaiting" v-on:start="startGame"></waiters>
        <div v-if="!iswaiting" class="board">
            <div v-for="(player, index) in players" class="player-container" :index="index">
                <player 
                    :name="player.id" 
                    :active="player.id == activeplayer.id"
                    :bottomthree="player.bottomThree"
                    :topthree="player.topThree"
                    :hand="player.hand">
                <player>
            </div>
        </div>
    </div>
</template>

<script>

var waiters = httpVueLoader('../misc/waiters.vue');
var player = httpVueLoader('player.vue');
var gameService = {
    isCardValid: function(card){
        var isValid = false
        if(this.cardsOnTable.length == 0) 
            isValid = true;
        else{
            var lastCard = this.cardsOnTable[this.cardsOnTable.length - 1];
            switch (lastCard.number) {
			    case 7:
				    isValid = card.number <= 7;
    				    break;
    			case 3:
    				var previousCard = this.getCardBeforeMirror();
        				isValid = card.number > previousCard.number;
    				break;
    		}
        }
          
        return isValid;
    },
    getCardBeforeMirror: function(){
        var number = 3;
  	    var currentIndex = this.cardsOnTable.length - 1;
  		var card;
  		while (number == 3 && currentIndex > 1) {
  			card = this.cardsOnTable[currentIndex - 1];
  			number = card.number;
  		}
      
  		return card;
    }
}
module.exports = {
    data: function() {
        return {
            
        };
    },
    components: {
        waiters,
        player
    },
    methods: {
        startGame: function(users){
            socket.emit('shithead-start', {
                users: users
            });
        },
        replaceCard: function(card1, card2){
            socket.emit('shithead-replace-card', {
                card1: card1,
                card2: card2
            });
        },
        playCard: function(card){
            if(!gameService.isCardValid(card)){
                alert('invalid card');
            }
            else{
                socket.emit('shithead-play-card', {
                    card: card
                });
            }
        },
        takeAll: function(){
            socket.emit('shithead-take-all');
        }
    },
    props: ['waiters',
        'iswaiting', 
        'players',
        'deck',
        'activeplayer',
        'cardsOontable']
}
</script>

<style>
    .board{
        width: 100%;
        height: 100vh;
        border: solid black 1px;
        background: grey;
    }
    
    .player-container{
        position:absolute;
    }
    
    .player-container[index="0"]{
        top: 0;
        left: 40%;
    }
    .player-container[index="1"]{
        bottom: 0;
        left: 40%;
    }
    .player-container[index="2"]{
        top: 30vh;
        left: 10%;
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
    }
    .player-container[index="3"]{
        top: 60vh;
        right: 10%;
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        transform: rotate(-90deg);
    }
</style>