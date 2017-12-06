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
