<template>
<div class="page-body" @click="closeItem">
   <div class="container-fluid">
      <div class="page-header">
         <div class="row">
            <div class="col col-sm-6 col-xs-6">
               <div class="page-header-left">
                  <h3>CREATE INSPECTION REPORT</h3>
               </div>
            </div>

            <div class="col col-sm-6 col-xs-6">
               <div class="bookmark float-right">
                  <button @click="cancelInspection" type="button" class="btn btn-sm btn-light active btn-pill">Back</button>
               </div>
            </div>

         </div>

      </div>
   </div>

   <!-- Container-fluid starts-->
   <b-overlay :show="isLoading" rounded="sm" style="width:100%">
      <section class="container-fluid"  @click="closeArea">
         <div class="row starter-main">
            <div class="col-sm-12">

               <client-info 
               :client="details.account" 
               :property="details.property"
               >
               </client-info>

               <draggable 
                  :list="temp" 
                  group="family" 
                  @add="showModalAddArea" 
                  @end="showAddArea" 
                  @change="familyMove"
                  draggable="false"
                  v-if="is_area_start_drag"
                  >

                  <b-card 
                  class="card border drag " 
                  style="height: 150px"
                  :class="[ dropBackground ? 'bg-drop' : null]"
                  >
                     <slot name="body">
                        <h5 class="text-center m-t-40">Drop the family here...</h5>
                     </slot>
                  </b-card>

               </draggable>
         
               <template v-if="is_area_start_drag == false">

                  <template v-for="(item, index) in filteredItem">

                  <template >
                
                  <div  class="card card-absolute m-t-30 border"  :key="index">
                     <div class="card-header bg-primary p-t-10 p-b-10">
                           <h5>{{ item.location.name }} <small>({{ item.location.location_type }})</small></h5>
                     </div>
                     <div class="card-body">
                     
                        <table class="table table-striped" v-if="!is_object_start_drag">
                           <thead>
                              <th>Item</th>
                              <th>Qty</th>
                              <th>Size</th>
                              <th>Texture</th>
                              <th></th>
                           </thead> 
                           <tbody >
                              <template v-for="(obj, index2) in object_items" >
                                 <tr v-if="obj.location_id == item.location.id" :key="index2" >
                                 <td>{{ obj.name }}</td>
                                 <td>{{ obj.quantity }}</td>
                                 <td>{{ obj.size }}</td>
                                 <td>{{ obj.texture_type }}</td>
                                 <td>
                                    <a @click="editItem(obj, index2, item)" href="javascript:void(0)">Edit</a> | 
                                    <a @click="deleteItem(obj, index, index2)" href="javascript:void(0)">Delete</a>
                                 </td>
                              </tr>
                              </template>
                           
                           </tbody>
                        </table>

                      
                        <draggable v-if="is_object_start_drag" :list="temp_objects" group="item2" @add="showModalAddObject(item)">
                           <b-card class="card card-absolute border drag">
                              <slot name="body" style="height: 100px">
                                 <h5 class="text-center">Drop the objects here...</h5>
                              </slot>
                           </b-card>
                        </draggable>


                     </div>
                  <div class="card-footer">
                     <section class="row">
                        <div class="col-6">
                           <div><strong>Reqired Technician</strong>: {{ item.location_details.required_technician }}</div>
                           <div><strong>Estimated Time</strong>: {{ item.location_details.estimated_time }} hour(s)</div>
                        </div>
                        <div class="col-6">
                           <section class="clearfix">
                              <div class="float-right">
                                 <button @click="addItem(item, index)" type="button" class="btn-pill btn btn-primary m-r-30"><span class="fa fa-plus"></span> </button>
                                 <button @click="editArea(item, index)" type="button" class="btn-pill btn btn-outline-primary m-r-5"><span class="fa fa-pencil"></span></button>
                                 <button @click="deleteArea(item, index)" type="button" class="btn-pill btn btn-outline-danger"><span class="fa fa-trash"></span></button>
                              </div>
                           </section>
                        </div>
                     </section>
                  </div>
               </div>
                      
                     </template>

                  </template>

               </template>
               
            </div>
         </div>
         <section class="row">
            <div class="col">
               <b-link @click.stop="show_location = true" class="btn btn btn-primary btn-lg  btn-pill float-right">
                  <i class="fa fa-plus"></i> Location
               </b-link>
            </div>
         </section>
         <div class="clearfix"><h4 class="float-right m-t-40 m-b-20">Total man hours: {{ totalManHour }}</h4></div>


