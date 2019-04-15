import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Qs from "qs";
import MintUI from "mint-ui";
import Bridge from "./webview"
import VueAMap from 'vue-amap';
import "mint-ui/lib/style.css";
import VueAwesomeSwiper from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')
require("../src/assets/universal.css")
require("../src/assets/bulid.css")
require("../src/assets/zy.css")
require("../src/assets/iconfont.css")

Vue.use(MintUI);
Vue.config.productionTip = false;
const root = process.env.NODE_ENV==='production' ? "http://cslookroom.wzxlkj.cn/ashx/" : "/api/" ;
var axios_instance = axios.create({
  baseURL: root,
  transformRequest: [
    function (data) {
      data = Qs.stringify(data);
      return data;
    }
  ],
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
Vue.use(VueAMap);
Vue.prototype.$http = axios_instance;
Vue.prototype.$bridge = Bridge
VueAMap.initAMapApiLoader({
  key: 'f7c3e87347c540092507e42fb6ed93fe',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'AMap.CitySearch', 'AMap.Geocoder'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
Vue.use(VueAwesomeSwiper, /* { default global options } */ )
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
