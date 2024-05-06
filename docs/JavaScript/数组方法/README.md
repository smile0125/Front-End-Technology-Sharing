## 数组方法

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

  - sort()

  ```js
  const arr = [1, 2, 3];
  arr.sort((a, b) => a - b); // [1, 2, 3]
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
