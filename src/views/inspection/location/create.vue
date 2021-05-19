<template>
    <div class="page-body">
        <div class="container-fluid">
            <div class="page-header">
                <div class="row">
                    <div class="col col-sm-6 col-xs-6">
                        <div class="page-header-left">
                            <h3><i class="fa fa-map-marker"></i> MARK LOCATION</h3>
                        </div>
                    </div>

                    <div class="col col-sm-6 col-xs-6">
                        <div class="bookmark float-right">
                            <button type="button" @click="cancel" class="btn btn-sm btn-light active btn-pill"> Back</button>
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

                                <div id="map" style="height: 350px; width:100%" class="border p-5"></div>
                                <div class="alert alert-info inverse alert-dismissible fade show m-t-10" role="alert"><i
                                        class="icon-help-alt"></i>
                                    <p>Help us improve our system by saving the property location in the map or entering
                                        the <code>Makani No.</code> of the property.
                                    </p>
                                </div>
                                <form method="post" class="m-t-10" @submit.prevent="saveLocation">
                                    <div class="form-group row">
                                        <div class="col-sm-2"></div>
                                        <div class="col-sm-10">
                                            <button type="button" @click="locateMe"
                                                    class="btn btn-sm btn-outline-success"><i
                                                    class="fa fa-map-marker"></i> Locate My Position
                                            </button>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Client</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly
                                                   v-model="location_form.account">
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Location</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly
                                                   v-model="location_form.address">
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">PID <span
                                                class="text-danger">*</span></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" autocomplete="off"
                                                   v-model="location_form.property_id" required>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Latitude <span
                                                class="text-danger">*</span></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" autocomplete="off"
                                                   v-model="location_form.latitude" required>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Longitude <span
                                                class="text-danger">*</span></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" autocomplete="off"
                                                   v-model="location_form.longitude" required>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Makani No.</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="location_form.makani_no" autocomplete="off"
                                                   class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="float-right">
                                        <button @click="cancel" class="btn btn-light active btn-pill m-r-5" type="button">Cancel</button>
                                        <button :disabled="btn_is_save" class="btn btn-pill btn-primary " type="submit">{{ btn_save }}</button>
                                        </div>
                                    </div>
                                </form>
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
        name: 'locationCreate',
        data() {
            return {
                btn_save: 'Save',
                btn_is_save: false,
                map: {},
                current_location: {},
                loading: false,
                location_form: {
                    api_token: this.$store.getters['auth/token'],
                    account: this.$route.query.account,
                    account_id: this.$route.query.account_id,
                    account_type_id: this.$route.query.account_type_id,
                    address: this.$route.query.address,
                    property_id: this.$route.params.property_id,
                    latitude: null,
                    longitude: null,
                    makani_no: null,
                },
            }
        },


        methods: {

            cancel(){
                this.$router.push({name:'inspection'});
            },
            

            async saveLocation() {
                    this.btn_is_save = true;
                    this.btn_save = 'Saving...';

                   await this.$axios({
                       url: `${process.env.VUE_APP_BASE_URL}/properties/geolocation/store`,
                       data: this.location_form ,
                       method: 'post'
                    }).then((response)=>{
                        
                        this.btn_is_save = false;
                        this.btn_save = 'Save';

                        this.$router.push({name: 'inspection'});
                    }).catch(err=>{
                        this.btn_is_save = false;
                        this.btn_save = 'Save';
                        alert(err.message)
                    });
            },

            location() {
                const params = {
                    api_token: this.$store.getters['auth/token'],
                    property_id: this.$route.params.property_id
                };
                 this.$axios({
                    url: `${process.env.VUE_APP_BASE_URL}/properties/geolocation/create`,
                    params: params
                })
                    .then((response) => {
                        this.current_location = response.data
                    });
            },

             locateMe() {
                 this.loading = true;
                 this.initMap();
                 this.loading = false;
            },

            async getLocation(){
                return new Promise((resolve, reject)=>{
                    if(!('geolocation' in navigator)){
                        reject(new Error('Geolocation in not available.'));
                    }

                    var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                    };

                    navigator.geolocation.getCurrentPosition(position=>{ resolve(position)}, error=>{reject(error)}, options);
                });
            },

            async initMap() {
                this.loading = true;
                
                let location = await this.getLocation();

                this.location_form.latitude = location.coords.latitude
                this.location_form.longitude = location.coords.longitude

                let center = {
                    lat: this.location_form.latitude, 
                    lng: this.location_form.longitude 
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

                this.loading = false; 
            }


        },


        created() {
           
            this.location();
            this.initMap();
        }
    }
</script>