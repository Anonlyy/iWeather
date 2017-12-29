<template>
  <div id="app">
    <Spin size="large" fix v-if="isLoading"></Spin>

    <div class="app-content">
      <ul class="city-list clearfix">
        <li class="city-item" v-for="(item,index) in weatherInfoList" >
          <div class="list-item">
            <span class="city-name" v-text="item.city_name"></span>
            <div class="weather-value">
              <span :class="'wi '+item.code"></span>
              {{item.high_low}} °C
            </div>
          </div>
          <span class="btn-delete" :class="isEdit?'isShow':''" @click="cityDelete(index)">
              <Icon type="minus" color="white" size="12"></Icon>
            </span>
        </li>
        <li class="city-item add-item">
          <div class="list-item">
            <Icon type="ios-plus-empty"></Icon>
          </div>
        </li>
      </ul>
    </div>

    <Modal
      v-model="isModalShow"
      title="注意"
      @on-ok="handleDeleteCity(deleteKey)">
      <p>是否删除该城市?</p>
    </Modal>
  </div>
</template>

<script>
  import Bus from '../router/eventBus.js';
  import {WeatherInfo} from '../api/class'
  import longTouch from '../api/touch';
  export default {
    name: 'list',
    directives: { longTouch },
    data() {
      return {
        cityIdList: [],
        isLoading:true,
        currentWeatherInfo: new WeatherInfo('null', 'null', 'null', 'null', 'null', 'null', 'null'), //当天天气信息
        weatherInfoList: [],
        isShow:false,
        isEdit:false,
        isModalShow:false,
        deleteKey:''
      }
    },
    created() {
      const _this = this;
      _this.awaitGetWeatherInfo();
      Bus.$on('editStart', value => {
        _this.isEdit = value;
      });
    },
    methods: {
      async awaitGetWeatherInfo() {
        const _this = this;
        try {
          _this.weatherInfoList = [];
          //获取当前城市天气信息
          let currentRes = await _this.api.getSingleCurrentWeatherInfo();
          let currentData = currentRes.weather[0];
          _this.currentWeatherInfo = new WeatherInfo(currentData.city_id, currentData.city_name, currentData.now.text, currentData.last_update, _this.api.getCodeIcon(currentData.now.code).iconName, currentData.now.air_quality.city.quality, currentData.future[0].low + ' ~ ' + currentData.future[0].high)
          _this.weatherInfoList.push(_this.currentWeatherInfo);

          //获取添加的城市天气信息
          _this.cityIdList = [];
          for (let i = 0; i < window.localStorage.length - 1; i++) {
            _this.cityIdList.push({
              key:window.localStorage.key(i),
              value:window.localStorage.getItem(window.localStorage.key(i))
            });
            window.localStorage.getItem(window.localStorage.key(i));

            let res = await this.api.getSingleWeatherInfo(window.localStorage.getItem(window.localStorage.key(i)));
            let data = res.weather[0];
            _this.currentWeatherInfo = new WeatherInfo(data.city_id, data.city_name, data.now.text, data.last_update, _this.api.getCodeIcon(data.now.code).iconName, data.now.air_quality.city.quality, data.future[0].low + ' ~ ' + data.future[0].high)
            _this.weatherInfoList.push(_this.currentWeatherInfo);
          }
          _this.isLoading = false;
//          console.log(_this.weatherInfoList);
        } catch (error) {
          _this.$Message.error('获取天气列表出错' + error);
        }
      },
      cityDelete(index){
        if(index===0){this.$Message.warning('默认城市无法删除');return}
        this.isModalShow = true;
        this.deleteKey = this.cityIdList[parseInt(index)-1].key;
        console.log(this.deleteKey);
      },
      handleDeleteCity (key) {
        let index = this.cityIdList.findIndex((item)=>{
          return item.key == key;
        });
        //idList没有包含默认城市
        this.cityIdList.splice(index,1);
        //weatherInfoList包含默认城市
        this.weatherInfoList.splice(index+1,1);
        window.localStorage.removeItem(key);

      },

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #app {
    padding-top: 4.5rem;
    background-color:white;
    .app-content {
      .city-list {
        display: block;
        width: 100%;
        padding: 0 1rem;
        .city-item {
          width: 100%;
          margin-bottom: .6rem;
          box-shadow: 0 5px 6px rgba(40, 172, 160, .08);
          border-radius: .3rem;
          position: relative;
          border: 1px solid rgba(0, 0, 0, .05);
          .list-item {
            width: 100%;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 1.3rem;
            height: 4rem;
            .city-name {
              font-weight: 500;
              font-size: 1rem;
            }
            .weather-value {
              color: #23ADA1;
              font-size: 1rem;
              > .wi {
                margin-right: 1rem;
                font-size: 2rem;
                vertical-align: sub;
                position: absolute;
                left: 60%;
                top: 50%;
                transform: translate(-50%,-50%);
              }
            }
          }
          .btn-delete{
            transition: all .3s;
            border-radius: 50%;
            background-color: rgba(236,25,27,.8);
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top:-.3rem;
            right:-.3rem;
            width:1.2rem;
            height:1.2rem;
            opacity: 0;
          }
          .isShow{
            opacity: 1;
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
