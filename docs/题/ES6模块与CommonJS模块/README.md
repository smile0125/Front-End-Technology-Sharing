## ES6 模块与 CommonJS 模块的相同点和区别

相同点：

- 都支持模块化开发

不同点：

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的 require() 是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。
- CommonJS 模块的 this 是当前模块，ES6 模块的 this 是 undefined。
