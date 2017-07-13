<template>
    <div class="card"
        v-on:click="flip"
        v-bind:style="{ 
            'background-image': background, 
            'background-size': '54PX 74PX',
            'left': left}">
    </div>
</template>

<script>

module.exports = {
    data: function() {
        return {
        }
    },
    components: {
        
    },
    props:['background', 'left'],
    methods: {
        flip: function(event){
            var card = $(event.target);
            card.toggleClass('flipped');
        },
    }
}

</script>

<style >
    .card{
        position: absolute;
        width: 54px;
        height: 74px;
        cursor: pointer;
        -webkit-transition: background 1s; /* Safari */
        transition: background .25s ease-in-out;;
    }
    
    .card.flipped{
        background: url('img/cards/card-back.png') 0% 0%/ 10vh no-repeat !important
    }
</style>