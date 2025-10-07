# HappyPuppy.ai 快速启动指南

## 🚀 启动步骤

### 方法1: 使用Python (推荐)

```bash
# 进入项目目录
cd D:\claudeWorkspaces\Todo_List

# 启动HTTP服务器
python -m http.server 8000

# 打开浏览器访问
http://localhost:8000
```

### 方法2: 使用Node.js

```bash
# 安装serve (仅首次)
npm install -g serve

# 启动服务器
serve . -p 8000

# 打开浏览器访问
http://localhost:8000
```

### 方法3: 使用VS Code Live Server

1. 安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

---

## ⚠️ 重要提示

### 必须使用本地服务器

由于使用了动态模板加载（fetch API），**不能直接双击打开index.html**，必须通过HTTP服务器访问。

### 原因

浏览器的同源策略（CORS）限制了file://协议下的fetch请求，必须通过http://或https://协议访问。

---

## 🔧 问题排查

### 问题1: CSS样式未加载

**症状**: 页面显示但样式不正确

**解决方案**:
1. 检查浏览器控制台是否有CSS加载失败的错误
2. 确认所有CSS文件路径正确（使用相对路径 `./modules/...`）
3. 确保HTTP服务器正在运行

### 问题2: 模板加载失败

**症状**: 页面显示"Loading modules..."后卡住

**解决方案**:
1. 打开浏览器控制台（F12）
2. 查看是否有404错误
3. 检查以下文件是否存在：
   - `modules/navigation/navigation.html`
   - `modules/hero/hero.html`
   - `modules/search-results/search-results.html`
   - `modules/footer/footer.html`
   - `modules/tool-card/tool-card.html`

### 问题3: JavaScript错误

**症状**: 页面显示但功能不工作

**解决方案**:
1. 打开浏览器控制台
2. 查看具体错误信息
3. 确认以下脚本文件存在：
   - `scripts/config.js`
   - `scripts/utils.js`
   - `scripts/template-loader.js`
   - `modules/*/**.js` (各模块的JS文件)

### 问题4: 工具数据未加载

**症状**: 搜索结果区域显示"推荐工具"但没有卡片

**解决方案**:
1. 检查 `data/tools.json` 文件是否存在
2. 打开控制台查看是否有fetch错误
3. 确认 `scripts/config.js` 中的 `DATA_PATHS.tools` 路径正确

---

## 📝 控制台输出

正常启动时，浏览器控制台应该显示：

```
🚀 Starting HappyPuppy.ai initialization...
📄 Loading templates...
Loading template: ./modules/navigation/navigation.html
✓ Loaded: ./modules/navigation/navigation.html
Loading template: ./modules/hero/hero.html
✓ Loaded: ./modules/hero/hero.html
Loading template: ./modules/search-results/search-results.html
✓ Loaded: ./modules/search-results/search-results.html
Loading template: ./modules/footer/footer.html
✓ Loaded: ./modules/footer/footer.html
Loading template: ./modules/tool-card/tool-card.html
✓ Loaded: ./modules/tool-card/tool-card.html
✓ Templates loaded successfully
📦 Loading module scripts...
  ✓ Loaded: ./modules/navigation/navigation.js
  ✓ Loaded: ./modules/hero/hero.js
  ✓ Loaded: ./modules/tool-card/tool-card.js
  ✓ Loaded: ./modules/search-results/search-results.js
Loaded 2 tools
  ✓ Loaded: ./modules/footer/footer.js
  ✓ Loaded: ./scripts/main.js
✓ Module scripts loaded
Initializing HappyPuppy.ai...
✓ HappyPuppy.ai initialized successfully!
```

---

## 🎯 功能测试

启动成功后，测试以下功能：

### 1. 搜索功能
- [ ] 点击搜索框，输入"nano"
- [ ] 应该实时过滤显示Nano Banana工具
- [ ] 按ESC清空搜索

### 2. 键盘快捷键
- [ ] 按 `Cmd+K` (Mac) 或 `Ctrl+K` (Windows)
- [ ] 搜索框应该获得焦点

### 3. 分类筛选
- [ ] 点击导航栏"图像"分类
- [ ] 应该只显示图像类工具
- [ ] 点击其他分类测试

### 4. 响应式
- [ ] 缩小浏览器窗口到手机尺寸
- [ ] 导航栏应该显示汉堡菜单
- [ ] 工具卡片应该变为单列

### 5. 工具卡片
- [ ] 鼠标悬停在卡片上
- [ ] 应该有上浮动画和箭头显示
- [ ] 点击卡片（暂时跳转到工具页面，可能404）

---

## 📂 项目文件结构检查清单

```
✓ index.html
✓ modules/
  ✓ navigation/
    ✓ navigation.html
    ✓ navigation.css
    ✓ navigation.js
  ✓ hero/
    ✓ hero.html
    ✓ hero.css
    ✓ hero.js
  ✓ tool-card/
    ✓ tool-card.html
    ✓ tool-card.css
    ✓ tool-card.js
  ✓ search-results/
    ✓ search-results.html
    ✓ search-results.css
    ✓ search-results.js
  ✓ footer/
    ✓ footer.html
    ✓ footer.css
    ✓ footer.js
✓ scripts/
  ✓ config.js
  ✓ utils.js
  ✓ template-loader.js
  ✓ main.js
✓ data/
  ✓ tools.json
✓ assets/
  ✓ images/
    ✓ placeholder.svg
  ✓ logo/ (可选)
```

---

## 💡 开发提示

### 修改模块内容

1. **修改HTML**: 直接编辑 `modules/*/**.html` 文件
2. **修改CSS**: 直接编辑 `modules/*/**.css` 文件
3. **修改JS**: 直接编辑 `modules/*/**.js` 文件
4. **刷新浏览器**: 按 `Ctrl+R` 或 `F5` 查看更改

### 添加新工具

1. 编辑 `data/tools.json`
2. 添加新工具对象（参考现有格式）
3. 准备工具缩略图（放在 `assets/images/`）
4. 刷新页面即可看到新工具

### 调试技巧

1. **打开开发者工具**: 按 `F12`
2. **查看网络请求**: 切换到 Network 标签
3. **查看控制台输出**: 切换到 Console 标签
4. **检查元素样式**: 切换到 Elements 标签

---

## 🌐 浏览器兼容性

推荐使用以下浏览器访问：

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

不支持IE浏览器（已停止支持）。

---

## 📞 获取帮助

如遇问题：

1. 查看浏览器控制台错误信息
2. 检查本文档的"问题排查"部分
3. 确认HTTP服务器正在运行
4. 检查文件路径是否正确

---

**祝开发愉快！** 🎉
