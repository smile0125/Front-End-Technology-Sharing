## 指定范围定的随机数

- 包含最小值和最大值 `[min, max]`

```js
function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
```

- 不包含最小值和最大值 `(min, max)`

```js
function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min - 2) + min + 1);
}
```
  
- 包含最小值，不包含最大值 `[min, max)`

```js
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
```

- 不包含最小值，包含最大值 `(min, max]`

```js
function getRandomInt(min, max) {
  return Math.ceil(Math.random() * (max - min)) + min;
}
```