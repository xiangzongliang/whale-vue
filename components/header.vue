<template>
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

<style lang="scss" scoped>
@charset "utf-8";
$line-height: .8rem;
$color:#e95d25;
$fsz:0.28rem;

.header{
    width: 100vw;
    height: $line-height;
    //border-bottom: 1px solid #ececec;
    // box-shadow: 0px 0px 5px #ccc;
    display: flex;
    background: #fff;
    justify-content: space-between;
    cursor: pointer;
    h1{
        display: inline-block;
        color: $color;
        font-size: 0.5rem;
        line-height: $line-height;
        padding-left: 0.6rem;
        font-weight: 800;
    }
    ul{
        padding-right: 0.2rem;
        display: flex;
        li{
            list-style: none;
            display: inline-block;
            padding: 0rem 0.18rem;
            margin: 0rem 0.32rem;
            line-height: $line-height;
            height: $line-height;
            position: relative;
            // background: #ccc;
            text-decoration: none;
            color: #444;
            font-size: $fsz;
            a{
                
            }
        }
        .search{
            width: 3.6rem;
            input{
                border:1px solid #ececec;
                border-radius: 3rem;
                width: 3.6rem;
                height: 0.4rem;
                position: absolute;
                top: .16rem;
                color: #aaa;
                display: inline-block;
                padding: 0.24rem .6rem 0.24rem 0.3rem;
                box-sizing: border-box;
                line-height: 0.5rem;
            }
            img{
                width: 0.3rem;
                position: absolute;
                top: 0.28rem;
                right: 0.4rem;
            }
        }
        .github {
            margin: 0rem;
            width: 0.5rem;
            img{
                width: 0.4rem;
                position: absolute;
                top: .18rem;
            }
            
        }
        .active{
            color: $color;
        }
    }
}
</style>
