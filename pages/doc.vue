<template>
    <div>
        <router-view name="header"></router-view>
        <div class="content">
            <router-view name="nav"></router-view>
            <div class="doc-content">
                
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
.content{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10vh;
}
.doc-content{
    width: 70vw;
    word-wrap:break-word;
}
</style>

