import { terser } from 'rollup-plugin-terser'; //压缩JS
import visualizer from 'rollup-plugin-visualizer';//可视化
import json from 'rollup-plugin-json';


//打包图表
let config = [{
    input: './components/index.js',
    output: [{
        file: './build/chart.js',
        format: 'es',
    }],
    plugins: [
        json({
            // All JSON files will be parsed by default,
            // but you can also specifically include/exclude files
            // include: 'node_modules/**',
            // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],

            // for tree-shaking, properties will be declared as
            // variables, using either `var` or `const`
            //preferConst: true, // Default: false

            // specify indentation for the generated default export —
            // defaults to '\t'
            //indent: '  ',

            // ignores indent and generates the smallest code
            //compact: true, // Default: false

            // generate a named export for every property of the JSON object
            //namedExports: true // Default: true
        }),
        terser(),
        visualizer({
            open:true
        })
    ],
},{
    input: './plugin/index.js',
    output: [{
        file: './build_plugin/chart_plugin.js',
        format: 'es',
    }],
    plugins: [
        json(),
        terser(),
        visualizer({
            open:true
        })
    ],
}
// {
//     input: './plugin/index.js',
//     output: [{
//         file: './build/chart.umd.js',
//         format: 'umd',
//         name: 'chart'
//     }],
//     plugins: [
//         terser(),
//         visualizer({
//             open:true
//         })
//     ],
// }
]

export default config;