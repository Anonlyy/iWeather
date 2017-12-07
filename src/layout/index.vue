<template>
  <div class="app-container">
    <Spin size="large" fix v-if="isLoading"></Spin>
    <swiper :options="swiperOption" :style="{height:innerHeight+'px'}">
      <!-- slides -->
      <swiper-slide>
        <div class="swiper-item">
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
                  <span class="weather-text">
                    <i :class="'wi '+item.code"></i>
                    {{item.text}}
                </span>
                  <span class="weather-value" v-text="item.high_low+'°C'"></span>
                </li>
              </ul>
              <div class="content-footer clearfix">
                <div class="footer-item">
                <span class="item-header">
                  <Icon type="tshirt" size="30"></Icon>
                </span>
                  <span class="item-footer">
                  适宜
                </span>
                </div>
                <div class="footer-item">
                <span class="item-header">
                  <Icon type="umbrella" size="30"></Icon>
                </span>
                  <span class="item-footer">
                  弱
                </span>
                </div>
                <div class="footer-item">
                <span class="item-header">
                  <Icon type="android-car" size="30"></Icon>
                </span>
                  <span class="item-footer">
                  适宜
                </span>
                </div>
                <div class="footer-item">
                <span class="item-header">
                  <Icon type="plane" size="30"></Icon>
                </span>
                  <span class="item-footer">
                  适宜
                </span>
                </div>
                <div class="footer-item">
                <span class="item-header">
                  <Icon type="ios-medical-outline" size="30"></Icon>
                </span>
                  <span class="item-footer">
                  易发
                </span>
                </div>
                <div class="footer-item">
                <span class="item-header">
                  <Icon type="ios-basketball-outline" size="30"></Icon>
                </span>
                  <span class="item-footer">
                  较适宜
                </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </swiper-slide>
      <!--
      <swiper-slide>
        <div class="swiper-item">
          xxxx
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-item">
          xxxx
        </div>
      </swiper-slide>
      --!>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import {WeatherInfo,WeatherNotice,FutureWeatherInfo} from '../api/class'
    export default {
        name: 'index',
        data() {
            return {
              innerHeight:0,
              ListHeight:0,
              cityName:'东莞',
              currentWeatherInfo:new WeatherInfo('null','null','null','null','null','null','null'),
              weatherNotice:new WeatherNotice('xx','xx','xx','xx'),
              futureWeatherInfo:new FutureWeatherInfo('xx','xx','xx','xx','xx'),
              futureWeatherList:[],
              isLoading:true,
              swiperOption: {
                pagination: {
                  el: '.swiper-pagination'
                },
              }
            }
        },
        created(){
          const _this = this;
          _this.api.getCurrentWeatherInfo().then(
            res=>{
              _this.cityName = res.data.weather[0].city_name;
              let data = res.data.weather[0];
              _this.currentWeatherInfo = new WeatherInfo(data.city_id,data.city_name,data.now.text,data.last_update,_this.api.getCodeIcon(data.now.code).iconName,data.now.air_quality.city.quality,data.future[0].low+'~'+data.future[0].high)
              _this.weatherNotice = new WeatherNotice(data.now.temperature,data.now.wind_direction,data.now.wind_scale,data.now.pressure);

              for(let item of data.future){
                _this.futureWeatherInfo = new FutureWeatherInfo(item.date,item.low+'~'+item.high,item.day,item.text,_this.api.getCodeIcon(item.code1).iconName);
                _this.futureWeatherList.push(_this.futureWeatherInfo);
              }
              _this.isLoading = false;
              console.log(_this.futureWeatherList);
            }
          );


          console.log();
        },
        filters:{
          updateTime(value){
            return value.substring(11,16);
          },
          weatherCode(value){
//            return this.api.getCodeIcon(value);
          }
        },
        mounted(){
          this.innerHeight = window.innerHeight;
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .app-container{
  }
  .swiper-item{
    height:100%;
    color: #23ADA1;
    .swiper-header{
      padding-top:3.4rem;
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
        .update-time{
          text-align: right;
          font-size: .6rem;
          font-weight: 300;
        }
        .air-quality{
          margin:.5rem 0;
          display: inline-block;
          padding:.2rem .4rem;
          border:1px solid white;
          border-radius: .3rem;
        }
      }
      .header-inner{
        padding-top:2rem;
        >i{
          font-size: 5rem;
        }
        .weather-text{
          font-size: 1rem;
          margin:.2rem 0;
        }
        .weather-value{
          font-size: 1.5rem;
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
        margin-bottom: 115px;
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

