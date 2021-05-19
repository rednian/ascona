const objects = {
   namespaced: true,
   state:{
      is_show: false,
      objects: []
   },

   getters:{
      objects(state){
         return state.objects;
      },

      isShow(state){
         return state.is_show;
      }
   },
   mutations:{
      SHOW_OBJECT(state){
         state.is_show = state.is_show ? false : true;
      }
   },
   actions:{
      showObject({commit}){
         commit('SHOW_OBJECT');
      }
   },
}

export default objects;