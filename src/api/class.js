//图文详情对象
export class WeatherInfo {
  constructor(id, city_name,text,update_time,code,air_quality,high_low) {
    this.id = id,
      this.city_name = city_name,
      this.update_time = update_time, //更新时间
      this.text = text, //天气详情
      this.code = code,   //天气代码
      this.air_quality = air_quality, //空气质量
      this.high_low = high_low //高低温
  }
}

export class WeatherNotice{
  constructor(temperature,wind_direction,wind_scale,pressure) {
    this.temperature = temperature,  //当前温度
    this.wind_direction = wind_direction, //风向
    this.wind_scale = wind_scale, //风力
    this.pressure = pressure   //气压
  }
}


export class FutureWeatherInfo {
  constructor(date,high_low,day,text,code) {
    this.date = date,
    this.high_low = high_low,
    this.day = day,
    this.text = text,
    this.code = code
  }
}
