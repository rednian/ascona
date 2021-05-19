<template>
    <div class="page-sidebar color4-sidebar" :class="{open: isShow}" v-if="!$route.meta.unauthenticated">
          <div class="main-header-left d-none d-lg-block">
            <div class="logo-wrapper">
               <h4 class="text-white">SaniERP</h4>
            </div>
          </div>
          <div class="sidebar custom-scrollbar">
            <div class="sidebar-user text-center">
              <div>
                <img class="img-60 rounded-circle" src="/assets/images/user/1.jpg" alt="#">
                <div class="profile-edit"><a href="#" target="_blank"><i data-feather="edit"></i></a></div>
              </div>
              <h6 class="mt-3 f-14">{{ user.first_name }}</h6>
            </div>
            <ul class="sidebar-menu">
               <template v-if="links">
                  <li v-for="(link, index) in links" :key="index">
                     <router-link :class="link.class" :to="link.path" ><i :data-feather="link.icon"></i><span>{{ link.name }}</span></router-link>
                  </li>
               </template>
            </ul>
          </div>
        </div>
</template>

<script>

import {mapGetters}from 'vuex'

export default {
   props:['isShow'],
   data(){
      return {
         links: [
            {class: 'sidebar-header', icon: 'home', name: 'Dashboard', path: '/'},
            {class: 'sidebar-header', icon: 'circle', name: 'Inspections', path: '/inspection'},
            {class: 'sidebar-header', icon: 'circle', name: 'Services', path: '/service'},
            {class: 'sidebar-header', icon: 'circle', name: 'Job Orders', path: '/job-order'},
            {class: 'sidebar-header', icon: 'circle', name: 'Quality Check', path: '/quality-check'},
         ]
      };
   },
   computed:{
      ...mapGetters({
         user: 'auth/user'
         })
   },
}
</script>