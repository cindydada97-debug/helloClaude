# HappyPuppy.ai 项目结构文档

本文档详细说明HappyPuppy.ai项目的完整目录结构和文件组织方式。

## 📁 完整目录结构

```
happypuppy-ai/
├── index.html                      # 主入口文件
├── README.md                       # 项目说明文档
├── MVP.md                          # MVP需求文档
├── MODULE_GUIDE.md                 # 模块图文介绍文档
├── PROJECT_DESCRIPTION.md                       # Claude Code工作指南
├── PROJECT_STRUCTURE.md            # 本文档：项目结构说明
├── .gitignore                      # Git忽略文件配置
│
├── assets/                         # 静态资源目录
│   ├── logo/                       # Logo资源
│   │   ├── happypuppy-logo.svg    # 主Logo（SVG矢量图）
│   │   ├── happypuppy-logo.png    # 主Logo（PNG备用）
│   │   ├── favicon.ico            # 浏览器标签页图标
│   │   └── logo-placeholder.txt   # Logo设计需求说明
│   │
│   └── images/                     # 工具缩略图和其他图片
│       ├── nano-banana.png         # Nano Banana工具缩略图
│       ├── mandala.png             # Mandala工具缩略图
│       └── placeholder.svg         # 占位图（开发用）
│
├── hostModules/                        # 功能模块目录（Monorepo核心）
│   ├── navigation/                 # 导航栏模块
│   │   ├── navigation.html        # 导航栏HTML片段
│   │   ├── navigation.css         # 导航栏样式
│   │   └── navigation.js          # 导航栏交互逻辑
│   │
│   ├── hero/                       # 英雄区模块
│   │   ├── hero.html              # 英雄区HTML片段
│   │   ├── hero.css               # 英雄区样式
│   │   └── hero.js                # 搜索框交互逻辑
│   │
│   ├── tool-card/                  # 工具卡片组件
│   │   ├── tool-card.html         # 卡片HTML模板
│   │   ├── tool-card.css          # 卡片样式
│   │   └── tool-card.js           # 卡片渲染和交互逻辑
│   │
│   ├── search-results/             # 搜索结果模块
│   │   ├── search-results.html    # 搜索结果HTML片段
│   │   ├── search-results.css     # 搜索结果样式
│   │   └── search-results.js      # 搜索筛选逻辑
│   │
│   └── footer/                     # 页脚模块
│       ├── footer.html            # 页脚HTML片段
│       ├── footer.css             # 页脚样式
│       └── footer.js              # 页脚交互（可选）
│
├── tools/                          # 工具页面目录（独立工具）
│   ├── nano-banana/                # Nano Banana图像分类工具
│   │   ├── index.html             # 工具独立页面
│   │   ├── styles.css             # 工具样式
│   │   ├── app.js                 # 工具核心逻辑
│   │   ├── README.md              # 工具说明文档
│   │   └── assets/                # 工具专属资源
│   │       └── demo-images/       # 演示图片
│   │
│   └── mandala/                    # Mandala拔曼陀罗游戏
│       ├── index.html             # 游戏页面
│       ├── styles.css             # 游戏样式
│       ├── app.js                 # 游戏逻辑
│       ├── README.md              # 游戏说明
│       └── assets/                # 游戏资源
│           ├── mandala-patterns/  # 曼陀罗图案
│           └── sounds/            # 音效文件（可选）
│
├── data/                           # 数据文件目录
│   └── tools.json                 # 工具数据库（JSON格式）
│
└── scripts/                        # 全局脚本目录
    ├── main.js                    # 主应用逻辑
    ├── router.js                  # 路由管理（可选）
    ├── utils.js                   # 工具函数库
    └── config.js                  # 全局配置
```

---

## 📄 文件说明

### 根目录文件

