<template>
  <div id="app">
    <app-header></app-header>
    <router-view class="router-view"/>
  </div>
</template>

<script>
  import header from './components/header'
export default {
  name: 'app',
  components:{
    "app-header":header
  },
}
</script>

<style>
  #app{
    width: 100%;
    height: 100%;
    max-width: 768px;
    background-color: rgba(0,0,0,0);
    position: relative;
    z-index: 100;
    overflow: hidden;
  }
  * {
    font-weight: 400;
    box-sizing: border-box;
    font-size: 14px;

  }
  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0 auto;
    max-width: 768px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .clearfix::before,.clearfix::after{
    content: '';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
  @media only screen {
    html {
      font-size: 30px;
    }
  }

  @media only screen and (max-width: 479px) and (min-width: 321px) {
    html {
      font-size: 15px;
    }
  }

  @media only screen and (max-width: 320px) {
    html {
      font-size: 13px;
    }
  }
  .router-view{
    /*position: absolute;*/
    /*z-index: 1000;*/
    min-height:100vh;
  }
</style>
