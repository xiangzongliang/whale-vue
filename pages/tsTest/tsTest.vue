<script lang="ts">
import { VNode } from 'Vue'
import { Vue, Component, Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'


@Component({})
export default class App extends Vue {
}

// export default Vue.extend({
//     data(){
//         return{
//             msg:"hdusiahdui"
//         }
//     },
//     methods:{
//         num():string{
//             return this.msg + '!'
//         }
//     },
//     render(h):VNode{
//         return h('div',this.num())
//     }
// })
</script>
