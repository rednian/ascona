<template>
<div class="page-body">
   <div class="container-fluid">
      <div class="page-header">
         <div class="row">
            <div class="col col-sm-12 col-xs-12">
               <div class="page-header-left float-left">
                  <h3 style="display: inline-block">Team Rating</h3>
               </div>
               <div class="page-header-right clearfix">
                  <button @click="cancel" type="button" class="btn btn-sm btn-light float-right active btn-pill">Back</button>
               </div>
            </div>

            <!-- <div class="col col-sm-6 col-xs-6 clearfix">
               <div class="bookmark float-right">
                 

               </div>
            </div> -->
         </div>

      </div>
   </div>
   <!-- Container-fluid starts-->
   <div class="container-fluid">
      <b-overlay :show="loading" rounded="sm">
      <div class="row starter-main">
         <!-- <b-button @click="show = !show" class="btn btn-priamary" type="button">Show</b-button>
         <test :show="show"></test> -->
      <div class="col-sm-12">
            <!-- <client-info :client="account" :property="property"></client-info> -->
         <form @submit.prevent="saveRating">
            <section class="card">
               <div class="card-header b-l-primary border p-t-10 p-b-10">
                  <h5 class="card-title">Account Details </h5>
               </div>
               <div class="card-body p-t-10 p-b-10">
                  <section class="row">
                     <div class="col-xs-12" :class="service.account_type_id != 10 ? 'col-sm-6': 'col-sm-12'">
                        <div class="form-group">
                           <label>Name <span class="text-danger">*</span></label>
                           <input required v-model="form.account" type="text" class="form-control" autocomplete="off">
                        </div>
                     </div>
                     <div class="col-sm-6 col-xs-12" v-if="service.account_type_id != 10">
                        <div class="form-group">
                           <label>Contact Person <span class="text-danger">*</span></label>
                           <input v-model="form.contact_person" type="text" class="form-control" autocomplete="off">
                        </div>
                     </div>
                  </section>
                  <section class="row">
                     <div class="col-sm-6 col-xs-12">
                        <div class="form-group">
                           <label>Email <span class="text-danger">*</span></label>
                           <input required v-model="form.contact_email_address" type="text" class="form-control"  autocomplete="off">
                        </div>
                     </div>
                     <div class="col-sm-6 col-xs-12">
                        <div class="form-group">
                           <label>Mobile No. <span class="text-danger">*</span></label>
                           <input required v-model="form.contact_mobile_no" type="text" class="form-control" autocomplete="off" >
                        </div>
                     </div>
                  </section>
                  <section class="form-group">
                     <label>Location</label>
                     <textarea v-model="form.client_address" readonly class="form-control"  rows="3" autocomplete="off"></textarea>
                  </section>
               </div>
            </section>

            <section class="card">
              
                  <div class="card-header b-l-primary border-3 p-t-10 p-b-10">
                     <h5 class="card-title">Service Details</h5>
                  </div>
                  <div class="card-body p-t-10 p-b-10">
                        <section class="row">
                           <div class="col">
                             <div class="form-group">
                                 <label>Service Type</label>
                                 <input v-model="form.service_type" type="text" readonly required autocomplete="off" class="form-control">
                             </div>
                           </div>
                        </section>
                        <section class="row">
                           <div class="col-sm-4 col-xs-12">
                             <div class="form-group">
                                 <label>Start Date</label>
                                 <input v-model="form.service_start_date" readonly  type="date" required autocomplete="off" class="form-control">
                             </div>
                           </div>
                           <div class="col-sm-4 col-xs-12">
                             <div class="form-group">
                                 <label>End Date <span class="text-danger">*</span></label>
                                 <input v-model="form.service_end_date" type="date"  autocomplete="off" class="form-control" readonly>
                             </div>
                           </div>
                           <div class="col-sm-4 col-xs-12">
                              <div class="form-group">
                                 <label>Start & End Time <span class="text-danger">*</span></label>
                                 <input v-model="form.time"  type="text" autocomplete="off" class="form-control" readonly>
                              </div>
                           </div>
                        </section>
                        <section class="row">
                           <div class="col">
                              <div class="fom-group">
                                 <label>Team Leader</label>
                                 <input v-model="form.team_leader" type="text" required readonly autocomplete="off" class="form-control">
                              </div>
                           </div>
                        </section>
                       
                  </div>
                  <div class="card-footer clearfix">
                     <div class="float-right">
                           <button type="submit" class="btn btn-primary btn-pill m-r-5" :disabled="is_saving">{{ text }}</button>
                           <button @click="cancel" type="button" class="btn btn-light active btn-pill" >Cancel</button>
                     </div>
                  </div>
            </section>
         </form>
         </div>
      </div>
      </b-overlay>
   </div>
