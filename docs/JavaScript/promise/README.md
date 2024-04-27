## promise A+规范

### 1. 术语

- promise: 是一个拥有 then 方法的对象或函数
- thenable: 是一个定义 then 方法的对象或函数
- value: 任何 Javascript 的合法值（包括 undefined，thenable 或 promise）
- exception: 是一个使用 throw 语句抛出的值
- reason: 是一个使用 return 语句返回的值

### 2. 要求

- promise 状态
  - 初始化状态：pending
  - 成功状态：fulfilled
  - 失败状态：rejected
- then 方法
  - 参数
    - onFulfilled
      - 必须是一个函数
      - 必须在 promise 成功状态被调用
      - 必须在 promise 完成之前被调用
      - 最多只能被调用一次
    - onRejected
      - 必须是一个函数
      - 必须在 promise 失败状态被调用
      - 必须在 promise 完成之前被调用
      - 最多只能被调用一次
  - 返回值
    - 必须是一个 promise
    - 如果 onFulfilled 或 onRejected 返回一个值 x，则运行 Promise 解决过程: resolve(x)
    - 如果 onFulfilled 或 onRejected 抛出一个异常 e，则 promise 必须拒绝执行，并返回拒绝原因 e
    - 如果 onFulfilled 不是函数且 promise1 成功执行，则 promise 必须成功执行，并返回相同的值
    - 如果 onRejected 不是函数且 promise1 失败执行，则 promise 必须失败执行，并返回相同的拒绝原因
- Promise 解决过程
  - 参数 x
    - 如果 x 是一个 promise，则采用 x 的状态和值
    - 如果 x 是一个对象或函数
      - let then = x.then
      - 如果取 x.then 的结果抛出异常 e，则 promise2 必须拒绝执行，并返回拒绝原因 e
      - 如果 then 是一个函数，则运行 then.call(x, resolvePromise, rejectPromise)
        - 如果/当/如果 resolvePromise 被调用，则运行[[Resolve]](promise2, value)
        - 如果/当/如果 rejectPromise 被调用，则 promise2 必须拒绝执行，并返回拒绝原因
        - 如果 resolvePromise 和 rejectPromise 都被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
        - 如果调用 then 抛出异常 e：
          - 如果 resolvePromise 或 rejectPromise 被调用，则忽略它
          - 如果 promise1 处于 pending 状态，则 promise1 必须保持 pending 状态，直到 resolvePromise 或 rejectPromise 被调用
  - 参数 y
    - 如果 y 是一个函数或对象，则运行[[Resolve]](promise2, y)
    - 如果 y 不是函数或对象，则 promise2 必须成功执行，并返回相同的值

## Promise 原理

### 1. 状态

- pending
- fulfilled
- rejected

### 2. 状态改变

- pending -> fulfilled
- pending -> rejected

### 3. 状态改变条件

- 执行器函数中的 resolve
- 执行器函数中的 reject

### 4. 状态改变后的处理

- 成功：调用 then 方法的成功回调
- 失败：调用 then 方法的失败回调

## Promise 实现

### 1. 构造函数

```js
// 定义状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #result = undefined;

  constructor(executor) {
    // 成功回调
    const resolve = (data) => {
      if (this.#state !== PENDING) return;
      this.#state = FULFILLED;
      this.#result = data;
    };

    // 失败回调
    const reject = (reason) => {
      if (this.#state !== PENDING) return;
      this.#state = REJECTED;
      this.#result = reason;
    };

    try {
      // 执行executor
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
}
```

上面代码可以发现无论是执行`resolve`还是`reject`，都是在改变 `promise` 的状态，所以用一个方法统一处理

```js
class MyPromise {
  #state = PENDING;
  #result = undefined;

  constructor(executor) {
    // 成功回调
    const resolve = (data) => {
      if (this.#state !== PENDING) return;
      this.#changeState(FULFILLED, data);
    };

    // 失败回调
    const reject = (reason) => {
      if (this.#state !== PENDING) return;
      this.#changeState(REJECTED, reason);
    };

    try {
      // 执行executor
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // 统一处理改变状态
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
  }
}
```

### 2. then 方法

`then`方法接受两个参数，分别是`onFulfilled`成功的回调函数和`onRejected`失败的回调函数，它们都是可选的。`onFulfilled`和`onRejected`都是函数，并且最多只能被调用一次, `then`方法返回一个`promise`对象。

```js
class MyPromise {
  #state = PENDING;
  #result = undefined;

  ...

  // 统一处理改变状态
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.#state === FULFILLED) {
        // 成功的回调
        onFulfilled(this.#result)
      } else if (this.#state === REJECTED) {
        // 失败的回调
        onRejected(this.#result)
      } else {
        // 当前promise是挂起时的状态处理
        ...
      }
    })
  }
}
```

当我们在 then 方法中处理挂起的 `promise` 时，我们不知道 `promise` 的状态什么时候会改变，但是谁知道呢？我们在上面统一处理改变状态的方法`#changeState` 知道，但是该方法没办法直接拿到 then 里的参数，因此，我们可以使用一个变量来保存当前 then 方法的参数。

