<template>
  <div>
    <router-view name="header" />
    <div class="content">
      <router-view name="nav" />
      <div class="doc-content" />
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
.doc-content{
    width: 70vw;
    word-wrap:break-word;
}
</style>

