## Generator 函数

### 概念

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function 关键字与函数名之间有一个星号；二是，函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）。

```js
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}

var hw = helloWorldGenerator();
```

### 异步编程

Generator 函数的暂停执行的效果，意味着可以把异步操作写在 yield 表达式里面，等到调用 next 方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在 yield 表达式下面，反正要等到调用 next 方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

```js
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next();

// 卸载UI
loader.next();
```

### 流程控制

- next()

- throw()

- return()

Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。

- yield 表达式

- next 方法的参数

- for...of 循环

- Generator.prototype.throw()

- Generator.prototype.return()

- Generator.prototype.next()

### 应用

- 异步操作

- 状态机

- 协程

### 参考

- [Generator 函数的含义与用法](http://www.ruanyifeng.com/blog/2015/04/generator.html)
