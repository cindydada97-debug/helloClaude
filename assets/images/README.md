# 图片资源说明

本目录存放工具缩略图和其他图片资源。

## 文件列表

### 工具缩略图

#### nano-banana.png
- **用途**: Nano Banana工具的卡片缩略图
- **尺寸**: 400x300 (推荐)
- **格式**: PNG with transparency
- **内容**: 图像分类相关的视觉元素（AI、图片、分类图标等）
- **当前状态**: ⚠️ 待创建

#### mandala.png
- **用途**: Mandala游戏的卡片缩略图
- **尺寸**: 400x300 (推荐)
- **格式**: PNG with transparency
- **内容**: 曼陀罗图案、禅意花园元素
- **当前状态**: ⚠️ 待创建

### 占位图

#### placeholder.svg
- **用途**: 开发阶段使用的占位图
- **状态**: ✅ 已创建

## 设计规范

### 缩略图要求
1. **尺寸**: 400x300 (4:3比例)
2. **格式**: PNG (支持透明度) 或 WebP
3. **文件大小**: < 200KB
4. **风格**:
   - 符合主站深色科技风格
   - 使用对应分类的高亮色
   - 勾线图形化元素
   - 简洁专业

### 颜色建议
- **Nano Banana (图像)**: 使用紫色系 (#8B5CF6)
- **Mandala (游戏)**: 使用粉色系 (#EC4899)

## 创建方法

### 方案1: AI生成（推荐）
使用AI图像生成工具（Midjourney, Stable Diffusion等）：
```
Prompt示例 (Nano Banana):
"minimalist tech illustration of AI image classification,
geometric shapes, circuit patterns, purple gradient,
dark background, line art style, 4:3 ratio"

Prompt示例 (Mandala):
"zen mandala garden game illustration, geometric flower patterns,
pink gradient, peaceful atmosphere, line art style,
dark background, 4:3 ratio"
```

### 方案2: 设计工具
- **Figma**: 矢量设计后导出PNG
- **Photoshop**: 高质量图片编辑
- **Canva**: 快速模板设计

### 方案3: 临时使用图标
在正式缩略图完成前，可以使用Font Awesome大图标：
```html
<div style="width:400px; height:300px; display:flex; align-items:center; justify-content:center; background: rgba(139,92,246,0.1);">
  <i class="fa-solid fa-image" style="font-size:100px; color:#8B5CF6;"></i>
</div>
```

## 优化建议

### 性能优化
1. 使用WebP格式（更小体积）
2. 提供2x图片用于高DPI屏幕
3. 实现懒加载（lazy loading）

### 示例代码
```html
<picture>
  <source srcset="/assets/images/nano-banana.webp" type="image/webp">
  <img src="/assets/images/nano-banana.png" alt="Nano Banana" loading="lazy">
</picture>
```

---

**更新日期**: 2025-10-07