保存之后在调用一个方法执行我们保存的参数，该方法可以拿到 promise 的状态，从而执行对应的回调函数。

```js
class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];

  ...

  // 统一处理改变状态
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    this.#run();
  }

  #run(){
    if(this.#state!==PENDING) return;
    while(this.#handlers.length){
      const {onFulfilled, onRejected, resolve, reject} = this.#handlers.shift();
      // 处理成功的回调
      if(this.#state === FULFILLED) {
        if(typeof onFulfilled === 'function') {
          try {
            const data = onFulfilled(this.#result);
            resolve(data);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(this.#result);
        }

      } else {
        // 处理失败的回调
        if(typeof onRejected === 'function') {
          try {
            const data = onRejected(this.#result);
            resolve(data);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(this.#result);
        }
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      })
      this.#run();
    })
  }
}
```

我们会发现在`#run` 方法中处理成功和失败的回调函数时，只是状态不一样，但是代码显得有些冗余，可以抽离`#run` 中的方法到单独的一个函数中处理。

```js
class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];

  ...

  // 统一处理改变状态
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    this.#run();
  }

  #runOne(callback, resolve, reject) {
    // 传入的回调不是函数
    if (typeof callback !== 'function') {
      const settled = this.#state === FULFILLED ? resolve : reject;
      settled(this.#result);
      return;
    }
    // 传入的回调是函数 执行
    try {
      const data = callback(this.#result);
      resolve(data);
    } catch(error) {
      reject(error);
    }
  }

  #run(){
    if(this.#state!==PENDING) return;
    while(this.#handlers.length){
      const {onFulfilled, onRejected, resolve, reject} = this.#handlers.shift();
      // 处理成功的回调
      if(this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        // 处理失败的回调
        this.#runOne(onRejected, resolve, reject);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      ...
      this.#run();
    })
  }
}
```

执行回调后返回的可能还是一个 `promise`，因此我们需要判断 data 是否是一个 `promise`，如果是的话，我们直接调用 then 方法，传递 resolve 和 reject 方法。

```js
class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];

  ...

  // 判断是否是promise
  #isPromiseLike(value){
    return value !== null && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
  }

  #runOne(callback, resolve, reject) {
    // 传入的回调不是函数
    if (typeof callback !== 'function') {
      const settled = this.#state === FULFILLED ? resolve : reject;
      settled(this.#result);
      return;
    }
    // 传入的回调是函数 执行
    try {
      const data = callback(this.#result);
      if (this.#isPromiseLike(data)) {
        data.then(resolve, reject);
      } else {
        resolve(data);
      }
    } catch(error) {
      reject(error);
    }
  }

  ...

```

众所周知，`promise` 需要在微队列中执行，因此我们还需要将`#runOne` 里的内容放在微队列里执行，下面模拟一个微队列的执行方法。

```js
class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];

  ...

  // 判断是否是promise
  #isPromiseLike(value){
    return value !== null && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
  }

  // 模拟微队列
  #runMicroTask(func){
    // node 环境
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(func);
      return;
    }
    // 浏览器环境
    if (typeof MutationObserver === 'function'){
      // 创建一个观察器
      const observer = new MutationObserver(func);
      // 创建一个文本节点
      const textNode = document.createTextNode('');
      // 观察文本节点的变化
      observer.observe(textNode, {
        characterData: true
      });
      // 修改文本节点的内容
      textNode.textContent = '1';
      return;
    }
    // 其他情况...
    setTimeout(func, 0);
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      // 传入的回调不是函数
      if (typeof callback !== 'function') {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }
      // 传入的回调是函数 执行
      try {
        const data = callback(this.#result);
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch(error) {
        reject(error);
      }
    })
  }

  ...

```

完整版

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];

  constructor(executor) {
    // 成功回调
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };

    // 失败回调
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };

    try {
      // 执行executor
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // 静态方法resolve
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  // 静态方法reject
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  // 改变状态
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    this.#run();
  }

  // 判断是否是Promise
  #isPromiseLike(value) {
    return (
      value !== null &&
      (typeof value === "object" || typeof value === "function") &&
      typeof value.then === "function"
    );
  }

  // 执行微任务
  #runMicroTask(func) {
    // node环境
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(func);
      return;
    }
    // 浏览器环境
    if (typeof MutationObserver === "function") {
      const observer = new MutationObserver(func);
      // 构建文本结点
      const textNode = document.createTextNode(1);
      observer.observe(textNode, { characterData: true });
      // 修改文本结点内容，触发观察器执行
      textNode.textContent = 2;
      return;
    }
    setTimeout(func, 0);
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      // 回调函数不是函数
      if (typeof callback !== "function") {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }
      // 回调函数是函数
      try {
        const data = callback(this.#result);
        // 判断回调函数返回值是Promise
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject);
          return;
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      const handler = this.#handlers.shift();
      const { onFulfilled, onReject, resolve, reject } = handler;
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onReject, resolve, reject);
      }
    }
  }

  // then方法
  then(onFulfilled, onReject) {
    // 返回一个新的Promise
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onReject,
        resolve,
        reject,
      });
      this.#run();
    });
  }
}
```

### 3. catch 方法

```js
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};
```

### 4. finally 方法

`finally` 方法是 `try-catch` 结构中的一个部分，它会在 `try` 块中的代码执行完毕后执行，无论是否发生异常。`finally` 块中的代码会在 Promise 被拒绝时（例如，调用 `reject` 方法）执行，并且可以用来执行一些清理工作，比如关闭资源等。`finally` 块中的代码不会改变错误处理的结果，即 `catch` 块中的代码会决定错误处理的方式。

下面是一个简单的 Promise-finally 示例：

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 模拟一个可能发生的错误
  reject("This is a error");
});

myPromise
  .then(console.log) // 不会被执行，因为 Promise 被拒绝
  .catch((error) => console.error("Caught error:", error))
  .finally(() => console.log("Cleanup work")); // 会被执行，因为 finally 块中的代码被执行了
```

