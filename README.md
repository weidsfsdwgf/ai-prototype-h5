# ai-prototype-h5

移动端 H5 原型项目，基于 Vite、React 和 React Router 构建。

## 功能概览

- 移动端工作台首页
- 易耗品申领入口
- 物品搜索、筛选和申领弹窗
- 待分发、待归还记录处理
- 管理员确认分发、归还和损耗登记交互

## 技术栈

- Vite
- React
- React Router
- CSS

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/` 目录。

## GitHub Pages 部署

本仓库已配置 GitHub Actions 自动部署到 GitHub Pages。

每次推送到 `main` 分支后，工作流会自动：

1. 安装依赖
2. 执行生产构建
3. 上传 `dist/` 产物
4. 发布到 GitHub Pages

项目的线上访问地址为：

```text
https://weidsfsdwgf.github.io/ai-prototype-h5/
```

如首次部署未立即生效，请在仓库的 `Settings > Pages` 中确认构建来源为 `GitHub Actions`。
