<template>
   <div class="page-body">
   <div class="container-fluid">
      <div class="page-header">
         <div class="row">
            <div class="col col-sm-6 col-xs-6">
               <div class="page-header-left">
                  <h3><i class="fa fa-map-marker"></i> PROPERTY LOCATION</h3>
               </div>
            </div>

            <div class="col col-sm-6 col-xs-6">
               <div class="bookmark float-right">

                  <router-link to="/inspection" class="btn btn-sm btn-light active btn-pill">
                     Back
                  </router-link>

               </div>
            </div>
         </div>

      </div>
   </div>
   <div class="container-fluid">
       <div class="row starter-main">
        <b-overlay :show="loading" rounded="sm" style="width: 100%">
           <div class="col-sm-12">
               <div class="card">
                    <div class="card-body p-t-10 p-b-10">

                          <div v-if="map.has_error" class="alert alert-danger inverse alert-dismissible fade show" role="alert">
                            <i class="icon-alert txt-dark"></i>
                            <p>{{ map.error }}</p>
                            <button class="close txt-light" type="button" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <section id="map" style="height: 350px; width:100%" class="border p-5"></section>  
                    </div>
                </div>

                 <div class="card m-t-5">
                    <div class="card-header b-l-primary border-3  border-3 p-t-10 p-b-10">
                        <h5>DETAILS</h5>
                    </div>
                    <div class="card-body p-t-10 p-b-10">
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td class="font-weight-bold td-r" width="13%" align="right">Client :</td>
                                    <td>{{ params.account }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold" width="13%" align="right">Location :</td>
                                    <td>{{ location.property.address }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold" width="13%" align="right">PID :</td>
                                    <td>{{ location.geolocation.property_id }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold" width="13%" align="right">Latitude :</td>
                                    <td>{{ location.geolocation.latitude }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold" width="13%" align="right">Longitude :</td>
                                    <td>{{ location.geolocation.longitude }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold" width="13%" align="right">Makani No. :</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>

 
                    </div>
                </div>
            </div>
        </b-overlay>
        </div>
   </div>

</div>
</template>
<script>
export default {
    name: 'inspection_show',
    
    data(){
        return{
            url: process.env.VUE_APP_BASE_URL,
            loading: false,
            params:{
                property_id: this.$route.params.property_id,
                api_token: this.$store.getters['auth/token'],
                account: this.$route.query.account,
                address: this.$route.query.address,
            },
            location: {
                geolocation:{},
                property: {}
            },
            map:{
                zoom: 17,
                type:'roadmap',
                center: {},
                error: null,
                has_error: false,
            },
        }
    },

    methods:{
        center(e){
            console.log(e);
        },
        async getProperty(){
            return await this.$axios({
                url: `${this.url}/properties/geolocation/show/${this.params.property_id}?api_token=${this.params.api_token}`, 
                method: 'get'
            }).then(response=>response.data);
        },

        async getLocation(){
            this.loading = true;

            let response = await this.getProperty();

            if(response.code == 200){

                this.location = response.data;

                let center = {
                    lat: this.location.geolocation.latitude, 
                    lng: this.location.geolocation.longitude 
                };

                let options = {
                    center: center,
                    zoom: 18,
                    mapTypeId: "roadmap",
                    heading: 90,
                    tilt: 45
                };
                
                let map = await new window.google.maps.Map(document.getElementById('map'), options);

                await new window.google.maps.Marker({
                    position: center,
                    animation: window.google.maps.Animation.DROP,
                    map
                });
            }

            this.loading = false;

           
        }
    },

   

    mounted(){
        this.getLocation();
    }
}
</script>

