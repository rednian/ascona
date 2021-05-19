 const service = {
    namespaced: true,
    
    state:{
        loading: false,
        status: localStorage.getItem('service_status') === null ? 0 : localStorage.getItem('service_status'),
        service:{
            current_page: 1,
            total: 0,
            data: [],
        }
    },

    getters:{
        currentPage(state){
            return state.current_page;
        },

        total(state){
            return state.total;
        },

        services(state){
            return state.service;
        },

        filteredServices(state){
            if(state.status === 'all' ) return state.service.data;

            return state.service.data.filter(v=> v.checklist == state.status );
        },

        loading(state){
            return state.loading;
        },

        getStatus(state){
            return state.status
        }
    },

    mutations:{
        GET_SERVICES(state, service){
            state.service = service;
        },

        SET_LOADING(state, payload){
            state.loading = payload
        }
    },

    actions:{
        changeStatus({commit}, payload){
            if(localStorage.getItem('service_status') !== null){
               localStorage.removeItem('service_status')
            }
            
            localStorage.setItem('service_status', this.service_status)
         },

        index({commit, dispatch, rootGetters}){

            commit('SET_LOADING', true);

            this._vm.$axios({
                url:`${process.env.VUE_APP_BASE_URL}/services`, params:{ api_token: rootGetters['auth/token']},
                methods: 'get',
            })
            .then(response=>{
                commit('GET_SERVICES', response.data);
            })
            .catch(e=>{
                dispatch('notification/addNotification',
                { 
                    type: 'danger', 
                    message: e.message
                }, 
                {root: true}
                );
            })
            .finally(()=>{
                commit('SET_LOADING', false);
            });

        }
        
    }
}

export default service;