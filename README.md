# vue-tgp

Tgp 是参照 [淘个片](http://tt.kankan.com/m)，使用 Vue 2.0 + vue-router + vuex + fetch  实现的移动端 SSR 项目(自带[mockjs](https://github.com/nuysoft/Mock/wiki)模拟接口)
> 依照官方 [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0) demo 构建

## 特性

- 服务端渲染
  - Vue + vue-router + vuex 协同工作
  - 服务端数据预取
  - 客户端状态与DOM融合
  - 预加载/预取资源提示
  - 路由层代码分割
- 渐进式的Web应用程序
  - App manifest
  - Service worker
  - 100/100 Lighthouse score
- 单文件Vue组件
  - 开发热重载
  - 发布抽取CSS
- 动画
  - 切换路由视图效果
  - 轮播图效果
  - 双击顶部菜单 goto top 效果
- 数据
  - mockjs模拟接口数据
  - 真实数据接口和模拟数据接口切换

## 相关仓库

- [vue](https://github.com/vuejs/vue) [vue-server-renderer](https://github.com/vuejs/vue/tree/dev/packages/vue-server-renderer) [vuex](https://github.com/vuejs/vuex) [vue-router](https://github.com/vuejs/vue-router)
- [node-fetch](https://github.com/bitinn/node-fetch) [fetch-jsonp](https://github.com/camsong/fetch-jsonp)
- [mockjs](https://github.com/nuysoft/Mock)
- [其他](https://github.com/hmhao/vue-tgp/package.json)

## 项目建立

**要求 Node.js 7+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:80
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## 项目结构

```
project /
  build /
    setup-dev-server.js
    vue-loader.config.js        
    webpack.base.config.js
    webpack.client.config.js
    webpack.server.config.js
  dist /
  node_modules /
  public /
  src /
    api /
      client.js         //客户端fetch
      index.js
      queue.js          //请求队列控制
      resource.js       //第三方接口地址
      server.js         //服务端fetch
    components /        //app组件
    directives /        //app指令
    router /            //app路由管理
    store /             //app状态管理
    util /              //app工具库
    views /             //app视图
    app.js              //app组件入口
    App.vue             //app根组件
    entry-client.js     //客户端入口
    entry-server.js     //服务端入口
    index.template.html //ssr模板
  .babelrc
  .gitignore
  manifest.json         //app清单
  mock.js               //模拟数据
  package.json
  README.md
  server.js             //服务端启动脚本
```