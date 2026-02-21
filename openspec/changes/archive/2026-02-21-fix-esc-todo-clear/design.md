## Context

当前 `TodoItem.vue` 组件中处理 ESC 键的逻辑在 `handleKeydown` 函数中调用 `cancelEdit()`。问题是当待办项原始内容为空时（如新创建的待办项），按下 ESC 键应该触发删除而不是保留空内容。

## Goals / Non-Goals

**Goals:**
- 修复 ESC 键行为：保留原始非空内容
- 当原始内容为空时，ESC 触发删除

**Non-Goals:**
- 不修改其他键盘快捷键行为
- 不修改移动端触摸交互

## Decisions

1. **在 `handleKeydown` 中检查原始内容是否为空**
   - 记录进入编辑模式时的原始内容
   - ESC 时判断：如果原始内容为空则删除，否则取消编辑

2. **实现方案：在 `startEditing` 时保存原始内容**
   - 使用变量 `originalContent` 保存 `props.todo.content`
   - ESC 处理时根据 `originalContent` 判断行为

## Risks / Trade-offs

- 风险较低：仅修改单一组件的键盘事件处理逻辑
- 无性能影响
- 向后兼容：现有非空待办项行为不变
