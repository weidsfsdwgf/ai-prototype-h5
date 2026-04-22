# 日常发布流程

本项目代码发布到 GitHub 仓库：

```text
https://github.com/weidsfsdwgf/ai-prototype-h5.git
```

## 1. 发布前检查

```bash
git status --short --branch
npm run build
```

确认：

- 工作区只有本次要发布的改动
- `npm run build` 构建通过
- 不提交 `node_modules/`、`dist/`、日志文件和环境变量文件

## 2. 提交代码

```bash
git add .
git commit -m "描述本次改动"
```

提交信息建议简短说明本次业务或配置变更，例如：

```bash
git commit -m "Update consumables prototype"
```

## 3. 推送到 GitHub

```bash
git push
```

当前本地 `main` 分支已跟踪远端 `origin/main`，正常情况下直接执行 `git push` 即可。

## 4. 发布后确认

```bash
git status --short --branch
git ls-remote origin refs/heads/main
```

确认本地分支和远端 `main` 已同步。

## 5. Vercel 部署注意事项

Vercel 项目配置建议：

- Application Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: 默认或 `npm install`

本项目的 `vite.config.js` 已做环境区分：

- Vercel 默认使用 `/`
- GitHub Pages 使用 `/ai-prototype-h5/`

因此不要在 Vercel 里额外配置 GitHub Pages 的子路径。

## 6. GitHub Pages 部署注意事项

仓库已配置 GitHub Actions：

```text
.github/workflows/deploy.yml
```

推送到 `main` 后会自动构建并发布到 GitHub Pages。

如果 GitHub Pages 首次不生效，到仓库 `Settings > Pages` 确认 Source 为 `GitHub Actions`。
