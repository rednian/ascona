<template>
  <div class="page-body">
    <div class="container-fluid">
      <div class="page-header">
        <div class="row">
          <div class="col col-sm-6 col-xs-6">
            <div class="page-header-left">
              <h3>Service Sheet</h3>
            </div>
          </div>

          <div class="col col-sm-6 col-xs-6">
            <div class="bookmark float-right">
              <!-- <b-button to="/service" pill size="sm" variant="light">Back</b-button> -->
              <router-link
                to="/service"
                class="btn btn-sm btn-light active btn-pill"
              >
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
          <client-info
            :client="service.account"
            :property="service.property"
          ></client-info>

          <section class="card">
            <div class="card-header b-l-primary border-3 p-t-10 p-b-10">
              <h5 class="card-title">SERVICE DETAILS</h5>
            </div>
            <div class="card-body p-t-5 p-b-5">
              <section class="d-flex justify-content-between m-b-5">
                <div>
                  <i class="fa fa-user fa-circle-o fa-2x circle-icon"></i>
                  {{ service.service_type }}
                </div>
                <div class="text-right">
                  {{ service.service_start_date | moment("ddd MMM DD, YYYY") }}
                  <br />
                  {{ service.service_start_date | moment("hh:mm A") }} -
                  {{ service.service_end_date | moment("hh:mm A") }}
                </div>
              </section>
              <section class="d-flex justify-content-between m-b-5">
                <div>
                  <i class="fa fa-user fa-user fa-2x circle-icon m-r-5"></i
                  >{{ service.team_leader ? service.team_leader: 'No Team Leader' }}
                </div>
              </section>

              <div>
                <i class="fa fa-wrench fa-2x circle-icon m-r-5"></i>
                {{ technicianCount }}
              </div>
            </div>
          </section>
          
          <scroll-fixed-header :fixed.sync="fixed" :threshold="500" v-if="technicians.length > 0">
            <b-card title="Team Members">
              <technicians
                :items="technicians"
                @startTechnician="start"
                @endTechnician="end"
              />
            </b-card>
          </scroll-fixed-header>

          <template v-if="service.locations">
            <div
              class="card card-absolute m-t-30 border"
              v-for="(location, index) in service.locations"
              :key="index"
            >
              <div class="card-header bg-primary p-t-10 p-b-10">
                <h5>{{ location.location_type }}</h5>
              </div>
              <div class="card-body">
                <draggable
                  draggable="false"
                  group="technicians"
                  :list="temp"
                  @change="added($event, location)"
                >
                  <div
                    style="border: 1px dashed #ebedf2; height: 100%; min-height: 45px; background: #90caf9"
                    class="p-1 p-b-5"
                  >
                    <template v-if="location.meta">
                      <div
                      
                      >
                        <template v-for="(technician, index) in location.meta.technicians">
                          <span
                            @click="
                              removeGlobalTechnician(
                                technician,
                                location,
                                index
                              )
                            "
                            style="font-size: .7rem;"
                            :key="index"
                            class="btn btn-warning btn-pill m-r-5 m-t-5 "
                          >
                            {{ technician.memberName }}
                            <i class="fa fa-remove text-dark"></i>
                          </span>
                        </template>
                      </div>
                    </template>
                  </div>
                  <!-- <div
                    style="border: 1px dashed #ebedf2; height: 5vh; background: #90caf9"
                  >
                    <template v-if="locations[index].members">
                      <div
                        class="d-flex justify-content-end align-items-center"
                      >
                        <template
                          v-for="(technician, index) in locations[index]
                            .members"
                        >
                          <span
                            @click="
                              removeGlobalTechnician(
                                technician,
                                location,
                                index
                              )
                            "
                            style="font-size: .7rem;"
                            :key="index"
                            class="btn btn-warning btn-pill m-r-5 m-t-5 "
                          >
                            {{ technician.memberName }}
                            <i class="fa fa-remove text-dark"></i>
                          </span>
                        </template>
                      </div>
                    </template>
                  </div> -->
                </draggable>

                <template v-if="location.objects.length > 0">
                  <table class="table m-t-50">
                    <tbody>
                      <tr v-for="(item, index2) in location.objects" :key="index2">
                        <td>
                          <div>
                            <b-badge class="m-r-5" variant="dark" pill>{{ item.quantity }}</b-badge>
                            <strong>{{ item.name }} </strong>
                          </div>
                          <div>{{ item.size }}</div>
                          <div>
                        
                            <draggable draggable="false" group="technicians" :list="temp" @change="addTechnicianItem($event, item, location)">
                              <div style="border: 1px dashed #ddd; min-height: 45px; height: 100%; background: #eee">
                              
                                <template v-if="item.meta">
                                  <div class="d-flex justify-content-end  align-items-center">
                                    <template  v-for="(technician, index3) in item.meta.technicians">
                                      <span @click="
                                          removeItemTechnician(
                                            technician,
                                            location,
                                            item,
                                            index3
                                          )
                                        "
                                        style="font-size: .7rem;"
                                        :key="index3"
                                        class="btn btn-warning btn-pill m-r-1 m-t-5 m-r-5"
                                      >
                                        {{ technician.memberName }}
                                        <!-- <i class="fa fa-remove text-danger"></i> -->
                                      </span>
                                    </template>
                                  </div>
                                </template>
                                <!-- <template v-if="locations[index].items[index2]">
                                  <div
                                    class="d-flex justify-content-end align-items-center"
                                  >
                                    <template
                                      v-for="(technician, index3) in locations[
                                        index
                                      ].items[index2].technicians"
                                    >
                                      <span
                                        @click="
                                          removeItemTechnician(
                                            technician,
                                            location,
                                            item,
                                            index3
                                          )
                                        "
                                        style="font-size: .7rem;"
                                        :key="index3"
                                        class="btn btn-warning btn-pill m-r-1 m-t-5 m-r-5"
                                      >
                                        {{ technician.memberName }}
                                        <i class="fa fa-remove text-danger"></i>
                                      </span>
                                    </template>
                                  </div>
                                </template> -->

                              </div>
                            </draggable>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </template>

                <template v-else>
                  <div class="text-muted text-center m-t-10">
                    No item added in the {{ location.location_type }}.
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClientInfo from "@/components/ClientInfo";
import Technicians from "@/components/Technicians";
import Draggable from "vuedraggable";
export default {
  name: "service_show",
  components: {
    ClientInfo,
    Technicians,
    Draggable,
  },

  data() {
    return {
      fixed: false,
      locations: [],
      technicians: [],

      added_technician: [],

      item_added: [],

      start_drag: false,

      temp: [],

      location_technicians: {
        allocated_members: [],
      },

      item_technicians: [],

      loading: false,
      account: {},
      property: {},
      url: process.env.VUE_APP_BASE_URL,
      token: this.$store.getters["auth/token"],
      service_id: this.$route.params.id,
      service: {
        allocated_members: [],
        // locations:
        // [{members: []}],
        property: {},
        account: {},
      },
    };
  },

  computed:{
     technicianCount(){
         return this.service.allocated_members == null ?  'No technician' : `${this.service.allocated_members.length} Techinician`;
      }
  },

  methods: {
    removeItemTechnician(technician, location, item) {
      this.bootbox.confirm(
        `Are you sure you want to remove ${technician.name} in the ${item.name}?`,
        (result) => {
          if (result) {
            //remove technician in item
            this.item_technicians = this.item_technicians.filter(
              (v) => v.name !== technician.name
            );

            // let exists = this.location_technicians.some(v=>);

            //check if technician under item, otherwise remove in global

            // this.location_technicians = this.location_technicians.filter(v=>);
          }
        }
      );
    },

    removeGlobalTechnician(technician, location, index) {
      let params = {
        api_token: this.token,
        sid: this.service_id,
        slid: location.service_location_id,
        deleted_atm: technician.memberId,
        p_atm: encodeURI(this.getGlobalTecnician(location, technician)),
      };

      console.log(params);

    

      // this.locations.members.splice(index, 1);

      this.bootbox.confirm(
        `  
         Are you sure you want to remove 
         ${technician.name} in the 
         ${location.name} area? 
         ${technician.name} 
         will be removed also in all the items inside this area.`,
        (result) => {
          if (result) {
            this.$axios({
              url: `${this.url}/services/hygienization/servicesheet/location/team-assignment/delete`,
              params: params,
            })
              .then((res) => res.data)
              .then((response) => {
                let res = response.data;

                if (response.code == 200) {
                  this.$store.dispatch("notification/addNotification", {
                    message: `${res.deleted_technician.memberName} has been removed from the ${location.location_type}.`,
                    type: "success",
                  });
                }
                this.init();
              });
          }
        }
      );
    },

    getGlobalTecnician(location, technician) {

      let parent_technicians = [];

      this.service.locations.forEach((v, i) => {

        if (v.service_location_id == location.service_location_id) {
          
          let technicians = Object.values(v.meta.technicians);
          
          console.log(technicians);

          parent_technicians = technicians
            .map((v) => {
              if (v.memberId != technician.memberId) {
                return v.memberId;
              }
            })
            .filter((v) => v !== undefined);
        }

      });

      return parent_technicians;
    },


    addTechnicianItem(e, item, location) {
      
      let d = e.added.element;
      
    let array = []
      this.service.locations.forEach((v, i) => {
        if (v.service_location_id == location.service_location_id) {

          v.objects.forEach((v2, i2)=>{
                if(v2.id == item.id){
                    
                    if(v2.meta === null){
                        array = [d.memberId];
                    }
                    else{
                        
                        if(v2.meta.length == 0){
                          array = [d.memberId];
                        }

                        if(Object.keys(v2.meta).length > 0){
                          array = v2.meta.technicians.map(v3=>v3.memberId);
                        array.push(d.memberId)
                      }

                    }

                
                 
                 
        
                }
             
            });

        }
      });

     

         let parent_id = [];
        this.service.locations.forEach((v,i)=>{
          if( v.service_location_id == location.service_location_id ){

                if(v.meta == null){
                   parent_id = [d.memberId]
                }
                else{
                   
                    if(v.meta.length == 0){
                       parent_id = [d.memberId]
                    }

                 

                    if( Object.keys(v.meta).length > 0 ){
                       let tech = Object.values(v.meta.technicians)
                          console.log(tech);
                          tech.forEach((v2, i2)=>{
                            console.log('asdf'+ v2);
                            parent_id.push(v2.memberId)
                          });

                      parent_id.push(d.memberId)
                    }

                }
               
              
          }
        });

        console.log(parent_id);


       const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }


      let params = {
        sid: this.service_id,
        slid: location.service_location_id,
        sl_item_id: item.id,
        api_token: this.token,
        p_atm: encodeURI(parent_id.filter(unique)),
        atm: encodeURI(array.filter(unique)),
      };


      this.$axios({
        url: `${this.url}/services/hygienization/servicesheet/location/item/team-assignment`,
        method: "get",
        params: params,
      })
        .then((res) => res.data)
        .then((response) => {
          let res = response.data;
          this.init();         

        });


     

    
        // let params2 = {
        //   api_token: this.token,
        //   sid: this.service_id,
        //   slid: location.service_location_id,
        //   atm: encodeURI(parent_id),
        // };

        // console.log(params2);


        // this.$axios({
        //   url: `${this.url}/services/hygienization/servicesheet/location/team-assignment`,
        //   method: "get",
        //   params: params2,
        // })
        //   .then((res) => res.data)
        //   .then((response) => {
        //     this.init();
        
        //   })
        //   .catch((e) => {
        //     this.$store.dispatch("notification/addNotification", {
        //       message: e.message,
        //       type: "danger",
        //     });
        //   });

    },

    added(e, location) {
      let d = e.added.element;

     
          let array = []
          this.service.locations.forEach((v,i)=>{
          if(v.service_location_id == location.service_location_id){
            
          
            if(v.meta !== null){
              if(Object.keys(v.meta).includes('technicians')){
                 
                  let technicians = Object.values(v.meta.technicians);

                
                    
                  array = technicians.map(v2=> v2.memberId)

                  let exists = technicians.some(v2 => v2.memberId == d.memberId);
                    if(!exists){
                      array.push(d.memberId)
                    }
                    else{
                      this.$store.dispatch('notification/addNotification', {
                        type: 'warning',
                        message: `${d.memberName} already added in the ${location.location_type}.`
                      })
                    }
                }
                else{

                  array = [d.memberId]
                }

            }
            else{
              array = [d.memberId]
            }
            

            }
            
          
        });

      

        let params = {
          api_token: this.token,
          sid: this.service_id,
          slid: location.service_location_id,
          atm: encodeURI(array),
        };

        console.log(params);

        this.$axios({
          url: `${this.url}/services/hygienization/servicesheet/location/team-assignment`,
          method: "get",
          params: params,
        })
          .then((res) => res.data)
          .then((response) => {
            this.init();
            
          })
          .catch((e) => {
            this.$store.dispatch("notification/addNotification", {
              message: e.message,
              type: "danger",
            });
          })
          .finally(() => (this.loading = false));

     
    },

    start() {
      this.start_drag = true;
    },
    end() {
      this.start_drag = false;
      this.temp = [];
    },

    init() {
      this.$axios({
        url: `${this.url}/services/servicesheet/${this.service_id}?api_token=${this.token}`,
      })
        .then((res) => res.data)
        .then((res) => {
          if (res.code == 200) {
            this.service = res.data;

            if (res.data.with_allocated_members) {
              this.technicians = this.service.allocated_members;
            }
          }
        })
   
    },
  },

  created() {
    this.init();
  },
};
</script>

<style scoped>
div.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
</style>