<!-- add location -->
   <b-modal 
   v-model="showAddArea" 
   centered  
   title="Add Location" 
   size="lg" 
   ok-title="Save" 
   cancel-title="Cancel"
   no-close-on-backdrop
   ignore-enforce-focus-selector=".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root"
   >
    <template >
            <div class="form-group">
               <label>Type <span class="text-danger">*</span></label>
               <select @change="getLocationType" class="form-control" v-model="location_form.location_type">
                  <option selected disabled>Select</option>
                  <option v-for="(family, index) in location_options" :key="index" :value="family.value">{{ family.value }}</option>

               </select>
            </div>
            <div class="form-group">
               <label>Name <span class="text-danger">*</span></label>
               <input v-model="location_form.location_name" type="text" class="form-control" autocomplete="off" placeholder="Enter location name">
            </div>
            <div class="form-group">
               <label>Bearing <span class="text-danger">*</span></label>
               <input v-model="location_form.bearing" type="text" class="form-control" autocomplete="off" placeholder="Left side, Right side, First Floor etc... ">
            </div>

            <div class="form-group">
               <label>Estimated Time <small>(hours for this area)</small> <span class="text-danger">*</span></label>
               <select v-model="location_form.estimated_time" name="hour" class="form-control">
                  <option disabled selected>Select number of hour</option>
                   <option v-for="(number, index) in numberRange(1, 13)" :value="number" :key="index">{{ number }}</option>
               </select>
            </div>

            <div class="form-group">
               <label>Number of Technician <small>(required technician of this area)</small> <span class="text-danger">*</span></label>
               <select v-model="location_form.technician_required" name="hour" class="form-control">
                  <option disabled selected>Select number of technician</option>
                  <option v-for="(number, index) in numberRange(1, 41)" :value="number" :key="index">{{ number }}</option>
               </select>
            </div>

          
            <div class="form-group">
               <label>Comments</label>
               <textarea v-model="location_form.comments" rows="3" class="form-control" autocomplete="off" placeholder="Enter your comments here"></textarea>
            </div>
         
      </template>
     <div slot="modal-footer">
         <button @click="saveLocation" class="btn btn-primary btn-pill m-r-5" :disabled="locaton_is_btn_save" type="submit">{{ locaton_btn_save  }}</button>
         <button @click="showAddArea = false" class="btn btn-light btn-pill active " type="button">Cancel</button>
     </div>
  </b-modal>

   <!-- edit location -->
   <b-modal 
      no-close-on-backdrop 
      v-model="show_edit_area" 
      centered  
      :title="`${location_edit_form.location_name}(${location_edit_form.location_type}) - Edit`" 
      size="lg"
      >
      <template>
          
          <div class="form-group">
               <label>Type <span class="text-danger">*</span></label>
               <input type="text" readonly v-model="location_edit_form.location_type" autocomplete="off" class="form-control">
               <!-- <select  disabled class="form-control" v-model="location_edit_form.location_type">
                  <option v-for="(family, index) in location_options" :key="index" :value="family.value">{{ family.value }}</option>

               </select> -->
            </div>

             <div class="form-group">
               <label>Name <span class="text-danger">*</span></label>
               <input @click="$event.target.select()" v-model="location_edit_form.location_name" type="text" class="form-control" autocomplete="off" placeholder="Enter location name">
            </div>
            <div class="form-group">
               <label>Bearing <span class="text-danger">*</span></label>
               <input v-model="location_edit_form.bearing" type="text" class="form-control" autocomplete="off" placeholder="Left side, Right side, First Floor etc... ">
            </div>

             <div class="form-group">
               <label>Estimated Time <small>(hours for this area)</small> <span class="text-danger">*</span></label>
               <select v-model="location_edit_form.estimated_time" name="hour" class="form-control">
                  <option disabled selected>Select number of hour</option>
                   <option v-for="(number, index) in numberRange(1, 13)" :value="number" :key="index">{{ number }}</option>
               </select>
            </div>

              <div class="form-group">
               <label>Number of Technician <small>(required technician of this area)</small> <span class="text-danger">*</span></label>
               <select v-model="location_edit_form.technician_required" name="hour" class="form-control">
                  <option disabled selected>Select number of technician</option>
                  <option v-for="(number, index) in numberRange(1, 41)" :value="number" :key="index">{{ number }}</option>
               </select>
            </div>

            <div class="form-group">
               <label>Comments</label>
               <textarea v-model="location_edit_form.comments" rows="3" class="form-control" autocomplete="off" placeholder="Enter your comments here"></textarea>
            </div>


      </template>
      <div slot="modal-footer">
     
         <button @click="updateArea" class="btn btn-pill btn-primary m-r-5" :disabled="locaton_is_btn_save" type="submit">{{ locaton_btn_save }}</button>
         <button @click="closeEdit" class="btn btn-pill btn-light active " type="button">Cancel</button>
      </div>
   </b-modal>

