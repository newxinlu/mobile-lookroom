<template>
<div>
    <div class="bulid_information">
        <div class="bulid_basic">
            {{name}}:
        </div>
        <div class="information_input" @click="addBulid()">
            <input type="text" :class="myclass" v-model="numlist[nowmodel]" :placeholder="'请输入'+name"  disabled/>
        </div>
        <i class="iconfont bulid_add xiajian icon-youjiantou" @click="addBulid()"></i>
    </div>
    <div class="multip_bottom" v-show="sheetVisible">
       <ul>
           <li class="height_lost" v-for="(item,index) in typelist" @click="getValue(item.Name,item.id)" :key="index" :style="allid.indexOf(item.id)!=-1?{'background':'#fff','color':'#ff5121'}:''">{{item.Name}}</li>
           <li class="multip_none" @click="closelist()">全部取消</li>
       </ul>
       <div class="multip_back" @click="confirmmul()"></div>
    </div>
</div>
</template>
<script>

export default { 
    data(){
        return{
            sheetVisible:false,
            actions:[],
            allid:[],
            numlist:{}
        }
        
    },
    methods:{
        closelist(){
            this.numlist[this.nowmodel]=[];
            this.allid=[];
            this.sheetVisible =false;
        },
        addBulid() {
            this.sheetVisible =true;
        },
        confirmmul(){
            this.sheetVisible =false
            if(this.allid.length==0){
                return true
            }
            this.$emit('childid',{
                [this.nowmodel]:this.allid.toString()
            });
        },
        getValue(name,id){
            this.numlist[this.nowmodel].indexOf(name)==-1?
            this.numlist[this.nowmodel].push(name)
            :this.numlist[this.nowmodel]=this.numlist[this.nowmodel].filter(x=>x !=name);
            this.allid.indexOf(id)==-1? this.allid.push(id):this.allid=this.allid.filter(x=>x !=id)
            this.sheetVisible =true
        }
    },
    props: {
        name: '',  //定义传值的类型<br>    }
        typelist:Array,
        nowmodel:'',
        myclass:''
    },
    created(){
        this.$set(this.numlist,this.nowmodel, [])
    },
    mounted(){
        
    }
}
</script>
<style scoped>
    input:disabled{
        background: #fff
    }
    .mint-actionsheet{
        max-height:300px;
        overflow-y: scroll;
    }
    .information_input input{
        font-size: 0.5rem
    }
    .multip_bottom{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
    }
    .multip_back{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0.5;
            background: #000;
            z-index: 2000;
    }
    .multip_bottom ul{
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        width: 100%;
        z-index: 2001;
        overflow-y: scroll;
        max-height:300px;

    }
    .multip_bottom ul li{
        display: block;
        width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 18px;
        color: #333;
        background: #fff;
        border-bottom: solid 1px #e0e0e0;
      
    }
    .multip_none{
        border-top:solid 3px #e0e0e0;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    input{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
    .height_lost:nth-last-child(2){
        margin-bottom:48px 
    }
</style>
