---
title: Vue 响应式原理
date: 2026-08-20
category: 技术
tags: [Vue, 前端]
summary: 从 Object.defineProperty 到 Proxy，一文看懂 Vue 2/3 响应式系统。
---

# Vue 响应式原理

## 从 Object.defineProperty 说起

Vue 2 使用 `Object.defineProperty` 拦截对象属性的读取与赋值：

```js
const data = { count: 0 }

Object.defineProperty(data, 'count', {
  get() {
    track()   // 收集依赖
    return value
  },
  set(newVal) {
    value = newVal
    trigger() // 触发更新
  },
})
```

它的局限在于**无法拦截新增属性和数组索引**，所以 Vue 2 提供了 `Vue.set` 这类补丁 API。

## Vue 3 的 Proxy 方案

Vue 3 改用 `Proxy` 对整个对象做代理，可以拦截所有属性操作：

```ts
const state = reactive({ count: 0 })

state.count++          // 可以被代理捕获
state.newProp = 1      // 新增属性也能触发响应
```

Proxy 天然覆盖了 `set`、`deleteProperty`、`has`、`ownKeys` 等全部陷阱，不再需要补丁 API。

## 依赖收集与触发

Vue 3 用 `activeEffect` 记录当前正在执行的 effect，读取属性时通过 `track` 收集，修改时通过 `trigger` 派发更新，配合 `WeakMap` 缓存，做到精确且无内存泄漏。

## 小结

- Vue 2：`Object.defineProperty`，无法拦截新增属性/数组索引
- Vue 3：`Proxy` + `Reflect`，完整拦截，性能更好
- 核心都是「读取时收集、写入时触发」的发布订阅模型
