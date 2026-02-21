## Why

当用户在待办项输入框中按下 ESC 键时，当前行为不正确地清空了输入框内容。正确的行为应该是保留原始内容，只有在待办项原本就为空时才触发删除逻辑。这个问题影响用户体验，特别是在编辑新创建的待办项时。

## What Changes

- 修改 `TodoItem.vue` 中 ESC 键的处理逻辑
- 当原始内容为空时，按下 ESC 触发删除而不是取消编辑
- 当原始内容非按下 ESC 时，保留原始内容并退出编辑模式

## Capabilities

### New Capabilities
- `todo-esc-behavior`: 定义 ESC 键在待办项编辑时的正确行为规范

### Modified Capabilities
- (无)

## Impact

- 修改文件: `src/components/TodoItem.vue`
- 影响功能: 待办项文本编辑和删除逻辑
