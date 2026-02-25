## Why

用户需要备份和迁移数据的能力。当前所有待办数据仅存储在浏览器本地存储和文件系统中，缺乏统一的导出机制。用户希望能够一键导出所有待办及其关联文档为一个压缩包，方便备份或在设备间迁移。

## What Changes

- 新增「导出全部待办」功能：导出时将所有待办数据（JSON格式）以及关联的 Markdown 文档打包为一个 ZIP 文件
- 新增「导入待办」功能：支持从导出的 ZIP 文件导入待办数据，恢复所有待办项及其文档
- 在设置区域或应用菜单中添加导出/导入入口
- 导出文件名包含导出时间戳（如 `quadtodo-export-2024-01-15.zip`）

## Capabilities

### New Capabilities
- `data-export`: 导出全部待办数据为 ZIP 文件，包含 todos.json 和 docs/ 文件夹
- `data-import`: 从 ZIP 文件导入待办数据，支持选择性覆盖或合并

### Modified Capabilities
（无）

## Impact

- **UI**: 新增导出/导入按钮或菜单项
- **API**: 新增导出服务（将 LocalStorage 数据和文档目录打包为 ZIP）
- **存储**: 导入时需要处理数据合并或覆盖逻辑
- **依赖**: 需要使用 ZIP 压缩库（如 JSZip）