</div>
</template>

<script>
import ClientInfo from '@/components/ClientInfo';
import {mapGetters} from 'vuex';
import Test from '@/components/Test.vue'
import axios from 'axios';
import moment from 'moment';

export default {
   name: 'teamRating',
   components: {
      // ClientInfo,
      // Test
   },

   data() {
      return {
         loading:false,
         url: process.env.VUE_APP_BASE_URL,
         id: this.$route.params.id,
         token: this.$store.getters['auth/token'],
         text: 'Save',
         is_saving: false,
         service:{},
         
         show: false,
         form:{
            account: null,
            contact_person: null,
            contact_email_address: null,
            contact_mobile_no: null,
            client_address: null,
            service_type: null,
            team_leader: null,
            service_end_date: null,
            service_start_date: null,
            time: null,
         }
      }
   },

   created(){
      this.loading = true;
         this.$axios({
            url: `${this.url}/team-rating/service/${this.id}/Hygienization/create?api_token=${this.token}`,
         })
         .then(res=>res.data)
         .then(res=>{
            if(res.code == 200){
                this.service = res.data.servicesheet;

               this.form.account = this.service.account;
               this.form.contact_person = this.service.contact_person;
               this.form.contact_email_address = this.service.contact_email_address;
               this.form.contact_mobile_no = this.service.contact_mobile_no;
               this.form.client_address = this.service.client_address;
               this.form.service_type = this.service.service_type;
               this.form.team_leader = this.service.team_leader;

               this.form.service_start_date = moment(this.service.service_start_date).format('YYYY-MM-DD');
               this.form.service_end_date = moment(this.service.service_end_date).format('YYYY-MM-DD');

               let start_time =  moment(this.service.service_start_date).format('HH:mm A');
               let end_time =  moment(this.service.service_end_date).format('HH:mm A');

               this.form.time = `${start_time} - ${end_time}`;
            }
         })
         .catch(e=>{
            this.$store.dispatch('notification/addNotification',{
               message: e.message,
               type: 'danger'
            });
         })
         .finally(()=>{
            this.loading = false;
         })


   },


   methods: {

      cancel(){
         this.$router.push({name: 'service.index'})
      },

      saveRating(){

   

         this.bootbox.confirm('Are you sure you want to save the Team Rating?<br> Please click <code>OK</code> to confirm.', (result)=>{

            if(result){

                this.text = 'Saving...';
               this.is_saving = true;


               let service_form = {
                  api_token: this.token,
                  id: this.service.id,
                  service_id: this.service.service_id,
                  service_type: this.service.service_type,
                  mobile_no: this.form.contact_mobile_no,
                  email_address: this.form.contact_email_address,
                  send_to: this.service.account_type_id == 10 ? this.form.account : this.form.contact_person
               }

               this.$axios({
                  url: `${this.url}/team-rating/service/store`,
                  method:'post',
                  data: service_form
               })
               .then(res=>{
                  if(res.status == 200){
                     
                     this.$store.dispatch('notification/addNotification',{
                        message: 'Service rating has been saved successfully.',
                        type: 'success'
                     });
                     this.$router.push({name: 'service.index'});
                  }
               })
               .catch(e=>{
                  
                  this.$store.dispatch('notification/addNotification',{
                     message: e.message,
                     type: 'danger'
                  });

               })
               .finally(()=>{
                  this.text = 'Save';
                  this.is_saving = false;
               });

            }

         });

        

      }
   },

}
</script>