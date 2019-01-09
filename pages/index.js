import Vue from 'vue'
import index from './index.vue'
import { add } from '@/assets/js/tool';

import '@/assets/less/index.less';
console.log(add(1,2))
Vue.config.productionTip = false //设置为 false 以阻止 vue 在启动时生成生产提示。
new Vue({
    el: '#app',
    render: h => h(index),
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
