import qs from 'qs'
import {url}  from '@/api/config'

const state = {
}

const mutations = {
    setMdConf (state,confArr) {
        state.mdConf = confArr;
    },
}

const actions = {
  userLogin ({ commit },loginMsg) { //用户登录
    loginMsg = qs.stringify(loginMsg)
    return this.$axios.$post(url.userLogin,loginMsg)
  },
  userReg({ commit },regMsg) { //用户注册
    return this.$axios.$post(url.userReg,regMsg)
  }
}

export default {
  namespaced: true,
  state () {
    return state
  },
  actions,
  mutations
}
