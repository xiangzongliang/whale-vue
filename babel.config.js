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
            useBuiltIns: "usage",
        },
    ]
];


const plugins = [] //"transform-runtime"
  
module.exports = { 
    presets,
    plugins
};