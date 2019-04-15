<template>
<div>
    <div class='bulid_information'>
      <div class='bulid_basic'>
          {{name}}:
      </div>
      <div class='cellvalue information_input'>
        <div class='cellcontrast'>
          <div class='cellmin'><input :class="myclass" v-model="numlist[typelist[0].Name]" @input="getValue()" oninput = "value=value.replace(/[^\d]/g,'')" placeholder="最低"> </div>-<div class='cellmax'><input @input="getValue()" :class="myclass" oninput = "value=value.replace(/[^\d]/g,'')" v-model="numlist[typelist[1].Name]" placeholder="最高"></div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            numlist:{}
        }
    },
    methods:{
        getValue(){

            this.$emit('childid',{
                [this.typelist[0].Name]:this.numlist[this.typelist[0].Name],
                [this.typelist[1].Name]:this.numlist[this.typelist[1].Name],
            })
        }
    },
    props: {
        name: '',  //定义传值的类型<br>    }
        typelist:Array,
        nowmodel:'',
        myclass:''
    },
    created(){
       this.$set(this.numlist,this.typelist[0].Name, '')
       this.$set(this.numlist,this.typelist[1].Name, '')
    },
    mounted(){

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
 input{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
</style>
