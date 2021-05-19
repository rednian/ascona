<template>
  <div class="page-wrapper compact-wrapper">

    <app-header 
    @show-hide="showHide" 
    :isShow="sidebar_display">
    </app-header>

    <div class="page-body-wrapper sidebar-icon">

    <sidebar 
    :isShow="sidebar_display">
    </sidebar>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/views/layouts/sidebar'
import AppHeader from '@/views/layouts/AppHeader'
import { mapGetters } from 'vuex';
export default {
    name:'admin',
    components:{ AppHeader, Sidebar },
    data(){
    return{
      sidebar_display: false,
      top_menu: false
    }
  }, 

computed:{
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    })
  },

  methods:{
    showTopMenu(){
      this.showTop  = this.showTop ? false : true;
    },

    showHide(){
      this.sidebar_display = this.sidebar_display ? false : true;
    }
  }
}
</script>
