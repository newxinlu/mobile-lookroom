<template>
    <div>
      <!-- <div class="bulid_information">
        <div class="bulid_basic">
            用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;途
        </div>
        <div class="information_input">
            <input type="text" placeholder="请选择用途" :value="name" disabled/>
        </div>
        </div> -->
        <components v-for="(item,index) in requiredlist" :key="index"
        v-if="item.EName !='Communityid'"
        v-on:childid="headCall"
        :is="
        item.datatype==1?
        enterView
        :item.datatype==2?
        enternumView
        :item.datatype==3?
        item.EList.length>2?
        radiodropView
        :singleselectView
        :item.datatype==4?
        multipledropView
        :item.datatype==5?
        datatimeView
        :item.datatype==6?
        intervalView
        :''
        "
        :myclass="
        Invisible==1?
        'myrequired'
        :'unrequired'"
        :name="item.Name"
        :typelist="item.EList"
        :nowmodel="item.TypeName"
        ></components>
         <div class="bulid_information" v-if="Invisible ==1">
        <div class="bulid_basic">
            小区:
        </div>
        <div class="information_input" @click="tolist(1)">
            <input type="text" placeholder="请选择小区"  v-model="community" disabled/>
        </div>
        <i class="iconfont bulid_add xiajian icon-youjiantou" @click="tolist(1)"></i>
        </div>
        <!-- <div class='bulid_information'>
            <div class='bulid_basic'>
                交易类型:
            </div>
            <div class='cellvalue information_input'>
                <div class="cellradio">
                <label><input
                    name="sale"
                    type="radio"
                    class="mgr"
                    v-model="sale.type"
                    value=1
                    @click="headCall(sale)"
                    />出售</label>
                <label><input
                    name="sale"
                    type="radio"
                    class="mgr"
                    v-model="sale.type"
                    value=2
                    @click="headCall(sale)"
                    />出租</label>
                </div>
        </div>
        </div> -->
        <!-- <div class="bulid_information">
        <div class="bulid_basic">
            联系电话
        </div>
        <div class="information_input">
            <input type="text" placeholder="请填写联系电话" v-model="phone"/>
        </div>
        </div> -->
        <button class="refer_button" :disabled="now==1?true:false" @click="add">下一步</button>
    </div>
</template>
<script>
import { Toast, Indicator} from "mint-ui";
import enter from "../components/enter";
import enternum from "../components/enternum";
import singleselect from "../components/singleselect";
import multipledrop from "../components/multipledrop";
import radiodrop from "../components/radiodrop";
import datatime from "../components/datatime";
import interval from "../components/interval";

export default {
    data() {
    return {
        list:[],
        name:this.$route.query.name,
        bid:this.$route.query.tid,
        uid: this.$route.query.uid,
        enterView: "enter",
        enternumView:'enternum',
        radiodropView:'radiodrop',
        singleselectView: "singleselect",
        datatimeView:"datatime",
        intervalView:"interval",
        multipledropView:"multipledrop",
        requiredlist:[],
        requiredlistflase:[],
        parlist:{
            BuildingType:this.$route.query.tid,
            type:1,
        },
        Invisible:1,
        community:'',
        isKeep:0,
        now:0
    }
  },
  watch: {
    '$route'(to, from) {
      if (from.name !== 'secondadd' && to.name === 'secondlist') {
            this.parlist={
              BuildingType:this.$route.query.tid,
              type:1,
            }
            
      }
      if (from.name == 'secondlist' && to.name === 'secondadd') {
            this.community=this.$route.query.communityname
            let Communityid = {
              Communityid:this.$route.query.comid
            }
            this.headCall(Communityid)
      }
    }
  },
  activated(){
    if(this.isKeep==1){
      this.parlist={
              BuildingType:this.$route.query.tid,
              type:1,
      }
      this.Invisible=1;
      this.requiredlist=[],
      this.requiredlistflase=[],
      this.required()
    }
  },
    beforeRouteLeave (to, from, next) {
      if(to.name==='secondroom'){
            this.isKeep=1;
        }
        next()
  },
  methods: {
      headCall(msg) { //回调方法，接收子组件传的参数
        this.parlist = Object.assign(this.parlist,msg)
    },
    add(){
      let vm = this;
      this.now=1;
      switch(vm.Invisible){
        case 1:
          for(let i = 0;i<document.getElementsByClassName('myrequired').length;i++){
          if( document.getElementsByClassName('myrequired')[i].value.trim().length ==0){
              Toast("请填写完善内容再进行下一步");
              this.now=0;
              return true;
          }

      }
      vm.Invisible++
      vm.required();
        break;
        case 2:
          vm.addbulid()
        break;
      }


    //   if(!(/^1[1-9]\d{9}$/.test(vm.phone))){
    //     Toast("手机号码有误，请重填");
    //     return true;
    // }


    },
    addbulid(){
      this.$http.post('House.ashx?t=13', this.parlist)
        .then(res => {
          Toast({
              message: res.data.msg,
            });
            this.now=0;
           if (res.data.state > 0) {
             this.$router.push({ name: 'secondroom' });
          }
        })
        .catch(err => {
        })
    },
    tolist(type){
      this.$router.push({ name: 'secondlist',query:{type:type,name:this.$route.query.name,uid:this.$route.query.tid,sed:'no'}})
    },
    required(){
        let vm = this;
        this.$http.post('House.ashx?t=19', {
            BuildingType:vm.bid,
            type:1,
            isrequired:vm.Invisible
         })
        .then(res => {
             this.isKeep=0;
             this.now=0;
            if (res.data.state > 0) {
                vm.requiredlist=res.data.parma;
            }
        })
        .catch(err => {
        })
    },

  },
  mounted(){
     this.required();
  },
  components:{
      'enter':enter,
      'enternum':enternum,
      'singleselect':singleselect,
      'multipledrop':multipledrop,
      'radiodrop':radiodrop,
      'datatime':datatime,
      'interval':interval
  }
}
</script>
<style scoped>

  .usercell {
  display: flex;
  align-items: center;
  padding: 0.4rem;
  background: #fff;
  border-bottom: 1px solid #dbdbdb;
  font-size: 0.56rem;
}
.cellttle {
  flex: none;
  width: 100px;
  font-size: 0.4rem
}
.cellvalue {
  flex: 1;
}
.cellvalue > input {
  width: 100%;
}
.cellvalue .cellradio {
  align-items: center;
  display: flex;
}
.cellvalue .cellradio > label {
  flex: 1 auto;
  display: flex;
  align-items: center;
}
.cellvalue .cellcontrast {
  display: flex;
  align-items: center;
}
.cellvalue .cellcontrast > div {
  flex: 1 auto;
  padding-left: 5px;
}
.cellvalue .cellcontrast > div > input {
  width: 65%;
}
.mgr {
  position: relative;
  width: 0.6rem;
  height: 0.6rem;
  background-clip: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  vertical-align: text-bottom;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #d7d7d7;
  margin-right: 0.4rem;
}
.mgr:checked:before {
  background-color: #337ab7;
}
.mgr:checked:before {
  height: 0.28rem;
  width: 0.28rem;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.mgr:before {
  content: "";
  display: block;
  height: 0;
  width: 0;
  -webkit-transition: width 0.25s, height 0.25s;
  transition: width 0.25s, height 0.25s;
}
.information_input input{
        font-size: 0.5rem
 }
 .refer_button{
   margin-bottom:1.2rem
 }
 input:disabled{
        background: #fff
 }
 input{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
</style>