| 文件名 | 用途 | 优先级 |
|-------|------|--------|
| `index.html` | 主入口页面，集成所有模块 | **P0** |
| `README.md` | 项目说明、安装和使用指南 | **P1** |
| `MVP.md` | MVP需求文档 | **P1** |
| `MODULE_GUIDE.md` | 模块开发指南 | **P1** |
| `CLAUDE.md` | Claude Code工作指南 | **P2** |
| `PROJECT_STRUCTURE.md` | 本文档 | **P2** |
| `.gitignore` | Git版本控制忽略配置 | **P1** |

### assets/ 目录

#### assets/logo/
- **happypuppy-logo.svg**: 主Logo矢量图，用于导航栏和页面标题
- **happypuppy-logo.png**: PNG格式备用Logo（1024x1024）
- **favicon.ico**: 浏览器标签页小图标（32x32）
- **logo-placeholder.txt**: Logo设计需求说明

#### assets/images/
- **nano-banana.png**: Nano Banana工具的缩略图（400x300）
- **mandala.png**: Mandala游戏的缩略图（400x300）
- **placeholder.svg**: 开发阶段使用的占位图

---

### modules/ 目录

#### 模块1: navigation/（导航栏）

**navigation.html**
```html
<!-- 导航栏HTML片段，用于插入index.html -->
<nav class="navigation">
  <!-- 导航栏内容 -->
</nav>
```

**navigation.css**
```css
/* ==========================================================================
   导航栏样式 (Navigation Styles)
   用途: 顶部固定导航、分类链接、Logo展示
   依赖: TailwindCSS (基础样式), Font Awesome (图标)
   ========================================================================== */
```

**navigation.js**
```javascript
/**
 * 导航栏模块
 * 职责:
 * - 分类筛选交互
 * - 移动端汉堡菜单
 * - Active状态管理
 */
class NavigationModule { }
```

#### 模块2: hero/（英雄区）

**hero.html**
```html
<!-- 英雄区HTML片段 -->
<section class="hero">
  <!-- 标题和搜索框 -->
</section>
```

**hero.css**
```css
/* ==========================================================================
   英雄区样式 (Hero Section Styles)
   用途: 主标题、搜索框、背景装饰
   特效: 玻璃态、勾线网格、光晕效果
   ========================================================================== */
```

**hero.js**
```javascript
/**
 * 英雄区模块
 * 职责:
 * - 搜索框交互（实时搜索、防抖）
 * - 键盘快捷键（Cmd+K / Ctrl+K）
 * - 搜索建议下拉
 */
class HeroSearchBox { }
```

#### 模块3: tool-card/（工具卡片）

**tool-card.html**
```html
<!-- 工具卡片模板（使用<template>标签） -->
<template id="tool-card-template">
  <article class="tool-card">
    <!-- 卡片内容 -->
  </article>
</template>
```

**tool-card.css**
```css
/* ==========================================================================
   工具卡片样式 (Tool Card Styles)
   用途: 工具展示卡片
   特性: 玻璃态、分类色渐变、Hover动画
   变量: --category-color, --category-glow
   ========================================================================== */
```

**tool-card.js**
```javascript
/**
 * 工具卡片组件
 * 职责:
 * - 根据数据渲染卡片
 * - 卡片点击跳转
 * - 分类颜色映射
 */
function createToolCard(tool) { }
```

#### 模块4: search-results/（搜索结果）

**search-results.html**
```html
<!-- 搜索结果区域HTML片段 -->
<section class="search-results">
  <div class="tool-grid"></div>
  <div class="no-results"></div>
</section>
```

**search-results.css**
```css
/* ==========================================================================
   搜索结果样式 (Search Results Styles)
   用途: 工具网格布局、结果统计、无结果状态
   响应式: 1-4列自适应网格
   ========================================================================== */
```

**search-results.js**
```javascript
/**
 * 搜索结果管理器
 * 职责:
 * - 监听搜索事件
 * - 过滤和渲染工具列表
 * - 无结果状态处理
 */
class SearchResultsManager { }
```

