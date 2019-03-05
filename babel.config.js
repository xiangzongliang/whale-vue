const presets = [
    [
        "@babel/env",{
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
                opera:'10',
                ie:"10",
                ios:"7.0",
                android:"4.0",
                node:"8.0.0"
            },
            modules:false, //开启 | 关闭 ES6模块的转换
            useBuiltIns: "usage",
        },
    ]
];


const plugins = ["@babel/plugin-transform-runtime"] //
  
module.exports = { 
    presets,
    plugins
};