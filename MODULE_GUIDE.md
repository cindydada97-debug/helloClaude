# HappyPuppy.ai 模块图文介绍

本文档提供HappyPuppy.ai各功能模块的详细图文说明，帮助开发者理解每个模块的设计思路、视觉效果和实现方式。

---

## 目录

1. [导航栏模块 (Navigation)](#1-导航栏模块-navigation)
2. [英雄区模块 (Hero Section)](#2-英雄区模块-hero-section)
3. [工具卡片模块 (Tool Card)](#3-工具卡片模块-tool-card)
4. [搜索结果模块 (Search Results)](#4-搜索结果模块-search-results)
5. [页脚模块 (Footer)](#5-页脚模块-footer)

---

## 1. 导航栏模块 (Navigation)

### 📋 模块概述

导航栏是用户访问站点时首先看到的关键元素，承担品牌展示和功能导航的双重职责。采用固定定位，始终停留在页面顶部，为用户提供稳定的导航入口。

### 🎨 视觉设计

```
┌─────────────────────────────────────────────────────────────────┐
│  [🐕 HappyPuppy.ai]    编程  效率  图像  办公  游戏    [🔍]     │
│                       Programming Productivity Image...          │
└─────────────────────────────────────────────────────────────────┘
```

**设计特点**：
- **玻璃态效果**：半透明背景 + 背景模糊 (backdrop-filter: blur(20px))
- **悬浮感**：底部细线边框 (rgba(255,255,255,0.08))
- **分区布局**：左中右三区域（Logo / 分类导航 / 工具按钮）

### 🖼️ 视觉示意图

```
┌────────────────────────────────────────────────────────────────────┐
│                        深色半透明背景 (#0A0A0F, 80% opacity)         │
│  ┌──────┐                                                            │
│  │ 🐕   │  HappyPuppy.ai                                             │
│  │科技狗│  ↑ 中文粗体 (font-weight: 700, 18px)                       │
│  └──────┘  PERSONAL TOOL STATION                                    │
│            ↑ 英文小字 (font-weight: 300, 10px, uppercase)            │
│                                                                      │
│            ┌───────┬──────┬──────┬──────┬──────┐         ┌────┐    │
│            │ 编程  │ 效率 │ 图像 │ 办公 │ 游戏 │         │ 🔍 │    │
│            │Program│Produc│Image │Office│Gaming│         └────┘    │
│            └───────┴──────┴──────┴──────┴──────┘                    │
│               ↑ Hover时显示彩色下划线（对应分类颜色）                 │
└────────────────────────────────────────────────────────────────────┘
                            ↑
                    细线边框 (1px solid rgba(255,255,255,0.08))
```

### 📐 布局结构

```html
<nav class="navigation">
  <!-- 左侧: Logo区域 -->
  <div class="navigation__logo">
    <img src="logo.svg" alt="HappyPuppy.ai" class="logo-icon">
    <div class="logo-text">
      <h1>HappyPuppy.ai</h1>
      <span>PERSONAL TOOL STATION</span>
    </div>
  </div>

  <!-- 中央: 分类导航 -->
  <ul class="navigation__categories">
    <li><a href="?category=programming" class="category-link" data-color="blue">
      <span class="category-name">编程</span>
      <span class="category-name-en">Programming</span>
    </a></li>
    <!-- ... 其他分类 ... -->
  </ul>

  <!-- 右侧: 工具按钮 -->
  <div class="navigation__actions">
    <button class="search-trigger">
      <i class="fa-solid fa-search"></i>
    </button>
  </div>
</nav>
```

### 🎭 交互状态

**分类链接状态**：

1. **默认状态**：
   - 文字颜色：`rgba(255, 255, 255, 0.6)`
   - 无下划线

2. **Hover状态**：
   - 文字颜色：`rgba(255, 255, 255, 1)`
   - 出现细线下划线（对应分类颜色）

3. **Active状态**：
   - 文字颜色：`rgba(255, 255, 255, 1)`
   - 下划线加粗（2px，对应分类颜色）
   - 下划线从中心展开动画

```css
/* 分类颜色映射 */
[data-color="blue"]::after { background: #3B82F6; }
[data-color="green"]::after { background: #10B981; }
[data-color="purple"]::after { background: #8B5CF6; }
[data-color="orange"]::after { background: #F59E0B; }
[data-color="pink"]::after { background: #EC4899; }
```

### 📱 响应式适配

| 屏幕尺寸 | 布局变化 |
|---------|---------|
| **1920px+** | 完整显示，最大宽度1440px居中 |
| **1024px-1920px** | 分类间距缩小至1.5rem |
| **640px-1024px** | 隐藏分类导航，显示汉堡菜单 |
| **<640px** | Logo文字缩小，仅显示图标搜索按钮 |

### 🔧 关键CSS类

```css
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem 2rem;
}

.navigation__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
}

.logo-text h1 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
}

.logo-text span {
  font-size: 0.625rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.navigation__categories {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.category-link {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;
}

.category-link:hover {
  color: rgba(255, 255, 255, 1);
}

.category-name {
  font-size: 1rem;
  font-weight: 600;
}

.category-name-en {
  font-size: 0.75rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Active状态下划线 */
.category-link--active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--category-color);
  transform: scaleX(1);
  animation: underlineExpand 0.3s ease;
}

@keyframes underlineExpand {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
```

---

## 2. 英雄区模块 (Hero Section)

### 📋 模块概述

英雄区是页面的视觉焦点，占据页面中央位置。包含站点主标题、副标题和核心搜索框，是用户开始探索工具的起点。

### 🎨 视觉设计

```
                    ┌──────────────────────┐
                    │                      │
                    │   HappyPuppy.ai      │ ← 超大中文标题 (72px, 粗体)
                    │                      │
                    │  YOUR PERSONAL TOOL  │ ← 英文副标题 (16px, 细体)
                    │      STATION         │
                    │                      │
                    │  ┌──────────────┐   │
                    │  │ 🔍 搜索工具... │   │ ← 搜索框
                    │  │              ⌘K │   │
                    │  └──────────────┘   │
                    │                      │
                    └──────────────────────┘
```

### 🖼️ 视觉示意图

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                                                                │
│                      勾线背景图案（网格）                        │
│                   ┌─────────────────────┐                      │
│                   │                     │                      │
│                   │  🐕 HappyPuppy.ai   │ ← 72px, 粗体900      │
│                   │                     │                      │
│                   │  背景渐变光晕效果     │ ← 蓝色到透明渐变     │
│                   │  (从文字向外扩散)    │                      │
│                   │                     │                      │
│                   │ YOUR PERSONAL TOOL  │ ← 16px, 细体300      │
│                   │      STATION        │   字间距加宽         │
│                   │                     │                      │
│                   │  ╔═══════════════╗  │                      │
│                   │  ║ 🔍 搜索工具... ║  │ ← 玻璃态搜索框       │
│                   │  ║                ║  │   (半透明+模糊)     │
│                   │  ║            ⌘K  ║  │                      │
│                   │  ╚═══════════════╝  │                      │
│                   │                     │                      │
│                   │  (聚焦时边框发光)   │ ← 蓝色高亮边框       │
│                   │                     │                      │
│                   └─────────────────────┘                      │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 📐 布局结构

```html
<section class="hero">
  <!-- 背景装饰 -->
  <div class="hero__background">
    <div class="hero__grid-pattern"></div>
    <div class="hero__glow"></div>
  </div>

  <!-- 内容区域 -->
  <div class="hero__content">
    <!-- 主标题 -->
    <h1 class="hero__title">
      HappyPuppy.ai
      <span class="hero__title-glow"></span>
    </h1>

    <!-- 副标题 -->
    <p class="hero__subtitle">
      YOUR PERSONAL TOOL STATION
    </p>

    <!-- 搜索框 -->
    <div class="hero__search">
      <div class="search-box">
        <i class="fa-solid fa-search search-box__icon"></i>
        <input
          type="text"
          id="search-input"
          class="search-box__input"
          placeholder="搜索工具... / Search tools..."
          autocomplete="off"
        >
        <kbd class="search-box__shortcut">
          <span class="key">⌘</span>
          <span class="key">K</span>
        </kbd>
      </div>

      <!-- 搜索建议下拉 -->
      <div class="search-suggestions" id="search-suggestions">
        <!-- 动态生成 -->
      </div>
    </div>
  </div>
</section>
```

### 🎭 搜索框交互状态

**1. 默认状态**：
```
┌─────────────────────────────────────┐
│ 🔍  搜索工具... / Search tools...  ⌘K │
└─────────────────────────────────────┘
- 边框: rgba(255,255,255,0.08)
- 背景: rgba(255,255,255,0.03)
```

**2. Focus状态**：
```
╔═════════════════════════════════════╗
║ 🔍  [光标闪烁]                    ⌘K ║
╚═════════════════════════════════════╝
- 边框: #3B82F6 (蓝色高亮, 2px)
- 背景: rgba(255,255,255,0.05)
- 外发光: 0 0 20px rgba(59,130,246,0.3)
```

**3. 输入状态**：
```
┌─────────────────────────────────────┐
│ 🔍  nano                          🗙  │ ← 显示清除按钮
├─────────────────────────────────────┤
│ 搜索建议:                            │
│  📷 Nano Banana  (图像分类)          │
│  ⚡ Nano Editor  (代码编辑器)        │
└─────────────────────────────────────┘
```

### 🌈 背景装饰元素

**勾线网格图案**：
```css
.hero__grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.5;
}
```

**光晕效果**：
```css
.hero__glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.15) 0%,
    transparent 70%
  );
  filter: blur(80px);
  pointer-events: none;
}
```

### 🔧 关键CSS类

```css
/* ========================================================================
   英雄区样式 (Hero Section Styles)
   ======================================================================== */

.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 4rem;
  overflow: hidden;
}

/**
 * 背景装饰容器
 * - 绝对定位，覆盖整个英雄区
 * - z-index较低，不影响内容交互
 */
.hero__background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

/**
 * 主标题
 * - 超大字号，粗体
 * - 文字渐变效果（可选）
 */
.hero__title {
  font-size: 4.5rem; /* 72px */
  font-weight: 900;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
}

/* 标题发光效果（可选） */
.hero__title-glow {
  position: absolute;
  inset: 0;
  background: inherit;
  filter: blur(40px);
  opacity: 0.3;
  z-index: -1;
}

/**
 * 副标题
 * - 小字号，细体
 * - 大写字母，字间距加宽
 */
.hero__subtitle {
  font-size: 1rem; /* 16px */
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 3rem;
}

/**
 * 搜索框容器
 * - 最大宽度限制，居中显示
 */
.hero__search {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

/**
 * 搜索框主体
 * - 玻璃态效果
 * - 圆角大，内边距宽松
 */
.search-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.search-box:focus-within {
  background: rgba(255, 255, 255, 0.05);
  border-color: #3B82F6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1),
              0 0 20px rgba(59, 130, 246, 0.3);
}

/**
 * 搜索图标
 */
.search-box__icon {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
}

/**
 * 搜索输入框
 * - 无边框，透明背景
 * - 占据剩余空间
 */
.search-box__input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  color: #FFFFFF;
  font-family: 'Noto Sans SC', 'Inter', sans-serif;
}

.search-box__input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

/**
 * 快捷键提示
 * - 键盘按键样式
 */
.search-box__shortcut {
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
}

.search-box__shortcut .key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'SF Mono', 'Monaco', monospace;
}

/**
 * 搜索建议下拉框
 * - 绝对定位在搜索框下方
 * - 初始隐藏，有输入时显示
 */
.search-suggestions {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: rgba(19, 19, 24, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  padding: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
}

.search-suggestions.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* 响应式 */
@media (max-width: 768px) {
  .hero__title {
    font-size: 3rem; /* 48px */
  }

  .hero__subtitle {
    font-size: 0.875rem; /* 14px */
  }

  .search-box {
    padding: 0.875rem 1rem;
  }
}
```

### ⚡ JavaScript交互逻辑

```javascript
/**
 * 搜索框交互管理
 */
class HeroSearchBox {
  constructor() {
    this.input = document.getElementById('search-input');
    this.suggestions = document.getElementById('search-suggestions');
    this.debounceTimer = null;
  }

  init() {
    // 监听输入事件
    this.input.addEventListener('input', (e) => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.handleSearch(e.target.value);
      }, 300);
    });

    // 键盘快捷键 Cmd+K / Ctrl+K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.input.focus();
      }

      // ESC键清空搜索
      if (e.key === 'Escape') {
        this.input.value = '';
        this.hideSuggestions();
      }
    });

    // 点击外部关闭建议框
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.hero__search')) {
        this.hideSuggestions();
      }
    });
  }

  handleSearch(query) {
    if (!query.trim()) {
      this.hideSuggestions();
      return;
    }

    // 触发全局搜索事件
    window.dispatchEvent(new CustomEvent('search', {
      detail: { query }
    }));

    // 显示搜索建议（可选功能）
    this.showSuggestions(query);
  }

  showSuggestions(query) {
    // TODO: 实现建议逻辑
    this.suggestions.classList.add('active');
  }

  hideSuggestions() {
    this.suggestions.classList.remove('active');
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  const heroSearch = new HeroSearchBox();
  heroSearch.init();
});
```

---

## 3. 工具卡片模块 (Tool Card)

### 📋 模块概述

工具卡片是展示单个工具的核心组件，采用卡片式设计，包含工具的关键信息：图标、名称、分类、描述和标签。卡片具有丰富的交互效果和视觉反馈。

### 🎨 视觉设计

```
┌─────────────────────────────────┐
│  ╔═══╗                          │ ← 背景高亮渐变（分类色）
│  ║   ║  Nano Banana              │ ← 中文粗体 (24px)
│  ║ 🖼 ║  NANO BANANA              │ ← 英文细体 (12px)
│  ╚═══╝                          │
│       [图像]                     │ ← 分类标签（彩色）
│                                  │
│  基于AI的智能图像分类工具         │ ← 描述文字
│  快速识别和标注图片内容           │
│                                  │
│  #AI  #图像处理  #分类           │ ← 标签组
│                              →   │ ← Hover时显示箭头
└─────────────────────────────────┘
```

### 🖼️ 视觉示意图

**默认状态**：
```
┌────────────────────────────────────────┐
│ ╔══════╗                               │
│ ║      ║  蓝色渐变光晕                  │ ← 从左上角向右下渐变
│ ║      ║  (rgba(59,130,246,0.15) → 0) │   半透明，不覆盖内容
│ ╚══════╝                               │
│                                        │
│  ┌────────┐                            │
│  │  🖼️   │  Nano Banana               │ ← 工具缩略图 (80x80)
│  │        │  ↑ 粗体 700, 24px          │
│  └────────┘                            │
│             NANO BANANA                │ ← 细体 300, 12px, 大写
│                                        │
│  ┌──────────┐                          │
│  │ 🖼️ 图像  │ ← 分类标签               │
│  └──────────┘   (蓝色背景, 圆角)       │
│                                        │
│  基于AI的智能图像分类工具，              │ ← 描述 (14px)
│  快速识别和标注图片内容                 │   灰色文字
│                                        │
│  ┌────┐ ┌────────┐ ┌────┐             │
│  │ AI │ │图像处理│ │分类│             │ ← 标签 (小圆角)
│  └────┘ └────────┘ └────┘             │   半透明背景
│                                        │
└────────────────────────────────────────┘
  ↑ 边框: rgba(255,255,255,0.08), 1px
```

**Hover状态**：
```
╔════════════════════════════════════════╗ ← 边框变为蓝色高亮 (2px)
║ ╔══════╗                               ║
║ ║      ║  光晕增强                      ║
║ ║      ║  (rgba(59,130,246,0.3) → 0)  ║
║ ╚══════╝                               ║
║                                        ║
║  ┌────────┐                            ║
║  │  🖼️   │  Nano Banana               ║
║  │        │                            ║
║  └────────┘                            ║
║             NANO BANANA                ║
║                                        ║
║  [图像]                                ║
║                                        ║
║  基于AI的智能图像分类工具，              ║
║  快速识别和标注图片内容                 ║
║                                        ║
║  #AI  #图像处理  #分类                 ║
║                                    ➜   ║ ← 箭头出现
╚════════════════════════════════════════╝
     ↑ 卡片上浮 4px (translateY: -4px)
     ↑ 外阴影: 0 8px 24px rgba(59,130,246,0.2)
```

### 📐 布局结构

```html
<article class="tool-card" data-tool-id="nano-banana" data-category="image">
  <!-- 背景渐变光晕 -->
  <div class="tool-card__glow tool-card__glow--blue"></div>

  <!-- 卡片内容 -->
  <div class="tool-card__content">
    <!-- 工具图标区域 -->
    <div class="tool-card__header">
      <div class="tool-card__icon">
        <img src="/assets/images/nano-banana.png" alt="Nano Banana" loading="lazy">
      </div>
    </div>

    <!-- 工具信息区域 -->
    <div class="tool-card__info">
      <!-- 标题组 -->
      <div class="tool-card__title-group">
        <h3 class="tool-card__title">Nano Banana</h3>
        <p class="tool-card__subtitle">NANO BANANA</p>
      </div>

      <!-- 分类标签 -->
      <div class="tool-card__meta">
        <span class="tool-card__category tool-card__category--blue">
          <i class="fa-solid fa-image"></i>
          <span>图像</span>
        </span>
      </div>

      <!-- 描述 -->
      <p class="tool-card__description">
        基于AI的智能图像分类工具，快速识别和标注图片内容
      </p>

      <!-- 标签组 -->
      <div class="tool-card__tags">
        <span class="tag">AI</span>
        <span class="tag">图像处理</span>
        <span class="tag">分类</span>
      </div>
    </div>
  </div>

  <!-- Hover箭头 -->
  <div class="tool-card__arrow">
    <i class="fa-solid fa-arrow-right"></i>
  </div>
</article>
```

### 🎨 分类颜色系统

| 分类 | 颜色 | 渐变起始 | 图标 |
|-----|------|---------|------|
| **编程** | 蓝色 | `rgba(59, 130, 246, 0.15)` | `fa-code` |
| **效率** | 绿色 | `rgba(16, 185, 129, 0.15)` | `fa-bolt` |
| **图像** | 紫色 | `rgba(139, 92, 246, 0.15)` | `fa-image` |
| **办公** | 橙色 | `rgba(245, 158, 11, 0.15)` | `fa-briefcase` |
| **游戏** | 粉色 | `rgba(236, 72, 153, 0.15)` | `fa-gamepad` |

### 🔧 关键CSS类

```css
/* ========================================================================
   工具卡片样式 (Tool Card Styles)
   ======================================================================== */

/**
 * 卡片容器
 * - 玻璃态效果
 * - 相对定位，为内部绝对定位元素提供参考
 * - 圆角大，视觉柔和
 */
.tool-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

/**
 * Hover状态
 * - 边框高亮（分类颜色）
 * - 上浮效果
 * - 外发光阴影
 */
.tool-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--category-color);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--category-glow);
}

/**
 * Active按下状态
 * - 轻微缩小
 */
.tool-card:active {
  transform: translateY(-2px) scale(0.98);
}

/**
 * 背景渐变光晕
 * - 绝对定位在左上角
 * - 从分类颜色渐变到透明
 * - 不影响内容可读性
 */
.tool-card__glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.tool-card:hover .tool-card__glow {
  opacity: 0.8;
}

/* 分类颜色光晕 */
.tool-card__glow--blue {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
}

.tool-card__glow--green {
  background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
}

.tool-card__glow--purple {
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
}

.tool-card__glow--orange {
  background: radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%);
}

.tool-card__glow--pink {
  background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
}

/**
 * 卡片内容容器
 * - 相对定位，覆盖在光晕之上
 */
.tool-card__content {
  position: relative;
  z-index: 1;
}

/**
 * 工具图标
 * - 圆角方形容器
 * - 固定尺寸
 */
.tool-card__icon {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 1.5rem;
}

.tool-card__icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/**
 * 标题组
 */
.tool-card__title {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 0.25rem 0;
}

.tool-card__subtitle {
  font-size: 0.75rem; /* 12px */
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 1rem 0;
}

/**
 * 分类标签
 * - 内联flex布局
 * - 分类颜色背景
 * - 圆角胶囊形状
 */
.tool-card__category {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.tool-card__category--blue {
  background: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.tool-card__category--green {
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.tool-card__category--purple {
  background: rgba(139, 92, 246, 0.15);
  color: #A78BFA;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.tool-card__category--orange {
  background: rgba(245, 158, 11, 0.15);
  color: #FBBF24;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.tool-card__category--pink {
  background: rgba(236, 72, 153, 0.15);
  color: #F472B6;
  border: 1px solid rgba(236, 72, 153, 0.3);
}

/**
 * 描述文字
 * - 两行截断（可选）
 */
.tool-card__description {
  font-size: 0.875rem; /* 14px */
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin: 0 0 1rem 0;

  /* 两行省略（可选） */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/**
 * 标签组
 * - 横向排列
 * - 自动换行
 */
.tool-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tool-card__tags .tag {
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

/**
 * Hover箭头
 * - 初始隐藏在右侧外部
 * - Hover时滑入
 */
.tool-card__arrow {
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%) translateX(20px);
  opacity: 0;
  transition: all 0.3s ease;
  color: var(--category-color);
  font-size: 1.5rem;
}

.tool-card:hover .tool-card__arrow {
  transform: translateY(-50%) translateX(0);
  opacity: 1;
}

/* 响应式 */
@media (max-width: 768px) {
  .tool-card {
    padding: 1.5rem;
  }

  .tool-card__icon {
    width: 60px;
    height: 60px;
  }

  .tool-card__title {
    font-size: 1.25rem; /* 20px */
  }
}
```

### 🔌 JavaScript渲染函数

```javascript
/**
 * 创建工具卡片元素
 * @param {Object} tool - 工具数据对象
 * @returns {HTMLElement} - 卡片DOM元素
 */
function createToolCard(tool) {
  const card = document.createElement('article');
  card.className = 'tool-card';
  card.setAttribute('data-tool-id', tool.id);
  card.setAttribute('data-category', tool.category);
  card.style.setProperty('--category-color', getCategoryColor(tool.color));
  card.style.setProperty('--category-glow', getCategoryGlow(tool.color));

  card.innerHTML = `
    <div class="tool-card__glow tool-card__glow--${tool.color}"></div>

    <div class="tool-card__content">
      <div class="tool-card__header">
        <div class="tool-card__icon">
          <img src="${tool.thumbnail}" alt="${tool.name}" loading="lazy">
        </div>
      </div>

      <div class="tool-card__info">
        <div class="tool-card__title-group">
          <h3 class="tool-card__title">${tool.name}</h3>
          <p class="tool-card__subtitle">${tool.nameEn}</p>
        </div>

        <div class="tool-card__meta">
          <span class="tool-card__category tool-card__category--${tool.color}">
            <i class="fa-solid ${tool.icon}"></i>
            <span>${tool.category}</span>
          </span>
        </div>

        <p class="tool-card__description">${tool.description}</p>

        <div class="tool-card__tags">
          ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="tool-card__arrow">
      <i class="fa-solid fa-arrow-right"></i>
    </div>
  `;

  // 绑定点击事件
  card.addEventListener('click', () => {
    window.location.href = tool.route;
  });

  return card;
}

/**
 * 获取分类颜色
 */
function getCategoryColor(colorName) {
  const colors = {
    blue: '#3B82F6',
    green: '#10B981',
    purple: '#8B5CF6',
    orange: '#F59E0B',
    pink: '#EC4899'
  };
  return colors[colorName] || colors.blue;
}

/**
 * 获取分类发光颜色
 */
function getCategoryGlow(colorName) {
  const glows = {
    blue: 'rgba(59, 130, 246, 0.2)',
    green: 'rgba(16, 185, 129, 0.2)',
    purple: 'rgba(139, 92, 246, 0.2)',
    orange: 'rgba(245, 158, 11, 0.2)',
    pink: 'rgba(236, 72, 153, 0.2)'
  };
  return glows[colorName] || glows.blue;
}
```

---

## 4. 搜索结果模块 (Search Results)

### 📋 模块概述

搜索结果模块负责展示用户搜索后的工具列表。根据搜索关键词动态筛选工具，并以网格形式展示。包含结果数量提示和无结果状态处理。

### 🎨 视觉设计

**有结果状态**：
```
┌────────────────────────────────────────────────────────┐
│  找到 2 个工具                                          │ ← 中文粗体
│  FOUND 2 TOOLS                                         │ ← 英文小字
│                                                        │
│  ┌────────────┐  ┌────────────┐                       │
│  │ Nano       │  │ Mandala    │                       │
│  │ Banana     │  │            │                       │
│  │            │  │            │                       │
│  └────────────┘  └────────────┘                       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**无结果状态**：
```
┌────────────────────────────────────────────────────────┐
│                                                        │
│                       🔍                               │ ← 大图标
│                                                        │
│              未找到相关工具                             │ ← 中文提示
│           NO RESULTS FOR "xxx"                         │ ← 英文提示
│                                                        │
│          试试其他关键词或浏览所有工具                    │ ← 建议文字
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 📐 布局结构

```html
<section class="search-results" id="search-results-section">
  <!-- 结果统计 -->
  <div class="search-results__header">
    <div class="search-results__count">
      <h2 class="count-number">找到 <span id="result-count">2</span> 个工具</h2>
      <p class="count-subtitle">FOUND <span id="result-count-en">2</span> TOOLS</p>
    </div>

    <!-- 排序选项（可选） -->
    <div class="search-results__sort">
      <button class="sort-btn active" data-sort="relevance">
        <i class="fa-solid fa-star"></i>
        相关度
      </button>
      <button class="sort-btn" data-sort="name">
        <i class="fa-solid fa-font"></i>
        名称
      </button>
      <button class="sort-btn" data-sort="category">
        <i class="fa-solid fa-layer-group"></i>
        分类
      </button>
    </div>
  </div>

  <!-- 工具网格 -->
  <div class="tool-grid" id="tool-grid">
    <!-- 动态插入工具卡片 -->
  </div>

  <!-- 无结果状态 -->
  <div class="no-results" id="no-results" style="display: none;">
    <div class="no-results__icon">
      <i class="fa-solid fa-search"></i>
    </div>
    <h3 class="no-results__title">未找到相关工具</h3>
    <p class="no-results__subtitle">NO RESULTS FOR "<span id="search-query"></span>"</p>
    <p class="no-results__hint">试试其他关键词或浏览所有工具</p>
    <button class="btn-reset" onclick="resetSearch()">
      <i class="fa-solid fa-rotate-left"></i>
      重置搜索
    </button>
  </div>
</section>
```

### 🎨 工具网格布局

```
1920px+:
┌───────┬───────┬───────┬───────┐
│  工具1 │  工具2 │  工具3 │  工具4 │
├───────┼───────┼───────┼───────┤
│  工具5 │  工具6 │  工具7 │  工具8 │
└───────┴───────┴───────┴───────┘
         4列网格, gap 24px

1024px - 1920px:
┌───────┬───────┬───────┐
│  工具1 │  工具2 │  工具3 │
├───────┼───────┼───────┤
│  工具4 │  工具5 │  工具6 │
└───────┴───────┴───────┘
      3列网格, gap 20px

640px - 1024px:
┌───────┬───────┐
│  工具1 │  工具2 │
├───────┼───────┤
│  工具3 │  工具4 │
└───────┴───────┘
   2列网格, gap 16px

< 640px:
┌───────┐
│  工具1 │
├───────┤
│  工具2 │
├───────┤
│  工具3 │
└───────┘
 1列网格, gap 12px
```

### 🔧 关键CSS类

```css
/* ========================================================================
   搜索结果样式 (Search Results Styles)
   ======================================================================== */

/**
 * 搜索结果容器
 * - 最大宽度限制
 * - 居中显示
 */
.search-results {
  max-width: 1440px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

/**
 * 结果头部
 * - Flex布局
 * - 统计信息和排序选项左右分布
 */
.search-results__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 2rem;
}

/**
 * 结果数量统计
 */
.search-results__count {
  flex: 1;
}

.count-number {
  font-size: 2rem; /* 32px */
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 0.5rem 0;
}

.count-number span {
  color: #3B82F6;
}

.count-subtitle {
  font-size: 0.875rem; /* 14px */
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

/**
 * 排序选项（可选功能）
 */
.search-results__sort {
  display: flex;
  gap: 0.5rem;
}

.sort-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
}

.sort-btn.active {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
  color: #60A5FA;
}

/**
 * 工具网格
 * - CSS Grid布局
 * - 响应式列数
 */
.tool-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

/* 响应式网格 */
@media (max-width: 1920px) {
  .tool-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}

@media (max-width: 1024px) {
  .tool-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .tool-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

/**
 * 无结果状态
 * - 居中显示
 * - 大图标和文字提示
 */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  text-align: center;
}

.no-results__icon {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  margin-bottom: 2rem;
}

.no-results__icon i {
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.2);
}

.no-results__title {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 0.5rem 0;
}

.no-results__subtitle {
  font-size: 0.875rem; /* 14px */
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 1rem 0;
}

.no-results__subtitle span {
  color: #3B82F6;
  font-weight: 500;
}

.no-results__hint {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 2rem 0;
}

/**
 * 重置按钮
 */
.btn-reset {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  color: #60A5FA;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-reset:hover {
  background: rgba(59, 130, 246, 0.25);
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-2px);
}

.btn-reset:active {
  transform: translateY(0);
}
```

### ⚡ JavaScript逻辑

```javascript
/**
 * 搜索结果管理器
 */
class SearchResultsManager {
  constructor() {
    this.resultSection = document.getElementById('search-results-section');
    this.toolGrid = document.getElementById('tool-grid');
    this.noResults = document.getElementById('no-results');
    this.resultCount = document.getElementById('result-count');
    this.resultCountEn = document.getElementById('result-count-en');
    this.searchQuery = document.getElementById('search-query');
    this.allTools = [];
  }

  async init() {
    // 加载所有工具
    this.allTools = await this.loadTools();

    // 监听全局搜索事件
    window.addEventListener('search', (e) => {
      this.handleSearch(e.detail.query);
    });

    // 初始显示推荐工具
    this.showFeaturedTools();
  }

  /**
   * 处理搜索
   */
  handleSearch(query) {
    if (!query.trim()) {
      this.showFeaturedTools();
      return;
    }

    const results = this.searchTools(query);
    this.renderResults(results, query);
  }

  /**
   * 搜索工具
   */
  searchTools(query) {
    const lowerQuery = query.toLowerCase();

    return this.allTools.filter(tool => {
      return tool.name.toLowerCase().includes(lowerQuery) ||
             tool.nameEn.toLowerCase().includes(lowerQuery) ||
             tool.description.toLowerCase().includes(lowerQuery) ||
             tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
             tool.category.toLowerCase().includes(lowerQuery);
    });
  }

  /**
   * 渲染搜索结果
   */
  renderResults(results, query) {
    // 更新结果数量
    this.resultCount.textContent = results.length;
    this.resultCountEn.textContent = results.length;
    this.searchQuery.textContent = query;

    // 清空网格
    this.toolGrid.innerHTML = '';

    // 无结果处理
    if (results.length === 0) {
      this.showNoResults();
      return;
    }

    // 隐藏无结果提示
    this.noResults.style.display = 'none';

    // 渲染工具卡片
    results.forEach(tool => {
      const card = createToolCard(tool);
      this.toolGrid.appendChild(card);
    });

    // 滚动到结果区域
    this.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * 显示无结果状态
   */
  showNoResults() {
    this.toolGrid.innerHTML = '';
    this.noResults.style.display = 'flex';
  }

  /**
   * 显示推荐工具
   */
  showFeaturedTools() {
    const featured = this.allTools.filter(tool => tool.featured);
    this.renderResults(featured, '');
  }

  /**
   * 加载工具数据
   */
  async loadTools() {
    try {
      const response = await fetch('/data/tools.json');
      const data = await response.json();
      return data.tools;
    } catch (error) {
      console.error('Failed to load tools:', error);
      return [];
    }
  }
}

/**
 * 重置搜索
 */
function resetSearch() {
  const searchInput = document.getElementById('search-input');
  searchInput.value = '';
  searchInput.dispatchEvent(new Event('input'));
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  const resultsManager = new SearchResultsManager();
  resultsManager.init();
});
```

---

## 5. 页脚模块 (Footer)

### 📋 模块概述

页脚提供版权信息、相关链接和站点元数据，采用简洁设计，与整体风格保持一致。

### 🎨 视觉设计

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ────────────────── 分隔线 ──────────────────           │
│                                                         │
│  HappyPuppy.ai                                          │
│  YOUR PERSONAL TOOL STATION                             │
│                                                         │
│  关于  ·  反馈  ·  GitHub  ·  隐私政策                  │
│                                                         │
│  © 2025 HappyPuppy.ai. All rights reserved.            │
│  Made with ❤️ by Your Team                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 📐 布局结构

```html
<footer class="footer">
  <div class="footer__container">
    <!-- 分隔线 -->
    <div class="footer__divider"></div>

    <!-- 品牌信息 -->
    <div class="footer__brand">
      <h3 class="footer__logo">HappyPuppy.ai</h3>
      <p class="footer__tagline">YOUR PERSONAL TOOL STATION</p>
    </div>

    <!-- 链接组 -->
    <nav class="footer__links">
      <a href="/about" class="footer__link">关于</a>
      <span class="footer__separator">·</span>
      <a href="/feedback" class="footer__link">反馈</a>
      <span class="footer__separator">·</span>
      <a href="https://github.com" target="_blank" class="footer__link">
        <i class="fa-brands fa-github"></i>
        GitHub
      </a>
      <span class="footer__separator">·</span>
      <a href="/privacy" class="footer__link">隐私政策</a>
    </nav>

    <!-- 版权信息 -->
    <div class="footer__copyright">
      <p>© 2025 HappyPuppy.ai. All rights reserved.</p>
      <p class="footer__made-with">
        Made with <i class="fa-solid fa-heart"></i> by Your Team
      </p>
    </div>
  </div>
</footer>
```

### 🔧 关键CSS类

```css
/* ========================================================================
   页脚样式 (Footer Styles)
   ======================================================================== */

.footer {
  margin-top: 8rem;
  padding: 4rem 2rem 2rem;
  background: rgba(10, 10, 15, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer__container {
  max-width: 1440px;
  margin: 0 auto;
  text-align: center;
}

.footer__divider {
  width: 100px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  margin: 0 auto 2rem;
}

.footer__logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 0.5rem 0;
}

.footer__tagline {
  font-size: 0.75rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0 0 2rem 0;
}

.footer__links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.footer__link {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.footer__link:hover {
  color: #3B82F6;
}

.footer__separator {
  color: rgba(255, 255, 255, 0.2);
}

.footer__copyright {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.875rem;
}

.footer__copyright p {
  margin: 0.5rem 0;
}

.footer__made-with i {
  color: #EC4899;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
```

---

## 📊 模块关系图

```
┌─────────────────────────────────────────────────────────┐
│                    Navigation (固定顶部)                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    Hero Section                         │
│                  (标题 + 搜索框)                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                  Search Results                         │
│                  (工具卡片网格)                          │
│                                                         │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐          │
│  │Tool Card 1│  │Tool Card 2│  │Tool Card 3│          │
│  └───────────┘  └───────────┘  └───────────┘          │
│                                                         │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐          │
│  │Tool Card 4│  │Tool Card 5│  │Tool Card 6│          │
│  └───────────┘  └───────────┘  └───────────┘          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                      Footer                             │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 开发优先级

| 优先级 | 模块 | 理由 |
|-------|------|------|
| **P0** | 导航栏 | 全局组件，影响所有页面 |
| **P0** | 工具卡片 | 核心展示组件，复用度最高 |
| **P1** | 英雄区 | 首页焦点，用户首次交互点 |
| **P1** | 搜索结果 | 核心功能，依赖工具卡片 |
| **P2** | 页脚 | 静态内容，最后开发 |

---

**文档版本**: v1.0
**创建日期**: 2025-10-07
**维护者**: HappyPuppy.ai Team