#### 模块5: footer/（页脚）

**footer.html**
```html
<!-- 页脚HTML片段 -->
<footer class="footer">
  <!-- 版权信息和链接 -->
</footer>
```

**footer.css**
```css
/* ==========================================================================
   页脚样式 (Footer Styles)
   用途: 版权信息、链接、品牌标识
   ========================================================================== */
```

**footer.js**
```javascript
/**
 * 页脚模块（可选）
 * 职责: 动态年份更新等
 */
```

---

### tools/ 目录

#### tools/nano-banana/（Nano Banana工具）

**index.html**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <title>Nano Banana - 图像分类工具 | HappyPuppy.ai</title>
  <!-- 独立工具页面 -->
</head>
<body>
  <!-- 工具界面 -->
</body>
</html>
```

**styles.css**
```css
/* Nano Banana工具专属样式 */
/* 继承主站设计风格，添加工具特有样式 */
```

**app.js**
```javascript
/**
 * Nano Banana核心逻辑
 * 功能:
 * - 图像上传和预览
 * - AI分类识别（模拟或API调用）
 * - 结果展示和导出
 */
```

**README.md**
```markdown
# Nano Banana - 图像分类工具

## 功能说明
基于AI的智能图像分类工具...

## 使用方法
1. 上传图片
2. 等待识别
3. 查看结果
```

#### tools/mandala/（Mandala游戏）

**index.html**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <title>Mandala - 拔曼陀罗 | HappyPuppy.ai</title>
</head>
<body>
  <!-- 游戏界面 -->
</body>
</html>
```

**styles.css**
```css
/* Mandala游戏专属样式 */
/* Canvas绘图、动画效果等 */
```

**app.js**
```javascript
/**
 * Mandala游戏核心逻辑
 * 功能:
 * - Canvas绘制曼陀罗图案
 * - 拔除交互（点击/拖动）
 * - 音效和视觉反馈
 */
```

---

### data/ 目录

#### data/tools.json

```json
{
  "tools": [
    {
      "id": "nano-banana",
      "name": "Nano Banana",
      "nameEn": "Nano Banana",
      "category": "图像",
      "categoryEn": "Image",
      "description": "基于AI的智能图像分类工具，快速识别和标注图片内容",
      "descriptionEn": "AI-powered image classification tool",
      "icon": "fa-image",
      "thumbnail": "/assets/images/nano-banana.png",
      "color": "blue",
      "tags": ["AI", "图像处理", "分类"],
      "route": "/tools/nano-banana/",
      "featured": true
    },
    {
      "id": "mandala",
      "name": "Mandala",
      "nameEn": "Mandala Garden",
      "category": "游戏",
      "categoryEn": "Gaming",
      "description": "放松身心的拔曼陀罗小游戏，在禅意花园中获得平静",
      "descriptionEn": "Relaxing mandala pulling game",
      "icon": "fa-spa",
      "thumbnail": "/assets/images/mandala.png",
      "color": "purple",
      "tags": ["休闲", "解压", "禅意"],
      "route": "/tools/mandala/",
      "featured": true
    }
  ],
  "categories": [
    {
      "id": "programming",
      "name": "编程",
      "nameEn": "Programming",
      "icon": "fa-code",
      "color": "blue"
    },
    {
      "id": "productivity",
      "name": "效率",
      "nameEn": "Productivity",
      "icon": "fa-bolt",
      "color": "green"
    },
    {
      "id": "image",
      "name": "图像",
      "nameEn": "Image",
      "icon": "fa-image",
      "color": "purple"
    },
    {
      "id": "office",
      "name": "办公",
      "nameEn": "Office",
      "icon": "fa-briefcase",
      "color": "orange"
    },
    {
      "id": "gaming",
      "name": "游戏",
      "nameEn": "Gaming",
      "icon": "fa-gamepad",
      "color": "pink"
    }
  ]
}
```

---

### scripts/ 目录

#### scripts/main.js

