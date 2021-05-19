<template>
 <div class="page-body">
          <div class="container-fluid">
            <div class="page-header">
              <div class="row">
                <div class="col">
                  <div class="page-header-left">
                    <h3>JOB ORDERS</h3>
                  </div>
                </div>

         
              </div>

            </div>
          </div>
          <!-- Container-fluid starts-->
          <div class="container-fluid">
            <div class="row starter-main">
              <div class="col-sm-12">
                 <div class="card">
                  <div class="card-body">
                    <table class="table">
                      <tbody>
                        <template v-if="job_orders">
                          <tr v-for="(order, index) in job_orders.data" :key="index">
                              <td>{{ order.work_order }}</td>
                              <td class="no-wrap">
                                <router-link 
                                :to="{name: 'job_order.show', params: {date: order.work_order } }" 
                                class="btn btn-outline-primary">
                                View work order
                                </router-link>
                              </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
               </div>
               
              </div>
            
          
            </div>
          </div>
          <!-- Container-fluid Ends-->
        </div>


</template>

<script>
export default {
   name: 'JobOrder',
   data(){
     return{
       token: this.$store.getters['auth/token'],
       params:{
         showToday:'No'
       }
     }
   },

   computed:{
     job_orders(){
       return this.$store.getters['joborder/job_orders']
     }
   },

   methods:{
     jobOrder(){
        this.params.api_token = this.token;
        this.$store.dispatch('joborder/index', this.params);
     }
   },

   created(){
     this.jobOrder();
   }
}
</script>

<style>

</style>