<template>
 <div class="page-body">
          <div class="container-fluid">
            <div class="page-header">
              <div class="row">
                <div class="col">
                  <div class="page-header-left">
                    <h3>SERVICES</h3>
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

                        <section class="form-row mb-2">
                          <div class="col-sm-2 col-xs-12">
                            <div class="form-group">
                                <div>
                                <select name="length_change" class=" form-control custom-select">
                                      <option value="10">10</option>
                                      <option value="25">25</option>
                                      <option value="50">50</option>
                                      <option value="75">75</option>
                                      <option value="100">100</option>
                                </select>
                              </div>
                            </div>
                          

                          </div>
                          <div class="col-sm-7 col-xs-12">
                             <div class="form-row">
                               <div class="col-sm-4 col-xs-12">
                                 <div class="form-group">
                                      <select class="form-control custom-select" v-model="service_status" @change="changeStatus">
                                        <option value="all">All services</option>
                                        <option value="0">Pending  services</option>
                                        <option value="1">Done services</option>
                                      </select>
                                 </div>
                               </div>
                               <div class=" col-xs-6">
                                  <div class="form-row">
                                    <div class="col-xs-12">
                                      <button @click="today" type="button" class="btn btn-outline-primary btn-block">Today</button>
                                    </div>
                                  </div>
                               </div>
                               <div class="col-xs-6">
                                <div class="form-row">
                                    <div class="col-xs-12">
                                      <button @click="reset" type="button" class="btn btn-light active btn-block">Reset</button>
                                    </div>
                                </div>
                               </div>
                             </div>
                              
                          </div>
                          <div class="col-sm-3 col-xs-12 d-none d-sm-block">
                             <div class="form-group">
                                <input type=search class="form-control" placeholder="Search..." autocomplete="off"> 
                             </div>
                          </div>

                            
                            
                        </section>
                         <b-overlay :show="is_loaded" rounded="sm">
                          <table class="table table-striped"  id="service-table">
                            <tbody>

                              <template v-if="filterList">
                                  <tr v-for="(service, index) in filterList" :key="index">
                                <td>
                                  <div>
                                     <strong class="text-primary">{{service.account }}</strong>
                                  </div>
                                  <div><i class="fa fa-map-marker"></i> {{ service.address }}</div>
                                  <div>
                                    <i class="fa fa-calendar text-dark"></i>
                                    {{ service.start_date | moment("DD-MMM-YYYY") }}
                                  </div>
                                  <div>
                                    <i class="fa fa-clock"></i>
                                     {{ service.start_date | moment("hh:mm A") }} - {{ service.end_date | moment("hh:mm A") }}
                                  </div>
                                  <div>
                                    <i class="fa fa-info m-r-5"></i>
                                    <span 
                                    class="label"
                                    :class="{
                                      'label-danger': service.startTimeByTL === null,
                                      'label-warning': service.startTimeByTL === null && service.endTimeByTL !== null,
                                      'label-success': service.startTimeByTL !== null && service.endTimeByTL !== null,
                                    }"
                                    >
                                    {{ getTimeStatusName(service) }}
                                    </span>
 
                                  </div>
                                  <div>
                                    <i class="fa fa-user text-dark"></i> {{ hasTechnician(service) }}
                                  </div>
                                  <section class="row m-l-5">
                                    <div class="col-xs m-r-5">
                                      <span class="badge badge-pill" :class="[ service.checklist ? 'badge-success': 'badge-info' ]">{{ service.checklist ? 'Done' : 'Pending' }}</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span v-if="service.service_days == 'Multiple'" class="badge badge-pill badge-danger">Part: {{ service.part_no }}</span>
                                    </div>
                                  </section>
                               
                                
                                 
                                </td>
                                <!-- <td>
                                
                                <div class="clearfix">
                                  <div class="float-right">
                                    {{ service.start_date | moment("DD-MMM-YYYY") }}
                                    {{ service.start_date | moment("hh:mm A") }}-{{ service.end_date | moment("hh:mm A") }}
                                </div>
                                <div>
                                  
                                </div>
                                </div>
                                </td> -->
                                <td class="no-wrap">
                                  
                                  <div class="btn-group dropright rounded" role="group" >
                                        <button class="btn btn-outline-primary rounded btn-pill" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-bars"></i></button>
                                        <div class="dropdown-menu">
                                            <!-- <a class="dropdown-item" href="javascript:void(0)">Actions</a>
                                            <div class="dropdown-divider"></div> -->

                                            <router-link class="dropdown-item" :to="{
                                              name: 'service.service_sheet.show',
                                              params:{ id: service.id }
                                              }">
                                               Service Sheet
                                            </router-link>
                                            
                                            <template  v-if="service.startTimeByTL === null || service.endTimeByTL === null">
                                                <div class="dropdown-divider"></div>
                                                <button 
                                               
                                                @click="getselectedService(service)" 
                                                v-b-modal.service-timer-modal class="dropdown-item">
                                                  {{getTimeStatusBtn(service)}}
                                                </button>
                                            </template>
                                          

                                            <div class="dropdown-divider"></div>

                                            <router-link class="dropdown-item" :to="{
                                              name: 'service.checklist.show',
                                              params:{ id: service.id }
                                              }">
                                              Service Checklist
                                            </router-link>

                                             <div class="dropdown-divider"></div>

                                             <router-link
                                              v-if="service.checklist == 1"
                                              class="dropdown-item" :to="{
                                              name: 'service.report.show',
                                              params:{ id: service.id }
                                              }">
                                              Service Report
                                            </router-link> 

                                             <router-link
                                              v-if="service.checklist == 1"
                                              class="dropdown-item" :to="{
                                              name: 'service.report.edit',
                                              params:{ id: service.id }
                                              }">
                                              Edit Service Report 
                                            </router-link> 

                                            <router-link 
                                              v-if="service.checklist == 0"
                                              class="dropdown-item" :to="{
                                              name: 'service.report.create',
                                              params:{ id: service.id }
                                              }">
                                              Create Service Report
                                            </router-link>

                                             <div class="dropdown-divider"></div>

                                            <router-link class="dropdown-item" v-if="showTeamRating(service)"
                                            :to="{name: 'service.team_rating.create', params:{id: service.id} }">
                                            <i class="fa fa-file-text-o"></i> 
                                            Team Rating
                                            </router-link>

                                            <!-- <router-link class="dropdown-item" :to="{
                                              name: 'service.service_sheet.show',
                                              params:{ id: service.id }
                                              }">
                                              Mark Location
                                            </router-link> -->

                                            

  
                                         


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
                        <section class="m-t-5 float-right">
                           
                           <b-pagination
                           @change="changePage"
                           aria-controls="service-table"
                           v-model="services.current_page"
                           :total-rows="services.total"
                           :per-page="services.per_page"
                           size="md"
                           pills
                           first-number
                           />

                        </section>

                        <service-timer :service="selected_service" @submit-service-time="submitServiceTime"></service-timer>

                         </b-overlay>

                  </div>
               </div>
               
              </div>
            
          
            </div>
          </div>
          <!-- Container-fluid Ends-->
        </div>


