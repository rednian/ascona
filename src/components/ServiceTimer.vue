<template>
    <div>
        <b-modal 
        id="service-timer-modal"
        centered
        no-close-on-esc
        no-close-on-backdrop
        size="lg"
        :title="`${title} Service`"
        >
    
        <template #default>
            <section class="row m-b-10">
                <div class="col-sm-12 col-xs-12">
                     <div id="map" style="height: 200px" class="border p-5"></div>
                </div>
            </section>

            <form action="">
                <div class="form-group row">
                    <label class="col-form-label col-sm-3 ">Service</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" :value="service.serviceType" readonly>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-form-label col-sm-3 ">Name</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" :value="service.account" readonly>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-form-label col-sm-3 ">Location</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" :value="service.address" readonly>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-form-label col-sm-3 ">Latitude</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" readonly v-model="form.latitude">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-form-label col-sm-3 ">Longitude</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" readonly v-model="form.longitude">
                    </div>
                </div>
                <hr>
                 <div class="form-group row">
                    <label class="col-form-label col-sm-3 ">{{ `${title}` }} Time</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" readonly v-model="form.time">
                    </div>
                </div>
                 <div class="form-group row">
                    <label class="col-form-label col-sm-3 ">{{`${title}`}} By</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" readonly v-model="form.user">
                    </div>
                </div>
                 <div class="form-group row">
                    <label class="col-form-label col-sm-3 ">Comments</label>
                    <div class="col-sm-9">
                        <textarea class="form-control" rows="3" v-model="form.comments"></textarea>
                    </div>
                </div>
            </form>
        </template>
         <template class="hide" #modal-footer="{hide}">
            <button @click="submit" class="btn btn-primary btn-pill m-r-5"  type="submit">{{ title }} service</button>
            <button @click="hide()" class="btn btn-light btn-pill active " type="button">Cancel</button>
        </template>
            <!-- {{ service }} -->

        </b-modal>
    </div>
</template>

<script>
 import moment from 'moment';
 import bootbox from 'bootbox';
export default {
    name: 'ServiceTimer', 
    props:{
        service:{
            type: Object,
            required: true,
            default: ()=> {},
        }
    },
    data(){
        return{
            form:{
                comments: null,
                latitude: null,
                longitude: null,
                time: null,
                user: null,
            },
           

            interval: null,
        }
    },
    computed:{
        title(){
            if(this.service.startTimeByTL === null){ return 'Start';}
            if(this.service.startTimeByTL !== null && this.service.endTimeByTL == null){ return 'End';}
            return false;
        },

        user(){
            return this.$store.getters['auth/user'];
        }
    },
    methods:{

        submit(){
            bootbox.confirm(`Are you sure you want to ${this.title} the service?`, (result)=>{
                if(result){
                    this.form.service = this.service.serviceType;
                    this.form.account = this.service.account;
                    this.form.account = this.service.address;

                    this.$emit('submit-service-time', this.form);
                }
            })
           
        },
    
        time(){
            this.form.time = moment().format('HH:mm:ss A');
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
        
            
                let location = await this.getLocation();

                let center = {
                    lat: location.coords.latitude, 
                    lng: location.coords.longitude
                };

                this.form.latitude = location.coords.latitude;
                this.form.longitude = location.coords.longitude;
                    
                let options = {
                    center: center,
                    zoom: 18,
                    mapTypeId: "roadmap",
                    heading: 90,
                    tilt: 45
                    };

                let map = await new window.google.maps.Map(document.querySelector('#map'), options);

                await new window.google.maps.Marker({
                    position: center,
                    animation: window.google.maps.Animation.DROP,
                    map
                });

            }
    },

    created(){
        this.interval = setInterval(this.time, 1000);
        this.form.user = `${this.user.first_name} ${this.user.last_name}`;
        
        this.$root.$on('bv::modal::show', (bvEvent, modalId) => {   
            this.initMap();
        });

    
    },
    beforeDestroy(){
        clearInterval(this.interval);
    }

}
</script>