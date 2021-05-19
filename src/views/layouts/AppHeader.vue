<template>
<div class="page-main-header" :class="{open: isShow}" v-if="!$route.meta.unauthenticated">
   <div class="main-header-right row">
      <div class="main-header-left d-lg-none d-none d-sm-block">
         <div class="logo-wrapper">
            <a href="javascript:void(0)">
               <img src="/assets/images/logo/sani2.png" alt="">
            </a>
         </div>
      </div>

      <div class="mobile-sidebar d-block" @click="$emit('show-hide')">
         <div class="media-body text-right switch-sm">
            <label class="switch">
               <a href="javascript:void(0)">
                  <i id="sidebar-toggle" data-feather="align-left"></i>
               </a>
            </label>
         </div>
      </div>

      <div class="nav-right col p-0">
         <ul class="nav-menus" :class="{open: showTop}">
            <li>
               <a class="text-dark d-none" href="#!">
                  <i data-feather="maximize"></i>
               </a>
            </li>
            <!-- <li @click="showObject" v-show="showObjectButton">
               <b-link class="btn btn-sm btn-outline-primary btn-pill">Object</b-link>
            </li> -->

            <li class="onhover-dropdown"><i data-feather="bell"></i><span class="dot"></span>
               <ul class="notification-dropdown onhover-show-div">
                  <li>Notification <span class="badge badge-pill badge-primary pull-right">3</span></li>
                  <li>
                     <div class="media">
                        <div class="media-body">
                           <h6 class="mt-0">
                              <span><i class="shopping-color" data-feather="shopping-bag"></i></span>Your order ready for Ship..!<small class="pull-right">9:00 AM</small>
                           </h6>
                           <p class="mb-0">Lorem ipsum dolor sit amet, consectetuer.</p>
                        </div>
                     </div>
                  </li>
                  <li>
                     <div class="media">
                        <div class="media-body">
                           <h6 class="mt-0 txt-success">
                              <span><i class="download-color font-success" data-feather="download"></i></span>Download Complete<small class="pull-right">2:30 PM</small>
                           </h6>
                           <p class="mb-0">Lorem ipsum dolor sit amet, consectetuer.</p>
                        </div>
                     </div>
                  </li>
                  <li>
                     <div class="media">
                        <div class="media-body">
                           <h6 class="mt-0 txt-danger">
                              <span><i class="alert-color font-danger" data-feather="alert-circle"></i></span>250 MB trash files<small class="pull-right">5:00 PM</small></h6>
                           <p class="mb-0">Lorem ipsum dolor sit amet, consectetuer.</p>
                        </div>
                     </div>
                  </li>
                  <li class="bg-light txt-dark"><a href="#">All</a> notification</li>
               </ul>
            </li>
            <li class="onhover-dropdown">
               <div class="media align-items-center">
                  <img class="align-self-center pull-right img-50 rounded-circle" src="/assets/images/dashboard/user.png" alt="header-user">
                  <div class="dotted-animation"><span class="animate-circle"></span><span class="main-circle"></span></div>
               </div>
               <ul class="profile-dropdown onhover-show-div p-20">
                  <li><a href="#"><i data-feather="user"></i>My Profile</a></li>
                  <!-- <li><a href="#"><i data-feather="mail"></i>Inbox</a></li> -->
                  <!-- <li><a href="#"><i data-feather="lock"></i>Lock Screen</a></li> -->
                  <!-- <li><a href="#"><i data-feather="settings"></i>Settings</a></li> -->
                  <li @click="logout"><a href="javascript:void(0)"><i data-feather="log-out"></i>Logout</a></li>
               </ul>
            </li>
         </ul>
         <div class="d-lg-none mobile-toggle pull-right" @click="showMenu"><i data-feather="more-horizontal"></i></div>
      </div>
      <script id="result-template" type="text/x-handlebars-template">
         <div class="ProfileCard u-cf">
            <div class="ProfileCard-avatar">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-airplay m-0">
                  <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                  <polygon points="12 15 17 21 7 21 12 15"></polygon>
               </svg>
            </div>
            <div class="ProfileCard-details">
               <div class="ProfileCard-realName">{{user.first_name}}</div>
            </div>
         </div>
      </script>
      <script id="empty-template" type="text/x-handlebars-template">
         <div class="EmptyMessage">Your search turned up 0 results. This most likely means the backend is down, yikes!</div>
      </script>
   </div>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
   name:'app-header',

   props:['isShow'],

   data(){
     return{
       showTop: false
     }
   },

   computed:{
      ...mapGetters({
         user: 'auth/user',
         showObjectButton:'app/inspectionFamilyButton',
         showFamilyButton: 'app/inspectionObjectButton'
      }),

   },

   methods:{
      ...mapActions({
         showObject: 'app/objectList',
         showFamily: 'app/familyList',
      }),
      logout(){
         
         this.$store.dispatch('auth/logout')
         .then((res)=>{
            this.$router.push('/login');
         });
    },
      


     showMenu(){
       this.showTop = !this.showTop ? true : false;
     },

   },
  
}
</script>
