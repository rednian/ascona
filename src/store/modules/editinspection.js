const editinspection = {
    namespaced: true,
    state:{
        url: process.env.VUE_APP_BASE_URL,
        loading: false,
        location_options: [],
        inspection:{
            account:{},
            property:{},
            locations:[],
        },

        item_options:[],
    },

    getters:{
        item_option: (state)=>state.item_options,

        options: (state)=> state.location_options,

        loading: (state)=> state.loading,
        
        inspection: (state)=> state.inspection,
    },

    mutations:{

        // location form
        // SET_LOCATION_TYPE: (state, value) => state.location_form.location_type = value,
        
        // SET_LOCATION_NAME: (state, value)=> state.location_form.location_name = value,

        // SET_BEARING: (state, value)=> state.location_form.bearing = value,

        // SET_EST: (state, value)=> state.location_form.estimated_time = value,

        // SET_TECH: (state, value)=> state.location_form.technician_required = value,

        // SET_COMMENTS: (state, value)=> state.location_form.comments = value,

        //items

        SET_ITEM_OPTION(state, payload){
            state.item_options = payload;
        },

        DELETE_ITEM(state, payload){
            console.log(payload);
        },


        // location
        UPDATE_LOCATION(state, location){
            let index = state.inspection.locations.findIndex(v =>v.id == location.id);
            state.inspection.locations[index] = location;
        },

        ADD_LOCATION(state, payload){
            state.inspection.locations.push(payload);
        },

        DELETE_LOCATION(state, id){
            let index = state.inspection.locations.findIndex(location=>location.id == id);
            state.inspection.locations.splice(index, 1);
        },

        SET_LOADING(state, payload){
            state.loading = payload
        },

        SET_INSPECTION(state, payload){
            state.inspection = payload
        },

        // location options
        SET_LOCATION_OPTION(state, payload){
            state.location_options = payload
        }
    },

    actions:{
        // items
        
        removeItem({state, commit}, payload){
            commit('SET_LOADING', true);
            return new Promise((resolve, reject)=>{
                this._vm.$axios({
                    url:`${state.url}/inspections/inspection-report/location/item/destroy`,
                    params: payload,
                    method:'get'
                })
                .then(res=>{
                    if(res.data.code === 200){
                        commit('DELETE_ITEM', payload);
                        resolve();
                    }
                })
                .catch(e=>{
                    reject(e)
                })
                .finally(()=>{
                    commit('SET_LOADING', false);
                });
            });
           
        },

        itemOption({state, commit}, payload){
            commit('SET_LOADING', true);
            this._vm.$axios({
                url: `${state.url}/inspections/inspection-report/location/item/list/${payload.id}?api_token=${payload.token}`,
                method: 'get'
            })
            .then(response=>response.data)
            .then(response=>{
                commit('SET_ITEM_OPTION', response.data.location_object)
                console.log(response);
            })

            .finally(()=>{
                commit('SET_LOADING', false);
            });
        },

        //locations
        updateLocation({state, commit}, payload){
            return new Promise((resolve, reject)=>{
                this._vm.$axios({
                    url:`${state.url}/inspections/inspection-report/location/update`,
                    data: payload,
                    method: 'post'
                })
                .then(res=> res.data)
                .then(response=>{
                    let res = response.data;

                    let location = {
                        name: res.location.name,
                        location_type: res.location.location_type,
                        id: res.location.id
                    };

                    commit('UPDATE_LOCATION', location);
                    resolve();
                })
                .catch(e=>{
                    reject(e)
                });
            });
        },

        editLocation({state, commit}, payload){
         
            // commit('SET_LOADING', true);
            return new Promise((resolve, reject)=>{
                this._vm.$axios({
                    url:`${state.url}/inspections/inspection-report/location/show/${payload.id}?api_token=${payload.api_token}`,
                    method: 'get'
                })
                .then(res=>{
                    resolve(res.data);
                })
                .catch(e=>{
                    reject(e)
                })
                .finally(()=>{
                    // commit('SET_LOADING', false);
                })
                ;
            });
        },

        addLocation({state, commit}, payload){
            commit('SET_LOADING', true);

            return new Promise((resolve, reject)=>{
                this._vm.$axios({
                    url:`${state.url}/inspections/inspection-report/location/store`, 
                    data:payload,
                    method: 'post'
                })
                .then(res=>res.data)
                .then(res=>{
                    let response = res.data;
                    let location = {
                        bearing: response.location.bearing,
                        id: response.location.id,
                        location_type: response.location.location_type,
                        name: response.location.name,
                        status: response.status,
                        property_id: response.location.property_id,
                        objects: [],
                    };
                    commit('ADD_LOCATION', location);
                    resolve();
                })
                .catch(e=> reject(e))
                .finally(()=> commit('SET_LOADING', false));
            });
            
        },

        deleteLocation({state, commit, dispatch}, payload){
            commit('SET_LOADING', true);
           return new Promise((resolve, reject)=>{
                this._vm.$axios({
                    url: `${state.url}/inspections/inspection-report/location/destroy`,
                    params: payload,
                    method: 'get'
                })
                .then(res=>{
                    if(res.data.code === 200){
                        commit('DELETE_LOCATION', payload.location_id);
                        resolve();
                    }
                
                }).catch(e=>{
                    reject(e)
                }).finally(()=>{
                    commit('SET_LOADING', false);
                });
           }); 
        
        },

        locationOption({state, commit, dispatch}, payload){
            console.log(payload);
            commit('SET_LOADING', true);
            this._vm.$axios({
                url: `${state.url}/inspections/inspection-report/create`,
                params: payload,
                method: 'get'
            })
            .then(res=> res.data)
            .then(res=>{
                commit('SET_LOCATION_OPTION', res.data.property.location_type_options);
            })
            .catch(e=>{
                dispatch('notification/addNotification', {
                    message: e.message,
                    type: 'danger'
                }, {root: true});
            })
            .finally(()=>{
                commit('SET_LOADING', false);
            });
        },

        locationList({state, commit, dispatch}, payload){
            commit('SET_LOADING', true);

            this._vm.$axios({
                url: `${state.url}/inspections/inspection-report/show/${payload.inspection_id}?api_token=${payload.token}`,
                method: 'get'
            })
            .then((response)=>{return response.data})
            .then((response)=>{

                if(response.code == 200){ 
                    commit('SET_INSPECTION', response.data);
                }
                else{

                 dispatch('notification/addNotification', {
                    type: 'danger',
                    message: 'Network error.'
                  }, {root: true});

               }
            })
            .catch(e=>{
               dispatch('notification/addNotification', {
                  type: 'danger',
                  message: e.message
               }, {root: true});
            })
            .finally(()=> commit('SET_LOADING', false) );
            

        }
    }
}

export default editinspection