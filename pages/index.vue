<template>
    <div>
        <header-dom></header-dom>
        <section>
            {{ des }}
        </section>
        <footer-dom></footer-dom>
    </div>
</template>
<script>
import headerDom from '@/components/header.vue'
import footerDom from '@/components/footer.vue'
export default {
    data(){
        return{
            des:'自定义的多页脚手架'
        }
    },
    components:{
        headerDom,
        footerDom
    }
}
</script>

