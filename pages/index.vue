<template>
  <div class="example">{{ title }}
      <input v-model="inputVal"/>
      <span @click="postMsg">发送信息</span>
  </div>
</template>
<script>
export default {
    data(){
        return{
            title:'hurieshviuhsiu',
            name:1213,
            inputVal:'',

        }
    },
    mounted(){
        if ('serviceWorker' in navigator) {
      // 有原生支持时，在页面加载后开启新的 Service Worker 线程，从而优化首屏加载速度
        window.addEventListener('load', function() {
        // register 方法里第一个参数为 Service Worker 要加载的文件；第二个参数 scope 可选，用来指定 Service Worker 控制的内容的子目录
            navigator.serviceWorker.register('./ServiceWorker.js').then(function(registration) {
            // Service Worker 注册成功
            console.log('ServiceWorker 注册成功 ', registration.scope);

                //接收信息
                navigator.serviceWorker.addEventListener('message', function (event) {
                    console.log(event)
                })

            }).catch(function(err) {
            // Service Worker 注册失败
            console.log('ServiceWorker registration failed: ', err);
            });
        });
        }
    },
    methods:{
        postMsg(){
            navigator.serviceWorker.controller.postMessage(this.inputVal);
            console.log(this.inputVal)
        }
    }
}
</script>

