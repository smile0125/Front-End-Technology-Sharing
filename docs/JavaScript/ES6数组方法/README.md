在 ES6 中，数组方法有很多，以下是一些常用的几类：

1. 修改数组：

   - `push`：向数组末尾添加一个或多个元素。
   - `pop`：删除数组末尾的元素并返回。
   - `unshift`：向数组头部添加一个或多个元素。
   - `shift`：删除数组头部的元素并返回。
   - `splice`：插入、删除或替换数组中的元素。
   - `sort`：对数组进行排序。
   - `reverse`：反转数组。
   - `map`：创建一个新数组，新数组的元素是原数组元素的映射。
   - `filter`：创建一个新数组，新数组的元素是原数组元素的过滤结果。
   - `reduce`：对数组进行累积操作，从左到右，将数组中的元素累加。
   - `forEach`：遍历数组，执行指定的回调函数。

2. 查找数组：

   - `indexOf`：返回指定元素在数组中的位置。
   - `findIndex`：返回指定元素的索引，或者当没有找到时返回 `-1`。
   - `includes`：检查数组是否包含某个元素。

3. 计算数组：

   - `length`：数组的长度。
   - `reduce`：对数组进行累积操作，从左到右，将数组中的元素累加。
   - `forEach`：遍历数组，执行指定的回调函数。

4. 转换数组：

   - `slice`：创建一个新数组，包含从原数组中指定的索引范围内的新元素。
   - `concat`：创建一个新数组，将原数组和新数组中的元素拼接在一起。
   - `toString`：将数组转换为字符串，元素之间用逗号分隔。

5. 其他：
   - `flat`：将多维数组展平。
   - `fill`：用一个固定值填充数组。
   - `entries`：将数组转换为以键值对为元素的数组。
   - `keys`：将数组转换为以索引为元素的数组。
   - `values`：将数组转换为以值为元素的数组。
   - `some`：检查数组中是否有元素满足条件，如果有返回 `true`，否则返回 `false`。
   - `every`：检查数组中所有元素是否满足条件，如果有返回 `true`，否则返回 `false`。

- 改变原数组

  - push()

  ```js
  const arr = [1, 2, 3];
  arr.push(4); // [1, 2, 3, 4]
  ```

  - pop()

  ```js
  const arr = [1, 2, 3];
  arr.pop(); // [1, 2]
  ```

  - shift()

  ```js
  const arr = [1, 2, 3];
  arr.shift(); // [2, 3]
  ```

  - unshift()

  ```js
  const arr = [1, 2, 3];
  arr.unshift(0); // [0, 1, 2, 3]
  ```

  - splice()

  ```js
  const arr = [1, 2, 3];
  arr.splice(1, 1); // [1, 3]
  ```

  - sort()

  ```js
  const arr = [1, 2, 3];
  arr.sort(); // [1, 2, 3]
  ```

  - reverse()

  ```js
  const arr = [1, 2, 3];
  arr.reverse(); // [3, 2, 1]
  ```

