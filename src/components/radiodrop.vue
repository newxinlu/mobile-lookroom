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
        <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible"
                cancelText=''
        >
        </mt-actionsheet>
</div>
</template>
<script>
import {Actionsheet } from "mint-ui";

export default { 
    data(){
        return{
            sheetVisible:false,
            actions:[],
            bulidname:this.$route.query.name,
            numlist:{}
        }
        
    },
    methods:{
        addBulid() {
            this.actions = this.typelist.map((x, index) => { return { name: x.Name, id: x.id, method: this.getValue} })
            this.sheetVisible = true;
        },
        getValue(name,index){
            this.numlist[this.nowmodel]=this.actions[index].name;
            this.$emit('childid',{
                [this.nowmodel]:this.actions[index].id
            })
            this.sheetVisible =false;
        }
    },
    props: {
        name: '',  //定义传值的类型<br>    }
        typelist:Array,
        nowmodel:'',
        myclass:''
    },
    created(){
        this.$set(this.numlist,this.nowmodel, '')
        this.nowmodel=='BuildingType'?this.numlist.BuildingType=this.bulidname.slice(0):''
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
    input{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
</style>