在这个示例中，`myPromise` 被拒绝，因此执行了 `catch` 块中的代码。然后，`finally` 块中的 `console.log` 函数被调用了，输出 "Cleanup work"。无论成功还是失败，`finally` 块中的代码都会被执行。

#### 实现方式

```js
Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => {
      callback();
      return value;
    },
    (reason) => {
      callback();
      throw reason;
    })
  );
};
```

### 4. all 方法

`promise.all` 方法是 JavaScript 中用于处理多个 Promise 对象的一个工具方法。它会等待所有给定的 Promise 对象都完成（解析或者拒绝）后，返回一个包含所有结果的数组。如果所有 Promise 对象都解析成功，那么 all 方法返回的结果数组中包含所有解析值。如果至少一个 Promise 对象被拒绝，那么 all 方法返回的结果数组中包含被拒绝的 Promise 对象的结果。

下面是一个简单的 `Promise.all()` 示例：

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 resolved");
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 2 resolved");
  }, 1000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise 3 rejected");
  }, 1000);
});

Promise.all([promise1, promise2, promise3])
  .then((result) => console.log("All resolved:", result))
  .catch((error) => console.error("All rejected:", error));
```

#### 实现方式

```js
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let done = false;
    let results = [];
    promises.forEach((p, i) => {
      p.then((value) => {
        if (!done) {
          results[i] = value;
          if (results.length === promises.length) {
            resolve(results);
          }
        }
      }),
        (reason) => {
          if (!done) {
            reject(reason);
          }
          done = true;
        };
    });
  });
};
```

### 5. race 方法

`promise.race()` 方法是 JavaScript 中用于处理多个 Promise 对象的一个工具方法。它会等待第一个给定的 Promise 对象完成（解析或者拒绝），然后返回该 Promise 对象的结果。如果所有 Promise 对象都解析成功，那么 `race` 方法返回的结果就是所有解析值中的第一个值。如果至少一个 Promise 对象被拒绝，那么 `race` 方法返回的结果就是被拒绝的 Promise 对象的结果。

下面是一个简单的 `Promise.race()` 示例：

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 resolved");
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 2 resolved");
  }, 1000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise 3 rejected");
  }, 1000);
});

Promise.race([promise1, promise2, promise3])
  .then((result) => console.log("First to resolve:", result))
  .catch((error) => console.error("First to reject:", error));
```

在这个示例中，`promise1` 和 `promise2` 在 1 秒后解析成功，`promise3` 在 1 秒后拒绝。`Promise.race()` 方法会在第一个 Promise 对象完成（解析或者拒绝）后执行，并返回该 Promise 对象的结果。

#### 实现方式

```js
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      p.then(resolve, reject);
    });
  });
};
```

### 6. allSettled 方法

`promise.allSettled()` 方法是 JavaScript 中用于处理多个 Promise 对象的一个工具方法。它会等待所有给定的 Promise 对象都完成（解析或者拒绝），然后返回一个包含所有结果的数组，无论是否成功。

下面是一个简单的 `Promise.allSettled()` 示例：

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 resolved");
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 2 resolved");
  }, 1000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise 3 rejected");
  }, 1000);
});

Promise.allSettled([promise1, promise2, promise3]).then((result) =>
  console.log("All settled:", result)
);
```

在这个示例中，`promise1` 和 `promise2` 在 1 秒后解析成功，`promise3` 在 1 秒后拒绝。`Promise.allSettled()` 方法会在所有 Promise 对象都完成（解析或者拒绝）后执行，并返回一个包含所有结果的数组，无论是否成功。

#### 实现方式

```js
Promise.allSettled = function (promises) {
  return new Promise((resolve) => {
    let done = false;
    let results = [];
    promises.forEach((p, i) => {
      p.then((value) => {
        if (!done) {
          results[i] = {
            status: 'fulfilled',
            value: value,
          };}
          if (results.length === promises.length) {
            resolve(results);
          }
      }
    }
  }
}
```
