## 1. 修改 TodoItem.vue

- [x] 1.1 在 `startEditing` 函数中添加 `originalContent` 变量保存原始内容
- [x] 1.2 修改 `handleKeydown` 中的 ESC 处理逻辑，判断 `originalContent` 是否为空
- [x] 1.3 当 `originalContent` 为空时，ESC 触发 delete；非空时保留内容并退出编辑

## 2. 验证修复

- [x] 2.1 测试 ESC 键在非空待办项上的行为（应保留内容）
- [x] 2.2 测试 ESC 键在空待办项上的行为（应删除）
- [x] 2.3 运行 `npm run build` 确保无类型错误
