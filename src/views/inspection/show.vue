<template>
<div class="page-body">
   <div class="container-fluid">
      <div class="page-header">
         <div class="row">
            <div class="col col-sm-6 col-xs-6">
               <div class="page-header-left">
                  <h3>INSPECTION REPORT DETAILS</h3>
               </div>
            </div>

            <div class="col col-sm-6 col-xs-6">
               <div class="bookmark float-right">

                  <router-link to="/inspection" class="btn btn-light active btn-pill m-r-5">
                     <!-- <i class="fa fa-arrow-left"></i> -->
                     Back
                  </router-link>
                  <!-- <router-link v-if="inspection.approved !== 'Yes'" :to="{name: 'inspection.edit', param:{ id: params.inspection_id  }}" class="btn btn-outline-primary btn-pill m-r-5">
                    <i class="fa fa-pencil"></i>
                  </router-link> -->
               </div>
            </div>
         </div>

      </div>
   </div>
   <!-- Container-fluid starts-->
<b-overlay :show="loading" rounded="sm" style="width:100%">
   <section class="container-fluid" >
      <div class="row starter-main">
         <div class="col-sm-12">
            
            <client-info 
            :client="inspection.account" 
            :property="inspection.property"
            >
            </client-info>

              <div class="card">
                <div class="card-header b-l-primary border-3 p-t-10 p-b-10">
                    <section class="row">
                        <div class="col-sm-9">
                            <h5>SUMMARY DETAILS</h5>
                        </div>
                        
                    </section>
                </div>
                <div class="card-body p-t-5 p-b-5">
                    <table class="table table-borderless table-sm">
                        <tbody>
                            <tr>
                                <td width="30%" align="right" class="font-weight-bold">Inspection status :</td>
                                 <span class="badge badge-pill" :class="[ inspection.checklist ? 'badge-success': 'badge-info' ]">{{ inspection.checklist ? 'Done' : 'Pending' }}</span>
                            </tr>
                            <tr>
                                <td width="30%" align="right" class="font-weight-bold">General comments :</td>
                                <td>{{ inspection.comments }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </div>

            <div class="card card-absolute m-t-30 border" v-for="(location, index) in inspection.locations" :key="index">
               <div class="card-header bg-primary p-t-10 p-b-10">
                    <h5>{{ location.location_type }} <small>({{ location.name }})</small></h5>
               </div>
               <div class="card-body">
                 
                  <table class="table table-striped" v-if="location.objects">
                     <thead>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Size</th>
                        <th>Texture</th>
                        <th>Comment</th>
                     </thead> 
                     <tbody >
                        <template v-for="(obj, index2) in location.objects" >
                           <tr v-if="obj.location_id == location.id" :key="index2" >
                           <td>{{ obj.name }}</td>
                           <td>{{ obj.quantity }}</td>
                           <td>{{ obj.size }}</td>
                           <td>{{ obj.texture_type }}</td>
                           <td>{{ obj.comment  }}</td>
                        </tr>
                        </template>
                       
                     </tbody>
                  </table>


               </div>
               <div class="card-footer">
                  <section class="row">
                     <div class="col-6">
                        <div><strong>Reqired Technician</strong>: {{ location.required_technician }}</div>
                        <div><strong>Estimated Time</strong>: {{ location.estimated_time }} hour(s)</div>
                     </div>
                     <div class="col-6">
                         <section class="clearfix">
                           <div class="float-right">
                           </div>
                        </section>
                     </div>
                  </section>
               </div>
            </div>


         </div>
      </div>

      
   
   </section>
</b-overlay>


</div>
</template>

<script>
import ClientInfo from '@/components/ClientInfo'
import {mapGetters} from 'vuex'

export default {
    name: 'InspectionShow',

    components:{ ClientInfo },

    data(){
        return {
            params:{
               token: this.$store.getters['auth/token'],
               inspection_id: this.$route.params.id,
            },

        }
    },

    computed:{
      ...mapGetters({
         loading: 'editinspection/loading',
         inspection: 'editinspection/inspection'
      }),
    },

    mounted(){
       this.$store.dispatch('editinspection/locationList', this.params);
    }
}
</script>c
