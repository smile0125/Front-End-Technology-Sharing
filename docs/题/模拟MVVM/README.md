## 模拟MVVM

```js
class Component {
  constructor() {
    this.state = {
      name: "张三",
    };
    this.pending = false;
    this.render();

    this.state = new Proxy(this.state, {
      set: (target, key, value) => {
        target[key] = value;
        if (!this.pending) {
          this.pending = true;
          Promise.resolve().then(() => {
            this.render();
            this.pending = false;
          });
        }
      },
    });
  }
  render() {
    console.log("render", this.state.name);
    // 张三 王五 赵六
  }
}

const c = new Component();
c.state.name = "李四";
c.state.name = "王五";

setTimeout(() => {
  c.state.name = "赵六";
}, 2000);
```
