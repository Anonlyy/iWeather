<template>
  <div id="app-header" class="box-shadow">
    <div class="header-left">
      <Icon type="navicon" size="22"></Icon>
    </div>
    <div class="header-center">
      <Icon type="location" size="20"></Icon>
      <span class="location-name">东莞</span>
    </div>
    <div class="header-right">
      <Icon type="ios-gear-outline" size="22"></Icon>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'header',
        data() {
            return {}
        }
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
