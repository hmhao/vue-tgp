import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      title: '淘个片 - 秒淘好片',
      slogan: '好好淘片 天天看看',
      year: 2017,
      banners: [],
      entries:[],
      blocks: {},
      list_renqi: '',
      list_upuser: '',
      list_piaofang: '',
      list_quanwang: '',
      category: []
    },
    actions,
    mutations,
    getters
  })
}
