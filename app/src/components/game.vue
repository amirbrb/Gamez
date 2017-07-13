<template>
    <div class="game">
        <strong><p>{{name}}</p></strong>
        <a class="btn btn-success" v-on:click="start"><i class="glyphicon glyphicon-refresh"></i>Start</a>
    </div>
</template>

<script>

var Deck = httpVueLoader('deck.vue');
module.exports = {
    data: function() {
        return {
            
        }
    },
    components: {
        Deck
    },
    methods:{
        start: function(){
            var data = {
                users: [
                        {
                            name: 'ammir',
                            owner: true
                        },
                        {
                            name: 'noam'
                        }
                    ]
            };
            $.get('/shithead/start', data)
                .done(function(data){
                   debugger; 
                });
        }
    },
    props: ['players', 'name']
}
</script>

<style>
</style>