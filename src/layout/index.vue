<template>
  <div class="app-container">
    <swiper :options="swiperOption" :style="{height:innerHeight+'px'}">
      <!-- slides -->
      <swiper-slide>
        <div class="swiper-item">
          <div class="swiper-header">
            <div class="header-tip">
              <p class="update-time">21:05更新</p>
              <span class="air-quality"> 空气质量:优</span>
            </div>
            <div class="header-inner">
              <i class="wi wi-night-alt-cloudy"></i>
              <p class="weather-text">多云转晴</p>
              <p class="weather-value">-4 ~ 7°C</p>
            </div>
            <div class="header-footer-list">
              <div class="content">
                <Icon type="thermometer" size="25"></Icon>
                <div class="item-content">
                  <p>当前温度</p>
                  <p>15 °C</p>
                </div>
              </div>
              <div class="content">
                <Icon type="nuclear" size="25"></Icon>
                <div class="item-content">
                  <p>西南风</p>
                  <p>2级</p>
                </div>
              </div>
              <div class="content">
                <Icon type="speedometer" size="25"></Icon>
                <div class="item-content">
                  <p>气压</p>
                  <p>1010 hPa</p>
                </div>
              </div>

            </div>
          </div>
          <div class="swiper-content">
            <ul class="content-list">
              <li class="list-item">
                <span class="date">12/3</span>
                <span class="day">今天</span>
                <span class="weather-text">
                    <i class="wi wi-night-alt-cloudy"></i>
                  多云转晴
                </span>
                <span class="weather-value">4~15°C</span>
              </li>
              <li class="list-item">
                <span class="date">12/3</span>
                <span class="day">今天</span>
                <span class="weather-text">
                    <i class="wi wi-night-alt-cloudy"></i>
                  多云转晴
                </span>
                <span class="weather-value">4~15°C</span>
              </li>
              <li class="list-item">
                <span class="date">12/3</span>
                <span class="day">今天</span>
                <span class="weather-text">
                    <i class="wi wi-night-alt-cloudy"></i>
                  多云转晴
                </span>
                <span class="weather-value">4~15°C</span>
              </li>
              <li class="list-item">
                <span class="date">12/3</span>
                <span class="day">今天</span>
                <span class="weather-text">
                    <i class="wi wi-night-alt-cloudy"></i>
                  多云转晴
                </span>
                <span class="weather-value">4~15°C</span>
              </li>
              <li class="list-item">
                <span class="date">12/3</span>
                <span class="day">今天</span>
                <span class="weather-text">
                    <i class="wi wi-night-alt-cloudy"></i>
                  多云转晴
                </span>
                <span class="weather-value">4~15°C</span>
              </li>
            </ul>
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
    export default {
        name: '',
        data() {
            return {
              innerHeight:0,
              swiperOption: {
                pagination: {
                  el: '.swiper-pagination'
                },
                parallax : true,
                // some swiper options...
              }
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
      /*height:45%;*/
      color: white;
      text-align: center;
      padding-bottom:.2rem;
      background-image: linear-gradient(300deg, #16B0A1 0%, #3CDAAF 100%);
      border-radius: .5rem;
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
          padding:.2rem;
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
      background-color: white;
      padding-top:.5rem;
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
    }
  }
</style>
