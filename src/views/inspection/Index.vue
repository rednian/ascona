<template>
<section class="page-body">
   <div class="container-fluid">
      <div class="page-header">
         <div class="row">
            <div class="col">
               <div class="page-header-left">
                  <h3>INSPECTIONS</h3>

             
               </div>
            </div>

            <div class="col">
               <div class="bookmark pull-right">
                 
               </div>
            </div>
         </div>

      </div>
   </div>
   <div class="container-fluid">
      <div class="row starter-main">
         <div class="col-sm-12">
                <div class="card">
               <div class="card-body">

                     
                  <section class="form-row mb-2">
                     <div class="col-sm-2 col-xs-12 ">
                      <div class="form-group">
                           <select @change="getPerPage" v-model="params.perPage" name="length_change" class=" form-control custom-select">
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="75">75</option>
                              <option value="100">100</option>
                           </select>
                      </div>
                     

                     </div>

                     <div class="col-sm-7 col-xs-12">
                        <section class="form-row">
                           <div class="col-sm-4 col-xs-12">
                              <div class="form-group">
                                 <select class="form-control custom-select" v-model="inspection_status" @change="changeStatus">
                                    <option value="all">All inspections</option>
                                    <option value="0">Pending inspections</option>
                                    <option value="1">Done inspections</option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-sm-8 col-xs-12">
                              <div class="form-row">
                                 <div class="col-xs-6">
                                    <div class="form-group">
                                       <button @click="today"  type="button" class="btn btn-outline-primary">Today</button>
                                    </div>
                                 </div>
                                 <div class="col-xs-6">
                                    <div class="form-group">
                                       <button @click="reset"  type="button" class="btn btn-light active">Reset</button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           
                        </section>
                     </div>

                     <div class="col-sm-3 col-xs-12">
                       <div class="form-group">
                           <input type=search class="form-control" placeholder="Search..." autocomplete="off"> 
                       </div>
                     </div>

                     
                  </section>
                     <b-overlay :show="loading" rounded="sm">
                        <table class="table table-striped">
                           <tbody>
                              <template v-if="filterList">
                                  <tr v-for="(inspection, index) in filterList" :key="index">
                                    <td>
                                       <div>
                                          <strong class="text-primary">{{ inspection.account }}</strong>
                                       </div>
                                       <div>
                                          <i class="fa fa-map-marker"></i> {{ inspection.address }}
                                       </div>
                                       <div>
                                          <i class="fa fa-user"></i> {{ inspection.technician }}
                                       </div>
                                       <div>
                                          <i class="fa fa-calendar"></i>
                                          {{ inspection.start_date | moment("DD-MMM-YYYY hh:mm A") }}
                                       </div>
                                       <div>
                                          <span class="badge badge-pill " 
                                          :class="[ inspection.checklist ? 'badge-success': 'badge-info' ]"
                                          >
                                          {{ inspection.checklist ? 'Done' : 'Pending' }}
                                          </span>
                                       </div>
                                    </td>
                                   
                                    <td class="no-wrap">
                                       <div class="btn-group rounded" role="group">
                                          <button class="btn btn-outline-primary rounded " type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                             <i class="fa fa-bars"></i></button>
                                          <div class="dropdown-menu">
                                             <!-- <a class="dropdown-item" href="javascript:void(0)">Actions</a>
                                             <div class="dropdown-divider"></div> -->

                                             <router-link v-if="inspection.checklist == 0"
                                             class="dropdown-item" 
                                             :to="{name: 'inspection.create', params:{id: inspection.id }}"
                                             >
                                             <i class="fa fa-file-text-o"></i> 
                                             Create inspection Report
                                             </router-link>

                                             <router-link v-if="inspection.checklist == 1"
                                             class="dropdown-item" 
                                             :to="{name: 'inspection.show', params:{id: inspection.id }}"
                                             >
                                             <i class="fa fa-file-text-o"></i> 
                                             View inspection report
                                             </router-link>
                                             
                                             <router-link v-if="inspection.with_geolocation === 'No'" class="dropdown-item" :to="{
                                                name:'inspection.location.create', 
                                                params: {property_id: inspection.property_id}, 
                                                query:{
                                                   account: inspection.account, 
                                                   address: inspection.address, 
                                                   account_id: inspection.account_id,
                                                   account_type_id: inspection.account_type_id
                                                   }
                                                }">
                                                <i class="fa fa-map-marker text-primary"></i>
                                                
                                                   Mark Location
                                                </router-link>

                                             <router-link v-else class="dropdown-item" :to="{
                                                name:'inspection.location.show', 
                                                params: {property_id: inspection.property_id}, 
                                                query:{
                                                   account: inspection.account, 
                                                   address: inspection.address, 
                                                   account_id: inspection.account_id,
                                                   account_type_id: inspection.account_type_id
                                                   }
                                                }">
                                                <i class="fa fa-circle-o text-success"></i>
                                                Show Location
                                                </router-link>
                                       
                                          </div>

                                       </div>
                                    </td>
                                 </tr>
                              </template>

                               <template v-if="filterList.length == 0">
                                 <div class="text-center p-t-15 p-b-15" style="background-color: #eee">
                                 No data available.
                                 </div>
                              </template>
                             

                           </tbody>
                        </table>

                         <b-pagination
                           v-model="inspections.current_page"
                           :total-rows="inspections.total"
                           :per-page="params.perPage"
                           aria-controls="my-table"
                           class="float-right m-t-10"
                           @change="changePage"
                        ></b-pagination>
                     </b-overlay>
               </div>
            </div>
         
           

         </div>

      </div>
   </div>

   

   
