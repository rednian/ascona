<template>
<div class="page-body">
   <div class="container-fluid">
      <div class="page-header">
         <div class="row">
            <div class="col col-sm-6 col-xs-6">
               <div class="page-header-left">
                  <h3>Service Report</h3>
               </div>
            </div>

            <div class="col col-sm-6 col-xs-6">
               <div class="bookmark float-right">

                  <button @click="cancel" type="button" class="btn btn-light active btn-pill">
                     Back
                  </button>

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
                        <h5 class="card-title"> {{ location.location_type }}</h5>
                     </div>
                     <div class="card-body p-t-20 p-b-10">
                        
                        <template v-if="location.objects">
                          
                           <table class="table table-striped">
                              
                              <tbody>
                              <template v-if="location.objects">
                                 <tr v-for="object in location.objects" :key="object.id">
                                    <td width="50%">
                                       <div><strong class="font-weight-bold ">{{ object.name }}</strong></div>
                                       <div style="text-indent: 2%">{{ object.size }}</div>
                                       <div style="text-indent: 2%">{{ object.texture_type }}</div>
                                    </td>
                                    <td class="no-wrap" align="left">

                                       <div class="animate-chk" v-if="options">
                                          <div class="row">
                                                <div class="col">
                                                   <label v-for="(option, index) in options" class="d-block" :name="`name_${object.id}`" :for="`id-${object.id}-${index}`" :key="index">
                                                       <input  
                                                       @change="getAnswer(object, $event, index)"  
                                                       :value="option.value" 
                                                       class="radio_animated" 
                                                       :name="`name_${object.id}`" 
                                                       :checked="option.value == object.status ? true: false"
                                                       :id="`id-${object.id}-${index}`" type="radio" >
                                                      {{ option.value }} 
                                                   </label>

                                                </div>
                                          </div>
                                       </div>

                                       <!-- <div class="media-body text-right switch-lg icon-state switch-outline">
                                       <label class="switch">
                                          <input data-on="okay" data-off="off" @change="getAnswer(object, $event)" type="checkbox" data-original-title="asdfghj" title="tyujkwer">
                                             <span class="switch-state bg-primary"></span>
                                       </label>
                                    </div> -->

                                    </td>
                                 </tr>
                              </template>
                           </tbody>
                        </table>

                        </template>
                      <!-- deep clean hygienization & steam deep clean -->
                     </div>
                  </section>
               </template>
               <div class="card" v-if="message">
                  <div class="card-body">
                     <div class="alert alert-danger outline dark alert-dismissible fade show" role="alert"><strong>Opps!</strong>
                  <p>{{ message }}</p>
                  <button class="close" type="button" data-dismiss="alert" aria-label="Close" data-original-title="" title=""><span aria-hidden="true">×</span></button>
               </div>
             
                  </div>
               </div>

               
               


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
<!-- 
               <div class="form-group clearfix">
                  <div class="float-right">
                     <button type="submit" :disabled="btn_is_save" class="btn btn-pill btn-primary m-r-5">{{ btn_save }}</button>
                     <button @click="cancel" type="button" class="btn btn-pill btn-light active">Cancel</button>
                  </div>
               </div> -->
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
         service_option: [],
         message: null,
         
         account:{
            client:{},
            property: {}
         },

         service:{
            locations:[]
         },

         options:[
            { value: 'Steam Deep Cleaned & Disinfected', selected: false, },
            { value: 'Deep Cleaned & Disinfected',selected: false,},
            { value: 'Pending', selected: false,}
         ],

         payment_types:[],
         payment_status:[],
         
         form:{
            object_id:[],
            object_answer: [],
            account: null,
            account_type_id: null,
            servicesheet_id: null,
            payment_method: null,
            payment_status: null,
            amount_received: null,
            net_amount: null,
            technician_count: null,
            comments: null,
            start_time: null,
            end_time: null,
         },

         temps: [],
         
         has_empty: false,

         errors:[],

      }
   },

   watch: {
      // has_empty(newVal, old){
      //    console.log(newVal, old);
      //    // if(old != newVal){
      //    //    this.btn_is_save = true
      //    // }
      // }
   },

   methods: {

      cancel(){
         this.$router.push({name: 'service.index'});
      },

      selectText(e){
         e.target.setSelectionRange(0, this.form.amount_received);
      },

      getAnswer(obj, e, index){

         let object =  this.temps.filter(v=> v.id == obj.id );

         object[0].answer = e.target.value;

        

      },

      submitService(){

      
          this.form.object_answer = [];

          if(this.temps.length > 0){
                  this.temps.forEach(v=>{
                     this.form.object_answer.push(v.answer);
               });
            }

   

             this.has_empty = this.form.object_answer.includes(null) ? true : false;

             if(this.has_empty){
                
                this.message = `Looks like one of the items above is not selected. Please choose Steam deep cleaned or deep cleaned disinfected to continue `;
                return;
             }

            

          

         this.bootbox.confirm('Are you sure you want to save the service report?', (result)=>{
            if(result){
                
               this.btn_save = 'Saving...';
               this.btn_is_save = true;

               this.form.api_token = this.token;
               this.form.id = this.service_id;
               
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

                      this.$store.dispatch('notification/addNotification', {
                         message: 'Service report has been saved successfully.',
                         type: 'success'
                      });

                  }
               })
               .catch(e=>{
                   this.btn_save = 'Save';
                  this.btn_is_save = false;
            
                  this.$store.dispatch('notification/addNotification', {
                     message: e.message,
                     type: 'danger'
                  });

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

               this.payment_types = response.data.paymentType;

               this.payment_status = response.data.paymentStatus;

               // console.log(response.data.paymentType);

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
                        this.temps.push({id: object.id, answer: null, type: location.location_type, location_id: location.id, object_name: object.name });

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