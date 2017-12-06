import axios from  'axios';

export default ({

  /**
   * 通过 ip、经纬度、城市名称获取 cityid
   * @param key
   * @returns {*}
   */
  getCityId(key){
    return axios.get(`https://weixin.jirengu.com/weather/cityid?location=${key}`);
  },

  /**
   * 通过 cityid 获取当天天气
   * @param cityId
   * @returns {*}
   */
  getWeatherInfo(cityId){
    return axios.get(`https://weixin.jirengu.com/weather/now?cityid=${cityId}`)
  },

  /**
   * 获取当前城市的天气信息
   */
  getCurrentWeatherInfo(){
    return axios.get(`https://weixin.jirengu.com/weather`)
  }


})


const codeList = [
  {
    code:0,
    iconName:'wi-day-sunny'
  },
  {
    code:1,
    iconName:'wi-night-clear'
  },
  {
    code:2,
    iconName:'wi-day-sunny'
  },
  {
    code:3,
    iconName:'wi-moon-new'
  },
  {
    code:4,
    iconName:'wi-cloudy'
  },
  {
    code:5,
    iconName:'wi-day-cloudy'
  },
  {
    code:6,
    iconName:'wi-night-alt-cloudy'
  },
  {
    code:7,
    iconName:'wi-day-cloudy-high'
  },
  {
    code:8,
    iconName:'wi-night-alt-cloudy-high'
  },
  {
    code:9,
    iconName:'wi-day-sunny-overcast'
  },
  {
    code:10,
    iconName:'wi-day-showers'
  },
  {
    code:11,
    iconName:'wi-day-showers'
  },
  {
    code:12,
    iconName:'wi-hail'
  },
  {
    code:13,
    iconName:'wi-rain-mix'
  },
  {
    code:14,
    iconName:'wi-rain-wind'
  },
  {
    code:15,
    iconName:'wi-rain-wind'
  },
  {
    code:16,
    iconName:'wi-thunderstorm'
  },
  {
    code:16,
    iconName:'wi-night-clear'
  },
  {
    code:17,
    iconName:'wi-night-clear'
  },
  {
    code:18,
    iconName:'wi-night-clear'
  },
  {
    code:19,
    iconName:'wi-night-clear'
  },
  {
    code:20,
    iconName:'wi-night-clear'
  },
]
