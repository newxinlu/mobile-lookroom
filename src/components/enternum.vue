<template>
<div>
    <div class="bulid_information">
        <div class="bulid_basic">
            {{name}}:
        </div>
        <div class="information_input">
            <input type="text" :class="myclass" v-model="numlist[nowmodel]" @input="getValue()" :placeholder="'请输入'+name" oninput = "value=value.replace(/[^\d]/g,'')"/>
        </div>
        <!-- <i class="iconfont bulid_add xiajian icon-youjiantou"></i> -->
    </div>
</div>
</template>
<script>

export default { 
    data(){
        return{
            sheetVisible:false,
            // actions: [],
            numlist:{}
        }
        
    },
    methods:{
        getValue(){
            this.$emit('childid',{
                [this.nowmodel]:this.numlist[this.nowmodel]
            })
        }
    },
    props: {
        name: '',  //定义传值的类型<br>  
        typelist:Array,
        nowmodel:'',
        myclass:''
    },
    created(){
        this.$set(this.numlist,this.nowmodel, '')
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
    input{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
</style>