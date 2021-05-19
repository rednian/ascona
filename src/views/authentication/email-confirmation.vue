<template>
   <div class="card p-4">
      <form class="theme-form" @submit.prevent="submit">
         <h5 class="f-16 mb-3 f-w-600">VERIFY YOUR EMAIL</h5>
            <div class="form-group">
               <label class="col-form-label">Email <span class="text-danger">*</span></label>
               <input class="form-control" type="email" autocomplete="off" autofocus>
            </div>
            <div class="row">
               <div class="col-sm-6">
                   <router-link to="/login" class="btn btn-light" type="submit"><i class="fa fa-arrow-left"></i> Back</router-link>
               </div>
               <div class="col-sm-6">
                   <button class="btn btn-outline-primary" type="submit">Confirm Email</button>
               </div>
            </div>
      </form>
   </div>
</template>

<script>
export default {
   name: 'email-confirmation',

   methods:{
      submit(){
         
      }
   }
}
</script>