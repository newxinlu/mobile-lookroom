<template>
<div>
    <div class="bulid_information">
        <div class="bulid_basic">
            {{name}}:
        </div>
        <div class="information_input" @click="open()">
            <input type="text" :class="myclass" v-model="$data[nowmodel]" :placeholder="'请输入'+name"  disabled/>
        </div>
        <i class="iconfont bulid_add xiajian icon-youjiantou" @click="open()"></i>
    </div>
    <mt-datetime-picker
      :ref="'picker'+nowmodel"
      type="date"
       v-model='pickerVisible'
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDatex"
      :endDate="endDatex"
      @confirm="handleConfirm">
   </mt-datetime-picker>
</div>
</template>
<script>
import {DatetimePicker } from "mint-ui";
import spacetime from 'spacetime'
export default {
    data(){
        return{
            sheetVisible:false,
            startDatex:new Date(1970,0,1),
            endDatex:new Date(),
            pickerVisible:''
            // actions: [],
        }

    },
    props: {
        name: '',  //定义传值的类型<br>    }
        typelist:Array,
        nowmodel:'',
        myclass:''
    },
    methods:{
        open() {
            this.$refs['picker'+this.nowmodel].open();

        },
        handleConfirm(value) {
            this.pickerVisible=spacetime(value).format('yyyy-MM-dd');
            this.$set(this.$data,this.nowmodel, this.pickerVisible.slice(0))
            this.$emit('childid',{
                [this.nowmodel]:this.$data[this.nowmodel]
            })
        },
    },
    //  props: {
    //     actions: []  //定义传值的类型<br>    }
    // },
    created(){
        this.endDatex = new Date();
        this.$data[this.nowmodel]='';
        this.endDatex.setFullYear(this.endDatex.getFullYear()+100);
    },
    mounted(){

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
</style>
