<template>
    <div>
        <ul>
            <li v-for="waiter in waiters" :data-id="waiter" v-on:click="selectUser">{{waiter}}</li>
        </ul>
        <a class="btn btn-info" v-on:click="startGame">Start game</a>
    </div>
</template>

<script>

module.exports = {
    data: function() {
        return {
            selectedUsers: []
        };
    },
    components: {
        
    },
    methods: {
        selectUser: function(event){
            var el = $(event.target);
            var dataId = el.attr('data-id');
            if(el.hasClass('selected')){
                el.removeClass('selected');
                var index = this.selectedUsers.indexOf(dataId);
                this.selectedUsers.splice(index, 1);
            }
            else{
                if(this.selectedUsers.length == this.maxplayers){
                    alert('mo more players to select');
                }
                else{
                    el.addClass('selected');
                    this.selectedUsers.push(dataId);                
                }
            }
        },
        startGame: function(){
            this.$emit('start', this.selectedUsers);
        }
    },
    props: ['waiters', 'maxplayers']
}
</script>

<style scoped>
    li.selected{
        background: yellow;
    }
</style>