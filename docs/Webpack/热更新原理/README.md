# webpack 热更新原理

Hot Module Replacement 无需刷新浏览器 可以将新模块替换掉旧模块

### 实现原理

1. 客户端通过 websocket 连接到服务器
2. 服务器接收到请求后，会向客户端发送更新后的模块
3. 客户端接收到更新后的模块后，通过 webpack 的 api 更新模块
4. 客户端通过 webpack 的 api 触发页面重新渲染

在运行npm run dev server时，webpack会启动一个本地服务，浏览器与服务器之间会建立一个websocket连接，当webpack编译器检测到文件发生变化时，会向浏览器发送通知，浏览器接收到通知后，会向webpack服务器发送请求，webpack服务器会返回更新后的模块，浏览器接收到更新后的模块后，会通过webpack的api更新模块，从而实现热更新。