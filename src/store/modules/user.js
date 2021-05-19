
// const user  = JSON.parse(localStorage.getItem('user'));

// const state = user ? {status: {loggedIn: true}, user } : {status: {}, user: null }; 
const user = {
   namespaced: true,

   state:{
      user: JSON.parse(localStorage.getItem('user')),
      status: null,
      loggedIn: false
   },

   getters:{},

   mutations:{},

   actions:{},
}


export default user;