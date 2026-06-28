# Day2 Evidence - 页面骨架与路由导航

## 1. 今日完成内容

按照课程要求，今天完成了以下工作：
- 重构了项目目录结构，按业务模块组织 views 文件
- 创建了 8 个基础页面组件，覆盖校园集市的全部业务模块
- 抽取了 3 个公共布局组件（Header、Nav、Layout），统一页面结构
- 配置了 8 条路由，全部采用懒加载方式引入
- 删除了旧的无关页面文件（ListView、DetailView、ProfileView、BoardView）
- 删除了 api、components、stores 目录中的 .gitkeep 占位文件

## 2. 页面与路由清单

| 页面名称 | 路由路径 | 文件位置 |
|---|---|---|
| 首页 | / | src/views/HomeView.vue |
| 二手交易 | /trade | src/views/TradeView.vue |
| 失物招领 | /lost-found | src/views/LostFoundView.vue |
| 拼单搭子 | /group-buy | src/views/GroupBuyView.vue |
| 跑腿委托 | /errand | src/views/ErrandView.vue |
| 发布信息 | /publish | src/views/PublishView.vue |
| 消息中心 | /message | src/views/MessageView.vue |
| 个人中心 | /user | src/views/UserCenterView.vue |

## 3. AI 协作记录

- **使用的 AI 工具**：opencode（基于 deepseek-v4-flash 模型）
- **核心提示词**：
  - "把项目变成这个结构……其中 views 用于存放页面级组件；components 用于存放可复用组件"
  - "在 src/views/ 下新增以下页面：ListView、DetailView、PublishView、MessageView、ProfileView、BoardView"
  - "任务2：完善路由系统，必须包含以下路径：/home、/list、/detail……"
  - "构建基础导航系统，在 App.vue 中实现页面入口导航"
- **AI 生成的内容**：生成了 8 个 Vue 页面组件（初版）、路由配置、AppNav/AppHeader/AppLayout 组件
- **自己修改/确认的内容**：
  - 将路由路径 `/home` 改为 `/`，`/user-center` 改为 `/user`
  - 删除了 AI 初版生成的 ListView、DetailView、BoardView 等不符合业务命名的文件
  - 将 HomeView 的占位文本"项目启动成功"改为"首页"及业务描述
  - 确认了 PublishView 和 MessageView 的模板结构需要后续统一

## 4. 遇到的问题与解决方法

**问题：首页路由路径不匹配**
一开始把首页路由配成了 `/home`，导航栏的 `to` 也是 `/home`。后来对照课程文档发现要求首页是 `/`，个人中心是 `/user`。修改了 router/index.ts 和 AppNav.vue 两处路径后才对齐。

**问题：AI 生成的页面命名与业务不对应**
AI 第一轮生成了 ListView、DetailView、BoardView、ProfileView 等页面，但课程要求的是 TradeView（二手交易）、LostFoundView（失物招领）、GroupBuyView（拼单搭子）、ErrandView（跑腿委托）、UserCenterView（个人中心）。需要自己重新调整命名。

## 5. 今日反思

页面骨架和路由导航是整个应用的基石。今天搭建的 8 个页面虽然还没有业务功能，但确定了每个模块的目录位置和访问路径，后续开发时直接在对应页面里填充组件和逻辑即可。公共布局组件（AppLayout）的好处是一次定义、全局生效，之后如果要调整导航栏或整体样式，只需要改一个文件，不用每个页面单独修改。
