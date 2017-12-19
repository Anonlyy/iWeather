<template>
  <div id="app">
    <div class="app-content">
      <ul class="city-list clearfix">
        <li class="city-item">
          <div class="list-item">
            <span class="city-name">东莞</span>
            <div class="weather-value">
              <span class="wi wi-cloud"></span>
              13 °C
            </div>
          </div>
        </li>
        <li class="city-item">
          <div class="list-item">
            <span class="city-name">东莞</span>
            <div class="weather-value">
              <span class="wi wi-cloud"></span>
              13 °C
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
    export default {
        name: 'list',
        data() {
            return {}
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #app{
    padding-top:4.5rem;
    .app-content{
      .city-list{
        display: block;
        width:100%;
        padding:0 1rem;
        .city-item{
          width:100%;
          margin-bottom:.6rem;
          .list-item{
            display: flex;
            justify-content:space-between;
            align-items: center;
            padding:0 1.3rem;
            height:4rem;
            box-shadow: 0 5px 6px rgba(40,172,160,.08);
            border-radius: .3rem;
            border: 1px solid rgba(0,0,0,.05);
            &:hover,&:active{
              background-color: rgba(40,172,160,.78);
              .city-name,.weather-value,>i{
                color: white;
              }
            }
            .city-name{
              font-size: 1rem;
              font-weight: 300;
            }
            .weather-value{
              color: #23ADA1;
              font-size: 1rem;
              font-weight: bold;
              >.wi{
                margin-right:1rem;
                font-size: 2rem;
                vertical-align: sub;
              }
            }
          }

        }
        .add-item{
          .list-item{
            justify-content: center;
            >i{
              font-size: 2rem;
              color: rgba(40,172,160,1);
            }
          }

        }
      }

    }
  }
</style>
