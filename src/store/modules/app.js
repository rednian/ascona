
export default{
   namespaced: true,

   state:{
      inspection:{
         family:{
            is_button_show: false,
            is_list_show: false,
            is_drag: false,
         },
         object:{
            is_button_show: false,
            is_list_show: false
         }
      }
   },

   getters:{
      inspectionFamilyDrag(state){
         return state.inspection.family.is_drag;
      },

      inspectionFamilyListShow(state){
         return state.inspection.family.is_list_show;
      },

      inspectionObjectListShow(state){
         return state.inspection.object.is_list_show;
      },

      inspectionFamilyButton(state){
         return state.inspection.family.is_button_show;
      },

      inspectionObjectButton(state){
         return state.inspection.object.is_button_show;
      },

   },

   mutations:{
      SET_FAMILY_LIST(state, payload){

         let family = state.inspection.family.is_list_show = state.inspection.family.is_list_show ? false : true;
         
         if(family){
            state.inspection.object.is_list_show = false; 
         } 

      },

      SET_OBJECT_LIST(state, payload){
         
        let obj =  state.inspection.object.is_list_show = state.inspection.object.is_list_show ? false : true; 
        
        if(obj){
            state.inspection.family.is_list_show = false;
        }

      },

      SET_FAMILY_BUTTON(state, payload){
         state.inspection.family.is_button_show = payload;
      },

      SET_OBJECT_BUTTON(state, payload){
         state.inspection.object.is_button_show = payload;
      }
   },

   actions:{
      familyList({commit}){
         commit('SET_FAMILY_LIST');
      },

      objectList({commit}){
         commit('SET_OBJECT_LIST');
      },
      
      familyButton({commit}, payload){
         commit('SET_FAMILY_BUTTON', payload);
      },
      
      objectButton({commit}, payload){
         commit('SET_OBJECT_BUTTON', payload);
      },

      inpspectionButton({commit, dispatch}, payload){
         dispatch('familyButton' ,payload);
         dispatch('objectButton' ,payload);
      }

   },

}