</section>
</template>

<script>
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import {mapGetters, mapActions} from 'vuex'

export default {

   name: 'InspectionIndex',


   data() {
      
      let startDate = new Date();
      let endDate = new Date();
      endDate.setDate(endDate.getDate() + 6)

      return {
         loading: false,
         inspections: {
            data:[]
         },

         inspection_status: localStorage.getItem('status') === null ? 'all' : localStorage.getItem('status'),
         date_range:{
            date:{
               startDate,
               endDate
            },
            timepicker: false,
            autoApply: true
         },
        
         params:{
             api_token: this.$store.getters['auth/token'],
             perPage: 10,
             serviceType: 'hygienization',
             startDate: null,
             endDate: null,
             showToday: 'No',
             is_show: true
         },

      }
   },

   watch:{
      'params.is_show': function(newVal, oldVal){
         console.log(newVal);
         if(newVal){ this.params.showToday = 'Yes'}
         if(!newVal){ this.params.showToday = 'No'}
      }
   },

   computed:{
      
      filterList(){
         
         if(this.inspection_status == 'all') return this.inspections.data;

        return this.inspections.data.filter((v)=>{

           if(this.inspection_status == v.checklist) return v;

        });
      }
   },

   methods: {

      reset(){
         this.inspection_status = 'all';
         localStorage.setItem('status', this.inspection_status);
         this.params.showToday = 'No';
         this.getInspections(this.params.perPage, 0);

      },
   
      changeStatus(){
         if(localStorage.getItem('status') !== null){
            localStorage.removeItem('status')
         }
         
         localStorage.setItem('status', this.inspection_status)
      },

      changePage(page){
        this.getInspections(this.params.perPage, page);
      },

     

      today(e){
         this.params.showToday = 'Yes';
         this.getInspections(this.params.perPage, 0);
      },

      getPerPage(){
         this.getInspections();
      },
    

      getInspections(per_page, page_number = 0){
         
         this.loading = true;

         this.$axios({
                url: `${process.env.VUE_APP_BASE_URL}/inspections?page=${page_number}`,
                params: this.params,
                method: 'get'
            })
            .then(res=>{ this.inspections = res.data })
            .catch(e=>{
                this.$store.dispatch('notification/addNotification',{ 
                    type: 'danger', 
                    message: e.message
                });
            })
            .finally(()=>{
                this.loading = false 
            });
      }

      
   },
   mounted() {
      this.getInspections(this.params.perPage, 0);
   },
}
</script>

<style>

</style>
