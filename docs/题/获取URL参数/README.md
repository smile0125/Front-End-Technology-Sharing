## 获取 URL 参数

### 题目

编写一个 JavaScript 函数，该函数接收一个 URL 作为输入，并返回该 URL 中的所有参数及其对应的值。

### 示例

输入 URL：`https://example.com/?name=John&age=30`

输出参数及其对应的值：

```json
{
  "name": "John",
  "age": "30"
}
```

### 实现

- 方法一

使用 URL 的`search`属性获取查询字符串，然后使用`split`方法将查询字符串分割成参数数组。

```js
function getUrlParams(url) {
  const params = {};
  const queryString = url.split("?")[1];
  if (queryString) {
    const keyValuePairs = queryString.split("&");
    keyValuePairs.forEach((keyValuePair) => {
      const [key, value] = keyValuePair.split("=");
      params[key] = decodeURIComponent(value);
    });
  }
  return params;
}
```

- 方法二

使用 URL 的`searchParams`属性获取查询参数对象。

```js
function getUrlParams(url) {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  return Object.fromEntries(urlParams.entries());
  // 或者
  // const params = {};
  // for (const [key, value] of urlParams.entries()) {
  //   params[key] = decodeURIComponent(value);
  // }
  // return params;
}
```

### 测试

```js
const url = "https://example.com/?name=John&age=30";
const params = getUrlParams(url);
console.log(params); // 输出: { name: 'John', age: '30' }
```
