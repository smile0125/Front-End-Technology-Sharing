# webpack 文件监听原理

### 文件监听的原理

- 轮询判断文件的最后编辑时间是否变化
- 判断文件内容是否有变化

### 轮询的缺陷

- 轮询会占用 CPU 资源
- 轮询的频率太高，会导致性能问题

### 文件监听的优点

- 文件监听的频率可以自己控制
```js
module.exports = {
  // ...
  watch: true,
  watchOptions: {
    // 不监听的文件或者文件夹，支持正则匹配
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    poll: 1000 // 每秒询问1000次
  }
};
```