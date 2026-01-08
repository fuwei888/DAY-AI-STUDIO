# 快速开始指南 / Quick Start Guide

## 🚀 立即使用 / Immediate Use

### 方式 1: 直接下载使用 (推荐给普通用户)

1. 访问 [Releases](https://github.com/fuwei888/DAY-AI-STUDIO/releases) 页面
2. 下载最新版本的 `yinzhe-music-player.zip`
3. 解压到任意文件夹
4. 双击打开 `index.html` 文件
5. 点击"选择音频文件"按钮，选择您喜欢的音乐
6. 享受音乐和可视化效果！

**注意**: 需要使用现代浏览器（Chrome、Firefox、Safari、Edge）

### 方式 2: 在线使用 (GitHub Pages)

如果仓库启用了 GitHub Pages，可以直接访问在线版本。

### 方式 3: 本地开发

适合开发者或想要自定义功能的用户。

#### 前置条件
- 已安装 Node.js (v14+)
- 已安装 Git

#### 步骤

```bash
# 1. 克隆仓库
git clone https://github.com/fuwei888/DAY-AI-STUDIO.git
cd DAY-AI-STUDIO

# 2. 安装依赖 (可选，仅用于本地服务器)
npm install

# 3. 启动开发服务器
npm start

# 浏览器将自动打开 http://localhost:8080
```

或者直接用浏览器打开 `index.html` 文件。

## 📖 使用说明

### 基本操作

1. **加载音乐**: 点击 "📁 选择音频文件" 按钮
2. **播放/暂停**: 点击中间的播放按钮 ▶/⏸
3. **切换歌曲**: 使用 ⏮ (上一曲) 和 ⏭ (下一曲) 按钮
4. **调节音量**: 拖动音量滑块 🔊
5. **跳转播放**: 点击进度条任意位置
6. **切换可视化**: 在下拉菜单选择不同的可视化模式

### 可视化模式

- **频谱柱状图**: 经典的音频频谱显示，适合大多数音乐
- **波形图**: 显示音频波形，适合查看音乐节奏
- **圆形频谱**: 炫酷的圆形频谱效果，适合电子音乐

### 支持的文件格式

- MP3
- WAV
- OGG
- M4A
- 其他浏览器支持的音频格式

## 🛠️ 开发者指南

### 项目结构

```
DAY-AI-STUDIO/
├── index.html          # 主页面
├── style.css           # 样式表
├── app.js              # 应用逻辑
├── package.json        # 项目配置
├── README.md           # 项目说明
├── CHANGELOG.md        # 更新日志
├── RELEASE.md          # 发布指南
├── LICENSE             # MIT 许可证
└── .github/
    └── workflows/
        └── release.yml # 自动发布工作流
```

### 自定义开发

1. **修改样式**: 编辑 `style.css`
2. **添加功能**: 编辑 `app.js`
3. **更改布局**: 编辑 `index.html`

### 构建和打包

```bash
# 构建项目
npm run build

# 创建发布包
npm run package
```

这将创建一个包含所有必要文件的 ZIP 包。

### 发布新版本

```bash
# 更新 package.json 中的版本号
# 然后创建 git 标签
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

GitHub Actions 将自动创建 Release。

## ❓ 常见问题

### Q: 为什么音乐无法播放？
A: 
- 确保音频文件格式被浏览器支持
- 某些浏览器可能阻止自动播放，需要用户手动点击播放
- 检查浏览器控制台是否有错误信息

### Q: 可视化效果不显示？
A: 
- 确保使用的是现代浏览器
- 检查浏览器是否支持 Web Audio API 和 Canvas API
- 某些浏览器可能需要 HTTPS 才能使用某些 API

### Q: 如何添加多首歌曲？
A: 在选择文件时，按住 Ctrl (Windows) 或 Command (Mac) 键可以选择多个文件

### Q: 能在移动设备上使用吗？
A: 可以！界面采用响应式设计，支持移动浏览器

## 📝 技术栈

- **HTML5**: 页面结构
- **CSS3**: 样式和动画
- **JavaScript (ES6+)**: 应用逻辑
- **Web Audio API**: 音频分析
- **Canvas API**: 可视化渲染

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## English Version

## 🚀 Quick Start

### Method 1: Direct Download (Recommended for Users)

1. Visit the [Releases](https://github.com/fuwei888/DAY-AI-STUDIO/releases) page
2. Download the latest `yinzhe-music-player.zip`
3. Extract to any folder
4. Open `index.html` in your browser
5. Click "Select Audio File" and choose your music
6. Enjoy the music and visualizations!

**Note**: Requires a modern browser (Chrome, Firefox, Safari, Edge)

### Method 2: Online Use (GitHub Pages)

If GitHub Pages is enabled for the repository, you can access the online version directly.

### Method 3: Local Development

For developers or users who want to customize features.

```bash
# 1. Clone the repository
git clone https://github.com/fuwei888/DAY-AI-STUDIO.git
cd DAY-AI-STUDIO

# 2. Install dependencies (optional, for local server only)
npm install

# 3. Start development server
npm start

# Browser will automatically open http://localhost:8080
```

## 📖 User Guide

### Basic Operations

1. **Load Music**: Click the "📁 Select Audio File" button
2. **Play/Pause**: Click the center play button ▶/⏸
3. **Switch Tracks**: Use ⏮ (previous) and ⏭ (next) buttons
4. **Adjust Volume**: Drag the volume slider 🔊
5. **Seek**: Click anywhere on the progress bar
6. **Change Visualization**: Select different modes from the dropdown

### Visualization Modes

- **Frequency Bars**: Classic audio spectrum display
- **Waveform**: Shows audio waveform pattern
- **Circular Spectrum**: Cool circular spectrum effect

### Supported Formats

- MP3, WAV, OGG, M4A
- Other browser-supported audio formats

## 🛠️ Developer Guide

### Build and Package

```bash
npm run build    # Build project
npm run package  # Create release package
```

### Release New Version

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## 📄 License

MIT License - See [LICENSE](LICENSE) file
