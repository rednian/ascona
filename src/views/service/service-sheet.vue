<template>
<div class="page-body">
   <div class="container-fluid">
      <div class="page-header">
         <div class="row">
            <div class="col col-sm-6 col-xs-6">
               <div class="page-header-left">
                  <h3>Create Service Sheet</h3>
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
            <client-info :client="account" :property="property"></client-info>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import ClientInfo from '@/components/ClientInfo';
import {mapGetters} from 'vuex';
import axios from 'axios';

export default {
   name: 'inspection',
   components: {
      ClientInfo,
   },

   data() {
      return {
         account:{},
         property:{}
      }
   },

   computed: {

      
   },

   methods: {

     

   
   },

}
</script>