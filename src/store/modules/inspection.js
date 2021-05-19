import axios from "axios";

const inspection = {
    namespaced: true,
    state: {

        inspections: {
            data:[]
        },
        loading: false,

        families: {
            items: {},
            is_show: false,
            is_create: true,
            is_create_link: {
                family: false,
                object: false,
            }
        },

        inspection_details: {
            account: {},
            property: {
                location_type_options:[]
            }
        },

        dragFamily: {},

        create_inspection: [],

        objects: null
    },

    getters: {
        isLoading(state) {
            return state.loading;
        },

        

        list(state) {
            return state.inspections;
        },

        isCreateLink(state) {
            return state.is_create_link;
        },

        getFamily(state) {
            return state.create_inspection;
        },

        inspection_detail(state) {
            return state.inspection_details;
        },

        location_options(state) {
            return state.inspection_details.property.location_type_options;
        },

        object_options(state) {
            return state.inspection_details.property.object_options;
        }

    },

    mutations: {
        IS_LOADING(state, payload) {
            state.loading = payload;
        },
        INSPECTION_DETAIL(state, payload) {
            state.inspection_details = payload;
        },

        GET_INSPECTIONS(state, payload) {
            state.inspections = payload;
        },

        REMOVE_FAMILY(state, payload) {
            state.create_inspection.splice(payload, 1);
        },
        CREATE_INSPECTION(state, payload) {
            state.create_inspection.push(payload);
        },

        DRAG_FAMILY(state, payload) {
            state.dragFamily = payload;
        },

        IS_CREATE(state, payload) {
            state.families.is_create = payload;
        },

        TOOGLE_FAMILY(state) {
            if (state.families.is_show == false) {
                state.families.is_show = true;
            } else {
                state.families.is_show = false;
            }
        }
    },

    actions: {
        async inspectionDetails({commit, rootGetters}, payload) {
            commit('IS_LOADING', true);
            await this._vm.$axios({
                url: `${process.env.VUE_APP_BASE_URL}/inspections/inspection-report/create`,
                params: payload
            })
            // await axios.get('/inspections/inspection-report/create',{
            //    params:payload
            // })
                .then((response) => {
                    commit('INSPECTION_DETAIL', response.data.data)
                    commit('IS_LOADING', false);
                })
                .catch((e) => {
                    console.log(e);
                    commit('INSPECTION_DETAIL', null)
                    commit('IS_LOADING', true);
                });
        },

        async list({commit}, payload) {
            return await new Promise((resolve, reject) => {
                this._vm.$axios({
                    url: `${process.env.VUE_APP_BASE_URL}/inspections`, params: payload
                })
                    .then((response) => {
                        commit('GET_INSPECTIONS', response.data)
                        resolve();
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },

        removeFamily({commit}, payload) {
            commit('REMOVE_FAMILY', payload);
        },

        createInspection({commit, state}) {
            commit('CREATE_INSPECTION', state.dragFamily);
        },

        dragFamily({commit}, payload) {
            commit('DRAG_FAMILY', payload);
        },

        isCreate({commit}, payload) {
            commit('IS_CREATE', payload);
        },

        toogleFamily({commit}, payload) {
            commit('TOOGLE_FAMILY', payload);
        }
    },
}

export default inspection;