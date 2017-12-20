<template>
  <div id="app">
    <div class="search-header">
      <div class="search-bar">
        <Input v-model="inputValue" autofocus placeholder="搜索城市"
               icon="ios-search-strong"
               :maxlength="maxlength"
               class="search-input"
               ></Input>
      </div>
    </div>
    <div class="search-body"></div>
  </div>
</template>

<script>
    export default {
        name: 'add',
        data() {
            return {
              inputValue:'',
              maxlength:20
            }
        },
      watch:{
        inputValue(newValue){
          this.searchCity();
        }
      },
      methods:{
        searchCity:_.debounce(
          function (){
            const _this = this;
            this.api.getCityId(this.inputValue).then(
              res=>{
                console.log(res.data.results);
              }
            ).catch(
              error=>{
                console.log('获取cityId错误',error);
              }
            )
          },500)
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #app{
    padding-top:3.4rem;
    .search-header{
      .search-bar{
        padding:.5rem;
        background-color: #16B0A1;
        position: relative;
        >.ivu-input-wrapper{
          >input{
            width: 100%;
            height:2rem;
            background-color:rgba(255,255,255,.6);
            outline: none;
            border-radius: 3px;
            border:none;
            padding-left:2rem!important;
            color: #666;
          }
        }
        >i{
          position: absolute;
          top: 50%;
          left:1rem;
          transform: translateY(-50%);
        }
      }

    }
  }
</style>
