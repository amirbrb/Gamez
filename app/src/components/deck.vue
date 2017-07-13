<template>
    <div class="deck">
        <Card v-for="card in deck"
           v-bind:marginleft="card.marginLeft" 
           v-bind:margintop="card.marginTop"
           v-bind:background="card.background"/>
    </div>
</template>

<script>

var Card = httpVueLoader('card.vue');
module.exports = {
    data: function() {
        var cards = [];
        var marginLeft = 0;
        var marginTop = 0;
        var types = ['h', 'd', 'c', 'l'];
        var numbers = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
        
        types.forEach(function(type){
            numbers.forEach(function(number){
                cards.push({
                    marginLeft: marginLeft,
                    marginTop: marginTop,
                    background: 'url(img/cards/' + number + type + '.png) no-repeat'
                })
            })
        });
        
        return {
            deck: cards
        }
    },
    components: {
        Card
    }
}
</script>

<style>
    .deck{
        width: 90PX;
        height: 110px;
        box-shadow: 4px 15px 10px 2px;
    }
</style>