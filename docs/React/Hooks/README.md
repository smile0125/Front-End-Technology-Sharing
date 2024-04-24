## React Hooks 是什么？
`React Hooks` 是 React 16.8 版本引入的新特性，它允许你在不编写 class 的情况下使用 state 以及其他的 React 特性。`Hooks` 解决了 React 中一些长期存在的问题，并提供了更简洁、更强大的代码组织方式。
## React Hooks 解决了什么问题？
- 代码复用问题：在 `React` 中，组件间的逻辑复用通常是通过高阶组件（HOC）或渲染属性`（render props）`来实现的，但这两种方式都会增加组件树的复杂性。Hooks 允许你提取组件逻辑到可重用的函数中，而无需改变组件结构。
- 生命周期方法问题：在 `class` 组件中，经常需要在多个生命周期方法中进行相关逻辑处理，这可能会导致代码分散和难以维护。`Hooks` 将组件生命周期相关的功能进行了抽象和统一，使得代码更加集中和易于理解。
- 状态管理问题：在 `class` 组件中，状态管理通常是通过在组件内部使用 `this.state` 和 `this.setState` 来实现的，但这种方式有时会导致逻辑复杂和难以调试。`Hooks` 提供了 `useState` 和 `useEffect` 等函数，使得状态管理更加直观和简洁。
## React Hooks 的使用限制有哪些？
- 只能在函数组件内部使用：Hooks 不能在普通的 JavaScript 函数中调用，它们只能在 React 的函数组件或其他 Hooks 内部使用。这个限制是为了确保组件内的逻辑是统一的，并且 Hooks 的状态不会在不同组件之间混乱。
- 避免在循环、条件或嵌套函数中调用 Hooks：确保总是在 React 函数的最顶层调用 Hooks，而不是在循环、条件或嵌套函数中调用。这样可以确保 Hooks 的调用顺序在每次渲染时都是一致的，从而避免潜在的问题。
- 不要同时使用 class 组件和 Hooks：在同一个组件中不要混用 class 和 function 组件。尽管在某些情况下可能可以实现混用，但这不是 React 的推荐做法，可能会导致不必要的复杂性。
总的来说，React Hooks 通过提供函数式编程的方式来管理状态和生命周期，使得 React 组件的编写更加简洁、直观和可维护。同时，使用 Hooks 时也需要注意一些限制和最佳实践，以确保代码的正确性和稳定性。
## 常用的Hooks

### useState

useState 用于在函数组件中添加状态。

```js
const [state, setState] = useState(initialState);
```

useState 返回一个数组，包含两个元素：

- state：当前状态值
- setState：更新状态值的函数

### useEffect

useEffect 用于在函数组件中添加副作用。

```js
useEffect(() => {
  // 副作用逻辑
}, [deps]);
```

useEffect 接收两个参数：

- effect：副作用逻辑
- deps：依赖项数组

useEffect 的副作用逻辑会在组件渲染后执行。如果依赖项数组为空，则副作用逻辑会在组件每次渲染后执行。如果依赖项数组不为空，则副作用逻辑会在依赖项发生变化时执行。

### useContext

useContext 用于在函数组件中获取上下文值。

```js
const value = useContext(Context);
```

useContext 接收一个上下文对象作为参数，返回上下文对象的值。

### useReducer

useReducer 用于在函数组件中添加状态管理。

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

useReducer 返回一个数组，包含两个元素：

- state：当前状态值
- dispatch：更新状态值的函数

useReducer 的更新状态值的函数接收一个 action 对象作为参数，action 对象包含一个 type 属性表示更新类型，以及一个 payload 属性表示更新值。

### useRef

useRef 用于在函数组件中添加引用。

```js
const ref = useRef(initialValue);
```

useRef 返回一个引用对象，包含一个 current 属性表示当前值。

### useMemo

useMemo 用于在函数组件中添加缓存。

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

useMemo 接收一个计算函数和一个依赖项数组作为参数，返回一个缓存的值。只有当依赖项发生变化时，才会重新计算值。

### useCallback

useCallback 用于在函数组件中添加缓存函数。

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

useCallback 接收一个函数和一个依赖项数组作为参数，返回一个缓存的函数。只有当依赖项发生变化时，才会重新计算函数。

### useLayoutEffect

useLayoutEffect 用于在函数组件中添加同步副作用。

```js
useLayoutEffect(() => {
  // 同步副作用逻辑
}, [deps]);
```

useLayoutEffect 的副作用逻辑会在组件渲染后执行。与 useEffect 不同的是，useLayoutEffect 的副作用逻辑会在 DOM 更新后执行。

### useDebugValue

`useDebugValue` 是一个 React 钩子函数，它用于在开发模式下显示组件的调试信息。`useDebugValue` 接受一个字符串作为参数，表示要显示的调试信息，并返回一个函数，该函数在组件渲染时会自动调用。

下面是一个简单的 `useDebugValue` 示例：

