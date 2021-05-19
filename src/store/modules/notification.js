const notifications = {
    namespaced: true,
    state:{
        notifications:[],
    },

    getters:{
        notifications(state){
            return state.notifications;
        }
    },

    mutations:{
        REMOVE_NOTIFICATION(state, notification){
            state.notifications = state.notifications.filter(v=> v.id != notification.id);
        },

        PUSH_NOTIFICATION(state, notification){
            state.notifications.push({
                ...notification, 
                id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
            });
        }
    },

    actions:{
        removeNotification({commit}, notification){
            commit('REMOVE_NOTIFICATION', notification);
        },

        addNotification({commit}, notification){
            commit('PUSH_NOTIFICATION', notification);
        }
    }
}

export default notifications;