<!-- edit item -->
   <b-modal 
   no-close-on-backdrop 
   centered 
   v-model="show_object_edit_modal" 
   :title="`${object_form.name} - Edit`" 
   size="lg"
   >
      <template>
         <div class="form-group">
            <label>Item <span class="text-danger">*</span></label>
             <select @change="updateAttribute" v-model="object_form.name" class="form-control" required>
               <option v-for="(obj, index) in location_objects.location_object" :value="obj.value" :key="index">{{ obj.value }}</option>
            </select>
         </div>

         <div class="form-group">
            <label>Quantity <span class="text-danger">*</span></label>
            <select class="form-control"  v-model="object_form.quantity" required>
                  <option v-for="(number, index) in numberRange(1, 21)" :value="number" :key="index">{{ number }}</option>
            </select>
         </div>

         <div class="form-group">
            <label>Size</label>
            <select class="form-control"  v-model="object_form.size">
               <template v-if="object_size">
                  <option v-for="(size, index) in object_size" :key="index" :value="size">{{ size }}</option>
               </template>
            </select>
         </div>

          <div class="form-group">
            <label>Texture Type</label>
               <select class="form-control"  v-model="object_form.texture_type">
                  <template v-if="object_texture_type">
                  <option v-for="(type, index) in object_texture_type" :key="index" :value="type">{{ type }}</option>
                  </template>
            </select>
         </div>

          <div class="form-group">
            <label>Other Information</label>
            <textarea v-model="object_form.comments" name="" class="form-control" rows="3" autocomplete="off"></textarea>
         </div>



      </template>
      <section slot="modal-footer">
         <button @click="updateItem" class="btn btn-pill btn-primary m-r-5 " :disabled="item_is_btn_save" type="submit">{{ item_btn_save }}</button>
         <button @click="show_object_edit_modal = false"  class="btn btn-pill btn-light active " type="button">Cancel</button>
      </section>
   </b-modal>
      

      <form @submit.prevent="saveInspection">
         <section class="card">
            <div class="card-header b-l-primary border-3 p-t-10 p-b-10">
               <h5 class="card-title">General Comments</h5>
            </div>
            <div class="card-body p-t-10 p-b-10">
               <div class="form-group">
                  <textarea v-model="inspection_form.generalComments" name="" id="" rows="3" class="form-control" autocomplete="off"></textarea>
               </div>
            </div>
         </section>


         <div class="form-group clearfix">
           <div class="float-right">
            <button type="submit" class="btn btn-primary btn-pill m-r-5 " :disabled="inspection_is_btn_save">{{ inspection_btn_save }}</button>
            <button @click="cancelInspection" type="button" class="btn btn-light btn-pill active ">Cancel</button>
           </div>
         </div>
      </form>
      </section>

    

   </b-overlay>

   <modal :show="show_modal_object" @close="closeModalObject" title="Add Item">
      <template #body>
         <form @submit.prevent="saveObject">
            <div class="form-group">
               <label>Item <span class="text-danger">*</span></label>
               <input type="text" v-model="object_form.name" readonly required autocomplete="off" class="form-control">
               <!-- <select @change="" v-model="object_form.name" class="form-control" required>
                  <option v-for="(obj, index) in location_objects.location_object" :value="obj.value" :key="index">{{ obj.value }}</option>
               </select> -->
            </div>
            <div class="form-group">
               <label>Quantity <span class="text-danger">*</span></label>
               <select class="form-control"  v-model="object_form.quantity" required>
                     <option v-for="(number, index) in numberRange(1, 21)" :value="number" :key="index">{{ number }}</option>
               </select>
            </div>
            <div class="form-group">
               <label>Size</label>
               <select class="form-control"  v-model="object_form.size">
                  <template v-if="temp_objects[0].meta.size">
                     <option v-for="(size, index) in temp_objects[0].meta.size" :key="index" :value="size">{{ size }}</option>
                  </template>
               </select>
            </div>
            <div class="form-group">
               <label>Texture Type</label>
                 <select class="form-control"  v-model="object_form.texture_type">
                    <template v-if="temp_objects[0].meta.type">
                     <option v-for="(type, index) in temp_objects[0].meta.type" :key="index" :value="type">{{ type }}</option>
                    </template>
               </select>
            </div>
            <div class="form-group">
               <label>Other Information</label>
               <textarea v-model="object_form.comments" name="" class="form-control" rows="3" autocomplete="off"></textarea>
            </div>
            <div class="form-goup float-right">
               <button :disabled="item_is_btn_save" class="btn btn-pill btn-primary m-r-5">{{ item_btn_save }}</button>
               <button @click="closeModalObject" class="btn btn-pill btn-light active ">Close</button>
            </div>
         </form>
      </template>
   </modal>


   <families :show="show_location" :families="families" :items="location_options" @startAreaDrag="startArea" @endAreaDrag="endArea"/>

   <objects :show="show_object" :items="location_objects.location_object" @startObjectDrag="startObject" @endObjectDrag="endObject"/>

