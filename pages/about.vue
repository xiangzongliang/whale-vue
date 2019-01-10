<template>
    <div class="text">
        hduisadheiu
    </div>
</template>
<script>
export default {
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
    }
}
</script>

<style>
body{
    background: none
}
</style>
<style scoped>
.text{
    background: #33b5e5;
    padding: 10px;
    color: #fff;
    font-size: 12px;
}
</style>

