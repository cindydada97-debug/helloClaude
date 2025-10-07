# HappyPuppy.ai MVP 文档

## 项目概述

**项目名称**: HappyPuppy.ai
**项目类型**: 个人工具站平台
**设计风格**: DeepSeek主页风格 - 科技感、简洁、专业
**技术栈**: HTML5, TailwindCSS 3.0+ (CDN), Vanilla JavaScript
**架构模式**: Monorepo

---

## 一、视觉设计规范

### 1.1 设计风格关键词
- **科技感**: 透明度渐变、高亮色、勾线图形
- **简洁**: 大量留白、清晰层次结构
- **专业**: 黑白灰为主色调，彩色作为点缀

### 1.2 配色方案
```
主色调:
- 背景: #0A0A0F (深黑蓝)
- 次级背景: #131318 (深灰)
- 卡片背景: rgba(255, 255, 255, 0.03) 玻璃态

高亮色（单独使用渐变，不混合）:
- 蓝色系: #3B82F6 → rgba(59, 130, 246, 0)
- 紫色系: #8B5CF6 → rgba(139, 92, 246, 0)
- 绿色系: #10B981 → rgba(16, 185, 129, 0)
- 橙色系: #F59E0B → rgba(245, 158, 11, 0)
- 粉色系: #EC4899 → rgba(236, 72, 153, 0)

文字颜色:
- 主标题: #FFFFFF
- 副标题: rgba(255, 255, 255, 0.6)
- 描述文字: rgba(255, 255, 255, 0.4)
- 边框: rgba(255, 255, 255, 0.08)
```

### 1.3 字体规范
```
中文标题:
- 字体: 'Noto Sans SC'
- 粗细: 700-900 (Bold/Black)
- 大小: 48px-72px

英文装饰文字:
- 字体: 'Inter', 'SF Pro Display'
- 粗细: 300-400 (Light/Regular)
- 大小: 12px-16px
- 样式: 大写字母 (uppercase), 字间距加宽 (tracking-wider)

正文:
- 字体: 'Noto Sans SC'
- 粗细: 400-500
- 大小: 14px-16px
```

### 1.4 图标设计
- **站点Logo**: 科技感小狗动漫头像（使用SVG或高质量PNG）
- **分类图标**: Font Awesome 6.x / Material Icons
- **装饰图标**: 勾线风格（line-art）

---

## 二、功能架构

### 2.1 核心功能模块

#### 模块1: 导航栏 (Navigation)
**位置**: 页面顶部固定
**内容**:
- Logo + 站点名称（左侧）
- 工具分类导航（中央）
  - 编程 (Programming)
  - 效率 (Productivity)
  - 图像 (Image)
  - 办公 (Office)
  - 游戏 (Gaming)
- 用户操作区（右侧）
  - 搜索按钮
  - 主题切换（可选）

#### 模块2: 英雄区 (Hero Section)
**位置**: 页面中央
**内容**:
- 主标题: "HappyPuppy.ai"（中文粗体）
- 副标题: "YOUR PERSONAL TOOL STATION"（英文小字）
- 搜索框（核心交互）
  - 占位符文字: "搜索工具... / Search tools..."
  - 搜索图标（左侧）
  - 快捷键提示: ⌘K / Ctrl+K
  - 实时搜索建议

#### 模块3: 工具推荐区 (Featured Tools)
**位置**: 搜索框下方
**内容**:
- 区块标题: "推荐工具" + "FEATURED TOOLS"
- 工具卡片网格（2-4列响应式）
  - 初始展示: Nano Banana, Mandala
  - 卡片内容:
    - 工具图标/缩略图
    - 工具名称（中文粗体）
    - 分类标签（色块）
    - 简短描述
    - Hover效果: 高亮边框 + 阴影提升

#### 模块4: 搜索结果区 (Search Results)
**位置**: 替换推荐工具区
**触发**: 用户输入搜索内容
**内容**:
- 结果数量提示
- 工具卡片列表
- 无结果状态提示

#### 模块5: 页脚 (Footer)
**位置**: 页面底部
**内容**:
- 版权信息
- 链接（关于、反馈、GitHub等）

---

## 三、技术实现方案

### 3.1 Monorepo 结构

