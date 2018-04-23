import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/style/global.css'

/* Vue.config.productionTip = false */

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

/* 入口文件的 js 逻辑，在webpack 打包之后将被注入到 index.html 中 */
