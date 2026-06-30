# Day4 Evidence - 发布表单与数据新增

## 1. 今日完成内容

今天完成了发布表单的完整实现，包括：
- 设计 4 种发布类型各自的表单字段
- 实现根据业务类型动态切换表单项
- 抽取 FormField 公共组件统一 label、必填标记和错误提示
- 为标题、描述、地点、价格等字段添加前端校验
- 为 4 个 API 模块添加 POST 方法，数据提交到 JSON Server

## 2. 发布类型与字段设计

| 发布类型 | 对应数据集合 | 关键字段 | 设计理由 |
|---|---|---|---|
| 二手交易 | trades | title、category、price、condition、location、description | 需要展示商品基本信息和交易条件 |
| 失物招领 | lostFounds | title、type、itemName、location、eventTime、description | 需要区分寻物和招领，并描述物品信息 |
| 拼单搭子 | groupBuys | title、type、targetCount、deadline、location、description | 需要说明人数目标和截止时间 |
| 跑腿委托 | errands | title、taskType、reward、from、to、deadline、description | 需要说明任务内容、地点和酬劳 |

## 3. 表单校验规则

- **标题**：必填，至少 2 个字符
- **描述**：必填，至少 10 个字符
- **地点**：必填
- **二手交易价格**：必填，必须大于 0
- **成色、分类**（二手交易）：必选
- **物品名称、联系方式**（失物招领）：必填
- **拼单类型**（拼单）：必选
- **目标人数**（拼单）：必填，不能少于 2
- **任务类型、起始地点、送达地点**（跑腿）：必填
- **酬劳**（跑腿）：必填，必须大于 0
- **截止时间**（拼单/跑腿）：必填

## 4. AI 协作记录

- **使用的 AI 工具**：opencode（deepseek-v4-flash）
- **核心提示词**：
  - "设计发布类型……动态展示表单字段……实现表单校验……使用 Axios 发送 POST 请求"
  - "创建 FormField.vue 用于统一表单项展示"
- **AI 生成的内容**：生成了完整的 PublishView.vue（动态表单 + 校验函数 + submit 方法）、FormField 组件、4 个 API 文件的 create 方法
- **AI 生成内容中的不合理之处**：
  - 使用了 `computed` 定义 `formTitle` 但模板中未使用，导致 ESLint 报 unused vars
  - 在脚本中重复定义了两次 `typeOptions`，第二次覆盖了第一次带空选项的版本
  - 删除重复时误删了唯一一份 `typeOptions` 定义，导致模板报错"不存在属性 typeOptions"

## 5. 人工调整内容

- 删除了无用的 `computed` 和 `formTitle` 相关代码
- 修正了 `typeOptions` 重复定义和误删问题
- 将原始 `<div class="field">` 替换为 `<FormField>` 组件
- 将 input/select/textarea 的样式改为 `:deep()` 穿透，因为元素在 FormField 的 slot 内
- 删除了与校园场景无关的字段

## 6. 测试记录

打开 `http://localhost:5173/publish`，选择"二手交易"：
1. 不填任何字段直接提交 → 校验通过，标题、描述、地点、价格、分类、成色均显示红色错误提示
2. 填完所有字段提交 → 显示"✅ 发布成功！"
3. 点击"继续发布" → 表单重置为初始状态
4. 打开 `http://localhost:3001/trades` → 看到新增的数据记录
5. 返回列表页 `/trade` → 新发布的商品出现在列表中

## 7. 遇到的问题与解决方法

**问题 1：表单提交后没有反馈**
提交后没有成功/失败提示。解决：在 submit 函数中判断 `res.status === 201`，设置 `submitted` 状态，显示成功界面。

**问题 2：切换发布类型后旧字段残留**
从"二手交易"切换到"失物招领"后，价格字段仍然显示。解决：在 resetForm 函数中重置所有字段值为初始状态。

**问题 3：scoped 样式不生效**
FormField 组件插槽内的 input 元素无法被父组件的 `.field input` 样式影响。解决：使用 `:deep(input)` 穿透 scoped 限制。

## 8. 今日反思

发布功能是用户的核心操作入口。今天的表单设计覆盖了四种不同业务场景，通过类型选择动态切换字段，保证了用户只看到自己需要的表单项。前端校验在提交前拦截无效数据，减少了无效请求。POST 方法的统一封装让后续扩展其他发布类型变得简单。表单与列表页的数据联动也打通了"发布 → 存储 → 展示"的完整链路。
