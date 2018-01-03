<template>
  <div id="app-header" class="box-shadow">
    <div class="header-left" @click="toList">
      <Icon type="navicon" size="22"></Icon>
    </div>
    <div class="header-center" @click="toIndex">
      <Icon type="location" size="20"></Icon>
      <span class="location-name" v-text="cityName"></span>
    </div>
    <div class="header-right" @click="toEdit">
      <Icon type="plus-round" v-if="isEdit===-1" size="22"></Icon>
      <Icon type="edit" v-else size="22" ></Icon>
    </div>
  </div>
</template>

<script>
  import Bus from '../router/eventBus.js';
    export default {
        name: 'header',
        data() {
            return {
              cityName:'',
              isEdit:-1
            }
        },
        methods:{
          toList(){
            this.$router.push('/list');
          },
          toIndex(){
            this.$router.push('/index');
          },
          toEdit(){
            if(this.isEdit === 1){
              Bus.$emit('editStart',this.isEdit);
              this.isEdit = 2;
            }
            else if(this.isEdit === 2){
              Bus.$emit('editStart',this.isEdit);
              this.isEdit = 1;
            }
            else{
              this.$router.push('/add');
            }


          }
        },
        created() {
          Bus.$on('cityName', value => {
            this.cityName = value;
          })

          Bus.$on('isEdit', value => {
            this.isEdit = value;
          })
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #app-header{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1001;
    height:3.4rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 .8rem;
    color: white;
    transition: all .3s;
    .header-center{
      font-size: 1.2rem;
      .location-name{
        vertical-align: text-bottom;
      }
    }
  }
  .box-shadow{
    color: #23ADA1!important;
    background-color: white;
    box-shadow:0 .3rem .8rem rgba(0,0,0,.09);
  }
</style>
