<template>
<div>
    <div class='bulid_information'>
      <div class='bulid_basic'>
          {{name}}:
     </div>
      <div class='cellvalue information_input'>
        <div class="cellradio">
          <label><input
              :name="nowmodel"
              type="radio"
              class="mgr"
              :class="myclass"
              v-model="numlist[nowmodel]"
              value=1 
              @click="getValue(nowmodel,typelist[0].id)"
            />{{typelist[0].Name}}</label>
          <label><input
              :name="nowmodel"
              type="radio"
              class="mgr"
              :class="myclass"
              v-model="numlist[nowmodel]"
              value=2 
              @click="getValue(nowmodel,typelist[1].id)"
            />{{typelist[1].Name}}</label>
        </div>
      </div>
    </div>
</div>
</template>
<script>

export default {
  data() {
    return {
      roomtype: 1,
      sale: 1,
      numlist:{}
    };
  },
  props: {
        name: '',  //定义传值的类型<br>  
        typelist:Array,
        nowmodel:'',
        myclass:''
    },
    created(){
      this.$set(this.numlist,this.nowmodel, 1)
      this.$emit('childid',{
            [this.nowmodel]:this.typelist[0].id
      })
       
    },
  mounted() {
      
  },
  methods: {
      getValue(name,id){
            this.$emit('childid',{
                [name]:id
            })
        }
  },
}
</script>
<style  scoped>
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
</style>
