const joborder = {
    namespaced: true,

    state:{
        url: process.env.VUE_APP_BASE_URL,

        job_orders:{
            data: []
        },
        details:{
            service:[]
        },

        loading: false,
    },

    getters:{
        details: (state)=>state.details,
        
        job_orders: (state)=> state.job_orders,

        loading: (state)=> state.loading,
    },

    mutations:{
        SET_JOB_ORDERS: (state, job_orders)=> state.job_orders = job_orders,

        SET_LOADING: (state, isLoaded)=> state.loading = isLoaded,

        SET_DETAILS: (state, details)=> state.details = details,

    },

    actions:{
        show({state, commit, dispatch}, payload){
            commit('SET_LOADING',true);
            this._vm.$axios({
                url: `${state.url}/work-order/show/${payload.date}?api_token=${payload.api_token}`,
            })
            .then(res=>{
                if(res.status === 200){
                    commit('SET_DETAILS', res.data)
                }
            })
            .catch(e=>{
                dispatch('notification/addNotification',{
                    message: e.message,
                    type: 'danger'
                })
            })
            .finally(()=>{
                commit('SET_LOADING',false);
            });
        },

        index({state, commit, dispatch}, params){
            
            commit('SET_LOADING',true);

            this._vm.$axios({
                url: `${state.url}/work-order`,
                method: 'get',
                params: params,
            })
            .then(res=>{
                if(res.status === 200){
                    commit('SET_JOB_ORDERS', res.data);
                }
            })
            .catch(e=>{
                dispatch('notification/addNotification',{
                    message: e.message,
                    type: 'danger'
                })
            })
            .finally(()=>{
                commit('SET_LOADING',false);
            });
        }
    }

}

export default joborder;