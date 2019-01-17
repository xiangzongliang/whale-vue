<template>
  <div>
    <div class="header">
      <h1>
        <img
          src="@/assets/images/logo.png"
          alt=""
        >
        whale-vue
      </h1>
            
      <ul>
        <li
          v-for="(item,key) in navList"
          :key="key"
          @click="goPage(item)"
        >
          {{ item.name }}
        </li>
        <li class="search">
          <input
            type="text"
            placeholder="搜索"
          >
          <img src="@/assets/icon/search.png">
        </li>
        <li class="github">
          <img src="@/assets/icon/github.png">
        </li>
      </ul>
    </div>
    <div class="csbg" />
  </div>
</template>
<script>
export default {
    data(){
        return{
            navActive:'/',
            navList:[{
                id:'2',
                name:'文档',
                link:'/'
            },{
                id:'3',
                name:'支持',
                link:'/support'
            }]
        }
    },
    mounted(){
    },
    methods:{
        goPage(item){
            this.$router.push({
                path:item.link
            })
        }
    }
}
</script>