```
happypuppy-ai/
├── index.html                    # 主入口文件
├── README.md                     # 项目说明
├── MVP.md                        # 本文档
├── CLAUDE.md                     # Claude Code 工作指南
│
├── assets/                       # 静态资源
│   ├── logo/
│   │   └── happypuppy-logo.svg  # Logo SVG
│   └── images/
│       ├── nano-banana.png       # 工具缩略图
│       └── mandala.png
│
├── modules/                      # 功能模块（Monorepo核心）
│   ├── navigation/
│   │   ├── navigation.html      # 导航栏HTML片段
│   │   ├── navigation.css       # 导航栏样式
│   │   └── navigation.js        # 导航栏逻辑
│   │
│   ├── hero/
│   │   ├── hero.html
│   │   ├── hero.css
│   │   └── hero.js              # 搜索框逻辑
│   │
│   ├── tool-card/
│   │   ├── tool-card.html       # 工具卡片模板
│   │   ├── tool-card.css
│   │   └── tool-card.js         # 卡片渲染逻辑
│   │
│   ├── search-results/
│   │   ├── search-results.html
│   │   ├── search-results.css
│   │   └── search-results.js    # 搜索过滤逻辑
│   │
│   └── footer/
│       ├── footer.html
│       ├── footer.css
│       └── footer.js
│
├── tools/                        # 工具页面（Monorepo独立工具）
│   ├── nano-banana/
│   │   ├── index.html           # 工具独立页面
│   │   ├── styles.css
│   │   ├── app.js               # 工具核心逻辑
│   │   └── README.md            # 工具说明
│   │
│   └── mandala/
│       ├── index.html
│       ├── styles.css
│       ├── app.js
│       └── README.md
│
├── data/                         # 数据文件
│   └── tools.json               # 工具数据库
│
└── scripts/                      # 全局脚本
    ├── main.js                  # 主应用逻辑
    ├── router.js                # 路由管理（可选）
    └── utils.js                 # 工具函数
```

### 3.2 核心技术选型

#### HTML5
- 语义化标签: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- 自定义数据属性: `data-category`, `data-tool-id`
- 模板标签: `<template>` 用于卡片复用

#### TailwindCSS 3.0+ (CDN)
```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'dark-primary': '#0A0A0F',
          'dark-secondary': '#131318',
        },
        fontFamily: {
          'sans': ['Noto Sans SC', 'Inter', 'system-ui'],
        },
        screens: {
          '2xl': '1920px',
          '3xl': '2560px',
        }
      }
    }
  }
</script>
```

#### JavaScript (ES6+)
- 模块化设计（ES Modules）
- 事件委托
- 防抖/节流（搜索优化）
- LocalStorage（收藏功能，可选）

#### 图标库 (CDN)
```html
<!-- Font Awesome 6 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- Material Icons (可选) -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

---

## 四、数据结构设计

### 4.1 工具数据模型 (tools.json)

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

## 五、页面布局设计

### 5.1 响应式断点

```
移动端 (Mobile): < 640px
平板 (Tablet): 640px - 1024px
桌面 (Desktop): 1024px - 1920px
大屏 (Large): 1920px - 2560px
超大屏 (XL): > 2560px
```

### 5.2 网格系统

```
1920px+:
- 导航栏: 全宽，内容最大 1440px 居中
- 英雄区: 单列，最大 800px 居中
- 工具卡片: 4列网格，gap 24px
- 页边距: 80px

1024px - 1920px:
- 工具卡片: 3列网格
- 页边距: 60px

640px - 1024px:
- 工具卡片: 2列网格
- 页边距: 40px

