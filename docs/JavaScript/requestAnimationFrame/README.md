## requestAnimationFrame

- 定义

  requestAnimationFrame 方法告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

- 语法

  ```js
  window.requestAnimationFrame(callback);
  ```

- 参数

  callback：一个在每次需要重绘时调用的函数的名称。

- 返回值

  一个 ID 标识符，该标识符可以用来取消回调函数的执行。

- 示例

  ```js
  function animate() {
    // 更新动画
    // ...

    // 请求下一帧动画
    requestAnimationFrame(animate);
  }

  // 开始动画
  requestAnimationFrame(animate);
  ```

- 取消动画

  ```js
  let id = window.requestAnimationFrame(callback);
  window.cancelAnimationFrame(id);
  ```

- 参考

  - [MDN - requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
  - [W3C - requestAnimationFrame](https://www.w3.org/TR/animation-timing/#requestAnimationFrame)