- 不改变原数组

  - concat()

  ```js
  const arr = [1, 2, 3];
  const newArr = arr.concat(4, [5, 6]); // [1, 2, 3, 4, 5, 6]
  ```

  - join()

  ```js
  const arr = [1, 2, 3];
  const str = arr.join(","); // '1,2,3'
  ```

  - slice()

  ```js
  const arr = [1, 2, 3];
  const newArr = arr.slice(1, 3); // [2, 3]
  ```

  - map()

  ```js
  const arr = [1, 2, 3];
  const newArr = arr.map((item) => item * 2); // [2, 4, 6]
  ```

  - filter()

  ```js
  const arr = [1, 2, 3];
  const newArr = arr.filter((item) => item > 1); // [2, 3]
  ```

  - reduce()

  ```js
  const arr = [1, 2, 3];
  const sum = arr.reduce((prev, curr) => prev + curr, 0); // 6
  ```

  - reduceRight()

  ```js
  const arr = [1, 2, 3];
  const sum = arr.reduceRight((prev, curr) => prev + curr, 0); // 6
  ```

  - every()

  ```js
  const arr = [1, 2, 3];
  const isAll = arr.every((item) => item > 0); // true
  ```

  - some()

  ```js
  const arr = [1, 2, 3];
  const isSome = arr.some((item) => item > 0); // true
  ```

  - forEach()

  ```js
  const arr = [1, 2, 3];
  arr.forEach((item) => console.log(item)); // 1 2 3
  ```

  - find()

  ```js
  const arr = [1, 2, 3];
  const findItem = arr.find((item) => item > 1); // 2
  ```

  - findIndex()

  ```js
  const arr = [1, 2, 3];
  const findIndex = arr.findIndex((item) => item > 1); // 1
  ```

  - toSpliced()

  ```js
  const arr = [1, 2, 3];
  const newArr = arr.toSpliced(1, 1, 4); // [1, 4, 2, 3]
  ```

  - toReversed()

  ```js
  const arr = [1, 2, 3];
  const newArr = arr.toReversed(); // [3, 2, 1]
  ```

  - toSorted()

  ```js
  const arr = [1, 2, 3];
  const newArr = arr.toSorted((a, b) => a - b); // [1, 2, 3]
  ```

  - toString()

  ```js
  const arr = [1, 2, 3];
  const str = arr.toString(); // '1,2,3'
  ```

  - toLocaleString()

  ```js
      const arr = [1, 2, 3];
      const str = arr.toLocaleString(); // '1,2,3'
      `
    `
  `
  ```

### 实现【map，forEach， filter，some，every， reduce，reduceRight】数组遍历方法

```js
const arr = [1, 2, 3];
const obj = { a: 1 };

/**
 * map
 */
Array.prototype.myMap = function (cb) {
  // 调用者
  const _arr = this;
  // this指向
  const _arg2 = arguments[1] || window;
  const _length = _arr.length;
  let res = [];

  for (let i = 0; i < _length; i++) {
    res.push(cb.apply(_arg2, [_arr[i], i, _arr]));
  }
  return res;
};

/**
 * forEach
 */
Array.prototype.myForEach = function (cb) {
  const _arr = this;
  const _arg2 = arguments[1] || window;
  const _length = _arr.length;

  for (let i = 0; i < _length; i++) {
    cb.apply(_arg2, [_arr[i], i, _arr]);
  }
};

/**
 * filter
 */
Array.prototype.myFilter = function (cb) {
  const _arr = this;
  const _arg2 = arguments[1] || window;
  const _length = _arr.length;
  let res = [];

  for (let i = 0; i < _length; i++) {
    if (cb.apply(_arg2, [_arr[i], i, _arr])) {
      res.push(_arr[i]);
    }
  }
  return res;
};

/**
 * some
 * * 返回true | false
 */
Array.prototype.mySome = function (cb) {
  const _arr = this;
  const _arg2 = arguments[1] || window;
  const _length = _arr.length;
  let res = false;

  for (let i = 0; i < _length; i++) {
    if (cb.apply(_arg2, [_arr[i], i, _arr])) {
      res = true;
      break;
    }
  }
  return res;
};

/**
 * every
 * * 返回true | false
 */
Array.prototype.myEvery = function (cb) {
  const _arr = this;
  const _arg2 = arguments[1] || window;
  const _length = _arr.length;
  let res = true;

  for (let i = 0; i < _length; i++) {
    if (!cb.apply(_arg2, [_arr[i], i, _arr])) {
      res = false;
      break;
    }
  }
  return res;
};

/**
 * reduce
 * this一直指向window
 * 手动实现this指向
 */

Array.prototype.myReduce = function (cb, initialValue) {
  const _arr = this;
  const _arg2 = arguments[2] || window;
  const _length = _arr.length;

  for (let i = 0; i < _length; i++) {
    initialValue = cb.apply(_arg2, [initialValue, _arr[i], i, _arr]);
  }
  return initialValue;
};

/**
 * reduceRight
 * this一直指向window
 * 手动实现this指向
 */

Array.prototype.myReduceRight = function (cb, initialValue) {
  const _arr = this;
  const _arg2 = arguments[2] || window;
  const _length = _arr.length;

  for (let i = _length - 1; i >= 0; i--) {
    initialValue = cb.apply(_arg2, [initialValue, _arr[i], i, _arr]);
  }
  return initialValue;
};
```
