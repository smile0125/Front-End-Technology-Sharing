// 手写Promise构造器
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

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

console.log(MyPromise.resolve(p) === p);

// p.then(
//   res => {
//     console.log("promise1 完成", res);
//     return new MyPromise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(2);
//       }, 1000);
//     });
//   }
// ).then(res => {
//   console.log("promise2 完成", res);
// })
