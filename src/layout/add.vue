<template>
  <div id="app">
    <div class="search-header">
      <div class="search-bar">
        <Input v-model.trim="inputValue" autofocus placeholder="搜索城市"
               icon="ios-search-strong"
               :maxlength="maxlength"
               class="search-input"
               ></Input>
      </div>
    </div>
    <div class="search-body">
      <div class="tip" v-if="searchResult.length <=0">
        -- 抱歉,没有搜索到你需要的结果 --
      </div>
      <transition-group  class="list"
        name="staggered-fade"
        tag="ul"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      >
        <li class="list-item" v-for="(item,index) in searchResult" :key="item.path" @click="addCity(item)">{{item.path}}</li>
      </transition-group>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'add',
        data() {
            return {
              inputValue:'',
              maxlength:20,
              searchResult:[],
              cityId:'',
            }
        },
        watch:{
          inputValue(newValue){
            this.searchCity();
          }
        },
        mounted(){
        },
        methods:{
        searchCity:_.debounce(
          function (){
            const _this = this;
            _this.isLoading = true;
            _this.searchResult = [];
            _this.api.getCityId(_this.inputValue).then(
              res=>{
                if(res.data.results){
                  _this.searchResult = res.data.results;
                }
                else{
                  _this.searchResult = [];
                }
              }
            ).catch(
              error=>{
                _this.$Message.error('获取cityId错误',error);
              }
            )
          },500),
        addCity(value){
          const _this = this;
          _this.api.getWeatherInfo(value.id).then(
            res=>{
              if(res.data.status=="OK"&&res.data.weather){
                _this.cityId = value.id;
                let key = 'cityId'+(window.localStorage.length-1);
                window.localStorage.setItem(key,_this.cityId);
                console.log(_this.cityId,res.data.weather);
              }
              else{
                _this.$Message.error("抱歉,该城市"+res.data);
              }

            }
          )

        },
        beforeEnter: function (el) {
          el.style.opacity = 0;
          el.style.height = 0;
        },
        enter: function (el, done) {
          var delay = el.dataset.index;
          setTimeout(function () {
            Velocity(
              el,
              { opacity: 1,height:"2.5rem"},
              { complete: done }
            )
          }, 10)
        },
        leave: function (el, done) {
          let delay = el.dataset.index;
          setTimeout(function () {
            Velocity(
              el,
              { opacity: 0,height:0},
              { complete: done }
            )
          }, 10)
        }
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
    .search-body{
      .list{
        width: 100%;
        .list-item{
          display: flex;
          height:2.5rem;
          line-height:2.5rem;
          padding-left:1rem;
          align-items: center;
          box-shadow: 0 5px 3px 0 rgba(0,0,0,.02);
          border-bottom: 1px solid #eee;
        }
      }
      .tip{
        text-align: center;
        height:4rem;
        line-height:4rem;
        color: #888;
      }
    }
  }
</style>