< 640px:
- 工具卡片: 1列网格
- 页边距: 20px
```

---

## 六、交互设计规范

### 6.1 搜索功能

**触发方式**:
1. 点击搜索框
2. 键盘快捷键: Cmd+K (Mac) / Ctrl+K (Windows)

**交互流程**:
1. 用户输入关键词
2. 300ms 防抖后触发搜索
3. 根据工具名称、描述、标签进行模糊匹配
4. 实时更新搜索结果区域
5. 支持中英文搜索

**搜索算法（简单版）**:
```javascript
function searchTools(query) {
  const lowerQuery = query.toLowerCase();
  return tools.filter(tool => {
    return tool.name.toLowerCase().includes(lowerQuery) ||
           tool.description.toLowerCase().includes(lowerQuery) ||
           tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
           tool.category.toLowerCase().includes(lowerQuery);
  });
}
```

### 6.2 卡片交互

**状态**:
1. **默认**: 半透明背景，柔和边框
2. **Hover**:
   - 边框高亮（对应分类颜色）
   - 轻微上浮（translateY: -4px）
   - 背景亮度提升
3. **Active**: 按下效果（scale: 0.98）

**点击行为**:
- 导航至工具页面: `window.location.href = tool.route`
- 或使用前端路由（无刷新跳转）

### 6.3 分类筛选

**触发**: 点击导航栏分类标签

**行为**:
1. 高亮当前选中分类
2. 过滤并显示该分类下的所有工具
3. URL参数更新: `?category=image`
4. 支持"全部"选项重置筛选

---

## 七、视觉元素设计

### 7.1 勾线图形元素

**使用场景**:
- 区块分隔线
- 数据可视化背景
- 装饰性图形

**实现方式**:
```css
/* SVG 勾线背景 */
.line-pattern {
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* 勾线边框 */
.line-border {
  border: 1px solid rgba(255,255,255,0.1);
  position: relative;
}

.line-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.2),
    transparent
  );
}
```

### 7.2 高亮色渐变规则

**单一颜色渐变**（正确）:
```css
/* 蓝色从实色到透明 */
.gradient-blue {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.8) 0%,
    rgba(59, 130, 246, 0) 100%
  );
}
```

**禁止混合渐变**（错误）:
```css
/* ❌ 不要蓝色到紫色 */
.gradient-wrong {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.8),
    rgba(139, 92, 246, 0.8)
  );
}
```

### 7.3 玻璃态效果 (Glassmorphism)

```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
}
```

---

## 八、性能优化策略

### 8.1 资源加载优化
- 图片懒加载（Lazy Loading）
- 字体预加载（Preload）
- CDN资源使用
- 图片格式: WebP + PNG fallback

### 8.2 代码优化
- CSS模块化，按需加载
- JavaScript防抖节流
- 事件委托减少监听器
- 避免DOM频繁操作

### 8.3 缓存策略
- 工具数据 LocalStorage 缓存
- Service Worker（PWA，可选）

---

## 九、开发里程碑

### Phase 1: 基础框架 (Week 1)
- [ ] 搭建Monorepo项目结构
- [ ] 创建index.html主入口
- [ ] 引入TailwindCSS和图标库
- [ ] 设计Logo（小狗科技头像）

### Phase 2: 核心模块 (Week 2)
- [ ] 开发导航栏模块
- [ ] 开发英雄区和搜索框
- [ ] 创建工具卡片组件
- [ ] 实现工具数据渲染

### Phase 3: 交互功能 (Week 3)
- [ ] 实现搜索功能（实时筛选）
- [ ] 实现分类筛选功能
- [ ] 添加键盘快捷键支持
- [ ] 完善响应式布局

### Phase 4: 工具页面 (Week 4)
- [ ] 开发 Nano Banana 工具页面
- [ ] 开发 Mandala 工具页面
- [ ] 实现工具路由跳转
- [ ] 完善返回首页功能

### Phase 5: 优化与测试 (Week 5)
- [ ] 性能优化（加载速度、动画流畅度）
- [ ] 跨浏览器测试
- [ ] 响应式测试（不同屏幕尺寸）
- [ ] 无障碍访问优化（a11y）

---

## 十、样式文件结构与注释规范

### 10.1 CSS文件命名规则

```
modules/
├── navigation/
│   └── navigation.css      # 导航栏样式
├── hero/
│   └── hero.css           # 英雄区样式
├── tool-card/
│   └── tool-card.css      # 工具卡片样式
├── search-results/
│   └── search-results.css # 搜索结果样式
└── footer/
    └── footer.css         # 页脚样式
```

### 10.2 CSS注释规范示例

```css
/* ==========================================================================
   导航栏样式 (Navigation Styles)
   ========================================================================== */

/**
 * 主导航容器
 * - 固定在页面顶部
 * - 使用玻璃态效果
 * - 响应式padding
 */
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

/**
 * Logo区域
 * - 左侧对齐
 * - 包含图标和文字
 */
.navigation__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/**
 * 分类导航
 * - 水平布局
 * - Hover时显示高亮下划线
 */
.navigation__categories {
  display: flex;
  gap: 2rem;
  list-style: none;
}

/* 响应式: 平板及以下隐藏部分导航 */
@media (max-width: 1024px) {
  .navigation__categories {
    display: none; /* 移动端显示汉堡菜单 */
  }
}

/* ==========================================================================
   分类标签样式
   ========================================================================== */

/**
 * 分类链接
 * - 默认半透明白色
 * - Hover时完全不透明
 * - Active状态显示彩色下划线
 */
