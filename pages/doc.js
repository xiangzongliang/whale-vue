import Vue from 'vue'
import Router from 'vue-router'
import docRouter from '@/router/doc-router'
import rem from '@/config/rem'
import '@/assets/scss/index.scss';

import doc from './doc.vue'
Vue.config.productionTip = false //设置为 false 以阻止 vue 在启动时生成生产提示。

Vue.use(Router)

let router = new Router(docRouter)
new Vue({
    el: '#app',
    router,
    render: h => h(doc),
})



/**
 * webpack --display-used-exports
 * 在 modules:false 的状态下
 * 查看那些代码做了 Tree Shaking
 * 
 * webpack --display-optimization-bailout
 * 对于非 ES6 的模块化语法代码, 降级处理,不使用 Scope Hoisting
 * 使用 prepack-webpack-plugin 插件做 Scope Hoisting 并不成熟
 * webpack 内置了 ModuleConcatenationPlugin 插件
 */
