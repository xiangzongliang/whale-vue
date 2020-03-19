<template>
  <div>
    <header-dom />
    <section class="about">
      <!-- <p class="tool">Node : 8.5.0+</p>
            <p class="tool">Npm : 5.0+</p> -->
      <p class="content">
        <code>whale-vue</code>是一个基于<code>webpack4</code>、<code>vue2.5+</code>和<code>babel7+</code>进行编写的多页面脚手架，同时集成了<code>typeScript</code>、<code>vue-property-decorator</code>的编码方式。其配置将完全暴露在<code>core</code>目录中，并未进行封装，用户可以根据自己的需求进行重新修改配置；
        你可以像重新配置<code>webpack</code>一样的阅读脚手架代码，目录参考了<code>nuxt.js</code>和<code>egg</code>的部分结构，你可以直接克隆<code>Git</code>仓库的源码进行运行，详细的使用和介绍将在<code>GitHub</code>中。
      </p>
    </section>
    <footer-dom />
  </div>
</template>
<script>
import headerDom from '@/components/header.vue'
import footerDom from '@/components/footer.vue'
export default {
    data(){
        return{

        }
    },
    components:{
        headerDom,
        footerDom
    }
}
</script>

