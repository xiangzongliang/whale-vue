import Vue from 'vue'
import Router from 'vue-router'
import indexRouter from '@/router/index-router'
import rem from '@/config/rem'
import introduction from './introduction.vue'
import '@/assets/scss/index.scss';



Vue.config.productionTip = false //设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.use(Router)

let router = new Router(indexRouter)
new Vue({
    router,
    el: '#app',
    render: h => h(introduction),
})


