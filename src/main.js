import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import * as qs from 'qs';
 import moment from 'moment';

import 'bootstrap'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import AxiosPlugin from 'vue-axios-cors';
import * as VueGoogleMaps from 'vue2-google-maps'
import Notifications from 'vue-notification'
import bootbox from 'bootbox';

import ScrollFixedHeader from 'vuejs-scroll-fixed-header';
Vue.use(ScrollFixedHeader);


Vue.use(Notifications)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_APIKEY,
    libraries: ['places', 'localContext'] // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})


Vue.use(AxiosPlugin)

Vue.use(require('vue-moment'));

Vue.prototype.bootbox = bootbox;

const token = localStorage.getItem('token')

Vue.filter('stripWords', v => v.subString(0, 20));
Vue.filter('formatDate', (v, format = 'YYYY-MM-DD')=>  moment(v).format(format));

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
