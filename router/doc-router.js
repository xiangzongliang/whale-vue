import nav from '@/components/nav.vue'
import header from '@/components/header.vue'

export default {
    routes:[{
        path: '/',
        name: 'nav',
        components:{
            header,
            nav,
        }
    }]
}
