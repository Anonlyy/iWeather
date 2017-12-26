<template>
  <div id="app">
    <div class="app-content">
      <ul class="city-list clearfix">
        <li class="city-item" v-for="item in weatherInfoList">
          <div class="list-item">
            <span class="city-name" v-text="item.city_name"></span>
            <div class="weather-value">
              <span :class="'wi '+item.code"></span>
              {{item.high_low}} °C
            </div>
          </div>
        </li>

        <li class="city-item add-item">
          <div class="list-item">
            <Icon type="ios-plus-empty"></Icon>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {WeatherInfo} from '../api/class'

  export default {
    name: 'list',
    data() {
      return {
        cityIdList: [],
        currentWeatherInfo: new WeatherInfo('null', 'null', 'null', 'null', 'null', 'null', 'null'), //当天天气信息
        weatherInfoList: []
      }
    },
    created() {
      const _this = this;
      _this.awaitGetWeatherInfo();


    },
    methods: {
      async awaitGetWeatherInfo(id) {
        const _this = this;
        try {
          //获取当前城市天气信息
          let currentRes = await _this.api.getSingleCurrentWeatherInfo();
          let currentData = currentRes.weather[0];
          _this.currentWeatherInfo = new WeatherInfo(currentData.city_id, currentData.city_name, currentData.now.text, currentData.last_update, _this.api.getCodeIcon(currentData.now.code).iconName, currentData.now.air_quality.city.quality, currentData.future[0].low + ' ~ ' + currentData.future[0].high)
          _this.weatherInfoList.push(_this.currentWeatherInfo);

          //获取添加的城市天气信息
          for (let i = 0; i < window.localStorage.length - 1; i++) {
            _this.cityIdList.push(window.localStorage.getItem(window.localStorage.key(i)));
            window.localStorage.getItem(window.localStorage.key(i));

            let res = await this.api.getSingleWeatherInfo(window.localStorage.getItem(window.localStorage.key(i)));
            let data = res.weather[0];
            _this.currentWeatherInfo = new WeatherInfo(data.city_id, data.city_name, data.now.text, data.last_update, _this.api.getCodeIcon(data.now.code).iconName, data.now.air_quality.city.quality, data.future[0].low + ' ~ ' + data.future[0].high)
            _this.weatherInfoList.push(_this.currentWeatherInfo);
          }


          console.log(_this.weatherInfoList);
        } catch (error) {
          _this.$Message.error('获取天气列表出错' + error);
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #app {
    padding-top: 4.5rem;
    .app-content {
      .city-list {
        display: block;
        width: 100%;
        padding: 0 1rem;
        .city-item {
          width: 100%;
          margin-bottom: .6rem;
          .list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 1.3rem;
            height: 4rem;
            box-shadow: 0 5px 6px rgba(40, 172, 160, .08);
            border-radius: .3rem;
            border: 1px solid rgba(0, 0, 0, .05);
            &:hover, &:active {
              background-color: rgba(40, 172, 160, .78);
              .city-name, .weather-value, > i {
                color: white;
              }
            }
            .city-name {
              font-size: 1rem;
              font-weight: 300;
            }
            .weather-value {
              color: #23ADA1;
              font-size: 1rem;
              font-weight: bold;
              > .wi {
                margin-right: 1rem;
                font-size: 2rem;
                vertical-align: sub;
              }
            }
          }

        }
        .add-item {
          .list-item {
            justify-content: center;
            > i {
              font-size: 2rem;
              color: rgba(40, 172, 160, 1);
            }
          }

        }
      }

    }
  }
</style>
