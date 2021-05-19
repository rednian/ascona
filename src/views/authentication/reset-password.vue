<template>
   <div class="card mt-4 p-4">
      <form class="theme-form">
         <h5 class="f-16 mb-3 f-w-600">CREATE YOUR PASSWORD</h5>
         <div class="form-group">
         <label class="col-form-label">New Password <span class="text-danger">*</span></label>
         <input class="form-control" type="password" placeholder="*****">
         </div>
         <div class="form-group">
         <label class="col-form-label">Retype Password <span class="text-danger">*</span></label>
         <input class="form-control" type="password" placeholder="*****">
         </div>
         <div class="form-group form-row mb-0">
         <div class="col-md-2">
            <button class="btn btn-outline-primary" type="submit">Reset</button>
         </div>
         </div>
      </form>
   </div>
</template>

<script>
export default {
   name: 'reset-password'
}
</script>