import nav from '@/components/nav.vue'
import header from '@/components/header.vue'
import install from '@/components/doc/install.vue'

export default {
    routes:[{
        path: '/',
        name: 'nav',
        components:{
            header,
            nav,
        }
    },{
        path: '/install',
        name: 'install',
        components:{
            header,
            nav,
            install,
        }
    }]
}
