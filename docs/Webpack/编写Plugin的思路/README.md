# 描述一下编写 plugin 的思路

webpack 运行生命周期会广播很多事件，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。
通过 tapable 事件流机制 保证插件的有序性，通过 compiler 和 compilation 对象可以获取到当前的打包环境信息。

compiler 对象包含了当前的 webpack 环境配置，包括 options，loaders，plugins 这些信息，这个对象在 webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 webpack 实例。

compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的 Compilation 将被创建。从而生成一组新的编译资源。compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。
plugin 需要在原型上定义 apply 方法，该方法接收一个参数，compiler 对象，表示的是 webpack 的 compiler 对象。

编写一个简单的 webpack plugin，该 plugin 能够打印出打包过程中的信息。

1. 创建一个类，继承自 `Tapable` 类的 `Plugin` 方法。

```js
class MyPlugin {
  constructor(options) {
    this.options = options;
  }
}

MyPlugin.prototype.apply = function(compiler) {
  compiler.hooks.run.tap('MyPlugin', (compilation) => {
    console.log('打包开始');
  });

  compiler.hooks.done.tap('MyPlugin', (stats) => {
    console.log('打包完成');
  });
};

module.exports = MyPlugin;
```

2. 在 webpack 配置文件中，使用 `plugins` 属性注册插件。

```js
const MyPlugin = require('./my-plugin');

module.exports = {
  // ...其他配置
  plugins: [
    new MyPlugin({ options: 'value' })
  ]
};
```

3. 完成插件的编写后，可以在 webpack 配置文件中使用该插件，以打印出打包过程中的信息。

```js
const MyPlugin = require('./my-plugin');

module.exports = {
  // ...其他配置
  plugins: [
    new MyPlugin({ options: 'value' })
  ]
};
```

4. 在打包过程中，会触发相应的钩子函数，打印出相应的信息。

```js
npx webpack

打包开始
打包完成
```