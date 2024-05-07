## React 生命周期

### 16.3 生命周期方法

#### 挂载阶段

- constructor() 初始化
- static getDerivedStateFromProps() 是 React 组件生命周期中的一个静态方法，它在 React 16.3 版本中引入，作为新的生命周期方法出现。这个方法在组件接收新的 props 时被调用，并且在组件的 state 更新之前。它的主要目的是让组件有机会根据新的 props 来同步 state。

  这个方法接受两个参数：props 和 state。props 是组件接收的新属性，而 state 是组件当前的 state。

  getDerivedStateFromProps 应该返回一个对象来更新 state，或者返回 null 来表示不需要任何更新。如果返回 null，那么组件的 state 将保持不变。

  ```js
  class MyComponent extends React.Component {
    static getDerivedStateFromProps(props, state) {
      // 如果 props.value 发生变化，更新 state.value
      if (props.value !== state.value) {
        return {
          value: props.value,
        };
      }
      // 否则，不需要更新 state
      return null;
    }

    render() {
      // 使用 state.value 来渲染组件
      return <div>{this.state.value}</div>;
    }
  }
  ```

- render()
- componentDidMount()

#### 更新阶段

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate() 方法接收两个参数：prevProps 和 prevState，分别代表更新前的 props 和 state。

  这个方法应该返回一个值，这个值会作为第三个参数传递给 componentDidUpdate。提供了一个在组件更新之前捕获和保存 DOM 状态的机会，这对于需要精确控制 DOM 交互的应用来说是非常有用的。

  ```js
  class ScrollingList extends React.Component {
    constructor(props) {
      super(props);
      this.listRef = React.createRef();
      this.state = { scrollTop: 0 };
    }

    componentDidMount() {
      this.updateScroll();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      // 如果 scrollTop 发生变化，滚动到指定位置
      if (this.state.scrollTop !== prevState.scrollTop) {
        this.listRef.current.scrollTop = this.state.scrollTop;
      }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
      // 在 DOM 更新之前，捕获当前的滚动位置
      return this.listRef.current.scrollTop;
    }

    updateScroll = () => {
      // 假设有一个逻辑来更新 scrollTop
      this.setState({ scrollTop: newScrollTopValue });
    };

    render() {
      return (
        <div ref={this.listRef} style={{ overflow: "auto", height: "300px" }}>
          {/* 列表内容 */}
        </div>
      );
    }
  }
  ```

  在这个例子中，ScrollingList 组件在更新 scrollTop 状态时，使用 getSnapshotBeforeUpdate 来捕获更新前的滚动位置，然后在 componentDidUpdate 中将滚动位置设置回更新后的值，从而实现了滚动位置的同步。

  需要注意的是，过度使用 getSnapshotBeforeUpdate 和 componentDidUpdate 可能会导致性能问题，特别是在大型应用或高频更新的组件中。因此，应谨慎使用这些生命周期方法，仅在必要时使用。

- componentDidUpdate()

#### 卸载阶段

- componentWillUnmount()
