<template>
  <div>
    <div class="details_carousel">
      <swiper
        :options="swiperOption2"
        class="carousel_img"
        style="z-index:0;width:100%"
      >
        <swiper-slide
          style="z-index:0;width:100%"
          v-for="item in projectList.piclist"
          :key="item.id"
        >
          <img
            :src="item.url"
            class="carousel_headimg"
            @click="openimg(1)"
          />
        </swiper-slide>
      </swiper>

      <div
        class="headimg_leftbottom"
        v-if="itid>0"
      >
        <div class="headimg_black">佣金方案：{{priceList.title}}</div>
      </div>
      <div
        class="swiper-pagination pagination_postive"
        slot="pagination"
      ></div>
    </div>
    <ul class="details_padding">
      <li class="details_title">
        <div>
          <span class="details_name">{{projectList.Title}}</span>
          <div class="details_prices">{{projectList.price}}元/m²</div>
        </div>
        <div class="details_alits">别名：
          <span>{{projectList.Alias?projectList.Alias:'暂无'}}</span>
        </div>
        <ul
          class="details_nums"
          v-if="itid == 2"
        >
          <li class="details_people">
            <p>
              报备经纪人
            </p>
            <p class="details_peonum">
              {{projectList.UserCount}}
            </p>
          </li>
          <li class="details_people">
            <p>
              报备客户
            </p>
            <p class="details_peonum">
              {{projectList.CustomerCount}}
            </p>
          </li>
          <li class="details_people">
            <p>
              成交客户
            </p>
            <p class="details_peonum">
              {{projectList.CustomerCount2}}
            </p>
          </li>
        </ul>
      </li>
      <li class="details_title_two">
        <div class="details_name_two_padding">
          <span> {{ruleList.title ? ruleList.title : '判客规则'}}</span>
        </div>
        <!-- <p class="details_name_two_padding details_name_two_noline" v-if="ruleList">
          {{ruleList.title}}
        </p> -->
        <p
          class="details_rule"
          :class="is.indexOf(1) ==-1 ?'rule_style_none':'' "
          v-html="ruleList.content"
        ></p>
        <div
          class="rule_more"
          @click="GetRule($event,1)"
          v-text="is.indexOf(1) ==-1 ?'查看更多':'没有更多了'"
        ></div>
      </li>
      <li class="details_title">
        <ul class="details_label">
          <li
            v-for="(row,rindex) in projectList.taglist"
            :key="rindex"
          >
            {{row.Title}}
          </li>

        </ul>
        <div class="all_details">
          <p
            class="all_details_p flex_div"
            v-for="(Bli,lindex) in alllist"
            :key="lindex"
            v-if="Bli.value"
          >
            <span class="all_details_gary">
              {{Bli.name}} ：
            </span>
            <span class="all_details_black flex_cont">
              {{Bli.value}}
            </span>
          </p>
        </div>
      </li>
      <li class="details_title_two">
        <div class="details_name_two_padding">
          <span>户型图</span>
        </div>
        <swiper
          :options="swiperOption"
          class="swiperpic_all_padding"
        >
          <swiper-slide
            v-for="(slide, index) in houseingList"
            :key="index"
            class="swiperpic_all"
          >
            <div class="swiper-slide swiperpic">
              <div>
                <img
                  :src="slide.url"
                  class="room_details"
                  @click="openimg(2)"
                />
                <p class="room_nums">
                  {{slide.title}}
                </p>
                <p class="room_area">
                  {{slide.content}}
                </p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </li>
      <li class="details_title_two">
        <div class="details_name_two_padding">
          <span>楼盘动态</span>
        </div>
        <p class="details_name_two_padding details_name_two_noline">
          {{runList.title}}
        </p>
        <p
          class="details_rule"
          :class="is.indexOf(2) ==-1 ?'rule_style_none':'' "
          v-html="runList.content"
        >

        </p>
        <div
          class="rule_more"
          @click="GetRule($event,2)"
          v-text="is.indexOf(2) ==-1 ?'查看更多':'没有更多了'"
        ></div>
      </li>
      <li class="details_title_two">
        <div class="details_name_two_padding">
          <span>项目位置</span>
        </div>

        <div class="mapdiv">
          <el-amap
            vid="amapDemo"
            :zoom="zoom"
            :center="center"
            class="amap-demo"
            :dragEnable="dragEnable"
            :scrollWheel="scrollWheel"
            :doubleClickZoom="doubleClickZoom"
          >
            <el-amap-marker
              vid="component-marker"
              :position="componentMarker.position"
              :content-render="componentMarker.contentRender"
            ></el-amap-marker>
            <el-amap-marker
              v-for="(marker, index) in markers"
              :key="index"
              :position="marker.position"
              :events="marker.events"
              :visible="marker.visible"
              :draggable="marker.draggable"
              :vid="index"
            ></el-amap-marker>
          </el-amap>
        </div>
      </li>
      <li class="details_title_two details_title_bottom">
        <div class="details_name_two_padding">
          <span>详情信息</span>
        </div>

        <div
          class="list_cont"
          v-html="projectList.Content"
        >
        </div>
      </li>
    </ul>
    <ul class="detail_bottom">
      <li
        class="detail_collection"
        @click="conent()"
      >
        <div>
          <i
            class="iconfont  collectionfont"
            :class="projectList.isfavorite == 1?'icon-shoucang collection':'icon-shoucang1'"
          ></i>
          <!-- <img src="image/collection.png" class="collection"/>  -->
        </div>
        <p>
          {{shoucang}}
        </p>
      </li>
      <li class="detail_tel">
        <a @click="callTel">
          联系案场
        </a>
        <!-- <router-link :to="{name:'report',query:{Bid:Bid}}" exact tag="a">
          我要报备
        </router-link> -->
        <a @click="needReport">我要报备</a>
      </li>
    </ul>
  </div>

