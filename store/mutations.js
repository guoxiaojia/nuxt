// export const mutations = {
//   addTodo (state, todo) {
//     state.todos.push(todo)
//   },

//   removeTodo (state, todo) {
//     state.todos.splice(state.todos.indexOf(todo), 1)
//   },

//   editTodo (state, { todo, text = todo.text, done = todo.done }) {
//     todo.text = text
//     todo.done = done
//   }
// }
export function addTodo (state, todo) {
    state.todos.push(todo)
}
  //获取图形验证码
export function getCaptcha(state,img) {
  state.captcha = img
}