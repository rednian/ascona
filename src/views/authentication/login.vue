<template>
   <div class="card">
      <div class="card-body">
         <div class="text-center">
            <h4>LOGIN</h4>
         </div>
         <div v-if="has_error" class="alert alert-danger alert-dismissible fade show" role="alert">
            <p>Invalid email or password.</p>
         </div>
         <form method="post" @submit.prevent="submit">
            <div class="form-group ">
               <label class="col-form-label pt-0">Email<span class="text-danger">*</span></label>
               <input v-model="form.username" :class="{'is-invalid': has_error}"  class="form-control form-control-lg" type="text" autofocus autocomplete="off" required>
            </div>
            <div class="form-group ">
               <label class="col-form-label">Password <span class="text-danger">*</span></label>
               <input v-model="form.password" :class="{'is-invalid': has_error}" class="form-control form-control-lg" type="password" autocomplete="off" required>
            </div>
            <div class="row">
               <div class="col">
                  
                  <button :disabled="loading" type="submit" class="btn btn-outline-primary btn-pill btn-block btn-lg">
                      <span v-show="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      {{ text }}
                  </button> 
               </div>
            </div>
         </form>
      </div>
   </div>
</template>
<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
   name:'login',
   data(){
      return{
         loading: false,
         text: 'Login',
         form: {
         username: 'chris@saniservice.com',
         password: 's@niDevOp5',

         // username: null,
         // password: null,
      },
      has_error: false
      }
   },
   methods:{
      ...mapActions({
         login: 'auth/login'
      }),   

      submit(){

         this.loading = true;
         this.text = 'Authenticated...';

         this.login(this.form).then(()=>{ 
            
         location.replace('/') 
         this.loading = false;

         }).catch((err)=>{ 
            this.has_error = true;
             this.loading = false;
              this.text = 'Login';
         })
      }
   },

}
</script>

