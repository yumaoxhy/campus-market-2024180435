# Day3 Evidence - Mock 数据与 API 请求

## 1. 今日完成内容

- 设计并创建了 db.json Mock 数据文件，覆盖四类核心业务（交易、失物招领、拼单、跑腿）+ 消息
- 封装了 Axios 请求实例（http.ts），拆分出 5 个业务 API 文件
- 创建了 ItemCard 和 EmptyState 两个公共组件
- 在 6 个核心页面中完成数据列表渲染，含加载态和空状态处理

## 2. 交付物清单

| 交付物 | 位置 | 说明 |
|-------|------|------|
| Mock 数据 | db.json | 交易 6 条、失物 5 条、拼单 5 条、跑腿 5 条、消息 4 条 |
| Axios 实例 | src/api/http.ts | 基础请求封装，baseURL: localhost:3000 |
| 交易 API | src/api/trade.ts | tradeApi.list() |
| 失物 API | src/api/lostFound.ts | lostFoundApi.list() |
| 拼单 API | src/api/groupBuy.ts | groupBuyApi.list() |
| 跑腿 API | src/api/errand.ts | errandApi.list() |
| 消息 API | src/api/message.ts | messageApi.list() |
| ItemCard | src/components/ItemCard.vue | 通用卡片组件，含 title/subtitle/description/extra |
| EmptyState | src/components/EmptyState.vue | 空状态占位组件 |
| 渲染页面 | src/views/ | 6 个页面均完成数据渲染 |

## 3. AI 协作记录

- **AI 工具**：opencode（deepseek-v4-flash）
- **核心提示词**：
  - "创建 db.json……每类数据建议不少于 5 条"
  - "交付物：Axios 封装文件 src/api/http.ts，业务 API 文件 src/api/*.ts"
  - "列表卡片组件 src/components/ItemCard.vue，空状态组件 src/components/EmptyState.vue"
- **AI 生成**：db.json 数据结构、API 模块拆分、ItemCard/EmptyState 组件、视图更新代码
- **自己修改**：将 db.json 的字段名与课程提供的示例对齐（trades/lostFounds/groupBuys/errands），修正视图中的字段引用

## 4. 遇到的问题

**字段名不匹配**：第一次设计的 db.json 用了 goods/lostItems 等命名，与课程要求的 trades/lostFounds 不一致，需要全部重命名并同步修改类型定义和 API 文件。

**ESLint any 类型报错**：`@typescript-eslint/no-explicit-any` 规则禁止使用 any 类型，需要为每个数据模型定义 TypeScript 接口。

## 5. 今日反思

Mock 数据是前后端分离开发的基础。今天建立了从 db.json → http.ts → 业务 API → 公共组件 → 页面渲染的完整数据链路。ItemCard 组件提高了卡片 UI 的复用性，EmptyState 组件让空数据状态也有良好体验。后续接入真实后端时只需修改 http.ts 的 baseURL。
