# Day5 Evidence - Pinia 状态管理与个人中心

## 1. 今日完成内容

今天完成了 Pinia 状态管理的引入和跨页面使用：
- 创建了用户状态 Store（模拟当前登录用户）
- 创建了收藏状态 Store（管理收藏的商品）
- 完善了个人中心页面（展示资料、我的发布、我的收藏）
- 在导航栏、发布页、列表页中跨页面使用 Store

## 2. Store 设计

| Store | 文件名 | 主要状态 | 方法 |
|-------|--------|---------|------|
| user | src/stores/user.ts | id, name, phone, campus | 无（静态模拟数据） |
| favorite | src/stores/favorite.ts | ids（收藏 ID 列表） | toggle(id), has(id) |

favorite Store 还包含一个计算属性 `count`，用于在个人中心显示收藏数量。

## 3. 跨页面使用情况

| 页面/组件 | 使用的 Store | 用途 |
|-----------|-------------|------|
| AppNav.vue | user | 导航栏"个人中心"标签显示用户名 |
| PublishView.vue | user | 发布时 publisher 字段使用 store 中的用户名 |
| TradeView.vue | favorite | 每个商品卡片显示收藏按钮，支持切换 |
| UserCenterView.vue | user + favorite | 展示用户信息、我的发布、我的收藏 |

## 4. AI 协作记录

- **AI 工具**：opencode（deepseek-v4-flash）
- **核心提示词**：
  - "创建用户状态 Store，使用 Pinia 模拟当前用户信息"
  - "创建收藏状态 Store，管理用户收藏的商品或信息"
  - "完善个人中心页面，展示用户资料、我的发布、我的收藏"
  - "实现跨页面状态使用，在导航栏、发布页、列表页中使用 Store"
- **AI 生成**：user Store、favorite Store、更新后的 UserCenterView、AppNav、PublishView、TradeView
- **不合理之处**：无 major 问题，生成内容基本可用

## 5. 人工调整内容

- 将 favorite Store 中的收藏从"对象列表"简化为"ID 数组"，避免数据冗余
- 在 TradeView 中为收藏按钮添加了样式区分（🤍 未收藏 / ❤️ 已收藏）
- 在 UserCenterView 中切换 tab 时重新过滤数据，确保收藏列表实时同步

## 6. 测试记录

- 打开首页，导航栏显示"当前用户"（来自 user Store）
- 打开二手交易页，点击商品卡片的收藏按钮，按钮从 🤍 变为 ❤️
- 进入个人中心 → 我的收藏，看到已收藏的商品
- 在个人中心 → 我的发布中看到该用户名发布的商品
- 发布新商品后，个人中心的"我的发布"列表包含该商品

## 7. 遇到的问题与解决方法

**问题：收藏数据页面刷新后丢失**
Pinia 默认状态存储在内存中，刷新页面后收藏列表重置为空。解决：后续可以引入 pinia-plugin-persistedstate 插件将数据持久化到 localStorage，目前阶段作为练习暂不处理。

**问题：个人中心"我的发布"过滤条件不准确**
目前按 `publisher === user.name` 过滤，如果发布时用户名与实际不匹配会导致数据缺失。解决：后续应该给每条数据关联 `userId` 字段，用 ID 匹配。

## 8. 今日反思

Pinia 是 Vue 3 官方推荐的状态管理方案。今天通过 user 和 favorite 两个 Store 的实践，理解了 Store 的核心价值：多个组件共享同一份数据，一处修改、处处响应。个人中心作为用户数据的聚合页，集中展示了用户的个人信息、发布历史和收藏内容，是连接各个业务模块的枢纽。
