<template>
<div class="page-body">
   <div class="container-fluid">
      <div class="page-header">
         <div class="row">
            <div class="col col-sm-6 col-xs-6">
               <div class="page-header-left">
                  <h3>Service Checklist</h3>
               </div>
            </div>

            <div class="col col-sm-6 col-xs-6">
               <div class="bookmark float-right">

                  <router-link to="/service" class="btn btn-sm btn-light active btn-pill">
                     <i class="fa fa-arrow-left"></i>
                     Back
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
            <client-info :client="service.account" :property="service.property"></client-info>

             <section class="card">
                   <div class="card-header b-l-primary border-3 p-t-10 p-b-10">
                     <h5 class="card-title">SERVICE DETAILS</h5>
                  </div>
                  <div class="card-body">
                        <section class="d-flex justify-content-between m-b-5">
                            <div><i class="fa fa-user fa-circle-o fa-2x circle-icon m-r-15"></i> {{ service.service_type }}</div>
                             <div class="text-right">{{ service.service_start_date |   moment("ddd MMM DD, YYYY") }} <br>  
                             {{ service.service_start_date | moment("hh:mm A") }} - {{ service.service_end_date | moment("hh:mm A") }}
                             </div>
                        </section>
                        <section class="d-flex justify-content-between m-b-5">
                            <div><i class="fa fa-user fa-user fa-2x circle-icon m-r-15"></i>{{ service.driver ? service.driver : 'No Techician' }}</div>
                            
                        </section>
                     
                        <div> <i class="fa fa-wrench fa-2x circle-icon m-r-15"></i> {{ technicianCount }}</div>
                  </div>
                  <div class="card-footer">
                     

                    
                  </div>
               </section>
               <b-card v-if="service.allocated_members">
                  <technician v-for="(technician, index) in service.allocated_members" :item="technician" :key="index"></technician>
               </b-card>

         

          

            <template v-if="locations">
               <div class="card card-absolute m-t-30 border" v-for="(location, index) in locations" :key="index">
                  <div class="card-header bg-primary p-t-10 p-b-10">
                     <h5>{{ location.location_type }} 
                        <!-- <small>({{ location.name }})</sm2all> -->
                        </h5>
                        
                  </div>
                  <div class="card-body">

                     <!-- <template v-if="added_technicians">
                       <span v-for="(technician, index) in added_technicians" :key="index"  class="badge badge-pill m-r-5 badge-primary">{{ technician.name }}</span>
                       
                     </template> -->
                     
                     <template v-if="location.items">
                        <table class="table">
                           <tbody>
                              <tr v-for="(item, index) in location.items"  :key="index">
                                 <template v-if="item.item_id != null">
                                    <td>
                                       <div> 
                                        <b-badge variant="dark" pill class="m-r-5"> {{ item.quantity }}</b-badge>   
                                        <strong>{{ item.name }} </strong>
                                    </div>
                                    <div>
                                        <b-badge variant="info" pill>{{ item.size }}</b-badge>
                                        <b-badge variant="info" pill>{{ item.texture_type }}</b-badge><br>
                                    </div>
                                    <div class="form-group m-b-0 m-t-15">

                                       <select v-model="item.isCleaned" class="form-control form-control-sm custom-select custom-select-sm">
                                          <option selected disabled value="null">Select Status</option>
                                          <template v-if="options">
                                             <option v-for="(option, index) in options" :value="option.value" :key="index">{{ option.value }}</option>
                                          </template>
                                       </select>

                                    </div>
                                 </td>
                                 <td class="no-wrap">
                                    <template v-if="item.technicians.length > 0">
                                       <span class="btn btn-xs btn-warning btn-pill m-r-5" >ARUN</span> 
                                       <span class="btn btn-xs btn-warning btn-pill m-r-5" >ARUN</span> 
                                    </template>
                                    
                                     <button v-if="!item.remarks"  type="button" class="btn btn-sm btn-primary btn-pill" @click="showModal(item)"><i class="fa fa-comment"></i></button> 
                                     <button v-else type="button" class="btn btn-sm btn-success btn-pill" @click="showModal(item)"><i class="fa fa-comment"></i></button> 

                                        <b-modal :id="`comment_${item.item_id}`" scrollable centered no-close-on-backdrop :title="modal_title"> 
                                          <div class="form-group">
                                                <label for="">Comment <span class="text-danger">*</span></label>
                                                <textarea v-model="item.remarks" class="form-control" rowspan="6"></textarea>
                                          </div>
                                       </b-modal> 
                                 </td>


                                 </template>
                                 
                              </tr> 
                           </tbody>
                        </table>
                       
                     </template>


                     
                     
                     <template v-else> 
                        <div class="text-muted text-center m-t-10 m-b-10">
                        No item added in the {{ location.location_type }}.
                        </div>
                     </template>

                       <div class="form-group">
                            <textarea v-model="location.tl_comments" class="form-control" rowspan="2" placeholder="Type your comments here..."></textarea>
                        </div>
                        <div class="form-group">
                            <button v-if="!location.tl_completed" @click="submit(location)" class="btn btn-sm btn-primary btn-pill pull-right" type="button">Submit</button>
                            <button v-if="location.tl_completed" disabled  class="btn btn-sm btn-success btn-pill pull-right" type="button">Completed</button>
                        </div>

                  </div>
               </div>
            </template>
          
                        

         </div>
      </div>
   </div>

 

