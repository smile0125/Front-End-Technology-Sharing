## React 渲染流程

### 流程

1. jsx 描绘页面
2. jsx 通过 babel 编译后生生成 render 函数
3. render 函数通过 React.createElement 生成虚拟 dom
4. 虚拟 dom 通过 diff 算法生成 Fiber 节点
5. Fiber 节点通过 reconcile 算法生成真实 dom
6. 真实 dom 插入到页面中

VDom 是 React Element 对象，只记录了子节点，没有记录兄弟节点，因为渲染是不可中断的。

Fiber 是 FiberNode 对象 是一个链表，记录了子节点，兄弟节点，父节点，以及当前节点的状态。
