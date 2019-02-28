import nav from '@/components/nav.vue'
import header from '@/components/header.vue'
import Content from '@/components/content.vue'
import install from '@/components/doc/install.vue'
import introduction from '@/components/doc/introduction.vue'

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
            path: 'install',
            components:{install}
        },{ 
            path: '',
            components:{introduction}
        }]
    },{
        path: '/support',
        name: 'support',
        components:{
            header,
        }
    }]
}