.category-link {
  position: relative;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;
}

.category-link:hover {
  color: rgba(255, 255, 255, 1);
}

/**
 * 分类激活状态下划线
 * - 使用对应分类颜色
 * - 从中心向两侧展开动画
 */
.category-link--active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--category-color);
  transform: scaleX(1);
  transition: transform 0.3s ease;
}
```

---

## 十一、关键代码片段示例

### 11.1 工具卡片HTML模板

```html
<template id="tool-card-template">
  <article class="tool-card" data-tool-id="{id}" data-category="{category}">
    <!-- 卡片背景渐变（基于分类颜色） -->
    <div class="tool-card__glow tool-card__glow--{color}"></div>

    <!-- 卡片内容 -->
    <div class="tool-card__content">
      <!-- 工具图标/缩略图 -->
      <div class="tool-card__icon">
        <img src="{thumbnail}" alt="{name}" loading="lazy">
      </div>

      <!-- 工具信息 -->
      <div class="tool-card__info">
        <!-- 中文标题（粗体大字） -->
        <h3 class="tool-card__title">{name}</h3>

        <!-- 英文副标题（小字装饰） -->
        <p class="tool-card__subtitle">{nameEn}</p>

        <!-- 分类标签 -->
        <span class="tool-card__category tool-card__category--{color}">
          <i class="fa-solid {icon}"></i>
          {category}
        </span>

        <!-- 工具描述 -->
        <p class="tool-card__description">{description}</p>

        <!-- 标签组 -->
        <div class="tool-card__tags">
          {#each tags}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      </div>
    </div>

    <!-- Hover时的箭头指示 -->
    <div class="tool-card__arrow">
      <i class="fa-solid fa-arrow-right"></i>
    </div>
  </article>
</template>
```

### 11.2 搜索功能JavaScript

```javascript
/**
 * 搜索管理器
 * 负责处理工具搜索逻辑
 */
class SearchManager {
  constructor() {
    this.tools = [];
    this.searchInput = null;
    this.resultsContainer = null;
    this.debounceTimer = null;
  }

  /**
   * 初始化搜索功能
   */
  async init() {
    // 加载工具数据
    this.tools = await this.loadTools();

    // 绑定DOM元素
    this.searchInput = document.getElementById('search-input');
    this.resultsContainer = document.getElementById('search-results');

    // 绑定事件
    this.bindEvents();
  }

  /**
   * 绑定事件监听器
   */
  bindEvents() {
    // 实时搜索（防抖）
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });

    // 键盘快捷键 Cmd+K / Ctrl+K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.searchInput.focus();
      }
    });
  }

  /**
   * 执行搜索
   * @param {string} query - 搜索关键词
   */
  performSearch(query) {
    if (!query.trim()) {
      this.showFeaturedTools();
      return;
    }

    const results = this.searchTools(query);
    this.renderResults(results, query);
  }

  /**
   * 搜索工具（模糊匹配）
   * @param {string} query - 搜索关键词
   * @returns {Array} - 匹配的工具数组
   */
  searchTools(query) {
    const lowerQuery = query.toLowerCase();

    return this.tools.filter(tool => {
      // 匹配工具名称
      if (tool.name.toLowerCase().includes(lowerQuery)) return true;
      if (tool.nameEn.toLowerCase().includes(lowerQuery)) return true;

      // 匹配描述
      if (tool.description.toLowerCase().includes(lowerQuery)) return true;

      // 匹配标签
      if (tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;

      // 匹配分类
      if (tool.category.toLowerCase().includes(lowerQuery)) return true;

      return false;
    });
  }

  /**
   * 渲染搜索结果
   * @param {Array} results - 搜索结果数组
   * @param {string} query - 搜索关键词
   */
  renderResults(results, query) {
    // 清空容器
    this.resultsContainer.innerHTML = '';

    // 显示结果数量
    const countHtml = `
      <div class="search-results__count">
        <span class="text-white font-bold text-2xl">找到 ${results.length} 个工具</span>
        <span class="text-gray-400 text-sm uppercase tracking-wider">
          FOUND ${results.length} TOOLS
        </span>
      </div>
    `;
    this.resultsContainer.innerHTML = countHtml;

    // 无结果状态
    if (results.length === 0) {
      this.resultsContainer.innerHTML += `
        <div class="no-results">
          <i class="fa-solid fa-search text-6xl text-gray-600 mb-4"></i>
          <p class="text-white text-xl font-bold">未找到相关工具</p>
          <p class="text-gray-400 text-sm">NO RESULTS FOR "${query}"</p>
        </div>
      `;
      return;
    }

    // 渲染工具卡片
    const cardsHtml = results.map(tool => this.createToolCard(tool)).join('');
    this.resultsContainer.innerHTML += `
      <div class="tool-grid">
        ${cardsHtml}
      </div>
    `;
  }

  /**
   * 创建工具卡片HTML
   * @param {Object} tool - 工具对象
   * @returns {string} - 卡片HTML字符串
   */
  createToolCard(tool) {
    return `
      <article class="tool-card" data-tool-id="${tool.id}" onclick="navigateToTool('${tool.route}')">
        <div class="tool-card__glow tool-card__glow--${tool.color}"></div>
        <div class="tool-card__content">
          <div class="tool-card__icon">
            <img src="${tool.thumbnail}" alt="${tool.name}" loading="lazy">
          </div>
          <div class="tool-card__info">
            <h3 class="tool-card__title">${tool.name}</h3>
            <p class="tool-card__subtitle">${tool.nameEn}</p>
            <span class="tool-card__category tool-card__category--${tool.color}">
              <i class="fa-solid ${tool.icon}"></i>
              ${tool.category}
            </span>
            <p class="tool-card__description">${tool.description}</p>
            <div class="tool-card__tags">
              ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="tool-card__arrow">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </article>
    `;
  }

  /**
   * 加载工具数据
   * @returns {Promise<Array>} - 工具数组
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

  /**
   * 显示推荐工具（默认状态）
   */
  showFeaturedTools() {
    const featured = this.tools.filter(tool => tool.featured);
    this.renderResults(featured, '');
  }
}

