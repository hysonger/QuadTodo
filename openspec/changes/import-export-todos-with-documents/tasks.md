## 1. 依赖安装

- [x] 1.1 安装 jszip 库 (`npm install jszip`)
- [x] 1.2 安装 @tauri-apps/plugin-dialog (`npm install @tauri-apps/plugin-dialog`)
- [x] 1.3 安装 @tauri-apps/plugin-fs (`npm install @tauri-apps/plugin-fs`) - 确认已安装

## 2. 导出服务实现

- [x] 2.1 创建 `src/api/exportApi.ts` - 导出服务模块
- [x] 2.2 实现 `exportTodos()` - 收集所有待办数据
- [x] 2.3 实现 `collectDocuments()` - 读取 docs 目录下的所有文档
- [x] 2.4 实现 `createZipBundle()` - 将待办和文档打包为 ZIP
- [x] 2.5 实现 `downloadZip()` - 触发浏览器下载 ZIP 文件

## 3. 导入服务实现

- [x] 3.1 创建 `src/api/importApi.ts` - 导入服务模块
- [x] 3.2 实现 `validateZipFile()` - 验证 ZIP 文件结构
- [x] 3.3 实现 `parseZipContent()` - 解压并解析 todos.json
- [x] 3.4 实现 `importMerge()` - 合并导入模式
- [x] 3.5 实现 `importReplace()` - 替换导入模式
- [x] 3.6 实现 `importIncremental()` - 增量导入模式（相同 ID 覆盖）

## 4. UI 组件实现

- [x] 4.1 在设置区域添加导出按钮
- [x] 4.2 在设置区域添加导入按钮 + 文件选择器
- [x] 4.3 创建导入模式选择对话框组件
- [x] 4.4 添加导入/导出结果提示（成功/失败/错误信息）

## 5. Store 集成

- [x] 5.1 在 todoStore 中添加导出方法调用
- [x] 5.2 在 todoStore 中添加导入方法调用
- [x] 5.3 确保导入后刷新待办列表

## 6. 测试与验证

- [ ] 6.1 测试导出功能（有空待办、有文档、无文档）
- [ ] 6.2 测试导入功能 - 合并模式
- [ ] 6.3 测试导入功能 - 替换模式
- [ ] 6.4 测试导入功能 - 增量模式（相同 ID 覆盖）
- [ ] 6.5 测试错误处理（无效文件、损坏 JSON）
