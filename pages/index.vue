<template>
  <div class="example">{{ title }}
      <input v-model="inputVal"/>
      dsadads
      <img src="@/assets/images/big_icon.png" alt="">
      <span @click="postMsg">发送信息</span>
  </div>
</template>
<script>
// import nonetWork from "../pages/about.vue";


export default {
    data(){
        return{
            title:'dsadsadsaddad',
            name:1213,
            inputVal:'',

        }
    },
    mounted(){
        //使用 Service Workers实现文件缓存技术
        if (navigator.serviceWorker) {
            // window.addEventListener('DOMContentLoaded',function(){
            //     navigator.serviceWorker.register('./ServiceWorker.js',{scope: '/'}).then(function(registration) {
            //         console.log('ServiceWorker 注册成功 ', registration.scope);
            //     }).catch(function(err) {
            //         console.log('Service Worker 注册失败 failed: ', err);
            //     });
            // })
        }
    },
    methods:{
        postMsg(){
        }
    }
}
</script>
<style scoped>
.example{
    background: #33b5e5;
    font-size: 12px;
    padding: 10px;
}
</style>