// 全局函数：导航到工具页面
function navigateToTool(route) {
  window.location.href = route;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  const searchManager = new SearchManager();
  searchManager.init();
});
```

---

## 十二、数据可视化组件（可选）

### 12.1 使用Chart.js（通过CDN引入）

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

### 12.2 示例：工具使用统计图表

```javascript
/**
 * 创建工具使用统计图表
 * 使用勾线风格，配色与主题一致
 */
function createUsageChart() {
  const ctx = document.getElementById('usage-chart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      datasets: [{
        label: '工具使用次数',
        data: [120, 190, 150, 220, 280, 320],
        borderColor: 'rgba(59, 130, 246, 0.8)', // 蓝色主题
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.4 // 平滑曲线
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false // 隐藏图例，保持简洁
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'rgba(255, 255, 255, 0.4)', // 文字颜色
            font: {
              family: "'Noto Sans SC', 'Inter', sans-serif"
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)', // 网格线颜色
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: 'rgba(255, 255, 255, 0.4)',
            font: {
              family: "'Noto Sans SC', 'Inter', sans-serif"
            }
          },
          grid: {
            display: false // 隐藏X轴网格线
          }
        }
      }
    }
  });
}
```

---

## 十三、Logo设计需求

### 13.1 科技感小狗头像设计要素

**风格关键词**:
- 线条简洁（line-art / minimalist）
- 几何化（geometric shapes）
- 赛博朋克 / 未来科技感（cyberpunk / futuristic）
- 可爱但不幼稚（cute but professional）

**配色建议**:
- 主色: 白色 (#FFFFFF)
- 高亮: 蓝色渐变 (#3B82F6 → #60A5FA)
- 描边: 细线条，1-2px

**元素组成**:
1. 小狗轮廓（侧面或正面）
2. 科技感装饰（电路纹理、几何线条、光晕效果）
3. 可选：数字眼睛、天线、芯片符号

**文件格式**:
- SVG（矢量图，可缩放）
- PNG（1024x1024，透明背景，备用）

### 13.2 临时替代方案

在专业Logo设计完成前，可使用Font Awesome图标组合：

```html
<div class="logo-temp">
  <i class="fa-solid fa-dog"></i>
  <i class="fa-solid fa-microchip"></i>
