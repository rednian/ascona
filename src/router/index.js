import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
// import  store  from 'vuex';

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'not_found',
    meta:{
      unauthenticated: true,
      requiresAuth: false
    },
    component: ()=> import(/* webpackChunkName: "not-found" */ '../views/errors/PageNotFound.vue'),
  },
  {   
    path: '/login',
    name: 'login',
    meta:{
      unauthenticated: true,
      requiresAuth: false
    },
    component: ()=> import(/* webpackChunkName: "login" */ '../views/authentication/login.vue'),
  },
  {
    path: '/email-confirmation',
    name: 'password.email',
    meta:{
      unauthenticated: true,
      requiresAuth: false
    },
    component: ()=> import(/* webpackChunkName: "email_confirmation" */ '../views/authentication/email-confirmation.vue'),
  },
  {
    path: '/reset-password',
    name: 'password.reset',
    meta:{
      unauthenticated: true,
      requiresAuth: false
    },
    component: ()=> import(/* webpackChunkName: "password_reset" */ '../views/authentication/reset-password.vue'),
  },
  {
    path: '/',
    name: 'dashboard',
    component: ()=> import(/* webpackChunkName: "dashboard" */ '../views/dashboard/Index.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/user/profile',
    name: 'user.profile',
    component: () => import(/* webpackChunkName: "user_profile" */ '../views/authentication/profile.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/inspection',
    name: 'inspection',
    component: () => import(/* webpackChunkName: "inspection.index" */ '../views/inspection/Index.vue'),
    props: true,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/inspection/:id/create',
    component: () => import(/* webpackChunkName: "inspection.create" */ '../views/inspection/create.vue'),
    name: 'inspection.create',
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/inspection/:id',
    component: () => import(/* webpackChunkName: "inspection.show" */'../views/inspection/show.vue'),
    name: 'inspection.show',
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/inspection/:id/edit',
    component: () => import(/* webpackChunkName: "inspection.edit" */'../views/inspection/edit.vue'),
    name: 'inspection.edit',
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/inspection/location/:property_id/create',
    component: () => import(/* webpackChunkName: "inspection.location.create" */'../views/inspection/location/create.vue'),
    name: 'inspection.location.create',
    props: true,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/inspection/location/:property_id/show',
    component: () => import(/* webpackChunkName: "inpsection.property.show" */'../views/inspection/location/show.vue'),
    name: 'inspection.location.show',
    props: true,
    meta:{
      requiresAuth: true
    }
  },

  // services
  {
    path: '/service',
    component: () => import(/* webpackChunkName: "service.index" */'../views/service/Index.vue'),
    name: 'service.index',
    meta:{
      requiresAuth: true
    }
  },

  {
    path: '/service/:id/report/create',
    component: () => import(/* webpackChunkName: "service.create" */'../views/service/report/create.vue'),
    name: 'service.report.create',
    meta:{
      requiresAuth: true
    }
  },

  {
    path: '/service/:id/report',
    component: () => import(/* webpackChunkName: "service.report" */'../views/service/report/show.vue'),
    name: 'service.report.show',
    meta:{
      requiresAuth: true
    }
  },

  {
    path: '/service/:id/report/edit',
    component: () => import(/* webpackChunkName: "service.report.edit" */'../views/service/report/edit.vue'),
    name: 'service.report.edit',
    meta:{
      requiresAuth: true
    }
  },

  {
    path: '/service/:id/service-sheet',
    component: () => import(/* webpackChunkName: "service.service_sheet" */'../views/service/service-sheet/show.vue'),
    name: 'service.service_sheet.show',
    meta:{
      requiresAuth: true
    }
  },

  {
    path: '/service/:id/service-checklist',
    component: () => import(/* webpackChunkName: "service.checlist" */'../views/service/checklist/show.vue'),
    name: 'service.checklist.show',
    meta:{
      requiresAuth: true
    }
  },
  
  // Team Rating
  {
    path:'/service/:id/team-rating',
    name:'service.team_rating.create',
    component: () => import(/* webpackChunkName: "service.team_rating" */'../views/service/team_rating/create.vue'),
    meta:{
      requiresAuth: true
    }
   },

  {
    path: '/service/sheet',
    component: () => import(/* webpackChunkName: "service.sheet" */'../views/service/service-sheet.vue'),
    name: 'service.sheet',
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/job-order',
    component: () => import(/* webpackChunkName: "job_order.index" */'../views/joborder/index.vue'),
    name: 'job_order.index',
    meta:{
      requiresAuth: true
    }
  },

  {
    path: '/job-order/:date',
    component: () => import(/* webpackChunkName: "job_order.date" */'../views/joborder/show.vue'),
    name: 'job_order.show',
    meta:{
      requiresAuth: true
    }
  },

  //Quality check
  {
    path: '/quality-check',
    component: () => import(/* webpackChunkName: "quality_check.index" */'../views/quality_check/index.vue'),
    name: 'quality_check.index',
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/quality-check/:id',
    component: () => import(/* webpackChunkName: "quality_check.show" */ '../views/quality_check/show.vue'),
    name: 'quality_check.show',
    meta:{
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  watch: {
    $router(to, from){
      console.log(from);
    }
  },
});

router.beforeEach((to, from, next)=>{

  if(to.matched.some(record => record.meta.requiresAuth)){
    
    if(store.getters['auth/isLogin']){
      next();
      return;
    }
    next('/login')
  }
  else{
    next()
  }
});

export default router
