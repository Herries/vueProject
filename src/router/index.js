import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'
import List from '../components/personManage/List'
import Main from '../components/main/Main'
import Carousel from '../components/main/Carousel'
import empAdd from '../components/personManage/EmpAdd.vue'

require('../API/mock.js')

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  mode: 'history',
  routes: [
  /* 嵌套子路由 */
    {
      path: '/main',
      name: 'home',
      component: Main,
      children: [
        {
          path: '',
          name: 'main',
          title: '主页',
          component: Carousel
        },
        {
          path: 'empList',
          name: 'list',
          title: '职员列表',
          component: List,
          children: [
            {
              path: 'add',
              name: 'add',
              title: '新增页面',
              component: empAdd
            }
          ]
        }
      ]
    }
  ]
})
