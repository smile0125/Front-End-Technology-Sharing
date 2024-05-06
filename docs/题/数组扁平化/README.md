## 数组扁平化

### 题目

```js
const arr = [1, 2, [3, 4, [5, 6]]];

const res = [...new Set(arr.flat(Infinity))];

console.log(res); // [1, 2, 3, 4, 5, 6]
```

### 实现

```js
Array.prototype.myFlat = function (depth = Infinity) {
  return this.reduce((pre, cur) => {
    return pre.concat(
      depth > 0 && Array.isArray(cur) ? cur.myFlat(depth - 1) : cur
    );
  }, []);
};
```