```javascript
/**
 * 主应用逻辑
 * 职责:
 * - 初始化所有模块
 * - 加载工具数据
 * - 全局事件监听
 */

// 应用入口
document.addEventListener('DOMContentLoaded', async () => {
  // 初始化各模块
  await initApp();
});

async function initApp() {
  // 加载工具数据
  // 初始化导航
  // 初始化搜索
  // 初始化结果展示
}
```

#### scripts/router.js

```javascript
/**
 * 路由管理（可选）
 * 职责:
 * - URL参数解析（?category=image）
 * - 前端路由跳转
 * - 历史记录管理
 */
class Router {
  constructor() {
    this.routes = {};
  }

  route(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }
}
```

#### scripts/utils.js

```javascript
/**
 * 工具函数库
 * 包含:
 * - 防抖/节流函数
 * - 日期格式化
 * - URL参数解析
 * - LocalStorage封装
 */

// 防抖函数
function debounce(func, delay) { }

// 节流函数
function throttle(func, delay) { }

// 获取URL参数
function getUrlParam(key) { }

// 格式化日期
function formatDate(date) { }
```

#### scripts/config.js

```javascript
/**
 * 全局配置
 */
const CONFIG = {
  // API配置（如果有后端）
  API_BASE_URL: '',

  // CDN配置
  CDN: {
    tailwind: 'https://cdn.tailwindcss.com',
    fontAwesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    chartJs: 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
  },

  // 搜索配置
  SEARCH: {
    debounceDelay: 300, // 搜索防抖延迟（毫秒）
    minQueryLength: 1,  // 最小搜索字符数
  },

  // 分类颜色映射
  CATEGORY_COLORS: {
    programming: { primary: '#3B82F6', glow: 'rgba(59, 130, 246, 0.2)' },
    productivity: { primary: '#10B981', glow: 'rgba(16, 185, 129, 0.2)' },
    image: { primary: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.2)' },
    office: { primary: '#F59E0B', glow: 'rgba(245, 158, 11, 0.2)' },
    gaming: { primary: '#EC4899', glow: 'rgba(236, 72, 153, 0.2)' }
  }
};
```

---

## 🔄 模块依赖关系

```
index.html (主入口)
  │
  ├─► modules/navigation/ (导航栏)
  │     └─► scripts/main.js
  │
  ├─► modules/hero/ (英雄区)
  │     └─► scripts/main.js
  │     └─► modules/search-results/ (触发搜索)
  │
  ├─► modules/search-results/ (搜索结果)
  │     └─► modules/tool-card/ (渲染卡片)
  │     └─► data/tools.json (数据源)
  │
  ├─► modules/tool-card/ (工具卡片组件)
  │     └─► data/tools.json
  │
  └─► modules/footer/ (页脚)

tools/nano-banana/index.html (独立工具页面)
  └─► assets/images/
  └─► tools/nano-banana/app.js

tools/mandala/index.html (独立游戏页面)
  └─► assets/images/
  └─► tools/mandala/app.js
```

---

## 📦 资源加载顺序

### index.html 加载顺序

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!-- 1. 基础Meta -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HappyPuppy.ai - 个人工具站</title>

  <!-- 2. 外部CDN（预加载） -->
  <link rel="preconnect" href="https://cdn.tailwindcss.com">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">

  <!-- 3. 图标和字体 -->
  <link rel="icon" href="/assets/logo/favicon.ico">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet">

  <!-- 4. TailwindCSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- 5. 模块样式（按加载顺序） -->
  <link rel="stylesheet" href="/modules/navigation/navigation.css">
  <link rel="stylesheet" href="/modules/hero/hero.css">
  <link rel="stylesheet" href="/modules/tool-card/tool-card.css">
  <link rel="stylesheet" href="/modules/search-results/search-results.css">
  <link rel="stylesheet" href="/modules/footer/footer.css">