</div>
```

---

## 十四、质量保证与验收标准

### 14.1 功能性验收
- [ ] 搜索功能正常运行，300ms防抖生效
- [ ] 分类筛选准确无误
- [ ] 工具卡片点击可跳转至对应页面
- [ ] 键盘快捷键 Cmd/Ctrl+K 正常触发
- [ ] 推荐工具正确展示 Nano Banana 和 Mandala

### 14.2 视觉设计验收
- [ ] 配色符合DeepSeek风格（深色科技感）
- [ ] 中文粗体大字，英文小字装饰
- [ ] 高亮色单独渐变，无混合渐变
- [ ] 勾线图形元素应用恰当
- [ ] 玻璃态效果正确实现
- [ ] 图标来自专业图标库，无emoji

### 14.3 响应式验收
- [ ] 1920px及以上屏幕显示完整
- [ ] 1024px-1920px正常缩放
- [ ] 640px-1024px平板布局正确
- [ ] 640px以下移动端布局正确
- [ ] 触摸屏交互友好

### 14.4 性能验收
- [ ] 首屏加载时间 < 2秒
- [ ] 搜索响应时间 < 500ms
- [ ] 图片懒加载生效
- [ ] 无明显卡顿和闪烁

### 14.5 代码质量验收
- [ ] Monorepo结构清晰
- [ ] CSS文件独立管理，注释完整
- [ ] JavaScript模块化良好
- [ ] HTML语义化标签使用正确
- [ ] 无控制台错误

---

## 十五、后续扩展计划（MVP之后）

### 15.1 功能扩展
- 用户系统（登录/注册）
- 工具收藏功能
- 工具评分和评论
- 使用历史记录
- 个性化推荐算法

### 15.2 工具扩展
- 添加更多编程工具（代码格式化、正则测试等）
- 添加效率工具（番茄钟、待办清单等）
- 添加办公工具（PDF转换、文档协作等）

### 15.3 技术升级
- 迁移至前端框架（Vue.js / React）
- 引入TypeScript
- 实现PWA（Progressive Web App）
- 添加后端API（Node.js + Express）

---

## 十六、附录

### 16.1 参考资源

**设计灵感**:
- DeepSeek官网: https://www.deepseek.com/
- Stripe官网（渐变和排版）
- Linear官网（简洁和动画）

**技术文档**:
- TailwindCSS官方文档: https://tailwindcss.com/
- Font Awesome图标库: https://fontawesome.com/
- Chart.js文档: https://www.chartjs.org/

### 16.2 相关工具

**设计工具**:
- Figma（UI设计）
- Excalidraw（流程图）
- Coolors（配色方案）

**开发工具**:
- VS Code（代码编辑器）
- Live Server（本地开发服务器）
- Chrome DevTools（调试）

### 16.3 颜色变量表

```css
:root {
  /* 背景色 */
  --bg-primary: #0A0A0F;
  --bg-secondary: #131318;
  --bg-card: rgba(255, 255, 255, 0.03);

  /* 文字颜色 */
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.6);
  --text-tertiary: rgba(255, 255, 255, 0.4);

  /* 高亮色 */
  --color-blue: #3B82F6;
  --color-purple: #8B5CF6;
  --color-green: #10B981;
  --color-orange: #F59E0B;
  --color-pink: #EC4899;

  /* 边框 */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.15);

  /* 阴影 */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
}
```

---

## 十七、MVP核心要点总结

### 必须实现的核心功能：
1. ✅ **响应式首页**（支持1920px+）
2. ✅ **中央搜索框**（实时搜索 + 快捷键）
3. ✅ **工具分类**（5个分类：编程、效率、图像、办公、游戏）
4. ✅ **工具卡片**（Nano Banana、Mandala）
5. ✅ **工具页面跳转**
6. ✅ **Monorepo代码结构**

### 必须遵守的设计规范：
1. ✅ **DeepSeek风格**（深色科技感）
2. ✅ **中文粗体 + 英文小字装饰**
3. ✅ **高亮色单独渐变**（不混合）
4. ✅ **勾线图形化元素**
5. ✅ **专业图标库**（无emoji）
6. ✅ **独立CSS文件 + 详细注释**

### 技术栈确认：
1. ✅ **HTML5**（语义化标签）
2. ✅ **TailwindCSS 3.0+**（CDN引入）
3. ✅ **Vanilla JavaScript**（ES6+）
4. ✅ **Font Awesome 6**（CDN引入）
5. ✅ **Chart.js**（可选，数据可视化）

---

**文档版本**: v1.0
**创建日期**: 2025-10-07
**最后更新**: 2025-10-07
**维护者**: HappyPuppy.ai Team

---

**注**: 本文档为MVP（最小可行产品）设计文档，所有功能和设计均为核心必需内容，不包含任何次要功能。开发过程中如遇技术难题，请参考本文档的技术实现方案章节。
