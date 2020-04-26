import axios from  'axios';
const codeList = {
  0:{
    "code":0,
    "iconName":'wi-day-sunny'
  },
  1:{
    "code":1,
    "iconName":'wi-night-clear'
  },
  2:{
    "code":2,
    "iconName":'wi-day-sunny'
  },
  3:{
    "code":3,
    "iconName":'wi-moon-new'
  },
  4:{
    "code":4,
    "iconName":'wi-cloudy'
  },
  5:{
    "code":5,
    "iconName":'wi-day-cloudy'
  },
  6:{
    "code":6,
    "iconName":'wi-night-alt-cloudy'
  },
  7:{
    "code":7,
    "iconName":'wi-day-cloudy-high'
  },
  8:{
    "code":8,
    "iconName":'wi-night-alt-cloudy-high'
  },
  9:{
    "code":9,
    "iconName":'wi-day-sunny-overcast'
  },
  10:{
    "code":10,
    "iconName":'wi-day-showers'
  },
  11:{
    "code":11,
    "iconName":'wi-day-showers'
  },
  12:{
    "code":12,
    "iconName":'wi-hail'
  },
  13:{
    "code":13,
    "iconName":'wi-rain-mix'
  },
  14:{
    "code":14,
    "iconName":'wi-rain'
  },
  15:{
    "code":15,
    "iconName":'wi-rain-wind'
  },
  16:{
    "code":16,
    "iconName":'wi-rain-wind'
  },
  17:{
    "code":17,
    "iconName":'wi-thunderstorm'
  },
  18:{
    "code":18,
    "iconName":'wi-thunderstorm'
  },
  19:{
    "code":19,
    "iconName":'wi-sprinkle'
  },
  20:{
    "code":20,
    "iconName":'wi-sleet'
  },
  21:{
    "code":21,
    "iconName":'wi-snow'
  },
  22:{
    "code":22,
    "iconName":'wi-snow'
  },
  23:{
    "code":23,
    "iconName":'wi-snow-wind'
  },
  24:{
    "code":24,
    "iconName":'wi-snow-wind'
  },
  25:{
    "code":25,
    "iconName":'wi-snow-wind'
  },
  26:{
    "code":26,
    "iconName":'wi-dust'
  },
  27:{
    "code":27,
    "iconName":'wi-sandstorm'
  },
  28:{
    "code":28,
    "iconName":'wi-sandstorm'
  },
  29:{
    "code":29,
    "iconName":'wi-fog'
  },
  30:{
    "code":30,
    "iconName":'wi-day-haze'
  },
  31:{
    "code":31,
    "iconName":'wi-sandstorm'
  },
  32:{
    "code":32,
    "iconName":'wi-windy'
  },
  33:{
    "code":33,
    "iconName":'wi-strong-wind'
  },
  34:{
    "code":34,
    "iconName":'wi-hurricane'
  },
  35:{
    "code":35,
    "iconName":'wi-storm-warning'
  },
  36:{
    "code":36,
    "iconName":'wi-tornado'
  },
  37:{
    "code":37,
    "iconName":'wi-snowflake-cold'
  },
  38:{
    "code":38,
    "iconName":'wi-hot'
  },
  99:{
    "code":99,
    "iconName":'wi-na'
  }
}
export default ({

  /**
   * 通过 ip、经纬度、城市名称获取 cityid
   * @param key
   * @returns {*}
   */
  getCityId(key){
    return axios.get(`http://api.jirengu.com/city.php/cityid?location=${key}`);
  },

  /**
   * 通过 cityid 获取当天天气
   * @param cityId
   * @returns {*}
   */
  getWeatherInfo(cityId){
    return axios.get(`http://api.jirengu.com/city.php/now?cityid=${cityId}`)
  },

  /**
   * 获取当前城市的天气信息
   */
  getCurrentWeatherInfo(){
    return axios.get(`http://api.jirengu.com/getWeather.php`)
  },
  getSingleCurrentWeatherInfo(){
    return axios.get(`http://api.jirengu.com/getWeather.php`).then(res=>res.data);
  },
  getSingleWeatherInfo(cityId){
    return axios.get(`http://api.jirengu.com/city.php/now?cityid=${cityId}`).then(res=>res.data);
  },
  /**
   * 获取天气code码
   * @param code
   * @returns {*}
   */
  getCodeIcon(code){
    return codeList[code];
  },
})



