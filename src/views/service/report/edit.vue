<template>
<div class="page-body">
   <div class="container-fluid">
      <div class="page-header">
         <div class="row">
            <div class="col col-sm-6 col-xs-6">
               <div class="page-header-left">
                  <h3>Service Report - Edit</h3>
               </div>
            </div>

            <div class="col col-sm-6 col-xs-6">
               <div class="bookmark float-right">

                  <button @click="cancel" type="button" class="btn btn-light active btn-pill m-r-5">
                     <i class="fa fa-list"></i>
                  </button>
                  <router-link :to="{name: 'service.report.show', params:{ id: this.$route.params.id } }" class="btn btn-outline-primary btn-pill">
                     View details
                  </router-link>

               </div>
            </div>
         </div>

      </div>
   </div>
   <!-- Container-fluid starts-->
   <div class="container-fluid">
      <div class="row starter-main">
         <div class="col-sm-12">
            <client-info :client="account.client" :property="account.property"></client-info>
            
            <form method="post" @submit.prevent="submitService">
               <section class="card">
                  <div class="card-header b-l-primary border-3 p-t-10 p-b-10">
                     <h5 class="card-title">WORK COMPLETION DETAILS</h5>
                  </div>
                  <div class="card-body p-t-10 p-b-10">

                         <section class="row">
                           <div class="col-sm-6 col-xs-12">
                              <div class="form-group">
                                 <label class="font-weight-bold">Service Type</label>
                                 <input :value="service.service_type" type="text" autocomplete="off" class="form-control" readonly>
                              </div>
                           </div>
                           
                           <div class="col-sm-6 col-xs-12">
                              <div class="form-group form-group-xs">
                                 <label class="font-weight-bold">Technicians <span class="text-danger">*</span></label>
                                 <input type="number" v-model="form.technician_count" class="form-control" autocomplete="off" required>
                              </div>
                           </div>
                           
                        </section>
                       
                        
                        <section class="row">
                           
                            <div class="col-sm-6 col-xs-12">
                              <div class="form-group form-group-xs">
                                 <label class="font-weight-bold">Service Start Date</label>
                                 <input type="date" :value="service.service_start_date | formatDate" class="form-control" autocomplete="off" readonly>
                              </div>
                           </div>

                           <div class="col-sm-3 col-xs-6">
                              <div class="form-group form-group-xs">
                                 <label class="font-weight-bold">Time Start <span class="text-danger">*</span></label>
                                 <input type="time" :value="form.start_time " class="form-control" autocomplete="off">
                              </div>
                           </div>

                           <div class="col-sm-3 col-xs-6">
                              <div class="form-group form-group-xs">
                                 <label class="font-weight-bold">Time End <span class="text-danger">*</span></label>
                                 <input type="time" :value="form.end_time " class="form-control" autocomplete="off">
                              </div>
                           </div>
                          
                        </section>

                    

                      
                        
                  </div>
               </section>

               <template v-if="service.locations">
                  <section class="card card-absolute m-t-30 border" v-for="location in service.locations" :key="location.id">
                     <div class="card-header bg-primary p-t-10 p-b-10">
                        <h5 class="card-title"> {{ location.name }}</h5>
                     </div>
                     <div class="card-body p-t-10 p-b-10">
                        
                        <template v-if="location.objects">
                           <table class="table table-striped ">
                              <tbody>
                              <template v-if="location.objects">
                                    <tr v-for="object in location.objects" :key="object.id">
                                       <td>{{ object.name }}</td>
                                       <td>{{ object.size }}</td>
                                       <td>{{ object.texture_type }}</td>
                                       <td class="no-wrap" align="right">

                                        <div class="media-body text-right switch-lg icon-state switch-outline">
                                          <label class="switch">
                                                <input @change="getAnswer(object, $event)" type="checkbox" data-original-title="" title=""><span class="switch-state bg-primary"></span>
                                          </label>
                                       </div>

                                       </td>
                                    </tr>
                              </template>
                           </tbody>
                        </table>

                        </template>
                      
                       
                     </div>
                  </section>
               </template>
             

               <section class="card">
                  <div class="card-header b-l-primary border-3 p-t-10 p-b-10">
                     <h5 class="card-title">PAYMENT</h5>
                  </div>
                  <div class="card-body p-t-10 p-b-10">
                       <section class="row">
                           <div class="col-sm-6 col-xs-12">
                              <div class="form-group form-group-xs">
                                 <label class="font-weight-bold">Payment Type<span class="text-danger">*</span></label>
                                 <select  required  v-model="form.payment_type" class="form-control custom-select">
                                    <option :value="null" disabled selected >Select payment type</option>
                                    <template v-if="payment_types">
                                       <option v-for="(type, index) in payment_types" :value="type" :key="index">{{ type }}</option>
                                    </template>
                                 </select>
                              </div>
                           </div>
                           <div class="col-sm-6 col-xs-12">
                              <div class="form-group form-group-xs">
                                 <label class="font-weight-bold">Service Amount (AED)</label>
                                 <input type="text"  class="form-control" autocomplete="off" readonly v-model="form.net_amount">
                              </div>
                           </div>
                        </section>

                        <div class="form-group">
                           <label class="font-weight-bold">Received Amount (AED) <span class="text-danger">*</span></label>
                           <input required type="number" autocomplete="off" class="form-control form-control-lg" v-model="form.amount_received">
                        </div>
                       
                  </div>
               </section>

               <section class="card">
                  <div class="card-header b-l-primary border-3 p-t-10 p-b-10">
                     <h5 class="card-title">GENERAL COMMENTS</h5>
                  </div>
                  <div class="card-body p-t-10 p-b-10">
                      <div class="form-group">
                           <textarea rows="3" class="form-control" v-model="form.comments" autocomplete="off"></textarea>
                     </div>
                  </div>
               </section>

               <div class="form-group clearfix">
                  <div class="float-right">
                     <button type="submit" :disabled="btn_is_save" class="btn btn-pill btn-primary m-r-5">{{ btn_save }}</button>
                     <button @click="cancel" type="button" class="btn btn-pill btn-light active">Cancel</button>
                  </div>
               </div>
            </form>

         </div>
      </div>
   </div>
