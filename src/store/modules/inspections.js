const inspections = {
    namespaced: true,

    state:{
        loading: false,
        inspections:{
            data:[],
            per_page: 0,
            total: 0,  
        },
    },

    getters:{
        
        filteredInspections(state){

        }
    },

    mutations:{
        SET_INSPECTIONS(state, payload){
            state.inspections = payload;
        },
        SET_LOADING(state, payload){
            state.loading = payload;
        }
    },

    actions:{
        list({commit, dispatch}, payload){

            commit('SET_LOADING', true)

            this._vm.$axios({
                url: `${process.env.VUE_APP_BASE_URL}/inspections`,
                params: payload,
                method: 'get'
            })
            
            .then(res=>{ commit('SET_INSPECTIONS', res.data); })

            .catch(e=>{
                dispatch('notification/addNotification',{ 
                    type: 'danger', 
                    message: e.message
                },
                {root: true});
            })

            .finally(()=>{ commit('SET_LOADING', false); });
        }
    }

}

export default inspections