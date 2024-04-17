# 优化 webpack 的构建速度

## 缩小文件的搜索范围

- 优化 resolve.modules 配置
```js
resolve: {
  modules: [path.resolve(__dirname, 'node_modules')],
},
```
- 优化 resolve.mainFields 配置
```js
resolve: {
  mainFields: ['jsnext:main', 'browser', 'main'],
},
```

- 优化 resolve.extensions 配置 resolve.extensions 配置项可以减少 Webpack 在尝试解析文件时需要检查的扩展名数量。
```js
resolve: {
  extensions: ['.js', '.jsx', '.json'],
},
```
- 优化 resolve.alias 配置 resolve.alias 配置项通过别名来将原导入路径映射成一个新的导入路径。
```js
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
},
```
- 优化 resolve.excludes 配置 resolve.excludes 配置项可以排除掉一些目录，避免 Webpack 去解析它们。
```js
resolve: {
  excludes: [path.resolve(__dirname, 'node_modules')],
},
```
- 优化 resolve.externals 配置 resolve.externals 配置项可以告诉 Webpack 哪些模块不需要被打包，从而减少打包后的文件大小。
```js
resolve: {
  externals: {
    jquery: 'jQuery',
  },

## 使用 DLL

- 使用 DllPlugin 进行分包，使用 DllReferencePlugin 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
- 由于 manifest.json 需要自己维护，所以用的时候需要注意版本问题。

## 使用 Happypack

- HappyPack 可以将任务分解给多个子进程去并发的执行，子进程处理完后再将结果发送给主进程。

## 使用 ParallelUglifyPlugin

- ParallelUglifyPlugin 支持将 UglifyJS 分解给多个子进程去并发的执行。

## 使用 Tree Shaking

- Tree Shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES6 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是兴起于 ES6 模块打包工具 Rollup。
- Tree Shaking 只支持 ES6 模块化语法，因为 Tree Shaking 需要基于静态结构分析代码，而 CommonJS 模块化语法不支持静态结构分析，所以无法被 Tree Shaking 处理。
- Tree Shaking 只支持 ES6 模块化语法的 import 和 export，因为 CommonJS 模块化语法使用 exports 和 require，无法被 Tree Shaking 处理。

## 使用 Scope Hoisting

- Scope Hoisting 可以让 Webpack 打包出来的代码文件更小、运行的更快，因为函数作用域和变量提升使得一些代码逻辑运行在全局作用域，这使得一些变量和函数可能会被重复定义，导致一些 JS 运行错误。
- Scope Hoisting 需要编译器支持，因为 Scope Hoisting 需要基于 ES6 模块化语法进行静态分析，所以需要编译器将代码转换成 ES6 模块化语法，再进行 Scope Hoisting 处理。
- Scope Hoisting 只支持 ES6 模块化语法的 import 和 export，因为 CommonJS 模块化语法使用 exports 和 require，无法被 Tree Shaking 处理。

## 使用 Code Splitting

- Code Splitting 可以将代码按需进行加载，提高首屏加载速度。
- Code Splitting 需要编译器支持，因为 Code Splitting 需要基于 ES6 模块化语法进行静态分析，所以需要编译器将代码转换成 ES6 模块化语法，再进行 Code Splitting 处理。
- Code Splitting 只支持 ES6 模块化语法的 import 和 export，因为 CommonJS 模块化语法使用 exports 和 require，无法被 Tree Shaking 处理。

## 使用动态 Polyfill

- 动态 Polyfill 可以根据浏览器环境动态加载 Polyfill 代码，提高兼容性。
- 动态 Polyfill 需要编译器支持，因为动态 Polyfill 需要基于 ES6 模块化语法进行静态分析，所以需要编译器将代码转换成 ES6 模块化语法，再进行动态 Polyfill 处理。
- 动态 Polyfill 只支持 ES6 模块化语法的 import 和 export，因为 CommonJS 模块化语法使用 exports 和 require，无法被 Tree Shaking 处理。

## 使用压缩 JS 代码

- 使用 UglifyJS 压缩 JS 代码，可以移除注释、未使用的变量和函数等。

## 使用压缩 CSS 代码

- 使用 CSS 压缩工具压缩 CSS 代码，可以减小 CSS 文件大小，提高 CSS 加载速度。
- min-css-extract-plugin 插件可以将 CSS 代码提取到单独的文件中，然后使用 CSS 压缩工具压缩 CSS 代码。

## 使用压缩图片

- image-webpack-plugin 插件可以将图片压缩到指定大小，然后使用图片压缩工具压缩图片，可以减小图片文件大小，提高图片加载速度。
- 使用图片压缩工具压缩图片，可以减小图片文件大小，提高图片加载速度。
