<template>
    <div class="header">
        <h1>whale-vue</h1>
        <ul>
            <li class="active"><router-link to="/">简介</router-link></li>
            <li><router-link to="/doc">文档</router-link></li>
            <li><router-link to="/support">支持</router-link></li>
            <li><input type="search" placeholder="search"></li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
@charset "utf-8";
$line-height: .8rem;
$color:#e95d25;
$fsz:0.333rem;

.header{
    width: 100vw;
    height: $line-height;
    //border-bottom: 1px solid #ececec;
    box-shadow: 0px 0px 5px #ccc;
    display: flex;
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
        padding-right: 0.6rem;
        li{
            list-style: none;
            display: inline-block;
            padding: 0rem 0.2rem;
            margin: 0rem 0.4rem;
            line-height: $line-height;
            height: $line-height;
            position: relative;
            a{
                text-decoration: none;
                color: #333;
                font-size: $fsz;
            }
            input{
                border:1px solid #ececec;
                height: 0.5rem;
                display: inline-block;
                padding: 0.1rem .2rem;
                line-height: 0.5rem;
            }
        }
        .active{
            a{
                color: $color;
                
            }
        }
    }
}
</style>
