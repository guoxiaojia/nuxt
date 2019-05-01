import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import config from './modules/config'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () => new Vuex.Store({
    state: state,
    modules: {
      config,
    },
    actions: actions,
    mutations: mutations,
    getters: getters,
    strict: debug,
 })

export default store