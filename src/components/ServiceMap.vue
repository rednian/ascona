<template>
    <div id="map" :style="style" class="border p-5">
    </div>
</template>
<script>
export default {
    name: 'ServiceMap',
    props:{
        height:{
            default: 100,
            required: true
        }
    },
    data(){
        return{
            map:{
                lat: null,
                long: null
            }
        }
    },
    computed:{
        style(){
            return{
                height: `${this.height}px`,
                width: '100%'
            }
        }
    },

    methods:{
        load(){
            this.initMap()
            this.$emit('load', this.map);
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

            this.map.lat = location.coords.latitude;
            this.map.long = location.coords.longitude;
                
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

    mounted(){
        this.initMap()
    }

}
</script>