<template>
<section class="page-body">
   <div class="container-fluid">
      <div class="page-header">
         <div class="row">
            <div class="col col-sm-12 col-xs-12">
               <div class="page-header-left float-left">
               </div>
               <div class="page-header-right clearfix">
                  <button @click="cancel" type="button" class="btn btn-sm btn-light float-right active btn-pill">Back</button>
               </div>
            </div>
         </div>

      </div>
   </div>
   <div class="container-fluid">
      <b-overlay :show="loading" rounded="sm">
          <h4 class="text-center">Work Order: {{ date }}</h4>
             <template v-if="order.service">
                     
                        
                    <div class="card" v-for="(service, index) in order.service" :key="index">
                        <div class="card-header p-t-15 p-b-10">
                            <h5 class="card-title">
                                <span class="text-primary">{{ service.account }}</span>
                            </h5>
                        </div>
                        <div class="card-body">
                            
                        <div><i class="fa fa-map-marker"></i> {{ service.client_address }}</div>
                        <div><i class="fa fa-calendar"></i> {{ service.start_time }} - {{ service.end_time }}</div>
                        <div class="m-t-20">
                            <div v-if="service.sales_comments">
                                <h6>Sales comment</h6>
                                <p class="border p-1">{{ service.sales_comments }}</p>
                            </div>
                            

                            <div v-if="service.operation_comments">
                                <h6>Operation comment</h6>
                                <p class="border p-1">{{ service.operation_comments }}</p>
                            </div>
                            
                        </div>
                        <div>
                            
                        </div>
                        </div>
                        <div class="card-footer">
                            Team:
                            <template v-if="service.team_members">
                                <span v-for="(team, index) in service.team_members" :key="index">
                                    <span :class="getClass(team)" class="badge badge-pill m-r-5">{{ team.name }} </span> 
                                    <!-- <span :class="team.driver ? 'badge-success': 'badge-info' " class="badge badge-pill m-r-5">{{ team }} </span>  -->
                                </span>
                            </template>
                        </div>
                    </div>
                       
                  </template>
      </b-overlay>
   </div>
</section>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
    name:'worOrder',
    data(){
        return{
            date: this.$route.params.date,
        }
    },
    computed:{
        ...mapGetters({
            loading: 'joborder/loading',
            order: 'joborder/details',
        })
    },

    methods:{
        getClass(team){
            if(team.team_leader){
                return 'badge-danger'
            }
            if(team.driver){
                 return 'badge-success'
            }

            return 'badge-info'
        },

        cancel(){
            this.$router.push({name:'job_order.index'});
        }
    },

    created(){
        this.$store.dispatch('joborder/show', {
            api_token: this.$store.getters['auth/token'],
            date: this.date
        })
    }
}
</script>