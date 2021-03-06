import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/styles/icon.less'
// import '@/styles/reset.less'
import '@/styles/index.less'

// import Hmicon from '@./components/Hmicon'
import * as obj from '@/filters'
// Vue.component('MyIcon', MyIcon)
import FollowUser from '@/components/FollowUser'
import '@/components/index'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

Vue.use(Vant)

Vue.config.productionTip = false
Vue.component(FollowUser.name, FollowUser)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 给页面上所有的元素绑定滚动事件
//  只要谁滚动 就打印出来
// const list = document.querySelectorAll('*')
// list.forEach(item => {
//   item.onscroll = function (e) {
//     console.log(e.target)
//   }
// })
