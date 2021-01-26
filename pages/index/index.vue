<template>
  <div>
    <header-dom />
    <section>
      {{ des }}
    </section>
    <footer-dom />
  </div>
</template>
<script lang="ts">
import footerDom from "@/components/footer.vue";
import headerDom from "@/components/header.vue";
import axios from "axios";
import Vue from "vue";

import { Pagedata } from "@/type/index/";
export default Vue.extend({
  data(): Pagedata {
        return{
            des: "自定义的多页脚手架",
        };
    },
    mounted() {
        /**
         * Mock 数据测试
         */

        // axios.post('/api/index').then(response => {
        //     console.info(response)
        // }).catch( error => {
        //     console.log(error);
        // });
    },
    components: {
        headerDom,
        footerDom,
    },
});

</script>

