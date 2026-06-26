# 闲鱼源码原型展示站

这是一个用 Vue3、Vite、Vue Router 做的前端原型展示项目，适合放到 Git 仓库后给客户预览，也适合后续拆出单个页面作为低价源码交付。

## 包含页面

- `/projects/smartwork`：项目管理 SaaS 页面
- `/projects/bizpro`：企业数字化方案页面
- `/projects/ai-assistant`：AI 助手产品页面
- `/projects/freshlife`：轻电商单品详情页面

## 技术选择

- Vue3：组件化维护，后续新增模板更方便。
- Vite：启动和构建速度快，适合轻量演示站。
- Vue Router：每个项目都有独立路径，便于发链接给客户。
- Hash 路由：部署到 GitHub Pages、Gitee Pages 等静态站时，刷新详情页不容易 404。
- Vite `base: './'`：支持部署在仓库子路径，不强依赖根域名。
- 本地 PNG 预览图：不依赖外部图片，减少部署和版权风险。

## 启动

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建后的文件在 `dist/`，可部署到 GitHub Pages、Gitee Pages、Netlify、Vercel 或自己的静态服务器。

## 修改项目内容

四个项目的核心文案、路径、价格、功能点在：

```text
src/data/projects.js
```

新增项目时，复制一条项目数据并补充图片即可。页面模板在：

```text
src/views/ProjectDetail.vue
```

全局布局和左侧菜单在：

```text
src/App.vue
```
