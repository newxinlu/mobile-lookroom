<template>
<div>
    <div class="bulid_information">
        <div class="bulid_basic" >
            {{name}}:
        </div>
        <div class="information_input" @click="getis()">
            <input :class="myclass"  v-model="numlist[nowmodel]" disabled type="text" :placeholder="'请输入'+name"  />
        </div>
        <div>
        <div :class="is !=0?'backAll':''" @click="getdie()" style="min-height:35rem;" v-show="is !=0"></div>
        <div class="flex_div flex_now_pos"  v-if="is">
              <div class="flex_auto">
                  <div v-for="(item,index) in provincelist" :key="index" @click="city(1,index,item.id,item.value)"  :style="item.id==province?{'background':'#fff','color':'#ff5121'}:''">
                    {{item.value}}
                  </div>
              </div>
              <div class="flex_auto">
                  <div v-for="(item,index) in citylist" :key="index" @click="city(2,index,item.id,item.value)"  :style="item.id==citycone?{'background':'#fff','color':'#ff5121'}:''">
                      {{item.value}}
                  </div>
              </div>
              <div class="flex_auto">
                  <div v-for="(item,index) in arealist" :key="index" @click="city(3,index,item.id,item.value)"  :style="item.id==area?{'background':'#fff','color':'#ff5121'}:''">
                      {{item.value}}
                  </div>
              </div>
        </div>
        <!-- <i class="iconfont bulid_add xiajian icon-youjiantou"></i> -->
        </div>
    </div>
</div>  
</template>
<script>

export default {
    data(){
        return{
            typeid:this.$route.query.uid,
            numlist:{},
            is:0,
            provincelist: [],
            citylist:[],
            arealist:[],
            province:-1,
            citycone:0,
            area:0,
            provincename:'',
            cityname:'',
            areaname:'',
            cityid:0,
            
        }
    },
    watch:{
        
    },
    methods:{
        getis(){
            this.is==0?this.is=1:this.is=0;
        },
        getdie(){
            this.is=0;
            this.province=-1;
            this.citycone=-1;
            this.area=-1;
            this.citylist=[];
            this.arealist=[];
            this.getValue(0,'')
        },
         GetAreaList() {
            let vm = this;
            this.$http.post('projects.ashx?t=9', {
            
            })
                .then(res => {
                if (res.data.total > 0) {
                    vm.provincelist = res.data.rows;
                }

                })
                .catch(err => {
                })

        },
        getValue(id,value){
            this.is=0;
            this.numlist[this.nowmodel] =value
            this.$emit('childid',{
                [this.nowmodel]:id
            })
        },
        city(type,i,id,value){
        let vm = this;
        switch(type){
            case 1:
                vm.citylist =[];
                vm.arealist =[];
                vm.citylist=JSON.parse(JSON.stringify(vm.provincelist[i].child));
                vm.province=id;
                vm.provincename=value;
                vm.citycone=-1;
                vm.area=-1;
               vm.citylist.unshift({
                    id:0,
                    value:'不限',
                    child:[]
                })
            break;
            case 2:
                vm.arealist =[];
                vm.arealist=JSON.parse(JSON.stringify(vm.citylist[i].child));
                vm.citycone=id;
                vm.cityname=value
                vm.area=-1;
                i==0?vm.getValue(vm.province,vm.provincename):vm.arealist.unshift({
                    id:0,
                    value:'不限',
                    child:[]
                })
            break;
            case 3:
                vm.area=id;
                vm.areaname=value;
                i==0?vm.getValue(vm.citycone,vm.cityname):vm.getValue(vm.area,vm.areaname)
            break;
        }
    },
    },
    props: {
        name: '',  //定义传值的类型<br>    }
        typelist:Array,
        nowmodel:'',
        myclass:''
    },
    created(){
        this.$set(this.numlist,this.nowmodel, '')
    },
    mounted(){
        this.GetAreaList()
    }
}
</script>
<style scoped>
    input:disabled{
        background: #fff
    }
    .information_input input{
        font-size: 0.5rem
    }
    input{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
  .flex_now_pos{
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        z-index: 2000;
        text-align: center;
        background: #fff;
        height: 11rem;
    }
    .flex_now_pos>div{
        overflow-y: scroll
    }
    .flex_now_pos>div div{
        padding:0.5rem 0;
    }
    .flex_auto{
        flex: 1 1 0;
    }
    .flex_auto:first-child{
        background: #e0e0e0
    }
    .backAll {
        background: rgba(0, 0, 0, 0.3);
        width: 100%;
        min-height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1994;
    }
</style>
