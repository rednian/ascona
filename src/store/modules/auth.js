import axios from 'axios';

const auth = {
   namespaced: true,
   
   state:{
      token: localStorage.getItem('token') ||null,

      status: null,

      user: localStorage.getItem('user') ||null
   },

   getters:{

      token: state => state.token,

      isLogin: state => !!state.token,

      status: state => state.status,

      user(state){
         return JSON.parse(state.user);
      },

      name(state){
         return state.user
      }

      
   },

   mutations:{

      AUTH_REQUEST(state){
         state.status = 'loading'
      },

      AUTH_SUCCESS(state, payload){
         state.status = 'success';
         state.token = payload.token;
         state.user = payload.user;
      },

      AUTH_ERROR(state){
         state.status = 'error';
      },

      LOGOUT(state){
         state.status = null;
         state.user = {}
      }

    
   },

   actions:{

      logout({commit}){
         return new Promise((resolve, reject) => {
           commit('LOGOUT')
           localStorage.removeItem('token')
           localStorage.removeItem('status')
           localStorage.removeItem('service_status')
           delete  this._vm.$axios.defaults.headers.common['Authorization']
           resolve()
         })
       },


      login({commit}, payload){
          return new Promise((resolve, reject)=> {
            commit('AUTH_REQUEST');
            let options = {};
            this._vm.$axios({url: `${process.env.VUE_APP_BASE_URL}/login/store`, data: payload, method: 'post'})
            .then((response)=>{

               if(response.data.code === 200){
                  const token = response.data.account.token;
                  const user = response.data.account;

                  localStorage.setItem('token', token);
                  localStorage.setItem('user', JSON.stringify(user) );


                  commit('AUTH_SUCCESS', {token: token, user: user})
                  resolve(response)
               }
               else{
                  reject(response.data);
               }
            })
            .catch((error)=>{

               commit('AUTH_ERROR', error)
               reject(error)
               localStorage.removeItem('token')
               localStorage.removeItem('user')

               
            });
         }); 
      },


   }
}

export default auth;