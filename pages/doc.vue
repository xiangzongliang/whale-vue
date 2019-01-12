<template>
    <div>
        <router-view name="header"></router-view>
        <div class="nav-content">
            <router-view name="nav"></router-view>
            <div class="content">
                
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
.nav-content{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10vh;
}
.content{
    width: 70vw;
    word-wrap:break-word;
}
</style>

