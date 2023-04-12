import copy from './copy'
import ellipsis from './ellipsis'
// import longpress from './longpress'
// 自定义指令
const directives = {
  copy,
  ellipsis
//   longpress,
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}