</div>
</template>

<script>
import ClientInfo from '@/components/ClientInfo';
import {mapGetters} from 'vuex';
import axios from 'axios';
import moment from 'moment';

export default {
   name: 'serviceReport',
   components: {
      ClientInfo,
   },

   data() {
      return {
         btn_save: 'Save',
         btn_is_save: false,
         url: process.env.VUE_APP_BASE_URL ,
         service_id: this.$route.params.id,
         token: this.$store.getters['auth/token'],
         
         account:{
            client:{},
            property: {}
         },

         service:{
             locations:{}
         },

         payment_types:[
            'Paid',
            'Unpaid',
         ],
         
         form:{
            object_id:[],
            object_answer: [],
            account: null,
            account_type_id: null,
            servicesheet_id: null,
            payment_type: null,
            amount_received: null,
            net_amount: null,
            technician_count: null,
            comments: null,
            start_time: null,
            end_time: null,
         },

         temps: [],

        
      }
   },

   computed: {

   },

   methods: {

      cancel(){
         this.$router.push({name: 'service.index'});
      },

      selectText(e){
         e.target.setSelectionRange(0, this.form.amount_received);
      },

      getAnswer(obj, e){

          let object =  this.temps.filter(v=> v.id == obj.id );

         if(e.target.checked){ object[0].answer = 'Yes'; }
         else{ object[0].answer = 'No'; }
      },

      submitService(){

      
          this.form.object_answer = [];

         this.bootbox.confirm('Are you sure you want to save the service report?', (result)=>{
            if(result){
                
                  this.btn_save = 'Saving...';
                  this.btn_is_save = true;

               this.form.api_token = this.token;
               this.form.id = this.service_id;
               

               if(this.temps.length > 0){
                  this.temps.forEach(v=>{
                     this.form.object_answer.push(v.answer);
                  });
               }

             
         
               this
               .$axios({
                  url: `${this.url}/services/hygienization/service-report/store`,
                  data: this.form,  
                  method:'post',
               })
               .then((response)=>{
                  if(response.data.code === 200){
                      this.btn_save = 'Save';
                      this.btn_is_save = false;
                     this.$router.push({name: 'service.index'});
                  }
               })
               .catch(e=>{
                   this.btn_save = 'Save';
                  this.btn_is_save = false;
                  alert(e.message)
               });
               
            }
            else{
               this.btn_save = 'Save';
               this.btn_is_save = false;
            }
         });

      },

      getService(){
         this
         .$axios({
            url: `${this.url}/services/hygienization/service-report/create/${this.service_id}?api_token=${this.token}`,
            method: 'get'
         })
         .then((response)=>{ return response.data})
         .then((response)=>{

            if(response.code === 200){
               
               this.service = response.data;
               this.account.client = response.data.account
               this.account.property = response.data.property

               this.form.account = response.data.account.name;
               this.form.account_type_id = response.data.account.account_type_id;

               this.form.start_time = moment(response.data.service_start_date).format('HH:mm');
               this.form.end_time =moment( response.data.service_end_date).format('HH:mm');

               this.form.technician_count = response.data.required_technician;
               this.form.servicesheet_id = response.data.id;
               this.form.net_amount = response.data.net_amount;
            
            }
         
         })
         .catch(e=>alert(e.message))
         .finally(()=>{

            if(this.service.locations.length > 0){
               this.service.locations.forEach((location,i)=>{
                  if(location.objects.length > 0){
                     location.objects.forEach((object, k)=>{
                        this.form.object_id.push(object.id);
                        this.temps.push({id: object.id, answer: 'No'});
                     });
                  }
               });
            }
         });     
      }
  

      
   },

   mounted(){
      this.getService();
   }

}
</script>

<style>
   input[type="date"], input[type="time"]
{
    display:block;
  
    /* Solution 1 */
     -webkit-appearance: textfield;
    -moz-appearance: textfield;
    min-height: 1.2em; 
  
    /* Solution 2 */
    /* min-width: 96%; */
}
</style>