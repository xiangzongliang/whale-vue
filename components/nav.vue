<template>
  <div class="nav">
    <div class="version">
      v1.0.0
    </div>
    <ul>
      <li 
        v-for="(item,index) in navList"
        :key="index"
        :class="activeNav == item.key ? 'active' : ''"
        @click="checkNav(item)"
      >
        <p>{{ item.name }}</p>
        <template v-if="item.child">
          <div class="child">
            <p v-for="(c_item,c_index) in item.child" :key="c_index" :class="activeChild == c_item.key ? 'child-active' : ''" @click.stop="checkChild(c_item)" >
              {{ c_item.name }}
            </p>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    data(){
        return {
            activeNav:'start',
            activeChild:'',
            navList:[{
                key:'start',
                name:'起步'
            },{
                key:'install',
                name:'安装',
                child:[{
                    key:'VersionCompatibility',
                    name:'版本的兼容性'
                },{
                    key:'otherInfo',
                    name:'其他信息'
                }]
            },{
                key:'structure',
                name:'结构'
            },{
                key:'configure',
                name:'配置'
            }]
        }
    },
    methods:{
        checkNav(item){
            this.activeNav = item.key
            this.activeChild = item.child ? item.child[0].key : ''
            //跳转路由
            this.$router.push({
                path:'/install'
            })
        },
        checkChild(item){
            this.activeChild = item.key
        }
    }
}
</script>


