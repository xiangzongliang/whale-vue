## [Whale-Vue 示例文档](https://whale.xiangzongliang.com "示例文档")

### 说明
`whale-vue`是一个基于`webpack4`和`vue2.+`进行编写的多页面脚手架，其配置将完全暴露在`core`目录中，并未进行封装，用户可以根据自己的需求进行重新修改配置； 你可以像重新配置`webpack`一样的阅读脚手架代码，目录参考了`nuxt.js`和`egg`的部分结构，你可以直接克隆`Git`仓库的源码进行运行。


### 开始

`git`克隆项目   
```
git clone https://github.com/xiangzongliang/whale-vue.git
```
### 开发环境
```
npm run dev
```
### 静态文件输出
```
npm run build
```


### 目录结构


- /assets   &emsp;&emsp;&emsp;&emsp;//资源目录  
- /build    &emsp;&emsp;&emsp;&emsp;//build命令输出目录   
- /components  &emsp;&emsp;&emsp;&emsp;//组件目录   
- /config      &emsp;&emsp;&emsp;&emsp;配置文件
- - pages.js    &emsp;&emsp;&emsp;&emsp;所有页面入口
- - rem.js      &emsp;&emsp;&emsp;&emsp;rem自适应
- /core     &emsp;&emsp;&emsp;&emsp;`webpack`编译核心文件
- /pages     &emsp;&emsp;&emsp;&emsp;//页面存放目录
- /public       &emsp;&emsp;&emsp;&emsp;//静态文件目录（可以通过端口直接访问文件,并会在打包时直接复制该目录文件）
- /router       &emsp;&emsp;&emsp;&emsp;// 在使用 `vue-router`时路由存放目录
- /template     &emsp;&emsp;&emsp;&emsp;//编译模版文件
- /tests        &emsp;&emsp;&emsp;&emsp;//测试文件目录
- `/store`       &emsp;&emsp;&emsp;&emsp;//在使用`vuex`时候，状态文件管理目录
- `/plugin`        &emsp;&emsp;&emsp;&emsp;//插件目录

#### + `assets目录`
资源目录，在项目中存放的图片、样式、字体等文件存放目录，可以在项目中直接使用`@/assets/***.css`,有关`@/`的配置参见`core/base.js`
```
resolve:{
    alias: {
        '@':path.resolve(__dirname, '../'),
    }
}
```

#### + `components`
`vue`开发的公共组件

#### + `config`
主要用来存放项目的公共配置，`pages.js`文件是多页面的入口文件，每增加一个页面，需要在此处增加配置,也可以通过注释此处的入口从而避免打包，但会保持`pages`目录下的页面源文件依然存在。


#### + `core`

`webpack`核心编译配置代码，可以通过修改这里的配置来灵活的改变项目所对应的业务需求。

##### `pages.js`
该文件会通过`core/utils.js`下的方法生成多页的入口和输出两部分的配置，该配置最终使用`html-webpack-plugin`插件的形式注入，例如：
```
about: {
    title:'whale-vue 基于 webpack4 的 vue 大型多页项目脚手架',
    entry: './pages/about/about.js',
    template: './template/index.html',
    //chunks
    //favicon
    //excludeChunks
}
```
- `title`将会通过`htmlWebpackPlugin.options.title`注入到模版页面中
- `entry`页面入口文件的路径
- `template`编译的模版文件
- `chunks`支持`[ Array | Function ]`,为`Array`时候只会注入数组中的代码块，为`Function`接收默认的代码块，可以经过处理，但必须返回数组。
> 默认注入的模块已经经过优化,应该尽量减少`chunks API`的使用。
- `favicon` 对应`htmlWebpackPlugin`插件的`favicon`
- `excludeChunks`用于排除不必要的代码块，支持`[ Array | Function | RegExp]`,为数组时将会直接排除数组中的模块，为函数时接受当前默认代码块，并返回数组，为正则表达式，将会直接使用`test`方法排除。
> 该模块的改动尽量阅读源码。

##### `rem.js`

主要是页面在使用`rem`单位时进行适配的相关处理

#### + `pages`

多页面存放目录

#### + `public`

静态文件目录，开发环境下可以直接通过端口进行文件的访问，静态输出的时候会通过`copy-webpack-plugin`将所有文件复制到输出目录

#### + `router`

路由存放目录

#### + `store`

项目默认并没有该目录，需要手动新建, 当使用`vuex`来管理状态时,可以将文件存放至该目录，当然也可以自定义目录名称。


#### + `plugin`

需要手动创建。插件存放目录,例如你要是用`Vue.use()`进行方法的扩展等，你可以将一些通用的处理方法或者插件存放至此。


> 关于`whale-vue`的整体项目配置，我们只是在`webpack 4`和`vue 2.+`的基础上进行了默认的配置，并做了相应的规范管理，并没有做任何封装。你完全可以在了解`webpack`以及打包流程的情况下，自行修改`core`目录下的配置文件来对应你的业务需求。