</div>

</template>

<script>
import ClientInfo from '@/components/ClientInfo';
import Technician from '@/components/Technician'
import Draggable from 'vuedraggable'
export default {
   name: 'service_show',
   components: {
      ClientInfo,
      Technician,
      // Draggable
   },

   data() {
      return {
         form:{
            general_comments: null,
            object_comments: [],
            object_answer:[],
            object_id:[],
            slid: null,
            id: null,
         },
         
         locations: [],

          modalShow: false,
          modal_title: null,

         technicians:[
            {name: 'Arun', id: 1},
            {name: 'kosala', id: 2},
            {name: 'Akbar', id: 3},
         ],
         option: '',
         options:[
            {value: 'Steam Deep Cleaned & Disinfected'},
            {value: 'Deep Cleaned & Disinfected'},
            {value: 'Pending'},
         ],

         temp:[],



         added_technicians:[],

         loading: false,
         account:{},
         property:{},
         url: process.env.VUE_APP_BASE_URL,
         token: this.$store.getters['auth/token'],
         service_id: this.$route.params.id,
         service:{
            locations:[{
               objects:[
                  {comments: null, id: null, location_id: null, name: null, quantity: null, size: null, texture_type: null, technicians:[]}
               ]
            }],
            property:{},
            account:{}
         },

      }
   },

    computed:{
      technicianCount(){
         return this.service.allocated_members == null ?  'No technician' : `${this.service.allocated_members.length} Techinician`;
      }
   },

   methods:{
   
         submit(location){ 
            this.bootbox.confirm(`Are you sure you want to save the changes from the ${location.location_type}?`, result=>{
               if(result){

                  this.getSubmit(location);
                  console.log(this.form );

                  this.$axios({
                     url: `${this.url}/services/hygienization/service-checklist/store`,
                     data: this.form,
                     method: 'post'
                  })
                  .then(res=> res.data)
                  .then(res=>{
                  
                     if(res.code == 200){
                        this.$store.dispatch('notification/addNotification',{
                           type: 'success',
                           message: `${location.location_type} has been checked successfully.`
                        })
                     }
                  })
                  .catch(e=>{
                     this.$store.dispatch('notification/addNotification',{
                           type: 'danger',
                           message: e.message
                        })
                  })

               }
            })
         },

         getSubmit(location){

            this.form.id = this.service_id;
            this.form.api_token =  this.token;
            this.form.slid = location.service_location_id,
            this.form.general_comments = location.tl_comments;

            // get the answer
            if(Object.keys(location).includes('items')){
                location.items.forEach((v, i)=>{
                  if(v.item_id != null){
                     this.form.object_answer.push(v.isCleaned);
                     this.form.object_comments.push(v.remarks);
                     this.form.object_id.push(v.item_id);
                  }
               });

            }
           
         },

       showModal(item){
            this.$bvModal.show(`comment_${item.item_id}`)
            // this.modalShow = true
            this.modal_title = `${item.name} - Comment`
       },

      added(e){
         let technician = e.added.element
         this.added_technicians.push(technician);
      },
   
   },

   created(){
      this.$axios({
         url: `${this.url}/services/servicesheet/${this.service_id}?api_token=${this.token}`,
      })
      .then(res=>res.data)
      .then(res=>{
         if(res.code == 200){
            this.service = res.data
         }
      })
      .finally(()=>{
         this.service.locations.forEach((v, i)=>{

            this.locations.push({
               service_location_id: v.service_location_id,
               location_type: v.location_type,
               tl_completed: Object.keys(v).includes('tl_completed') ? v.tl_completed :null,
               tl_comments: Object.keys(v).includes('tl_comments') ? v.tl_comments :null,
               
               items:[
                  {object_comments: null,item_id: null, answers: null, size: null, quantity: null, technicians: [] }    
               ],
               });

            if(v.objects.length > 0){
               v.objects.forEach((item, i2)=>{
             
                  this.locations[i].items.push({
                     isCleaned: Object.keys(item).includes('isCleaned') ? item.isCleaned :null,
                     remarks: Object.keys(item).includes('remarks') ? item.remarks :null,
                     item_id: item.id, 
                     answer: null, size: item.size,
                      quantity: item.quantity,
                       name: item.name, 
                       texture_type: item.texture_type,
                        technicians: [] 
                     });
                        if(v.meta != null){
                        if(Object.keys(item.meta).length > 0){
                           item.meta.technicians.forEach((t, i3)=>{
                              this.locations[i].items[i2].technicians.push(t);
                           });
                        }
                     }
               });
            }
            else{
             delete this.locations[i].items
            }
         });
      });
   }
}
</script>

<style scoped>
   div.sticky {
   position: -webkit-sticky; /* Safari */
   position: sticky;
   top: 0;
   }
</style>
