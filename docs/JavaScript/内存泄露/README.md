## 什么是内存泄露？

内存泄漏是指程序中己动态分配的堆内存由于某种原因程序未释放或无法释放，造成系统内存的浪费，导致程序运行速度减慢甚至系统崩溃等严重后果。

## 哪些情况会导致内存泄露？

- 全局变量
- 未被正确关闭的定时器
- 闭包
- 循环引用
- 事件监听
- 未清理的DOM元素引用

## 内存泄漏的检测

- Chrome开发者工具
- 内存快照
- 内存监控
- 内存泄漏检测工具