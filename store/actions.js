import help from '@/tool/help.js'
import { url } from "@/api/config"
export default {
    async getCaptcha ({ commit }) {
    let randString = help.getRandom(true,16,16)
    const data = {
      verifyString: randString
    }
    let res = await this.$axios.$get(url.captcha,{params:data})
    console.log(res)
    let img = 'data:image/png;base64,'+res.result
    commit('getCaptcha',img)
    // .then(res =>{
    // console.log(res)
    // let img = 'data:image/png;base64,'+res.result
    //   commit('getCaptcha',img)
    // }).catch(error => {
    //   console.log(error)
    // })
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