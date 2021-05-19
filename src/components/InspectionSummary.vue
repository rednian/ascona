<template>
      <div class="card" >
         <div class="card-header b-l-primary border-3  border-3 p-t-10 p-b-10">
            <h5>SUMMARY</h5>
         </div>
         <div class="card-body p-t-10 p-b-10">
            <div class="form-group row">
               <label class="col-sm-2 col-form-label">Total Required Technicians <span class="text-danger">*</span></label>
               <div class="col-sm-10">
                  <input type="number" class="form-control" autocomplete="off">
               </div>
            </div>
            <div class="form-group row">
               <label class="col-sm-2 col-form-label">Total Estimated Hours <span class="text-danger">*</span></label>
                <div class="col-sm-10">
                  <input type="number" class="form-control" autocomplete="off">
                </div>
            </div>
         </div>
      </div>
</template>
<script>
export default {
   name:'inspection-summary',
   props:['data']
}
</script>