# 音者音频可视化音乐播放器

一个基于Web技术的现代化音频可视化音乐播放器，支持多种可视化效果。

## 功能特性

- 🎵 支持多种音频格式（MP3、WAV、OGG等）
- 🎨 三种可视化模式：
  - 频谱柱状图
  - 波形图
  - 圆形频谱
- 🎛️ 完整的播放控制（播放/暂停、上一曲/下一曲）
- 🔊 音量调节
- 📊 进度条控制
- 📱 响应式设计，支持移动设备
- 🌈 美观的渐变UI设计

## 在线使用

1. 下载发布包（Releases页面下载最新版本）
2. 解压文件
3. 用浏览器打开 `index.html` 文件
4. 点击"选择音频文件"按钮，选择您的音乐文件
5. 享受音乐和可视化效果！

## 本地开发

### 前置要求

- Node.js (推荐 v14 或更高版本)
- npm

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/fuwei888/DAY-AI-STUDIO.git
cd DAY-AI-STUDIO

# 安装依赖
npm install

# 启动本地开发服务器
npm start
```

服务器将在 `http://localhost:8080` 启动，浏览器会自动打开。

## 打包发布

```bash
# 构建项目
npm run build

# 创建发布包
npm run package
```

这将在项目根目录创建一个 `yinzhe-music-player-v1.0.0.zip` 文件，包含所有必要的文件。

## 使用说明

1. **选择音频文件**：点击"选择音频文件"按钮，可以选择一个或多个音频文件
2. **播放控制**：
   - ▶/⏸ - 播放/暂停
   - ⏮ - 上一曲
   - ⏭ - 下一曲
3. **调节音量**：使用音量滑块调整播放音量
4. **切换可视化模式**：在下拉菜单中选择不同的可视化效果
5. **进度控制**：点击进度条跳转到指定位置

## 技术栈

- HTML5
- CSS3 (渐变、动画、响应式设计)
- JavaScript (ES6+)
- Web Audio API (音频分析和可视化)
- Canvas API (图形渲染)

## 浏览器兼容性

- Chrome/Edge (推荐)
- Firefox
- Safari
- Opera

需要支持 Web Audio API 的现代浏览器。

## 许可证

MIT License

## 贡献

欢迎提交 Issues 和 Pull Requests！

## 作者

fuwei888

---

# Yinzhe Audio Visualization Music Player

A modern web-based audio visualization music player with multiple visualization effects.

## Features

- 🎵 Support for multiple audio formats (MP3, WAV, OGG, etc.)
- 🎨 Three visualization modes:
  - Frequency spectrum bars
  - Waveform
  - Circular spectrum
- 🎛️ Complete playback controls (play/pause, previous/next)
- 🔊 Volume adjustment
- 📊 Progress bar control
- 📱 Responsive design for mobile devices
- 🌈 Beautiful gradient UI design

## Quick Start

1. Download the release package (from Releases page)
2. Extract the files
3. Open `index.html` in your browser
4. Click "Select Audio File" button and choose your music files
5. Enjoy the music and visualizations!

## License

MIT