</head>
<body>
  <!-- 页面内容 -->

  <!-- 6. 全局脚本 -->
  <script src="/scripts/config.js"></script>
  <script src="/scripts/utils.js"></script>
  <script src="/scripts/router.js"></script>

  <!-- 7. 模块脚本 -->
  <script src="/modules/navigation/navigation.js"></script>
  <script src="/modules/hero/hero.js"></script>
  <script src="/modules/tool-card/tool-card.js"></script>
  <script src="/modules/search-results/search-results.js"></script>
  <script src="/modules/footer/footer.js"></script>

  <!-- 8. 主应用逻辑（最后加载） -->
  <script src="/scripts/main.js"></script>
</body>
</html>
```

---

## 🚀 开发流程

### Phase 1: 基础搭建
1. 创建目录结构 ✓
2. 创建配置文件 ✓
3. 准备占位资源 ✓

### Phase 2: 数据层
1. 编写 `data/tools.json`
2. 编写 `scripts/config.js`
3. 编写 `scripts/utils.js`

### Phase 3: 组件开发（按优先级）
1. **P0**: `modules/tool-card/` (最基础组件)
2. **P0**: `modules/navigation/`
3. **P1**: `modules/hero/`
4. **P1**: `modules/search-results/`
5. **P2**: `modules/footer/`

### Phase 4: 主页集成
1. 编写 `index.html`
2. 编写 `scripts/main.js`
3. 集成所有模块

### Phase 5: 工具页面
1. 开发 `tools/nano-banana/`
2. 开发 `tools/mandala/`

### Phase 6: 测试优化
1. 跨浏览器测试
2. 响应式测试
3. 性能优化

---

## 📝 命名规范

### CSS类命名（BEM规范）
```css
/* 块（Block） */
.tool-card { }

/* 元素（Element） */
.tool-card__title { }
.tool-card__icon { }

/* 修饰符（Modifier） */
.tool-card--featured { }
.tool-card__category--blue { }
```

### JavaScript命名
```javascript
// 类名：PascalCase
class SearchResultsManager { }

// 函数名：camelCase
function createToolCard() { }

// 常量：UPPER_SNAKE_CASE
const API_BASE_URL = '';

// 变量：camelCase
let toolData = [];
```

### 文件命名
- HTML: `kebab-case.html` (例: `search-results.html`)
- CSS: `kebab-case.css` (例: `tool-card.css`)
- JavaScript: `kebab-case.js` (例: `main.js`)
- 数据文件: `kebab-case.json` (例: `tools.json`)

---

## 🔧 开发工具推荐

### 本地开发服务器
```bash
# 使用Python (自带)
python -m http.server 8000

# 使用Node.js
npx serve .

# 使用VS Code插件
Live Server (Five Server)
```

### 浏览器扩展
- **Web Developer** - 快速禁用CSS/JS调试
- **ColorZilla** - 取色器
- **WhatFont** - 字体识别

---

## 📊 文件大小预估

| 文件类型 | 数量 | 单文件大小 | 总大小 |
|---------|------|-----------|--------|
| HTML | 8 | 5-20KB | ~80KB |
| CSS | 5 | 10-30KB | ~100KB |
| JavaScript | 8 | 5-15KB | ~80KB |
| JSON | 1 | 5KB | ~5KB |
| Images (PNG) | 3 | 50-200KB | ~400KB |
| Logo (SVG) | 1 | 5KB | ~5KB |
| **总计** | **26** | - | **~670KB** |

*注：不含外部CDN资源*

---

## 🎯 下一步行动

1. ✅ 创建目录结构
2. ⏭️ 创建占位文件和资源
3. ⏭️ 编写数据文件 `tools.json`
4. ⏭️ 开发第一个模块（工具卡片）
5. ⏭️ 逐步集成其他模块
6. ⏭️ 创建主入口 `index.html`

---

**文档版本**: v1.0
**创建日期**: 2025-10-07
**维护者**: HappyPuppy.ai Team