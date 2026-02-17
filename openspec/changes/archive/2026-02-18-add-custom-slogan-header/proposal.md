## Why

当前顶栏左侧显示的是四象限待办应用图标和固定标题，用户无法自定义这部分空间来展示个人喜欢的格言或slogan。添加用户自定义文字区域可以增强应用的个性化体验，同时设置页面的引入也为后续更多设置选项提供了入口。

## What Changes

- 移除顶栏左侧的四象限待办图标和标题
- 在顶栏左侧添加用户可自定义的文字区域（默认显示"日拱一卒"）
- 文字使用略小的字号和略浅的颜色，起到显示弱化作用
- 在顶栏最右侧添加设置图标按钮作为设置页面入口
- 实现设置页面，包含自定义文字的配置输入框和保存功能
- 新增设置存储，使用LocalStorage持久化用户的自定义文字

## Capabilities

### New Capabilities
- `custom-slogan`: 支持用户在顶栏显示自定义文字（格言、slogan等），包含设置页面和持久化存储

### Modified Capabilities
- (无)

## Impact

- 新增 `src/stores/settingsStore.ts` 扩展或新建设置存储
- 新增 `src/views/Settings.vue` 设置页面组件
- 修改 `src/App.vue` 顶栏布局
- 无需新增外部依赖
