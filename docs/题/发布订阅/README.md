## 实现发布订阅

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 添加事件监听器
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // 执行事件监听器
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(...args);
      });
    }
  }

  // 移除事件监听器
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }

  // 只执行一次事件监听器
  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

// 使用示例
const emitter = new EventEmitter();

const callback1 = (data) => {
  console.log("Event 1:", data);
};

const callback2 = (data) => {
  console.log("Event 2:", data);
};

emitter.on("event1", callback1);
emitter.on("event2", callback2);

emitter.emit("event1", "Hello"); // 输出: Event 1: Hello
emitter.emit("event2", "World"); // 输出: Event 2: World

emitter.off("event1", callback1);

emitter.once("event3", (data) => {
  console.log("Event 3:", data);
});
emitter.emit("event3", "Hello"); // 输出: Event 3: Hello
emitter.emit("event3", "World"); // 输出: 无
```
