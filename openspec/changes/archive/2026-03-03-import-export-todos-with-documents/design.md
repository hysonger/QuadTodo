## Context

当前 QuadTodo 应用将待办数据存储在 LocalStorage，文档存储在 Tauri 文件系统的 `docs/` 目录。用户需要一种方式导出所有数据作为备份或在设备间迁移。

**当前状态：**
- 待办数据：`localStorage` (key: `quad-todo-items`)
- 文档存储：`{appDataDir}/docs/{todoId}.md`
- 无导入导出功能

**约束：**
- 桌面应用使用 Tauri v2，需使用 Tauri API 处理文件
- 前端使用 Vue 3 + TypeScript
- 需要 ZIP 压缩库处理打包

## Goals / Non-Goals

**Goals:**
- 实现一键导出全部待办和文档为 ZIP 文件
- 实现从 ZIP 文件导入待办数据
- 支持三种导入模式：合并(merge)、替换(replace)、增量(incremental)
- 增量模式下相同 ID 覆盖已有记录和文档

**Non-Goals:**
- 导入/导出的版本控制和历史记录
- 选择性导出（特定象限/已完成等）
- 加密导出
- 后端 API 迁移（当前仅本地存储）

## Decisions

### 1. 使用 JSZip 库处理 ZIP 文件
**选择：** 使用 `jszip` 前端库
**理由：** 纯前端实现，无需 Tauri 后端参与压缩逻辑，跨平台兼容性好
**替代方案：** Tauri 命令行压缩（增加复杂度，仅桌面端可用）

### 2. 导出文件结构
```
quadtodo-export-2024-01-15.zip
├── todos.json          # 待办数据 JSON
└── docs/               # 文档目录
    ├── {todoId}.md
    └── {todoId}.md
```

**理由：** 结构清晰，导入时易于解析和验证

### 3. 导入模式 UI 设计
在导入时显示对话框让用户选择：
- **合并 (Merge)**：保留本地 + 添加导入的新待办
- **替换 (Replace)**：清空本地 + 导入全部
- **增量 (Incremental)**：相同 ID 覆盖，不同 ID 保留本地 + 添加新导入

**理由：** 增量模式是用户明确需求，替换模式适合完整恢复备份

### 4. 使用 Tauri 文件对话框
使用 `@tauri-apps/plugin-dialog` 的 `save` 和 `open` 对话框

**理由：** 原生文件对话框体验更好，支持选择文件保存位置

## Risks / Trade-offs

- [Risk] 导入大量文档时性能可能下降 → [Mitigation] 使用 async/await 顺序处理，显示进度提示
- [Risk] 文档目录不存在时导出失败 → [Mitigation] 检查目录是否存在，不存在则创建空目录
- [Risk] 导入冲突（相同 ID）覆盖导致数据丢失 → [Mitigation] 仅在增量模式下覆盖，提供明确提示
