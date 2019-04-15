<template>
  <div>
    <div class="worktitle border_botton">
      <span>团队业绩</span>
      <i
        class="iconfont icon-funnel mac_right ihne_hgight"
        @click="GrtNone(1)"
      ></i>
    </div>
    <div
      class="work_posabos"
      v-show="is != 0"
    >
      <ul class="flex_div border_botton work_project">
        <li
          class="flex_auto color_qh"
          @click="ifProject(1)"
          :class="ifIsP == 1?'blueColor_work':''"
        >项目</li>
        <li
          class="flex_auto color_qh"
          @click="ifProject(2)"
          :class="ifIsP == 2?'blueColor_work':''"
        >团队</li>
      </ul>
      <ul class="work_project">
        <li
          class="color_qh"
          v-if="ifIsP == 1"
          v-for="(project,index) in projectlistP "
          :key="index"
          @click="GetProjectKey(index,project.Key)"
          :class="myPid == project.Key?'blueColor_work':''"
        >{{project.name}}</li>
        <li
          class="color_qh"
          v-if="ifIsP == 2"
          @click="GetProjectKey(-2,'')"
          :class="GnowIndex == -2 ?'blueColor_work':''"
        >全部</li>
        <li
          class="color_qh"
          v-if="ifIsP == 2"
          v-for="(project,index) in projectlistG"
          :key="index"
          @click="GetProjectKey(index,project.Key)"
          :class="myGid.indexOf(project.Key) != -1?'blueColor_work':''"
        >{{project.name}}</li>

      </ul>
      <ul class="flex_div  work_project">
        <li
          class="flex_auto color_qh work_blue"
          @click="GetConfirm(0)"
        >确认</li>
        <li
          class="flex_auto color_qh"
          @click="GrtNone(0)"
        >取消</li>

      </ul>
      <div class="work_posabos_two">

      </div>
    </div>
    <div class="workfilter border_botton">
      <ul class="flex_div">
        <li
          class="flex_auto border_right"
          @click="dataChage(1)"
          :class="data==1?'liactive':''"
        >日报</li>
        <li
          class="flex_auto border_right"
          @click="dataChage(2)"
          :class="data==2?'liactive':''"
        >周报</li>
        <li
          class="flex_auto"
          @click="dataChage(3)"
          :class="data==3?'liactive':''"
        >月报</li>
      </ul>
    </div>
    <div class="workperfor">
      <div
        v-if="data==3"
        class="work_time"
      ><span
          @click="open('picker1')"
          class="work-first"
        >{{yestoDate}}</span><span
          class="timeright"
          @click="open('picker2')"
        >{{nowDate}}</span></div>
      <ul>
        <li>
          <span class="data">{{NumsList.CountOne}}</span>
          <p>待审核</p>
        </li>
        <li>
          <span class="data">{{NumsList.CountTwo}}</span>
          <p>已报备</p>
        </li>

        <li>
          <span class="data">{{NumsList.CountThree}}</span>
          <p>已带看</p>
        </li>
        <li>
          <span class="data">{{NumsList.CountFour}}</span>
          <p>已认筹</p>
        </li>
        <li>
          <span class="data">{{NumsList.CountFive}}</span>
          <p>已成交</p>
        </li>
        <li>
          <span class="data">{{NumsList.CountSix}}</span>
          <p>已失效</p>
        </li>
      </ul>
    </div>
    <div class="worktitle border_botton">
      <span>业绩柱状图(天)</span>
    </div>
    <div id="main">

    </div>
    <div
      class="workfunnel"
      style="display: none;"
    >
      <div class="con">
        <div class="title border_botton">
          <a class="border_right">项目</a>
          <a>团队</a>
        </div>
        <div class="list">
          <div class="one">
            <ul>
              <li>项目</li>
            </ul>
          </div>
          <div class="two">
            <ul>
              <li>团队</li>
            </ul>
          </div>
        </div>
        <a class="workok bot_bule">确认</a>
        <a class="workcancel">取消</a>
      </div>
    </div>
    <mt-datetime-picker
      ref="picker1"
      v-model="PickValue"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDatex"
      :endDate="endDatex"
      @confirm="handleChange"
    >
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="picker2"
      v-model="PickValue2"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDatex2"
      :endDate="endDatex2"
      @confirm="handleChangenow"
    >
    </mt-datetime-picker>
  </div>
