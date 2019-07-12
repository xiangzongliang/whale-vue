<template>
    <header>
        <h3>whale-vue</h3>
        <p>version 1.0.0</p>
        <img @click="goGithub" src="@/assets/icon/github.png" alt="">
        <ul>
            <li v-for="(item,index) in navList" :key='index' @click="goPage(item)">{{ item.name }}</li>
        </ul>
    </header>
</template>
<script>
export default {
    data(){
        return{
            navList:[{
                name:'首页',
                link:'./index.html'
            },{
                name:'关于',
                link:'./about.html'
            }]
        }
    },
    methods:{
        goPage(item){
            window.location.href = item.link
            console.log(item)
        },
        goGithub(){
            window.open('https://github.com/xiangzongliang/whale-vue')
        }
    }
}
</script>

<style lang="less" scoped>
    header{
        display: block;
        width: 100%;
        text-align: center;
        h3{
            font-family: 'whale';
            padding-top: 16vh;
            font-size: 80px;
            color: #42b883;
        }
        p{
            color: #c4c4c4;
            font-size: 18px;
        }
        img{
            width: 20px;
            margin-top: 20px;
        }
        ul{
            padding-top: 2vh;
            li{
                display: inline-block;
                padding: 0 20px;
                font-size: 18px;
                color: #555;
                text-decoration: underline;
                &:hover{
                    color: #42b883;
                    transition: 0.2s ease-in;
                }
            }
        }
    }
</style>

