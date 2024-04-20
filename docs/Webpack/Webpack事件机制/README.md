# Webpack 事件机制

## 1. 事件机制

Webpack 的事件机制是基于 [Tapable](https://github.com/webpack/tapable) 库实现的。Tapable 是一个类似于 Node.js 事件 emitters 的库，它允许我们在运行时动态地注册和调用事件。

Webpack 的事件机制主要通过 Tapable 提供的各种钩子函数来实现。这些钩子函数可以被注册为事件，然后在特定的事件触发时执行。

## 2. 常用钩子函数

Webpack 的事件机制中常用的钩子函数有：

- **`compiler.hooks.entryOption`**：在 Webpack 开始解析配置文件时触发，用于注册 entry 相关的钩子函数。
- **`compiler.hooks.afterPlugins`**：在所有插件被应用后触发，用于注册 afterPlugins 相关的钩子函数。
- **`compiler.hooks.compile`**：在每次构建开始时触发，用于注册 compile 相关的钩子函数，可以添加一些额外的编译配置或者预处理代码
- **`compiler.hooks.emit`**：在每次构建完成后触发，用于注册 emit 相关的钩子函数，文件输出之前触发，可以用于修改输出文件的内容
- **`compiler.hooks.done`**：在构建完成后触发，用于注册 done 相关的钩子函数，用于生成文件报告。
- **`compiler.hooks.failed`**：在构建失败时触发，用于注册 failed 相关的钩子函数。
- **`compiler.hooks.invalid`**：在监听模式下，当文件变化时触发，用于注册 invalid 相关的钩子函数。
- **`compiler.hooks.watchRun`**：在监听模式下，每次构建开始时触发，用于注册 watchRun 相关的钩子函数。
- **`compiler.hooks.watchClose`**：在监听模式下，当监听关闭时触发，用于注册 watchClose 相关的钩子函数。

这些钩子函数可以被注册为事件，然后在特定的事件触发时执行。通过使用这些钩子函数，我们可以实现各种 Webpack 插件的功能。

## 3. 示例

下面是一个使用 Webpack 事件机制的示例：

```js
const { Compiler } = require("webpack");
const MyPlugin = require("./my-plugin");

class MyCompiler extends Compiler {
  // ...
}

const compiler = new MyCompiler();
const myPlugin = new MyPlugin();

compiler.hooks.compile.tap("MyPlugin", () => {
  console.log("Compilation started");
});

compiler.hooks.emit.tapAsync("MyPlugin", (compilation, callback) => {
  console.log("Emit event triggered");
  callback();
});

compiler.hooks.done.tap("MyPlugin", (stats) => {
  console.log("Build completed");
});

compiler.hooks.failed.tap("MyPlugin", (error) => {
  console.error("Build failed");
});

compiler.hooks.invalid.tap("MyPlugin", () => {
  console.log("File changed, starting build");
});

compiler.hooks.watchRun.tap("MyPlugin", (compilation) => {
  console.log("Watch mode, starting build");
});

compiler.hooks.watchClose.tap("MyPlugin", () => {
  console.log("Watch mode closed");
});

compiler.hooks.entryOption.tap("MyPlugin", (context, entry) => {
  console.log("Entry option event triggered");
});

compiler.hooks.afterPlugins.tap("MyPlugin", () => {
  console.log("After plugins event triggered");
});
```
