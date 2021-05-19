const button = {
    namespaced: true,

    state:{
        text:  'Save',
        loading: false,
    },

    getters:{
        getText(state){
            return state.text;
        },

        isLoading(state){
            return state.loading;
        }
    },

    mutations:{
        SET_TEXT(state, payload){
            state.text = payload;
        },

        SET_LOADING(state, payload){
            state.text = payload;
        }
    },

    actions:{
        setText({commit}, payload){
            commit('SET_TEXT', payload);
        },

        setLoading({commit}, payload){
            commit('SET_LOADING', payload);
        },
        
    }
}

export default button