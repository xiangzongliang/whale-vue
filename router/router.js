import nav from '@/components/nav.vue'
import header from '@/components/header.vue'
import Content from '@/components/content.vue'
import install from '@/components/doc/install.vue' //安装
import introduction from '@/components/doc/introduction.vue' //简介
import structure from '@/components/doc/structure.vue' //结构

export default {
    routes:[{
        path: '/',
        name: 'doc',
        components:{
            header,
            nav,
            Content,
        },
        children:[{ 
            path: '',
            components:{introduction}
        }]
    },{
        path: '/doc',
        name: 'doc',
        components:{
            header,
            nav,
            Content,
        },
        children:[{ 
            path: 'install',
            components:{install}
        },{ 
            path: '',
            components:{introduction}
        },{ 
            path: 'structure',
            components:{structure}
        },{ 
            path: 'configure',
            components:{structure}
        }]
    },{
        path: '/support',
        name: 'support',
        components:{
            header,
            nav,
        }
    }]
}
