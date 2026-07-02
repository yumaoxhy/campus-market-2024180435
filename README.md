# 校园轻集市 — Campus Market Seed

《校园轻集市》AI 辅助前端工程实践课程项目。

---

## 项目简介

面向高校校园生活场景的 Web App，核心业务包括二手交易、失物招领、拼单搭子、跑腿委托、消息沟通和个人中心。本项目为课程实践的最终交付成果。

---

## 功能特性

- **二手交易** — 浏览、搜索、分类筛选二手商品，收藏感兴趣的商品
- **失物招领** — 区分寻物/拾到，按类型筛选
- **拼单搭子** — 发起或加入拼单，实时进度展示
- **跑腿委托** — 发布跑腿任务，查看酬劳和地点
- **发布功能** — 四种业务类型的动态表单，含前端校验
- **消息中心** — 登录后查看个人消息
- **个人中心** — 用户资料、我的发布、我的收藏、管理员面板
- **登录/注册** — 账号密码登录，新用户注册
- **权限控制** — 未登录只能浏览，登录后可发布/删除自己内容，管理员可删除全部
- **搜索筛选** — 关键词搜索 + 分类/类型筛选，实时过滤

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | ^3.5.38 | 前端框架 |
| Vite | ^8.0.16 | 构建工具 |
| TypeScript | ~6.0.0 | 类型检查 |
| Vue Router | ^5.1.0 | 路由管理 |
| Pinia | ^3.0.4 | 状态管理 |
| Axios | ^1.18.1 | HTTP 请求 |
| JSON Server | ^1.0.0 | Mock API |
| ESLint + OxLint | — | 代码规范 |

---

## 快速开始

```bash
# 安装依赖
npm install

# 启动 Mock API（端口 3001）
npx json-server --watch db.json --port 3001

# 启动开发服务器（端口 5173）
npm run dev

# 浏览器访问
http://localhost:5173
```

### 测试账号

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 普通用户 | 当前用户 | 123456 |
| 管理员 | 000 | 123456 |

---

## 项目结构

```
campus-market-seed/
├── db.json                        # Mock 数据
├── src/
│   ├── api/                       # API 请求模块
│   │   ├── http.ts                # Axios 实例
│   │   ├── trade.ts / lostFound.ts
│   │   ├── groupBuy.ts / errand.ts / message.ts
│   ├── components/                # 公共组件
│   │   ├── AppHeader / AppLayout / AppNav
│   │   ├── ItemCard / EmptyState / FormField
│   │   ├── LoadingState / ErrorState / LoadStatus
│   │   ├── SearchBar / AdminDeleteBtn
│   ├── router/index.ts            # 路由配置
│   ├── stores/                    # Pinia 状态管理
│   │   ├── user.ts                # 用户状态（含登录/注册）
│   │   └── favorite.ts            # 收藏管理
│   ├── views/                     # 页面视图（8 个页面）
│   ├── types/index.ts             # TypeScript 类型定义
│   ├── App.vue
│   └── main.ts
├── docs/evidence/                 # 每日过程证据
│   ├── Day1_Evidence.md ~ Day7_Evidence.md
├── package.json
└── README.md
```

---

## 路由一览

| 路由 | 页面 | 说明 |
|------|------|------|
| / | HomeView | 首页 |
| /trade | TradeView | 二手交易 |
| /lost-found | LostFoundView | 失物招领 |
| /group-buy | GroupBuyView | 拼单搭子 |
| /errand | ErrandView | 跑腿委托 |
| /publish | PublishView | 发布信息 |
| /message | MessageView | 消息中心 |
| /user | UserCenterView | 个人中心 |
| /login | LoginView | 登录/注册 |

---

## 开发规范

- 使用 Git 管理项目，每次完成功能及时提交
- 每天完成对应的 Evidence 记录
- 保持项目始终能够正常运行
- 合理使用 AI Coding 工具并保留协作记录