</div>
</template>

<script>
import $ from 'jquery';
import Draggable from 'vuedraggable';
import Families from '../../components/Families';
import ClientInfo from '@/components/ClientInfo';
import Objects from '@/components/Objects'
import {mapGetters, mapActions} from 'vuex';
import {Drop} from 'vue-drag-drop';
import Modal from '@/components/Modal';
import axios from 'axios';
import bootbox from 'bootbox';
export default {
   name: 'InspectiohCreate',
   components: {
      Families,
      ClientInfo,
      Objects,
      Draggable,
      Modal
   },

   data() {
      return {
         // inpsection report
         inspection_btn_save: 'Save',
         inspection_is_btn_save: false,

         // location
         locaton_btn_save: 'Save',
         locaton_is_btn_save: false,

         //item
         item_btn_save: 'Save',
         item_is_btn_save: false,
         
         location_reference_id: null,
         object_item: null,
         object_drag: false,
         show_object_edit_modal: false,
         show_modal: false,
         show_object: false,
         show_location: false,
         is_object_start_drag: false,
         is_area_start_drag: false,
         url: process.env.VUE_APP_BASE_URL,
         token: this.$store.getters['auth/token'],
         family_id: null,
         show_edit_area: false,
         show: false,
         inspection_form:{
            api_token: null,
            inspectionId: null,
            generalComments: null,
            total_estimated_hours: null,
            total_required_technicians: null,
            scope_of_work: []
         },

         scope_of_work_options:[
            {name: 'Full Cleaning'},
            {name: 'By  Item'},
         ],

         location_objects:[],


         object_form:{
            api_token: null,
            location_id: null,
            propertyId: null,
            name: null,
            quantity: 1,
            size: null,
            comments: null,
            texture_type: null,
            reference_id: null
         },

         object_items: [],
         show_modal_object: false,
         objec_show_data: {},
         object_size:[],
         object_texture_type:[],

         location_form:{
            api_token: null,
            inspectionId: null,
            propertyId: null,
            location_type: null,
            location_name: null,
            bearing: null,
            estimated_time: null,
            technician_required: null,
            comments: null,
            reference_id: null
         },
         location_edit_form:{
            api_token: null,
            inspectionId: null,
            propertyId: null,
            location_type: null,
            location_name: null,
            bearing: null,
            estimated_time: null,
            technician_required: null,
            comments: null,
            reference_id: null
         },

     

         showAddArea: false,
         close_technician: false,
        
        temp_objects:[],
         temp:[],
         items: [],
         item: {},
         families: {
            is_show: true,
         },
         newObject: {
            family: {},
            data: {}
         },

         object_metadata:{},
         test:[

         ]

      }
   },


   mounted(){
      this.$store.dispatch('inspection/inspectionDetails',{
         api_token: this.$store.getters['auth/token'],
         id: this.$route.params.id
      });

      if(!this.show_edit_area){
         this.location_form = {};
      }
   },

   computed: {

         hasLocation(){
            if(this.items.length > 0) {return true }else{ return false }

            // this.inspection_is_btn_save = true;
            // return this.inspection_is_btn_save;
         },

         filteredItem(){
             if(!this.is_object_start_drag) return this.items;

             return this.items.filter(v=>v.location.id == this.object_item.location.id);
         },

        showDropArea(){
         if(this.items.lenght == 0){ return true; }

         if(this.is_area_start_drag){ return true; }else{ return false; }
      },
     
      ...mapGetters({
         details: 'inspection/inspection_detail',
         location_options: 'inspection/location_options',
         object_options: 'inspection/object_options',
         dropBackground: 'app/inspectionFamilyDrag',
         getFamily: 'inspection/getFamily',
         isLoading: 'inspection/isLoading',
         api_token: 'auth/token',
         showObjectButton:'app/inspectionFamilyButton',
         showFamilyButton: 'app/inspectionObjectButton'
      }),

      totalRequiredTime(){
         return this.items.reduce((i, v)=>{
            return (i + v.location_details.estimated_time);
         }, 0);
      },

      totalManHour(){
         return this.items.reduce((i, v)=>{
            return (i + (v.location_details.estimated_time * v.location_details.required_technician));
         }, 0);
      },

      totalRequiredTechinician(){
         return this.items.reduce((i, v)=>{
            return (i + v.location_details.required_technician);
         }, 0);
      },
      
   },

   methods: {

      cancelInspection(){

         if(this.items.length > 0){

            this.bootbox.confirm('Are you sure you want to cancel the inspection? This will remove the added locations and items. Please click OK to confirm.', result=>{
            if(result){
               this.$router.push({name: 'inspection'})
            }
         });

         }
         else{
             this.$router.push({name: 'inspection'})
         }
         
         
      },

      getLocationType(e){
         let selected_item = this.location_options.filter(v=> v.value == e.target.value);
         this.family_id = selected_item[0].id
         this.location_form.reference_id = selected_item[0].id
         console.log(e.target.value);
      },

      closeItem(){
         this.show_location = false
         this.show_object = false
      },

      showLocation(e){
         console.log(e);
      },

       ...mapActions({
         showObject: 'app/objectList',
         showFamily: 'app/familyList',
      }),

      endObject(){
         this.is_object_start_drag = false;
         console.log('end object');
      },

    
      startObject(){
         this.is_object_start_drag = true;
         console.log('start object');
         this.temp_objects = [];
      },

      endArea(){
           this.is_area_start_drag = false;
            console.log('end '+this.is_area_start_drag);
      },

      startArea(){
         // reset the drag area if not finish
         this.is_area_start_drag = true;
         console.log('start '+this.is_area_start_drag);
         this.temp = [];
      },

      end(e){
         console.log(e);
      },

      closeEdit(){
         this.show_edit_area = false;
         this.location_edit_form = {};
      },

      deleteArea(item, index){
         console.log(item);
         bootbox.confirm(`Are you sure you want to delete the location:  <span class="text-success">${item.location.name}</span> ?`, 
         (result)=>{
            if(result){
               
               this.$axios({
                  url: `${this.url}/inspections/inspection-report/location/destroy`,
                   params: {api_token: this.token,location_id: item.location.id },
                   method: 'get'
                }).then((response)=>{
                   if(response.data.code == 200){
                        this.items.splice(index, 1);

                          this.$store.dispatch('notification/addNotification', {
                              message: `${item.location.location_type} has been removed successfully.`,
                              type: 'success'
                           });

                      }
                }).catch(e=> {
                     this.$store.dispatch('notification/addNotification', {
                         message: e.message,
                         type: 'danger'
                      });
                }
                );
            }
         });
      },

      updateArea(){
         console.log(this.location_edit_form);
         
         this.location_edit_form.api_token = this.token;

         this.locaton_is_btn_save = true;
         this.locaton_btn_save = 'Saving...';

         this.$axios({
            url:`${this.url}/inspections/inspection-report/location/update`,
            data: this.location_edit_form,
            method: 'post'
         }).then((response)=>{

               if(response.data.statusCode == 201){

                

                  let location = response.data.data.location;
                  let details = response.data.data.hygienizationItemLocation;

                
                  this.items[this.location_edit_form._index].location.name = location.name;
                  this.items[this.location_edit_form._index].location.location_type = location.location_type;
                  this.items[this.location_edit_form._index].location_details.estimated_time = details.estimated_time;
                  this.items[this.location_edit_form._index].location_details.required_technician = details.required_technician;

                  this.$store.dispatch('notification/addNotification', {
                     message: `${location.location_type} has been updated successfully.`,
                     type: 'success'
                  });

                  
                  this.show_edit_area = false;

                  this.locaton_is_btn_save = false;
                  this.locaton_btn_save = 'save';

                
                  
               }
         }).catch(e=>{

             this.$store.dispatch('notification/addNotification', {
               message: e.message,
               type: 'danger'
            });

              this.locaton_is_btn_save = false;
              this.locaton_btn_save = 'Save';
         });
      },

      editArea(item, index){

         this.location_edit_form = {};
         console.log(item);
         this.$axios({
            url:`${this.url}/inspections/inspection-report/location/show/${item.location.id}?api_token=${this.token}`,
            method: 'get'
         }).then((response)=>{
            if(response.data.code === 200){
                this.show_edit_area = true;

               let location = response.data.data.location;
               let details = response.data.data.locationDetails;
               
               this.location_edit_form.locationId = location.id;
               this.location_edit_form.inspectionId = details.inspection_id;
               this.location_edit_form.propertyId = location.property_id;
               this.location_edit_form.location_type =location.location_type;
               this.location_edit_form.location_name = location.name;
               this.location_edit_form.bearing = location.bearing;
               this.location_edit_form.estimated_time = details.estimated_time;
               this.location_edit_form.technician_required = details.required_technician;
               this.location_edit_form.comments = details.comments;
               
               this.location_edit_form.mode = 20,
               this.location_edit_form._method = 'PATCH';
               this.location_edit_form._index = index;

            }
         }).finally(()=>{});

         

      },

      addItem(item, index){


         this.object_item = item;
         console.log('added item: '+item);
         this.$axios({
            url: `${this.url}/inspections/inspection-report/location/item/list/${item.location.reference_id}?api_token=${this.token}`,
            method: 'get'
         })
         .then(response=>{
             this.$store.dispatch('notification/addNotification', {
               message: `${item.name} has been saved successfully.`,
               type: 'success'
            });

            this.location_objects = response.data.data
            this.show_object= true
      
         }).catch(e=>{

            this.$store.dispatch('notification/addNotification', {
               message: e.message,
               type: 'danger'
            });

            this.isLoading = false
         });
        
      },

      
      updateItem(){

         this.item_is_btn_save = true;
         this.item_btn_save = 'Saving...';
         
         this.object_form._method = 'PATCH';
         this.object_form.api_token = this.token
         this.object_form.propertyId = this.details.property.id;

      

         this.$axios({
            url: `${this.url}/inspections/inspection-report/location/item/update`,
            method: 'post',
            data: this.object_form
      })
         .then((response)=>{
            let item = response.data.data.itemLocation;  

            this.item_is_btn_save = false;
            this.item_btn_save = 'Save';
        

            this.object_items[this.object_form._index].id = item.id;
            this.object_items[this.object_form._index].name = item.name;
            this.object_items[this.object_form._index].comments = item.comments;
            this.object_items[this.object_form._index].quantity = item.quantity;
            this.object_items[this.object_form._index].size = item.size;
            this.object_items[this.object_form._index].texture_type = item.texture_type;

            
             console.log(this.object_form);

            this.object_form = {};
            this.show_object_edit_modal = false;

            this.$store.dispatch('notification/addNotification', {
               message: `${item.name} has been updated successfully.`,
               type: 'success'
            });

         }).catch(e=>{

             this.$store.dispatch('notification/addNotification', {
               message: e.message,
               type: 'danger'
            });

            this.item_is_btn_save = false;
            this.item_btn_save = 'Save';
         });
      },

       saveObject(){
         this.item_is_btn_save = true;
         this.item_btn_save = 'Saving...';

         this.object_form.api_token = this.$store.getters['auth/token'];
         this.object_form.propertyId = this.details.property.id;

         this.$axios({
            url:`${process.env.VUE_APP_BASE_URL}/inspections/inspection-report/location/item/store`, 
            data:this.object_form,
            method: 'post'
         })
         .then((response)=>{  
            this.object_items.push(response.data.data.itemLocation);
            this.show_modal_object = false;
            this.object_form = {};
            this.temp_objects = [];

            this.item_is_btn_save = false;
            this.item_btn_save = 'Save';

             this.$store.dispatch('notification/addNotification', {
               message: 'Item has been updated successfully.',
               type: 'success'
            });

         }).catch(e=>{
            
            this.$store.dispatch('notification/addNotification', {
               message: e.message,
               type: 'danger'
            });

               this.item_is_btn_save = false;
               this.item_btn_save = 'Save';
               alert(e.message);
         });


      },

      
       async editItem(item, index, location) {

         this.item_is_btn_save = true;
         this.item_btn_save = 'Saving...';
         
         

       

         this.location_reference_id = location.location.reference_id;

         await this.$axios({
           url: `${this.url}/inspections/inspection-report/location/item/show/${item.id}?api_token=${this.token}`,
           method: 'get'
        })
        .then(response=> response.data)
        .then((response)=>{
             this.show_object_edit_modal = true;
         
           this.object_show_data = response.data
           this.object_form.name = response.data.itemLocation.name;
           this.object_form.comments = response.data.itemLocation.comments;
           this.object_form.quantity = response.data.itemLocation.quantity;
           this.object_form.size = response.data.itemLocation.size;
           this.object_form.texture_type = response.data.itemLocation.texture_type;
           
           this.object_form.id = response.data.itemLocation.id;
           this.object_form.reference_id= response.data.itemLocation.id;
           this.object_form.location_id = response.data.itemLocation.location_id;
           this.object_form.propertyId = this.details.property.id;

           this.object_form._index = index;

            console.log(this.object_form);


           if(response.data.itemLocation.reference.meta){
              let meta = response.data.itemLocation.reference.meta;
              if(meta.size){
                 this.object_size = meta.size
              }   
              if(meta.type){
                 this.object_texture_type = meta.type
              }
           }

            this.item_is_btn_save = false;
            this.item_btn_save = 'Save';

        }).catch(e=>{
           this.item_is_btn_save = false;
           this.item_btn_save = 'Save';
           alert(e.message)
        });
      },

      
      deleteItem(item, location_index, item_index) {
         this.bootbox.confirm(`Are you sure you want to delete the item: <span class="text-success"> ${item.name}</span>`, (result)=>{
            if(result){
               this.$axios({
                  url:`${this.url}/inspections/inspection-report/location/item/destroy`,
                  params: {api_token: this.token, id: item.id },
                  method:'get'
               })
               .then((response)=>{
                  if(response.data.code == 200){
                      this.object_items.splice(item_index, 1);

                       this.$store.dispatch('notification/addNotification', {
                           message: `${item.name} has been removed successfully.`,
                           type: 'success'
                        });
                  }
               })
               .catch(e=>{

                   this.$store.dispatch('notification/addNotification', {
                     message: e.message,
                     type: 'danger'
                  });

               });
            }
         });
      },

      async updateAttribute(e){
         let val = e.target.value;
         console.log(val);

        let location_objects = await  this.$axios({
            url: `${this.url}/inspections/inspection-report/location/item/list/${this.location_reference_id}?api_token=${this.token}`,
            method: 'get'
         }).then(response=>response.data)
         .then(response=>response.data.location_object);

        let selected_oject =  location_objects.filter(v=>v.value === e.target.value );

           console.log(selected_oject[0].meta);

        if(selected_oject[0].meta){
           if(selected_oject[0].meta.size){
           this.object_size = selected_oject[0].meta.size
           }
           else{
              this.object_size = []
           }

           if(selected_oject[0].meta.type){
               this.object_texture_type = selected_oject[0].meta.type
           }
           else{
              this.object_texture_type = []
           }
        }

      },

      



      saveInspection(){

         this.bootbox.confirm('Are you sure you want to save the inspection report?', (result)=>{
            if(result){

               this.inspection_btn_save = 'Saving...';
               this.inspection_is_btn_save = true;

               this.inspection_form.api_token =  this.$store.getters['auth/token'];
               this.inspection_form.inspectionId =  this.$route.params.id;

               console.log(this.inspection_form);

               this.$axios({
                  url:`${process.env.VUE_APP_BASE_URL}/inspections/inspection-report/store`, 
                  data:this.inspection_form,
                  method: 'post'
               })
               .then((response)=>{ 
               
                  if(response.data.code == 200){

                     this.inspection_btn_save = 'Save';
                     this.inspection_is_btn_save = false;

                     this.$router.push({name: 'inspection'}) 
                        
                     this.$store.dispatch('notification/addNotification', {
                        message: `Inspection report has been saved successfully.`,
                        type: 'success'
                     });

                  }
               }).catch(e=>{
                  
                  this.$store.dispatch('notification/addNotification', {
                     message: e.message,
                     type: 'danger'
                  });

                  this.inspection_btn_save = 'Save';
                  this.inspection_is_btn_save = false;
                  
               });

            }
         });

       

         
         
      },

     

       showModalAddObject(item) {

         this.object_form.name = this.temp_objects[0].value;
         this.object_form.reference_id = this.temp_objects[0].id;
         this.object_form.location_id = item.location.id;
         this.show_modal_object = true;

         // await this.$axios({
         //    url:`${process.env.VUE_APP_BASE_URL}/inspections/inspection-report/location/item/show/metadata`, 
         //    params:{api_token: this.$store.getters['auth/token'], id: this.temp_objects[0].id }
         // })
         // .then((response)=>{ 
         //    this.object_metadata = response.data.data.location_object.meta; 
         // });
      },

      closeModalObject(){
         this.show_modal_object = false;
      },

      saveLocation(){

         this.location_form.api_token = this.$store.getters['auth/token'];
         this.location_form.inspectionId = this.$route.params.id;
         this.location_form.propertyId = this.details.property.id;

         this.locaton_is_btn_save = true;
         this.locaton_btn_save = 'Saving...';


         console.log(this.location_form);

         this.$axios({
            url:`${process.env.VUE_APP_BASE_URL}/inspections/inspection-report/location/store`, 
            data:this.location_form,
            method: 'post'
         }) 
         .then((response)=>{
               let data = response.data.data

             this.$store.dispatch('notification/addNotification', {
               message: `${data.location.location_type} has been saved successfully.`,
               type: 'success'
            });

            this.items.push(data);
          

            this.showAddArea = false
            this.locaton_is_btn_save = false;
            this.locaton_btn_save = 'Save';

            this.temp = [];
            this.location_form = {};
         }).catch(e=>{
            this.locaton_is_btn_save = false;
            this.locaton_btn_save = 'Save';
            alert(e.meta)
         });
      },

      numberRange(start, end){
        return new Array(end-start).fill(start).map((n,i)=>n+i);
      },

      // showModal(item){
      //    this.showAddArea = true;
      //    this.location_form.location_type = item.value;
      // },

      // close() {
      //    this.showAddArea = false
      // },

      familyMove(e) {
         this.showAddArea = false;
         console.log('moving...');
      },


      



      addObject(item) {
         this.newObject.family = item;

      },

      removeFamily(index) {
         this.$store.dispatch('inspection/removeFamily', index);
      },

      dropFamily() {
         this.$store.dispatch('inspection/createInspection');
      },

      showModalAddArea() {
         console.log('show modal area');
         this.location_form.location_type = this.temp[0].value;
         this.location_form.reference_id = this.temp[0].id;
         this.family_id = this.temp[0].id;

         this.showAddArea = true;
      },
        
      closeArea(){
         // this.$store.dispatch('app/familyList')
         // this.$store.dispatch('app/objectList')
      }
   },

}
</script>

<style>
.drag{
   border: 2px dashed #4466f2 !important;
   background: rgba(68,102,242,0.2);

}
.bg-drop {
   background-color: #4466f2;
   color: #fff !important;
}
</style>
