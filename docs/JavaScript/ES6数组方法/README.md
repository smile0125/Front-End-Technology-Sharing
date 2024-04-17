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
