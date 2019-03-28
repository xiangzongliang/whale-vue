## [Whale-Vue 示例文档](https://whale.xiangzongliang.com "示例文档")


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
- /core     `webpack`编译核心文件
- /pages     //页面存放目录
- /public       //静态文件目录（可以通过端口直接访问文件,并会在打包时直接复制该目录文件）
- /router       // 在使用 `vue-router`时路由存放目录
- /template     //编译模版文件
- /tests        //测试文件目录
- `/store`       //在使用`vuex`时候，状态文件管理目录
- `/plugin`        //插件目录

#### `assets目录`



