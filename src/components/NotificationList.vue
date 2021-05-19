<template>
    <div class="notification-list">

        <notification-message 
        v-for="notification in notifications" 
        :key="notification.id" 
        :notification="notification" 
        />

    </div>
</template>

<script>

import NotificationMessage from './NotificationMessage'
import {mapGetters} from 'vuex'

export default {
    name:'NotificationList',
    components:{ NotificationMessage },

    computed:{
        ...mapGetters({
            notifications :'notification/notifications'
        })
    }
}
</script>

<style>
.notification-list{
    position: fixed;
    top: 75px;
    right: 0;
    margin-right: 15px;
    width: 330px;
    z-index: 999999;
}
</style>