</template>

<script>
import axios from 'axios';
import moment from 'moment';
import ServiceTimer from '@/components/ServiceTimer'

export default {
   name: 'Services',
   
   components:{
     ServiceTimer
   },

   data(){
     return {
       time_status: null,
       selected_service: {},
       show_top: true,
       services: {
         total: null,
         per_page: 10,
         page_number: 0,
         data: []
       },
       is_loaded: false,
       service_status:  localStorage.getItem('service_status') === null ? 0 : localStorage.getItem('service_status'),
       params:{
         api_token: this.$store.getters['auth/token'],
         perPage: null,
         showToday: 'No'
       }
     }
   },

   computed:{
     filterList(){
         if(this.service_status == 'all') return this.services.data;
        //  return this.services.data[0].checklist
        return this.services.data.filter((v)=>{
           if(this.service_status == v.checklist) return v;
        });
      }
   },

   methods:{
     getTimeStatusBtn(service){
       if(service.startTimeByTL === null){ return 'Service Start'}
       if(service.startTimeByTL !== null && service.endTimeByTL === null){ return 'End Start'}
     },

     getTimeStatusName(service){
       if(service.startTimeByTL === null){ return 'Not Started!'}
       if(service.startTimeByTL === null && service.endTimeByTL !== null){ return 'Ongoing'}
       if(service.startTimeByTL !== null && service.endTimeByTL !== null){ return 'Perfomed'}
     },
  
     submitServiceTime(form){
       console.log(form);
     },

     getselectedService(service){
       this.selected_service = service;
     },


     reset(){
        this.params.showToday = 'No';
        this.getServices(this.services.per_page, this.services.page_number);
        this.service_status = 0;
        localStorage.setItem('service_status', this.service_status)
     },

     showTeamRating(service){
       let start_date = moment(service.start_date).format('DD-MM-YYYY');
       let last_service_date = moment(service.last_service_date).format('DD-MM-YYYY');

       if(service.with_team_rating == 'Yes'){
         return false;
       }

       if(service.service_days == 'Multiple'){
            return last_service_date == start_date ? true: false;
       }

     return true;

     },

     today(){
       this.params.showToday = 'Yes';
       this.getServices(this.services.per_page, this.services.page_number);
     },

     changePage(page){
      this.getServices(this.services.per_page, page);
     },

     changeStatus(){
         if(localStorage.getItem('service_status') !== null){
            localStorage.removeItem('service_status')
         }
         
         localStorage.setItem('service_status', this.service_status)
      },

     hasTechnician(service){
        return !service.technician ? 'Unassigned': service.technician;
     },

     async getServices(per_page, page_number){
       
       this.is_loaded = true;
       this.params.perPage = per_page;

       await this.$axios({
         url:`${process.env.VUE_APP_BASE_URL}/services?page=${page_number}`, 
         params: this.params
        })
       .then((response)=>{this.services = response.data; })
       .catch((e)=>{ console.log(e);})
       .finally(()=>{ this.is_loaded = false; });
     }
   },

   mounted(){
     this.getServices(this.services.per_page, this.services.page_number);
   }
}
</script>