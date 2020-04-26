<template>
  <div class="app-container">
    <Spin size="large" fix v-if="isLoading"></Spin>
    <swiper :options="swiperOption" :style="{height:innerHeight+'px'}" ref="mySwiper">
      <!-- slides -->
      <swiper-slide>
        <div class="swiper-item current-item">
          <div class="swiper-header">
            <div class="header-tip">
              <p class="update-time">{{currentWeatherInfo.update_time | updateTime}} 更新</p>
              <span class="air-quality" v-text="'空气质量:'+currentWeatherInfo.air_quality"> </span>
            </div>
            <div class="header-inner">
              <i :class="'wi '+currentWeatherInfo.code"></i>
              <p class="weather-text" v-text="currentWeatherInfo.text"></p>
              <p class="weather-value" v-text="currentWeatherInfo.high_low+' °C'"></p>
            </div>
            <div class="header-footer-list">
              <div class="content">
                <Icon type="thermometer" size="25"></Icon>
                <div class="item-content">
                  <p>当前温度</p>
                  <p v-text="weatherNotice.temperature+' °C'"></p>
                </div>
              </div>
              <div class="content">
                <Icon type="nuclear" size="25"></Icon>
                <div class="item-content">
                  <p v-text="weatherNotice.wind_direction+'风'"></p>
                  <p v-text="weatherNotice.wind_scale+'级'"></p>
                </div>
              </div>
              <div class="content">
                <Icon type="speedometer" size="25"></Icon>
                <div class="item-content">
                  <p>气压</p>
                  <p v-text="weatherNotice.pressure+' hPa'"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-content">
            <div class="swiper-body">
              <ul class="content-list">
                <li class="list-item" v-for="item,index in futureWeatherList" v-if="index<=5">
                  <span class="date">{{item.date.substring(5,7)}}/{{ item.date.substring(8,10)}}</span>
                  <span class="day" v-text="item.day"></span>
                  <span class="weather-text ">
                    <i :class="'wi '+item.code"></i>
                    {{item.text}}
                </span>
                  <span class="weather-value" v-text="item.high_low+'°C'"></span>
                </li>
              </ul>
              <div class="content-footer clearfix">
                <div class="footer-item" v-for="item in todaySuggestionList">
                  <span class="item-header">
                    <Icon :type="item.icon" size="30"></Icon>
                  </span>
                  <span class="item-footer" v-text="item.content"></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </swiper-slide>
      <swiper-slide v-for="weatherItem in weatherInfoList" :key="weatherItem.cityId">
        <div class="swiper-item normal-item">
          <div class="swiper-header">
            <div class="header-tip">
              <p class="update-time">{{weatherItem.normalWeatherInfo.weather.update_time | updateTime}} 更新</p>
              <span class="air-quality" v-text="'空气质量:'+weatherItem.normalWeatherInfo.weather.air_quality"> </span>
            </div>
            <div class="header-inner">
              <i :class="'wi '+weatherItem.normalWeatherInfo.weather.code"></i>
              <p class="weather-text" v-text="weatherItem.normalWeatherInfo.weather.text"></p>
              <p class="weather-value" v-text="weatherItem.normalWeatherInfo.weather.high_low+' °C'"></p>
            </div>
            <div class="header-footer-list">
              <div class="content">
                <Icon type="thermometer" size="25"></Icon>
                <div class="item-content">
                  <p>当前温度</p>
                  <p v-text="weatherItem.normalWeatherInfo.weatherNotice.temperature+' °C'"></p>
                </div>
              </div>
              <div class="content">
                <Icon type="nuclear" size="25"></Icon>
                <div class="item-content">
                  <p v-text="weatherItem.normalWeatherInfo.weatherNotice.wind_direction+'风'"></p>
                  <p v-text="weatherItem.normalWeatherInfo.weatherNotice.wind_scale+'级'"></p>
                </div>
              </div>
              <div class="content">
                <Icon type="speedometer" size="25"></Icon>
                <div class="item-content">
                  <p>气压</p>
                  <p v-text="weatherItem.normalWeatherInfo.weatherNotice.pressure+' hPa'"></p>
                </div>
              </div>
            </div>

          </div>
          <div class="swiper-content">
            <div class="swiper-body">
              <ul class="content-list">
                <li class="list-item" v-for="(item,index) in weatherItem.normalWeatherInfo.futureWeatherList" v-if="index<=5">
                  <span class="date">{{item.date.substring(5,7)}}/{{ item.date.substring(8,10)}}</span>
                  <span class="day" v-text="item.day"></span>
                  <span class="weather-text">
                    <i :class="'wi '+item.code"></i>
                    {{item.text}}
                </span>
                  <span class="weather-value" v-text="item.high_low+'°C'"></span>
                </li>
              </ul>
              <div class="content-footer clearfix">
                <div class="footer-item" v-for="(item, index) in weatherItem.normalWeatherInfo.todaySuggestionList" :key="index">
                  <span class="item-header">
                    <Icon :type="item.icon" size="30"></Icon>
                  </span>
                  <span class="item-footer" v-text="item.content"></span>
                </div>
              </div>
            </div>

          </div>


        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import Bus from '../router/eventBus.js';
  import {WeatherInfo,WeatherNotice,FutureWeatherInfo,TodaySuggestion} from '../api/class'
    export default {
        name: 'index',
        data() {
            const _this = this;
            return {
              innerHeight:0,
              ListHeight:0,
              cityName:'',
              cityIdList: [],
              currentWeatherInfo:new WeatherInfo('null','null','null','null','null','null','null'), //当天天气信息
              weatherNotice:new WeatherNotice('xx','xx','xx','xx'),   //天气提示
              futureWeatherInfo:new FutureWeatherInfo('xx','xx','xx','xx','xx'), //未来天气信息
              todaySuggestion:new TodaySuggestion('xx','xx','xx','xx','xx','xx'),
              futureWeatherList:[],
              todaySuggestionList:[
                {
                  icon:'tshirt',
                  content:''
                },
                {
                  icon:'umbrella',
                  content:''
                },
                {
                  icon:'android-car',
                  content:''
                },
                {
                  icon:'plane',
                  content:''
                },
                {
                  icon:'ios-medical-outline',
                  content:''
                },
                {
                  icon:'ios-basketball-outline',
                  content:''
                }
              ],
              isLoading:true,
              swiperOption: {
                initialSlide : 0,
                pagination: {
                  el: '.swiper-pagination',
                  dynamicBullets: true
                },
                on: {
                  slideChangeTransitionStart:function () {
                    if(this.activeIndex>=0){
                      _this.isLoading = true;
                    }
                  },
                  slideChangeTransitionEnd:function () {
                    if(this.activeIndex===0){
                      console.log('回到首页',_this.cityName);
                      _this.getFirstWeatherInfo()
                    }
                    else if(this.activeIndex>=0){
                      _this.getWeatherInfo(this.activeIndex);
                    }

                  }
                },
              },
              weatherInfoList:[],
            }
        },
        created(){
          const _this = this;
          for (let i = 0; i < window.localStorage.length - 1; i++) {
            _this.cityIdList.push({
              key:window.localStorage.key(i),
              value:window.localStorage.getItem(window.localStorage.key(i))
            });
            _this.weatherInfoList.push({
              "cityId":window.localStorage.getItem(window.localStorage.key(i)),
              "normalWeatherInfo":{
                "weather":new WeatherInfo('null','null','null','null','null','null','null'), //当天天气信息
                "weatherNotice":new WeatherNotice('xx','xx','xx','xx'),   //天气提示
                "futureWeatherInfo":new FutureWeatherInfo('xx','xx','xx','xx','xx'), //未来天气信息
                "todaySuggestion":new TodaySuggestion('xx','xx','xx','xx','xx','xx'),
                "futureWeatherList":[],
                "todaySuggestionList":[
                  {
                    icon:'tshirt',
                    content:''
                  },
                  {
                    icon:'umbrella',
                    content:''
                  },
                  {
                    icon:'android-car',
                    content:''
                  },
                  {
                    icon:'plane',
                    content:''
                  },
                  {
                    icon:'ios-medical-outline',
                    content:''
                  },
                  {
                    icon:'ios-basketball-outline',
                    content:''
                  }
                ],
              }
            });
          }
          //获取add页面传值的cityId在localstorage中的Index
          let index = _this.cityIdList.findIndex((item)=>{
            return item.value == _this.$route.params.cityId;
          })
          if(parseInt(index)>=0){
            _this.isLoading = true;
            _this.swiperOption.initialSlide = index+1;
          }
          else{
            _this.getFirstWeatherInfo();
          }


        },
        filters:{
          updateTime(value){
            return value.substring(11,16);
          },
        },
        mounted(){
          this.innerHeight = window.innerHeight;
        },
        methods:{
          getFirstWeatherInfo(){
            const _this = this;
            if(_this.$cookies.isKey('location')){
              let  locationWeatherInfo = JSON.parse(_this.$cookies.get('location'));
              _this.currentWeatherInfo = locationWeatherInfo.currentWeatherInfo;
              _this.weatherNotice = locationWeatherInfo.weatherNotice;
              _this.todaySuggestionList = locationWeatherInfo.todaySuggestionList;
              _this.futureWeatherList = locationWeatherInfo.futureWeatherList;
              _this.cityName = _this.currentWeatherInfo.city_name;
              _this.isLoading = false;
//              Bus.$emit('cityName',_this.cityName);
            }
            else{
              _this.api.getCurrentWeatherInfo().then(
                res=>{
                  _this.cityName = res.data.results[0].city_name;

                  let data = res.data.results[0];
                  let suggest = data.today.suggestion;
                  _this.currentWeatherInfo = new WeatherInfo(data.city_id,data.city_name,data.now.text,data.last_update,_this.api.getCodeIcon(data.now.code).iconName,data.now.air_quality.city.quality,data.future[0].low+' ~ '+data.future[0].high)
                  _this.weatherNotice = new WeatherNotice(data.now.temperature,data.now.wind_direction,data.now.wind_scale,data.now.pressure);
                  _this.todaySuggestion = new TodaySuggestion(suggest.dressing.brief,suggest.uv.brief,suggest.car_washing.brief,suggest.travel.brief,suggest.flu.brief,suggest.sport.brief);
                  let i=0;
                  for(let item in _this.todaySuggestion){
                    _this.todaySuggestionList[i].content = _this.todaySuggestion[item];
                    i++;
                  }
                  for(let item of data.future){
                    _this.futureWeatherInfo = new FutureWeatherInfo(item.date,item.low+' ~ '+item.high,item.day,item.text,_this.api.getCodeIcon(item.code1).iconName);
                    _this.futureWeatherList.push(_this.futureWeatherInfo);
                  }


                  let locationWeatherInfo = {
                    currentWeatherInfo:_this.currentWeatherInfo,
                    weatherNotice:_this.weatherNotice,
                    todaySuggestionList:_this.todaySuggestionList,
                    futureWeatherList:_this.futureWeatherList
                  }
                  _this.$cookies.set('location',JSON.stringify(locationWeatherInfo,60 * 60 * 12));
                  _this.isLoading = false;

                }
              ).catch(
                error=>{
                  _this.$Message.error('获取天气信息错误'+error);
                });
            }
            Bus.$emit('cityName',_this.cityName);

          },
          getWeatherInfo(key){
            const  _this = this;
            let cityId = _this.weatherInfoList[parseInt(key)-1].cityId;
            if(_this.$cookies.isKey(cityId)){
              let item = _this.weatherInfoList.find((value)=>{
                return value.cityId == cityId;
              });
              item.normalWeatherInfo = JSON.parse(_this.$cookies.get(cityId)).normalWeatherInfo;
              Bus.$emit('cityName',_this.weatherInfoList[parseInt(key)-1].normalWeatherInfo.weather.city_name);
            }
            else{
              _this.api.getWeatherInfo(cityId).then(
                res=>{
                  let data = res.data.results[0];
                  let suggest = data.today.suggestion;
                  let currentWeather = _this.weatherInfoList[parseInt(key)-1].normalWeatherInfo;
                  currentWeather.weather = new WeatherInfo(data.city_id,data.city_name,data.now.text,data.last_update,_this.api.getCodeIcon(data.now.code).iconName,data.now.air_quality.city.quality,data.future[0].low+' ~ '+data.future[0].high)
                  currentWeather.weatherNotice = new WeatherNotice(data.now.temperature,data.now.wind_direction,data.now.wind_scale,data.now.pressure);
                  currentWeather.todaySuggestion = new TodaySuggestion(suggest.dressing.brief,suggest.uv.brief,suggest.car_washing.brief,suggest.travel.brief,suggest.flu.brief,suggest.sport.brief);
                  let i=0;
                  for(let item in currentWeather.todaySuggestion){
                    currentWeather.todaySuggestionList[i].content = currentWeather.todaySuggestion[item];
                    i++;
                  }
                  for(let item of data.future){
                    currentWeather.futureWeatherInfo = new FutureWeatherInfo(item.date,item.low+' ~ '+item.high,item.day,item.text,_this.api.getCodeIcon(item.code1).iconName);
                    currentWeather.futureWeatherList.push(currentWeather.futureWeatherInfo);
                  }
                  //set Cookie(12hours)
                  _this.$cookies.set(cityId,JSON.stringify(_this.weatherInfoList[parseInt(key)-1],60 * 60 * 12));
                  return _this.weatherInfoList[parseInt(key)-1].normalWeatherInfo.weather.city_name;
                }
              ).then(value=>{
                console.log(value);
                Bus.$emit('cityName',value);
              }).catch(
                error=>{
                  _this.$Message.error('获取城市天气错误'+error);
                }
              );
            }
            _this.isLoading = false;
          },
        },


    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .app-container{

  }
  .top-load-wrapper{
    text-align: center;
    font-size: .8rem;
    height:2rem;
    line-height:2rem;
  }
  .swiper-item{
    padding-top:3.4rem;
    height:100%;
    color: #23ADA1;
    .swiper-header{
      /*margin-top:3.4rem;*/
      position: relative;
      color: white;
      text-align: center;
      padding-bottom:.2rem;
      background-image: linear-gradient(300deg, #16B0A1 0%, #3CDAAF 100%);
      border-bottom-left-radius: .5rem;
      border-bottom-right-radius: .5rem;
      box-shadow: 5px 5px 10px rgba(0,0,0,.1);
      .header-tip{
        position: absolute;
        right: .5rem;
        padding-top:.5rem;
        .update-time{
          text-align: right;
          font-size: .6rem;
          font-weight: 300;
        }
        .air-quality{
          margin:.5rem 0;
          display: inline-block;
          padding:.2rem .4rem;
          max-width: 7rem;
          text-align: left;
          border:1px solid white;
          border-radius: .3rem;
        }
      }
      .header-inner{
        padding-top:1.6rem;
        >i{
          font-size: 5rem;
        }
        .weather-text{
          font-size: 1rem;
          margin:1.2rem 0 .2rem;
        }
        .weather-value{
          font-size: 1.3rem;
        }
      }
      .header-footer-list{
        width: 100%;
        display: table;
        margin:1rem 0 .5rem;
        padding:0 .2rem;
        .content{
          display: table-cell;
          position: relative;
          width:1/3*100%;
          padding:0 .7rem;
          >i{
            display: table-cell;
            vertical-align: middle;
            padding-right:.5rem;
          }
          .item-content{
            width: 80%;
            display: table-cell;
          }
        }
        .content:nth-child(1)::before,.content:nth-child(2)::before{
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background-color: rgba(255,255,255,.6);
        }
      }
    }
    .swiper-content{
      height: 70%;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: white;
      padding-top:.5rem;
      .swiper-body{
        margin-bottom: 85px;
        .content-list{
          width: 100%;
          .list-item{
            display: flex;
            align-items: center;
            height:3.2rem;
            line-height: 3.2rem;
            border-bottom:1px solid rgba(0,0,0,.1);
            border-radius: .5rem;
            box-shadow: 5px 0 5px rgba(0,0,0,.1);
            margin-bottom:.5rem;
            padding:0 1.5rem;
            >.date{
              width: 20%;
            }
            >.day{
              width: 15%;
            }
            >.weather-text{
              width: 35%;
              word-wrap: normal; /* for IE */
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              >i{
                font-size: 1.2rem;
                display: inline-block;
                margin-right:.3rem;
              }
            }
            >.weather-value{
              width: 30%;
              text-align: right;
              padding-right:.5rem;
            }
          }
        }
        .content-footer{
          .footer-item{
            display: block;
            float: left;
            width: 1/3*100%;
            padding:.5rem 0;
            text-align: center;
            .item-header{
              width: 100%;
              display: block;
            }
          }
        }
      }
    }
  }
</style>

