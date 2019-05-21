module.exports = ({ file, options, env }) => {
    return {
        plugins: {
            //解析CSS并使用Can I Use中的值将供应商前缀添加到CSS规则  
            'autoprefixer':{ 
                browsers: ["last 5 version","Android >= 4.0"],
                grid: "autoplace",
            },


            'cssnano': env === 'production',


            //px 转 rem
            // 'postcss-pxtorem':{
            //     rootValue: 10,   //根元素字体大小。
            //     //unitPrecision:1,   //允许REM单位增长的十进制数。
            //     propList:['*'],
            //     selectorBlackList:[],
            //     mediaQuery:true,    //允许在媒体查询中转换px。
            //     minPixelValue:1,    //设置要替换的最小像素值。
            // }
        }
    }
}