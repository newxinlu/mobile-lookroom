import Vue from "vue";
import Router from "vue-router";
const working=()=>import('../src/views/working.vue')
const newhouse_details=()=>import('../src/views/newhouse_details.vue')
const secondadd=()=>import('../src/views/secondadd.vue')
const adduser=()=>import('../src/views/adduser.vue')
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "working",
      component: working
    },
    {
      path: "/newhouse_details",
      name: "newhouse_details",
      component:newhouse_details
    },
    {
      path: "/secondadd",
      name: "secondadd",
      component: secondadd
    },
    {
      path: "/adduser",
      name: "adduser",
      component: adduser
    },
  ]
});
