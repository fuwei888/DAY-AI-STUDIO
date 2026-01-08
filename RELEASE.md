# 发布指南 / Release Guide

## 创建新版本发布 / Creating a New Release

本项目使用 GitHub Actions 自动构建和发布。

### 方法 1: 使用 Git 标签 (推荐)

1. 确保所有更改已提交到主分支
2. 创建并推送版本标签：

```bash
# 创建标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送标签到 GitHub
git push origin v1.0.0
```

3. GitHub Actions 将自动：
   - 构建项目
   - 创建 ZIP 压缩包
   - 创建 GitHub Release
   - 上传压缩包到 Release

### 方法 2: 手动触发

1. 访问 GitHub 仓库的 Actions 页面
2. 选择 "Create Release" workflow
3. 点击 "Run workflow"
4. 选择分支并运行

## 版本号规范

遵循语义化版本 (Semantic Versioning)：

- **主版本号 (Major)**: 不兼容的 API 修改
- **次版本号 (Minor)**: 向下兼容的功能性新增
- **修订号 (Patch)**: 向下兼容的问题修正

示例：
- v1.0.0 - 首次正式发布
- v1.1.0 - 新增功能
- v1.1.1 - 错误修复

## 发布检查清单

在创建新版本之前，请确保：

- [ ] 所有测试通过
- [ ] 文档已更新
- [ ] CHANGELOG.md 已更新
- [ ] package.json 中的版本号已更新
- [ ] 所有更改已提交并推送
- [ ] 在本地测试过打包后的文件

## 手动打包 (可选)

如果需要手动创建发布包：

```bash
# 创建 dist 目录
mkdir -p dist

# 复制文件
cp index.html style.css app.js dist/

# 创建 ZIP 包
cd dist
zip -r ../yinzhe-music-player-v1.0.0.zip .
cd ..
```

## 发布后

发布完成后：

1. 验证 Release 页面上的下载链接
2. 测试下载的 ZIP 文件
3. 更新 README.md 中的版本信息（如需要）
4. 在社交媒体或相关平台宣布新版本

---

## Release Guide (English)

### Method 1: Using Git Tags (Recommended)

1. Ensure all changes are committed to the main branch
2. Create and push a version tag:

```bash
# Create tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag to GitHub
git push origin v1.0.0
```

3. GitHub Actions will automatically:
   - Build the project
   - Create a ZIP package
   - Create a GitHub Release
   - Upload the package to the Release

### Method 2: Manual Trigger

1. Visit the GitHub repository's Actions page
2. Select the "Create Release" workflow
3. Click "Run workflow"
4. Select the branch and run

### Version Numbering

Follow Semantic Versioning:

- **Major**: Incompatible API changes
- **Minor**: Backwards-compatible new features
- **Patch**: Backwards-compatible bug fixes

Examples:
- v1.0.0 - First official release
- v1.1.0 - New features
- v1.1.1 - Bug fixes

### Release Checklist

Before creating a new release:

- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version number in package.json updated
- [ ] All changes committed and pushed
- [ ] Tested the packaged files locally
