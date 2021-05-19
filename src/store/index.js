import Vue from 'vue'
import Vuex from 'vuex'

import object from './modules/object';
import auth from './modules/auth'
import app from './modules/app'
import notification from './modules/notification'
import inspection from './modules/inspection'
import inspections from './modules/inspections'
import editinspection from './modules/editinspection'
import inspectionItem from './modules/inspectionItem'
import service from './modules/service'
import joborder from './modules/joborder'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    joborder,
    inspectionItem,
    editinspection,
    notification,
    inspections,
    inspection,
    service,
    object,
    auth,
    app
  }
})
