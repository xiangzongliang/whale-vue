<template>
    <div>
        <router-view name="header"></router-view>
        <div class="content">
            <router-view name="nav"></router-view>
            <router-view name="install"></router-view>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    mounted(){
        //console.log('dsdsd')
        if(true) {
            //
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10vh;
}
</style>

