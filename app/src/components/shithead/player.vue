<template>
    <div class="player" 
        v-bind:style="{'background': active ? 'yellow' : 'green'}">
        <div class="row bottomthree">
            <card v-for="(c, index) in bottomthree" class="flipped" :background="getPath(c.path)" :left="getLeftPosition(index)">
            </card>
        </div>
        <div class="row topthree">
            <card v-for="(c, index) in topthree" :background="getPath(c.path)" :left="getLeftPosition(index)">
            </card>
        </div>
        <div class="row hand">
            <card v-for="(c, index) in hand" :background="getPath(c.path)">
            </card>
        </div>
    </div>
</template>

<script>

var card = httpVueLoader('../card.vue');
module.exports = {
    data: function() {
        return {
        
        }
    },
    components: {
        card
    },
    props:['active', 'name', 'bottomthree', 'topthree', 'hand'],
    methods: {
        getPath: function(path){
            var result = 'url(../img/cards/' + path + '.png)';
            return result;
        },
        getLeftPosition: function(cardIndex){
            return (cardIndex * 54) + 'px';
        }
    }
}

</script>

<style>
    .bottomthree{
        position: absolute;
        margin-top: 3px;
        margin-left: 3px;
    }
</style>