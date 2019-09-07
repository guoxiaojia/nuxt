import qs from "qs"
import help from '@/tool/help.js'
import { url } from '@/api/config'
export default {
    async getCaptcha ({ commit }) {
    let randStr = help.getRandom(true,16,16)
    const data = {
      verifyString: randStr
    }
    let res = await this.$axios.$get(url.captcha,{params:data})
    let img = 'data:image/png;base64,'+res.result
    commit('getCaptcha',{img :img,randStr:randStr})
  },
  async sendEmailCode ({ commit },email) { //发送邮件
    let data = {
      email:email
    }
    data = qs.stringify(data)
    return await this.$axios.$post(url.sendEmailCode,data)
  },
  removeTodo ({ commit }, todo) {
    commit('removeTodo', todo)
  },

  toggleTodo ({ commit }, todo) {
    commit('editTodo', { todo, done: !todo.done })
  },
  
  editTodo ({ commit }, { todo, value }) {
    commit('editTodo', { todo, text: value })
  },
  
  toggleAll ({ state, commit }, done) {
    state.todos.forEach((todo) => {
      commit('editTodo', { todo, done })
    })
  },
  
  clearCompleted ({ state, commit }) {
    state.todos.filter(todo => todo.done)
      .forEach(todo => {
        commit('removeTodo', todo)
      })
  }
}
