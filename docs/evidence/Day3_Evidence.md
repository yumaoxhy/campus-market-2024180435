# Day3 Evidence - Mock 数据与 API 请求

## 1. 今日完成内容

今天完成了前后端数据对接的基础建设：
- 设计了 Mock 数据模型（db.json），覆盖全部业务模块
- 安装并启动了 JSON Server，模拟 RESTful 后端接口
- 封装了 Axios 请求模块，统一管理 API 调用
- 在 6 个核心页面中从 Mock API 获取数据并渲染列表

## 2. Mock 数据模型

| 资源 | 说明 | 字段 |
|------|------|------|
| users | 用户 | id, name, phone, campus |
| goods | 二手商品 | id, title, price, category, description, status |
| lostItems | 失物招领 | id, type(失物/寻物), title, location, contact |
| groupBuys | 拼单搭子 | id, title, target, current, description |
| errands | 跑腿委托 | id, title, reward, description, location |
| messages | 消息 | id, fromUserId, toUserId, content, isRead |
| categories | 分类 | id, name, icon |

## 3. API 请求模块

文件位置：`src/api/index.ts`

封装了统一的 Axios 实例：
- baseURL: `http://localhost:3000`
- 按业务模块导出 API 方法（goods.list()、lostItems.list() 等）
- 页面组件通过 `onMounted` 中调用 API 获取数据

## 4. 页面列表渲染

| 页面 | 数据来源 | 渲染方式 |
|------|---------|---------|
| HomeView | categories + goods | 分类图标 + 商品卡片网格 |
| TradeView | goods | 商品卡片网格（标题/价格/分类） |
| LostFoundView | lostItems | 卡片列表（类型标签/描述/位置） |
| GroupBuyView | groupBuys | 卡片+进度条（当前/目标人数） |
| ErrandView | errands | 卡片列表（描述/地点/酬劳） |
| MessageView | messages | 消息列表（未读高亮） |

## 5. 遇到的问题与解决方法

**问题：npm 在 PowerShell 中被执行策略阻止**
PowerShell 的 ExecutionPolicy 为 Restricted，无法直接运行 npm 脚本。解决方法：使用 `cmd /c "npm command"` 方式调用，绕过 PowerShell 脚本限制。

**问题：JSON Server 跨域**
Vite 开发服务器默认端口是 5173，JSON Server 在 3000 端口，存在跨域问题。目前 axios 直接请求 localhost:3000 可以正常工作，后续如果需要可以配置 Vite proxy 解决。

## 6. 今日反思

Mock 数据层是前后端分离开发的关键基础设施。通过 JSON Server 模拟后端接口，前端可以在不依赖真实后端的情况下独立开发和调试。Axios 的统一封装让 API 调用变得规范化，每个页面只需要调用 `api.xxx.list()` 就能获取数据，后续替换为真实接口只需要修改 baseURL。
