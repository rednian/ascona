<template>
   <b-modal v-model="show" centered :title="title" size="lg" no-close-on-backdrop>
       <div class="form-group">
           <label>Type <span class="text-danger">*</span></label>
           <select v-model="form.location_type" class="form-control custom-select">
               <template v-if="options">
                   <option v-for="option in options" :value="option.value" :key="option.id" >{{ option.value }}</option>
               </template>
           </select>
       </div>

       <div class="form-group">
           <label>Name <span class="text-danger">*</span></label>
           <input v-model="form.location_name" type="text" class="form-control" autocomplete="off">
       </div>

       <div class="form-group">
            <label>Bearing <span class="text-danger">*</span></label>
            <input v-model="form.bearing" type="text" class="form-control" autocomplete="off" placeholder="Left side, Right side, First Floor etc... ">
       </div>

       <div class="form-group">
            <label>Estimated Time <small>(hours for this area)</small> <span class="text-danger">*</span></label>
            <select v-model="form.estimated_time"  name="hour" class="form-control">
                <option disabled selected>Select number of hour</option>
                <option v-for="(number, index) in numberRange(1, 13)" :value="number" :key="index">{{ number }}</option>
            </select>
        </div>

        <div class="form-group">
            <label>Number of Technician <small>(required technician of this area)</small> <span class="text-danger">*</span></label>
            <select v-model="form.technician_required"  name="hour" class="form-control">
                <option disabled selected>Select number of technician</option>
                <option v-for="(number, index) in numberRange(1, 41)" :value="number" :key="index">{{ number }}</option>
            </select>
        </div>

        <div class="form-group">
            <label>Comments</label>
            <textarea v-model="form.comments" rows="3" class="form-control" autocomplete="off" placeholder="Enter your comments here"></textarea>
        </div>

       <div slot="modal-footer">
           <section class="float-right">
               <button @click="saveLocation" type="button" class="btn btn-primary btn-pill m-r-5">Save</button>
               <button type="button" class="btn btn-light active btn-pill">Close</button>
           </section>
       </div>
   </b-modal>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    name: 'LocationForm',
    props:['show', 'title', 'property_id', 'inspection_id', 'selected'],
    data(){
        return{
            visible: false,
           form:{
            api_token: null,
            inspectionId: null,
            propertyId: null,
            location_type: null,
            location_name: null,
            bearing: null,
            estimated_time: 1,
            technician_required: 1,
            comments: null,
            reference_id: null
           }
        }
    },

    watch:{
        selected(newVal, oldVal){
            this.form.location_type = newVal.value;
        }
    },
    
    computed:{
       
        // location_type:{
        //     get(){
        //         return this.$store.state.editinspection.location_form.location_type;
        //     },
        //     set(v){
        //         this.$store.commit('editinspection/SET_LOCATION_TYPE', v);
        //     }
        // },
        // location_name:{
        //     get(){
        //         return this.$store.state.editinspection.location_form.location_name;
        //     },
        //     set(v){
        //         this.$store.commit('editinspection/SET_LOCATION_NAME', v);
        //     }
        // },
        // bearing:{
        //     get(){
        //         return this.$store.state.editinspection.location_form.bearing;
        //     },
        //     set(v){
        //         this.$store.commit('editinspection/SET_BEARING', v);
        //     }
        // },
        
        // estimated_time:{
        //     get(){
        //         return this.$store.state.editinspection.location_form.estimated_time;
        //     },
        //     set(v){
        //         this.$store.commit('editinspection/SET_EST', v);
        //     }
        // },

        // technician_required:{
        //     get(){
        //         return this.$store.state.editinspection.location_form.technician_required;
        //     },
        //     set(v){
        //         this.$store.commit('editinspection/SET_TECH', v);
        //     }
        // },

        // comments:{
        //     get(){
        //         return this.$store.state.editinspection.location_form.comments;
        //     },
        //     set(v){
        //         this.$store.commit('editinspection/SET_COMMENTS', v);
        //     }
        // },

       
        ...mapGetters({
            options: 'editinspection/options'
        })
    },

    methods:{
        saveLocation(){
            alert()
        },

         numberRange(start, end){
            return new Array(end-start).fill(start).map((n,i)=>n+i);
        },
    }
}
</script>