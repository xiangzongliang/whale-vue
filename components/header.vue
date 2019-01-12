<template>
    <div>
        <div class="header">
            <h1>
                whale-vue
            </h1>
            
            <ul>
                <li v-for="(item,key) in navList" :key="key" @click="goPage(item)">{{ item.name }}</li>
                <li class="search">
                    <input type="text" placeholder="搜索">
                    <img src='@/assets/icon/search.png'/>
                </li>
                <li class="github">
                    <img src='@/assets/icon/github.png'/>
                </li>
            </ul>
        </div>
        <div class="csbg"> </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            navActive:'/',
            navList:[{
                id:'1',
                name:'简介',
                link:'/'
            },{
                id:'2',
                name:'文档',
                link:'/doc.html'
            },{
                id:'3',
                name:'支持',
                link:'/'
            }]
        }
    },
    mounted(){
    },
    methods:{
        goPage(item){
            window.location.href = item.link
        }
    }
}
</script>

