# Day2 Evidence

## 今日开发过程

今天的主要任务是重构项目目录结构并创建基础页面框架。

### 1. 目录结构整理
上午先对照课程要求调整了项目结构。原来的 views 下面混着 ListView、DetailView 等与业务不对应的文件，我删掉了这些，改成按业务模块命名：
- 二手交易 → TradeView
- 失物招领 → LostFoundView
- 拼单搭子 → GroupBuyView
- 跑腿委托 → ErrandView
- 个人中心 → UserCenterView

同时新建了 `src/assets/` 目录，删除了 api、components、stores 目录里的 `.gitkeep` 占位文件，这样结构更干净。

### 2. 组件抽取
之前导航栏是直接写在 App.vue 里的，今天拆成了三个公共组件：
- **AppHeader.vue** — 只放标题，每个页面统一显示
- **AppNav.vue** — 导航菜单，用 `v-for` 循环渲染，加了 active 高亮判断
- **AppLayout.vue** — 把 Header + Nav + RouterView 组合在一起，App.vue 直接引用这一个组件就行

这样改完之后，App.vue 从 40 多行缩到了 10 行左右，结构清晰多了。

### 3. 路由配置
在 router/index.ts 里配了 8 条路由，全部用懒加载 `() => import()` 的方式引入。首页配成 `/`，个人中心配成 `/user`，跟课程文档要求的一致。

### 4. 遇到的问题
- 首页路由一开始配的是 `/home`，后来发现要求是 `/`，改了一下，同时导航栏的 to 也要同步改
- 写 AppNav 的 active 判断时用了 `route.path === item.path`，简单直接
- PublishView 和 MessageView 的模板结构跟其他页面不一致（有的用 section+h2，有的用 div+h1），后面需要统一

### 5. 构建验证
`npm run build-only` 一次通过，45 个模块全部编译成功，每个页面都生成了独立的 chunk，说明路由懒加载生效了。

## 当前项目结构

```
campus-market-seed/
└── src/
    ├── api/
    ├── assets/
    ├── components/
    │   ├── AppHeader.vue
    │   ├── AppLayout.vue
    │   └── AppNav.vue
    ├── router/
    │   └── index.ts
    ├── stores/
    ├── views/
    │   ├── HomeView.vue
    │   ├── TradeView.vue
    │   ├── LostFoundView.vue
    │   ├── GroupBuyView.vue
    │   ├── ErrandView.vue
    │   ├── PublishView.vue
    │   ├── MessageView.vue
    │   └── UserCenterView.vue
    ├── App.vue
    └── main.ts
```

## 验证清单
- [x] 8 个页面组件全部创建，路由一一对应
- [x] 3 个公共布局组件抽取完成
- [x] 项目构建通过
- [x] 所有页面可正常访问
