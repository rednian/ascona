<template>
<section>

  <!-- for unauthenticated layout -->
  <div class="authentication-main"  v-if="$route.meta.unauthenticated">
    <div class="row">
      <div class="col-md-12">
        <div class="auth-innerright">
          <div class="authentication-box">
            <div class="text-center">
              <img style="width: 200px" src="/assets/images/logo/sani2.png" alt="">
            </div>
              <!-- <transition> -->
                <router-view></router-view>
              <!-- </transition> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <notifications group="app" position="bottom right" /> -->
  
<!-- for authenticated layout -->
  <div class="page-wrapper compact-wrapper" v-if="!$route.meta.unauthenticated">

    <app-header 
    @show-hide="showHide" 
    :isShow="sidebar_display">
    </app-header>

    <div class="page-body-wrapper sidebar-icon">

    <sidebar 
    :isShow="sidebar_display">
    </sidebar>
        <!-- <transition> -->
          <router-view></router-view>
          <notification-list />
        <!-- </transition> -->
    </div>
  </div>

</section>
</template>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUTkMj2rImUIK4R3LSPA137CEj3otBNwA&callback=initMap"></script> 
<script>

import Sidebar from '@/views/layouts/sidebar'
import NotificationList from '@/components/NotificationList'
import AppHeader from '@/views/layouts/AppHeader'

import feather from 'feather-icons'
import { mapGetters } from 'vuex';
// import axios from 'axios';

export default {
  components:{ AppHeader, Sidebar, NotificationList },
  name: 'app',
  data(){
    return{
      sidebar_display: false,
      top_menu: false,
      logo_show: true,
    }
  },

  watch:{
    $route(to, from){

      this.$axios.interceptors.response.use((response)=>{
        if(response.data.code === 401){
          this.$store.dispatch('auth/logout').then(res=>location.replace('/login'));
        }
        return response;
      });


      if(this.isMobile()){ this.sidebar_display = true; }


      let path = this.$route.name;


        if(path == 'inspection.create' || path == 'inspection.edit'){
          this.$store.dispatch('app/inpspectionButton', true);
        }else{
          this.$store.dispatch('app/inpspectionButton', false);
        }
    }
  },



  methods:{
      isMobile(){
        const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
      ];

      return toMatch.some(v=>{
         return navigator.userAgent.match(v);
      });
     },
   
    showTopMenu(){
      this.showTop  = this.showTop ? false : true;
    },

    showHide(){
      this.sidebar_display = this.sidebar_display ? false : true;
    }
  },

  computed:{
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    })
  },


  mounted(){
    feather.replace();
  }
}
</script>

<style>
.b-skeleton{
  background-color:  rgb(224 224 224);
  /* cursor: wait; */
}

.right-sidebar .chat-box {
  max-height: none;
}

.chat-box .people-list ul li {
    padding-bottom: 5px;
}

.starter-main .alert {
    background-color: none !important;
}

@media only screen and (max-width: 991px){
.page-wrapper .page-body-wrapper .right-sidebar {
    top: 63px;
}
}
@media only screen and (min-width: 1170px){
header {
    height: inherit !important; 
    line-height: inherit !important;
    background: inherit !important;
}

.modal-backdrop {
   opacity: .5 !important;
}
}

@media (max-width: 430px){
    .introductie {
    height: 300vh;
    overflow: hidden;
}
}

.page-wrapper .page-body-wrapper .right-sidebar {
    top: 63px !important;
}

header {
    height: inherit !important; 
    line-height: inherit !important;
    background: inherit !important;
}

.modal-backdrop {
   opacity: .5 !important;
}


ul {
  list-style-type: none !important;
}
.modal-body {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}

.card{
  margin-bottom: 10px;
}

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

.circle-icon{
    background: #eeeeee;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
    /* padding: 30px;    */
}

.drag-cursor {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
}

  .no-wrap {
    white-space: nowrap;
    width: 1%;
    }

</style>