</template>
<script>
import echarts from 'echarts';
import { Toast, Indicator, DatetimePicker } from "mint-ui";
import axios from "axios";
import spacetime from 'spacetime'
import { connect } from 'net';
export default {
  data() {
    return {
      startDatex: new Date(2015, 0, 1),
      endDatex: new Date(),
      startDatex2: new Date(2015, 0, 1),
      endDatex2: new Date(),
      PickValue: new Date(),
      PickValue2: new Date(),
      visible: false,
      projectlistP: [],
      projectlistG: [],
      ifIsP: 1,
      is: 0,
      PnowIndex: -1,
      GnowIndex: -1,
      myPid: 0,
      myGid: [],
      fristmyGid: [],
      fristmyPid: [],
      allGid: [],
      myGidtoString: '',
      data: 1,
      datetype: 1,
      NumsList: {
        CountOne: 0,
        CountTwo: 0,
        CountThree: 0,
        CountFour: 0,
        CountFive: 0,
        CountSix: 0
      },
      Line: {
        review: [],
        report: [],
        follow: [],
        recruit: [],
        signing: [],
        Count: 0
      },
      nowDate: spacetime().format('yyyy-MM-dd'),
      yestoDate: spacetime().subtract(1, 'days').format('yyyy-MM-dd')
    }
  },
  methods: {
    open(picker) {
      this.$refs[picker].open();
    },
    handleChange(value) {
      this.yestoDate = spacetime(value).format('yyyy-MM-dd');
      if (this.nowDate >= this.yestoDate) {
        let x = spacetime(this.nowDate).diff(spacetime(this.yestoDate), 'months');

        if (x < 1) {
          this.datetype = 1;
        }
        if (x > 1 && x <= 12) {
          this.datetype = 2;
        }
        if (x > 12) {
          this.datetype = 3;
        }

        this.getProject();
      }
      else {
        Toast('开始时间不能大于结束时间！！！');
        this.nowDate = spacetime().format('yyyy-MM-dd');
        this.yestoDate = spacetime().format('yyyy-MM-01');
      }

    },
    handleChangenow(value) {
      this.nowDate = spacetime(value).format('yyyy-MM-dd')
      if (this.nowDate >= this.yestoDate) {
        let x = spacetime(this.nowDate).diff(spacetime(this.yestoDate), 'months');
        if (x < 1) {
          this.datetype = 1;
        }
        if (x > 1 && x <= 12) {
          this.datetype = 2;
        }
        if (x > 12) {
          this.datetype = 3;
        }
        this.getProject();
      }
      else {
        Toast('开始时间不能大于结束时间！！！');
        this.nowDate = spacetime().format('yyyy-MM-dd');
        this.yestoDate = spacetime().format('yyyy-MM-01');
      }
    },
    // handleVisibleChange(isVisible) {
    //   console.log('弹窗是否展示:', isVisible);
    // },
    histogram() {
      let vm = this;
      var myChart = echarts.init(document.getElementById('main'));
      var option = {
        color: ['#000727', '#003366', '#006699', '#4cabce', '#a7bef9'],
        grid: {
          left: '4%',
          right: '4%',
          top: '14%',
          bottom: '22%',
        },
        tooltip: {
          show: true
        },
        legend: {

          orient: 'horizontal',
          selectedMode: 'single',
          icon: 'circle', //设置图例的图形形状，circle为圆，rect为矩形
          center: 'center',
          bottom: '1%',
          itemWidth: 12,
          itemHeight: 12,
          borderRadius: 12,
          padding: 0,
          itemGap: 5,
          padding: 0,
          textStyle: {
            fontSize: 10,
            borderRadius: 6,
            padding: 0
          },
          data: ["待审核", "已报备", "已带看", "已认筹", "已成交"]
        },
        xAxis: [
          {
            type: 'category',
            data: vm.Line.review.YDate,
            axisTick: {
              length: 0
            },
            axisLine: {
              lineStyle: {
                color: '#000',
                type: 'solid',

              },
            },
            axisLabel: {
              fontSize: 10
            }
          }
        ],
        yAxis: [
          {
            show: false,
          }
        ],
        dataZoom: [{
          show: false,
          type: 'inside',
          zoomOnMouseWheel: false,
          start: vm.Line.Count,
          end: 100,
        },
        ],
        series: [
          {
            name: '待审核',
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
              }
            },
            barWidth: '18',
            barGap: 0, //柱子之间间距
            type: 'bar',
            data: vm.Line.review.XDate
          },
          {
            name: '已报备',
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
              }
            },
            barWidth: '18',
            barGap: 0, //柱子之间间距
            type: 'bar',
            // stack: '广告',//变成同类放到一行里
            data: vm.Line.report.XDate
          },
          {
            name: '已带看',
            barGap: 0, //柱子之间间距
            label: {
              normal: {
                show: true,
                position: "top",
              }
            },
            barWidth: '18',
            type: 'bar',
            data: vm.Line.follow.XDate
          },
          {
            name: '已认筹',
            barGap: 0, //柱子之间间距
            label: {
              normal: {
                show: true,
                position: "top",
              }
            },
            barWidth: '18',
            type: 'bar',
            data: vm.Line.recruit.XDate
          },
          {
            name: '已成交',
            barGap: 0, //柱子之间间距
            label: {
              normal: {
                show: true,
                position: "top",
              }
            },
            type: 'bar',
            barWidth: '18',
            data: vm.Line.signing.XDate,
            // markLine : {
            //     lineStyle: {
            //         normal: {
            //             type: 'dashed'
            //         }
            //     },
            //     data : [
            //         [{type : 'min'}, {type : 'max'}]
            //     ]
            // }
          },
          // {
          //     name:'已签约',
          //     barGap: 0, //柱子之间间距
          //     label: {
          //         normal: {
          //             show: true,
          //             position: "top",
          //         }
          //     },
          //     type:'bar',
          //     barWidth: '15',
          //     data:[620, 732, 701, 734, 1090, 1130]
          // },
          // {
          //     name:'已结款',
          //     barGap: 0, //柱子之间间距
          //     type:'bar',
          //     label: {
          //         normal: {
          //             show: true,
          //             position: "top",
          //         }
          //     },
          //     barWidth: '15',
          //     data:[60, 72, 71, 74, 190, 130]
          // },
          // {
          //     name:'已报备',
          //     barGap: 0, //柱子之间间距
          //     type:'bar',
          //     label: {
          //         normal: {
          //             show: true,
          //             position: "top",
          //         }
          //     },
          //     barWidth: '15',
          //     data:[62, 82, 91, 84, 109, 110]
          // }
        ],
      };
      myChart.setOption(option);
    },
    getProject() {
      let vm = this;
      Indicator.open();
      this.$http.post('Projects.ashx?t=16', {

      })
        .then(res => {
          if (res.data.state > 0) {
            vm.projectlistP = res.data.parma.plist;
            vm.projectlistG = res.data.parma.glist;
            vm.myPid = vm.projectlistP[0].Key;
            vm.allGid = vm.projectlistG.map(x => { return x.Key })
            this.myGidtoString = this.myGid.toString();
            vm.GetNums();
            vm.GetStatistics();
          } else {
            Indicator.close();
          }
        })
        .catch(err => {
          Indicator.close();
        })

    },
    ifProject(index) {
      this.ifIsP = index;
    },
    GrtNone(is) {
      let vm = this;
      this.is = is;
      if (is == 1) {
        vm.fristmyGid = Array.from(vm.myGid);
        vm.fristmyPid = Array.from(vm.myPid);
        vm.myGid.length == vm.allGid.length ? vm.GnowIndex = -2 : vm.GnowIndex = -1;
      } else {
        vm.myGid = Array.from(vm.fristmyGid);
        vm.myPid = Array.from(vm.fristmyPid);
      }
    },
    GetProjectKey(index, key) {
      if (this.ifIsP == 1) {
        this.PnowIndex = index;
        this.myPid = key;
      } else {
        if (index == -2) {
          this.GnowIndex == -2 ? this.GnowIndex = -1 : this.GnowIndex = index;
          this.myGid.length == this.allGid.length ? this.myGid = [] : this.myGid = Array.from(this.allGid);
        } else {
          this.PnowIndex = -1;

          this.myGid.indexOf(key) == -1 ? this.myGid.push(key) : this.myGid = this.myGid.filter(v => { return v != key });
          this.myGid.length == this.allGid.length ? this.GnowIndex = -2 : this.GnowIndex = -1;
        }
      }
    },
    GetNums() {
      let vm = this;
      this.$http.post('Projects.ashx?t=15', {
        pid: vm.myPid,
        Groupdid: vm.myGidtoString,
        startTime: vm.yestoDate,
        endTime: vm.nowDate
      })
        .then(res => {
          Indicator.close();
          if (res.data.state > 0) {
            this.NumsList = res.data.parma;
          }
        })
        .catch(err => {
          Indicator.close();
        })
    },
    GetStatistics() {
      let vm = this;
      axios.all([
        this.$http.post('Projects.ashx?t=14', {
          pid: vm.myPid,
          datetype: vm.datetype,
          Groupdid: vm.myGidtoString,
          VisitWayName: '已报备',
          startTime: vm.yestoDate,
          endTime: vm.nowDate,
          AuditStaus: 1
        }),
        this.$http.post('Projects.ashx?t=14', {
          pid: vm.myPid,
          datetype: vm.datetype,
          Groupdid: vm.myGidtoString,
          VisitWayName: '已报备',
          startTime: vm.yestoDate,
          endTime: vm.nowDate,
          AuditStaus: 0
        }),
        this.$http.post('Projects.ashx?t=14', {
          pid: vm.myPid,
          datetype: vm.datetype,
          Groupdid: vm.myGidtoString,
          VisitWayName: '已跟进',
          startTime: vm.yestoDate,
          endTime: vm.nowDate,
          AuditStaus: 0
        }),
        this.$http.post('Projects.ashx?t=14', {
          pid: vm.myPid,
          datetype: vm.datetype,
          Groupdid: vm.myGidtoString,
          VisitWayName: '已认筹',
          startTime: vm.yestoDate,
          endTime: vm.nowDate,
          AuditStaus: 0
        }),
        this.$http.post('Projects.ashx?t=14', {
          pid: vm.myPid,
          datetype: vm.datetype,
          Groupdid: vm.myGidtoString,
          VisitWayName: '已签约',
          startTime: vm.yestoDate,
          endTime: vm.nowDate,
          AuditStaus: 0
        })
      ])
        .then(
          axios.spread(function (
            response,
            responset,
            responses,
            responsef,
            responsefi

          ) {
            vm.Line.review = response.data.parma;
            vm.Line.report = responset.data.parma;
            vm.Line.follow = responses.data.parma;
            vm.Line.recruit = responsef.data.parma;
            vm.Line.signing = responsefi.data.parma;
            vm.Line.Count = responset.data.parma.Count;
            vm.Line.Count < 4 ? vm.Line.Count = 0 : vm.Line.Count = (1 - 4 / vm.Line.Count) * 100;
            vm.histogram();
            Indicator.close();
          })
        )
        .catch(function (error) {
          Indicator.close();
        });
    },
    dataChage(dataindex) {
      let vm = this;
       this.gtessy();
      vm.data = dataindex;
      vm.nowDate = spacetime().format("yyyy-MM-dd");
      switch (vm.data) {
        case 1:
          vm.yestoDate = spacetime().subtract(1, "day").format("yyyy-MM-dd");
          break;
        case 2:
          vm.yestoDate = spacetime().day("monday").format("yyyy-MM-dd");
          break;
        case 3:
          vm.yestoDate = spacetime().format("yyyy-MM-01");
          break;
      }
      vm.getProject();
    },
    GetConfirm(is) {
      let vm = this;
      vm.getProject();
      vm.is = is;
    },
    gtessy() {
   
  
    }
  },
  mounted() {
   
    this.getProject();
  }
};
</script>
<style>
#main {
  width: 100%;
  height: 10rem;
  margin-bottom: 3.5rem;
}
.work-first {
  padding: 0 0 0.5rem 1.2rem;
  display: inline-block;
}
.work_time {
  color: #999999;
}
.timeright {
  float: right;
  padding-right: 1.1rem;
  padding-bottom: 0.5rem;
}
.work_posabos {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.work_project {
  width: 100%;
  font-size: 0;
}
.work_project:first-child {
  background: #fff;
}
.work_project:first-child li {
  margin: 0.5rem 0;
  padding: 0;
}
.work_project:nth-child(2) {
  background: #f5f4f4;
  height: 8rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.work_project:nth-child(2) li {
  width: 50%;
  display: inline-block;
}
.work_project:first-child li:first-child {
  border-right: 1px solid #e0e0e0;
}
.work_project li {
  padding: 0.5rem 0;
  font-size: 0.5rem;
  background: #fff;
  text-align: center;
}
.work_project:first-child li {
  color: #000;
}
.work_blue {
  background: #1489cb !important;
  color: #fff;
}
.work_posabos_two {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.3);
}
.blueColor_work {
  color: #1489cb !important;
}
</style>
