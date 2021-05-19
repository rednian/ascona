<template>
    <div :class="typeClass" class="alert alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        {{ notification.message }}
    </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    name:'NotificationMessage',
    props:{
        notification: Object
    },
    data(){
        return{
            timeOut: null
        }
    },
    computed:{
        typeClass(){
            return `alert-${this.notification.type}`;
        }
    },
    methods:{
        ...mapActions({
            removeNotification: 'notification/removeNotification'
        })
    },
    created(){
       this.timeOut = setTimeout(()=>{
            this.removeNotification(this.notification);
        }, 3000);
    },
    beforeDestroy() {
        clearTimeout(this.timeOut);
    },
}
</script>