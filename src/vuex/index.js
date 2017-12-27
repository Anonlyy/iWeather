import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    cityIdList: []
  },
  getters:{
    getters(state){
      return state.cityIdList;
    }
  },
  mutations: {
    addCityItem(state, list,key) {
      return
    },
    deleteCityItem(state, list,key) {
    }
  },
  actions: {
    increase(state,list,key){
      state.commit('addCityItem',list,key);

    },
    uncrease(state,list,key){
      // window.localStorage.removeItem(key);
      state.commit('deleteCityItem',list,key);
    }
  }

})
