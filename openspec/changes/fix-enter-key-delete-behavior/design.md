## Context

当前 TodoItem.vue 组件中，handleKeydown 方法处理 Enter 键时，如果输入框内容为空（trimmed === ''），会直接删除该待办。这个行为对于快速连续创建待办的用户不够友好。

用户期望的行为区分：
1. 用户直接按回车创建待办后，再次按回车且中间没有输入任何内容 → 不删除待办
2. 用户创建待办后，输入了一些内容又全部删除，然后按回车 → 删除待办

## Goals / Non-Goals

**Goals:**
- 区分"从未输入内容"和"输入后清空"两种状态
- 实现用户期望的回车键删除行为

**Non-Goals:**
- 不修改其他键盘交互行为（如 Escape 键）
- 不修改已完成待办的交互逻辑

## Decisions

### 方案：使用标记追踪输入状态

在 TodoItem 组件中添加 `hasUserTyped` 标记：
- 初始值为 `false`
- 当用户在任何输入框中键入内容时，设置为 `true`
- 当保存（saveEdit）时，重置为 `false`

**实现逻辑：**
```typescript
const hasUserTyped = ref(false)

// 在 handleKeydown 中：
if (e.key === 'Enter') {
  const trimmed = editContent.value.trim()
  if (trimmed === '') {
    if (!hasUserTyped.value) {
      // 从未输入过内容，不执行任何操作
      return
    }
    // 输入过内容又清空，删除待办
    emit('delete', props.todo.id)
  } else {
    saveEdit()
    emit('createNext')
  }
}
```

**为什么选择此方案：**
- 实现简单，只需添加一个布尔标记
- 逻辑清晰，易于理解和维护
- 性能开销最小

## Risks / Trade-offs

**风险：**
- [低] 需要验证 v-model 绑定是否能正确触发 hasUserTyped 的更新

**权衡：**
- 当前方案已经足够简单，无需引入更复杂的状态机
