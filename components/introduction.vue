<template>
    <div>
        <section class="logo">
            <img src="@/assets/images/logo.png" alt="">
            <p>whale-vue</p>
        </section>
        <section>
            <h3></h3>
        </section>
    </div>
</template>
<script>
export default {
    name:'简介',
    data(){
        return{

        }
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
.logo{
    text-align: center;
    margin-top: 1.8rem;
    img{
        width: 5rem;
    }
    p{
        font-family: Georgia, serif;
        font-size: 1.4rem;
        font-weight: 300;
        margin-top: .4rem;
        color: #e95d25;
        letter-spacing:.2rem;
    }
}
</style>
