# Day4 Evidence - 发布表单与数据提交

## 1. 今日完成内容

- 实现了 4 种业务类型的动态发布表单（二手交易、失物招领、拼单搭子、跑腿委托）
- 抽取了 FormField 公共表单项组件，统一 label、必填标记和错误提示
- 为标题、描述、地点、价格等字段实现了前端校验
- 为 4 个 API 模块添加了 POST 方法，支持向 JSON Server 提交数据
- 表单提交成功后自动重置，可在 db.json 中验证新增数据

## 2. 交付物清单

| 交付物 | 位置 | 说明 |
|-------|------|------|
| 发布页面 | src/views/PublishView.vue | 动态表单 + 校验 + POST 提交 |
| 表单项组件 | src/components/FormField.vue | 统一 label/必填/错误显示 |
| 交易 POST | src/api/trade.ts | tradeApi.create() |
| 失物 POST | src/api/lostFound.ts | lostFoundApi.create() |
| 拼单 POST | src/api/groupBuy.ts | groupBuyApi.create() |
| 跑腿 POST | src/api/errand.ts | errandApi.create() |
| 证据卡 | docs/evidence/Day4_Evidence.md | 本文件 |

## 3. 发布类型与字段设计

| 类型 | 特有字段 |
|------|---------|
| 二手交易 | 价格、分类、成色 |
| 失物招领 | 类型（寻物/拾到）、物品名称、联系方式 |
| 拼单搭子 | 拼单类型、目标人数、截止时间 |
| 跑腿委托 | 任务类型、酬劳、起始地点、送达地点、截止时间 |

所有类型共有的字段：标题、描述、地点。

## 4. 校验规则

| 字段 | 规则 |
|------|------|
| 标题 | 必填，至少 2 个字符 |
| 描述 | 必填，至少 10 个字符 |
| 地点 | 必填 |
| 价格/酬劳 | 必填，大于 0 |
| 目标人数 | 必填，至少 2 人 |
| 物品名称/联系方式 | 必填（失物招领） |

## 5. 遇到的问题

**FormField 组件样式穿透**：PublishView 中的 input/select/textarea 样式定义在父组件中，需要使用 `:deep()` 才能穿透 scoped 样式作用到 FormField 插槽内的元素。

**类型错误**：`typeOptions` 变量在编辑过程中被误删，导致模板中 `v-for="opt in typeOptions"` 报错"不存在属性 typeOptions"，排查后加回。

## 6. 今日反思

发布功能是用户核心操作之一。今天通过动态表单实现了四种业务类型的统一发布入口，通过抽取 FormField 组件避免了重复的 label/error 模板代码。POST 方法的统一封装让后续新增其他业务类型的发布也变得简单。