```javascript
import React from "react";
import { useDebugValue } from "react-hooks";

function MyComponent() {
  const [value, setValue] = useState("Hello, World!");
  const debugValue = useDebugValue("custom-debug-value");

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>{debugValue}</p>
    </div>
  );
}

export default MyComponent;
```

在这个示例中，`useDebugValue` 函数接收一个字符串 'custom-debug-value'，并在开发模式下将该字符串显示在组件中。

### useImperativeHandle

useImperativeHandle 用于在函数组件中添加自定义方法。

```js
useImperativeHandle(ref, createHandle, [deps]);
```

```js
import React, { useImperativeHandle } from "react";

function MyComponent() {
  const handle = useImperativeHandle();

  return <div ref={handle}>Hello, World!</div>;
}

export default MyComponent;
```

useImperativeHandle 接收三个参数：

- ref：自定义方法的引用
- createHandle：创建自定义方法的函数
- deps：依赖项数组

useImperativeHandle 的自定义方法可以通过 ref 访问。

### useSyncExternalStore

useSyncExternalStore 用于在函数组件中添加外部状态管理。

```js
const state = useSyncExternalStore(subscribe, getSnapshot);
```

useSyncExternalStore 接收两个参数：

- subscribe：订阅外部状态变化的函数
- getSnapshot：获取外部状态的函数

useSyncExternalStore 的外部状态可以通过 state 访问。

### useInsertionEffect

useInsertionEffect 用于在函数组件中添加插入副作用。

`useInsertionEffect` 是一个 React 钩子函数，它用于在组件渲染后执行一些操作。它是 `useEffect` 的一个变体，但是它有一个不同的参数 `onInsertionBegin`，它在组件渲染后立即执行，而 `useEffect` 则是在组件挂载后执行。

下面是一个简单的 `useInsertionEffect` 示例：

```javascript
import React, { useInsertionEffect } from "react";

function MyComponent() {
  const [value, setValue] = useState("Hello, World!");

  useInsertionEffect(() => {
    console.log("Component inserted:", value);
  }, [value]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default MyComponent;
```

在这个示例中，`useInsertionEffect` 函数在组件渲染后立即执行，并打印出输入框的值。这有助于在组件插入 DOM 树后执行一些操作，而不必等待整个组件树渲染完成。

### useDeferredValue

useDeferredValue 用于在函数组件中添加延迟值。

`useDeferredValue` 是一个 React 钩子函数，它用于在组件渲染后执行一些操作，并缓存结果。这在与计算属性相关的代码中非常有用，因为它允许您在渲染后缓存结果，从而提高性能。

`useDeferredValue` 接收一个值作为参数，返回一个延迟值。延迟值会在组件渲染后执行。

下面是一个简单的 `useDeferredValue` 示例：

```javascript
import React, { useDeferredValue } from "react";

function MyComponent() {
  const [value, setValue] = useState("Hello, World!");
  const deferredValue = useDeferredValue(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value);
      }, 1000);
    });
  });

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Deferred value: {deferredValue}</p>
    </div>
  );
}

export default MyComponent;
```

在这个示例中，`useDeferredValue` 函数接收一个异步函数作为参数，该函数在组件渲染后执行。这个函数返回一个 Promise，在 1 秒后解析为输入框的值。这样，`deferredValue` 变量将缓存解析后的值，从而提高性能。

### useTransition

`useTransition` 用于在函数组件中添加过渡效果,是一个 React 钩子函数，它用于在组件状态发生变化时执行一些操作。这在您需要执行与动画相关的操作时非常有用，例如在路由组件中。`useTransition` 接受与 `useState` 相同的参数，并返回一个包含过渡状态和操作的的对象。

```js
const [startTransition, isPending] = useTransition();
```

useTransition 返回一个数组，包含两个元素：

- startTransition：启动过渡的函数
- isPending：是否处于过渡状态

useTransition 的过渡效果会在组件渲染后执行。

下面是一个简单的 `useTransition` 示例：

```javascript
import React, { useTransition } from "react";

function MyComponent() {
  const [transition, setTransition] = useTransition(
    ({ previousValue, value }) => {
      console.log("Transitioning from", previousValue, "to", value);
    }
  );

  const increment = () => {
    setTransition((previousValue) => ({
      value: previousValue + 1,
    }));
  };

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <p>Transition: {transition.value}</p>
    </div>
  );
}

export default MyComponent;
```

在这个示例中，`useTransition` 函数接收一个函数作为参数，该函数在组件状态发生变化时执行。这个函数返回一个包含过渡状态和操作的对象。当组件状态发生变化时，`transition` 变量将包含新的状态，而 `setTransition` 函数将用于更新过渡状态。

### useId

`useId` 是一个 React 钩子函数，它返回一个唯一的 ID，用于标识组件实例。这对于确保组件的虚拟 DOM 节点在整棵树中是唯一的非常有用。

下面是一个简单的 `useId` 示例：

```javascript
import React, { useId } from "react";

function MyComponent() {
  const id = useId();

  return (
    <div id={id}>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default MyComponent;
```

在这个示例中，`useId` 函数返回一个唯一的 ID，用于标识组件实例。这有助于在组件树中唯一地识别节点。
