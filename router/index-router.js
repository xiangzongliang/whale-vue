import header from '@/components/header.vue'
import introduction from '@/components/introduction.vue'

export default {
    routes:[{
        path: '/',
        name: 'introduction',
        components:{
            header,
            introduction
        }
    }]
}