</template>
<script>
import { Toast, Indicator } from "mint-ui";
import axios from "axios";
const exampleComponents = {
  props: ['text'],
  template: `<div class="maptext">{{text}}</div>`
}
 
export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      is: [],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      swiperOption2: {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        }
      },
      swiperSlides: [1, 2, 3, 4, 5],
      projectList: [],
      ruleList: [],
      runList: [],
      priceList: [],
      houseingList: [],
      alllist: [],
      shoucang: "关注楼盘",
      Bid:this.$route.query.Bid,
      itid: this.$route.query.IdentityId || 0,
      uid: this.$route.query.Uid||0,
      slotStyle: {
        padding: '2px 8px',
        background: '#eee',
        color: '#333',
        border: '1px solid #aaa'
      },
      zoom: 14,
      center: [121.5073285, 31.21715058],
      scrollWheel: false,
      dragEnable: false,
      doubleClickZoom: false,
      markers: [
        {
          position: [121.5073285, 31.21715058],
          events: {
            dragend: (e) => {
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            },
          },
          visible: true,
          draggable: false,

        }
      ],
      componentMarker: {
        position: [121.5073285, 31.21715058],
        contentRender: (h, instance) => h(exampleComponents, { props: { text: '' } })
      },
    };
  },
  methods: {
    handler() { //地图
      var vm = this;
      Indicator.open('加载中...');
      this.$http
        .post(
          "Projects.ashx?t=7",//项目信息
          {
            id: vm.Bid,
            top: 0,
            uid:this.uid,
          },
      )
        .then(function (response) {
          vm.projectList = response.data.parma;
          vm.projectList.isfavorite == 1 ? vm.shoucang = "取消收藏" : vm.shoucang = "关注楼盘";
          vm.center = [response.data.parma.Longitude, response.data.parma.Latitude];
          vm.markers[0].position = vm.center;
          vm.componentMarker.position = vm.center;
          vm.componentMarker.contentRender = (h, instance) => h(exampleComponents, { props: { text: response.data.parma.Title } });
          Indicator.close();
        })
        .catch(function (error) {
          Indicator.close();
        });
    },
    GetRule(event, isNum) {
      var vm = this;
      vm.is.indexOf(isNum) == -1 ? vm.is.push(isNum) : vm.is = vm.is.filter(v => { return v != isNum });

    },
    ruleGet() {
      var vm = this;
      axios.all([
        this.$http
          .post(
            "Projects.ashx?t=8",//项目信息
            {
              Projectid: vm.Bid,
              classid: 14
            }),
        this.$http
          .post(
            "Projects.ashx?t=8",//楼盘动态
            {
              Projectid: vm.Bid,
              classid: 13
            }),
        this.$http
          .post(
            "Projects.ashx?t=8",//佣金方案
            {
              Projectid: vm.Bid,
              classid: 18
            }),
      ])
        .then(
          axios.spread(function (
            response,
            responsetwo,
            responsethree

          ) {

            if (response.data.state > 0) {
              vm.ruleList = response.data.parma[0];
            }
            if (responsetwo.data.state > 0) {
              vm.runList = responsetwo.data.parma[0];
            }
            if (responsethree.data.state > 0) {
              vm.priceList = responsethree.data.parma[0];
            }

          })
        )
        .catch(function (error) {

        });
    },
    houseing() {
      var vm = this;
      this.$http
        .post(
          "Projects.ashx?t=6",//获取楼盘户型图集
          {
            Projectid: vm.Bid,
            top: 3
          },
      )
        .then(function (response) {

          if (response.data.state > 0) {
            vm.houseingList = response.data.parma;
          }
        })
        .catch(function (error) {

        });
    },
    allList() {
      var vm = this;
      this.$http
        .post(
          "Projects.ashx?t=12",//列表信息
          {
            id: vm.Bid,
          },
      )
        .then(function (response) {

          vm.alllist = response.data.parma;

        })
        .catch(function (error) {

        });
    },
    conent() {
      let vm=this;
      this.$bridge.callhandler('nextCollection', { Bid: this.Bid }, function(responseData){
        if (responseData==1) {
          Toast('成功')
          if (vm.projectList.isfavorite == 0) {
            vm.projectList.isfavorite = 1;
            vm.shoucang = "取消收藏"
          }
          else {
            vm.projectList.isfavorite = 0;
            vm.shoucang = "关注楼盘"
          }
        } else {
          Toast('失败')
        }
      })
    },
    callTel() {
      this.$bridge.callhandler('nextCall', { tel: this.projectList.Telphone }, () => {

      })
    },
    needReport() {
      this.$bridge.callhandler('netxReport', { Bid: this.Bid, Bname: this.projectList.Title }, (responseData) => {

      })
    },

    openimg(item) {
      this.$router.push({ name: 'imglists', query: { pid: this.Bid, type: item } });
    }
  },

  mounted() {
    this.houseing();
    this.ruleGet();
    this.allList();

  },
  created() {
    this.handler();
  },

}
</script>
<style>
.amap-copyright,
.amap-logo {
  display: none !important;
}
.maptext {
  position: absolute;
  bottom: 1px;
  width: 100px;
  background: #fff;
  text-align: center;
}
.mapdiv {
  height: 200px;
}
.swiperpic {
  width: 12rem;
  padding-top: 0.8rem;
}

.swiperpic_all {
  width: 100%;
  margin-right: 0.7rem !important;
}
.collection {
  color: #f23334;
}
.collectionfont {
  font-size: 0.8rem;
}
.pagination_postive {
  text-align: right;
  color: #ffffff;
  width: calc(100% - 0.5rem);
}
.room_details {
  border: 1px solid #e0e0e0;
  border-radius: 0.15rem;
}
.details_title_two img {
  overflow: hidden;
}
.room_nums {
  font-size: 0.6rem;
}
.room_area {
  font-size: 0.4rem;
}
.all_details_gary {
  display: inline-block;
  flex: 0.3;
}
.all_details {
  padding-bottom: 0.5rem;
}
.flex_cont {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.list_cont {
  padding: 0.2rem;
}
.list_cont img {
  width: 100%;
}
.details_rule span {
  font-size: 10pt !important;
}
a {
  color: black;
}
</style>