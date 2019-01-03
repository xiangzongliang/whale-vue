import Vue from 'vue'
import index from './index.vue'
import abcommon from '@/assets/js/abcommon';

import '@/assets/less/index.less';

Vue.config.productionTip = false //设置为 false 以阻止 vue 在启动时生成生产提示。
new Vue({
    el: '#app',
    render: h => h(index),
})
