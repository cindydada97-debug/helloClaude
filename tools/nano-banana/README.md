# Nano Banana - AI Image Analysis Tool

基于 Gemini 2.5 Flash Image API 的智能图像分析工具

## 🚀 功能特性

1. **图片上传**
   - 支持点击上传和拖拽上传（桌面端）
   - 移动端支持相机拍照和相册选择
   - 实时预览上传的图片

2. **AI 图像分析**
   - 使用 Google Gemini 2.5 Flash Image 模型
   - 通过自然语言提示词分析图片内容
   - 10-30 秒快速响应

3. **结果展示**
   - 显示原始图片
   - AI 分析结果文字展示
   - 支持下载图片、复制结果、重新生成

## 📁 文件结构

```
nano-banana/
├── index.html       # 主页面
├── script.js        # 核心功能脚本
├── config.js        # API 配置（包含 API Key）
├── nano.css         # 自定义样式
└── README.md        # 说明文档
```

## ⚙️ 配置说明

### API Key 配置

当前 API Key 存储在 `config.js` 文件中：

```javascript
const NANO_BANANA_CONFIG = {
  API_KEY: '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',
  // ...
}
```

### ⚠️ 安全警告

**重要：在生产环境中，不应该将 API Key 直接暴露在前端代码中！**

当前配置仅用于开发测试。生产环境建议采用以下方案：

#### 推荐方案：后端代理

1. 创建后端 API 服务器（Node.js/Python/PHP 等）
2. 将 API Key 存储在后端环境变量中
3. 前端通过你的后端 API 调用 Gemini

```javascript
// 前端代码示例
const response = await fetch('/api/analyze-image', {
  method: 'POST',
  body: JSON.stringify({ image: imageBase64, prompt: promptText })
})
```

```javascript
// 后端代码示例 (Node.js)
app.post('/api/analyze-image', async (req, res) => {
  const apiKey = process.env.OPENROUTER_API_KEY // 从环境变量读取
  // 调用 OpenRouter API...
})
```

## 🔧 使用方法

### 1. 启动本地服务器

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve . -p 8000
```

### 2. 访问应用

打开浏览器访问：`http://localhost:8000/tools/nano-banana/`

### 3. 使用流程

1. 点击 **"Add Image"** 上传图片
2. 在 **"Main Prompt"** 中输入提示词
   - 例如：`这张图片里有什么内容？请详细描述`
   - 例如：`What objects are in this image?`
3. 点击 **"⚡ Generate Now"** 生成分析结果
4. 查看 AI 分析结果
5. 可以下载图片、复制结果或重新生成

## 📝 API 说明

**模型**：`google/gemini-2.5-flash-image-preview`
**提供商**：OpenRouter.ai
**文档**：https://openrouter.ai/google/gemini-2.5-flash-image-preview/api

### 请求格式

```javascript
{
  "model": "google/gemini-2.5-flash-image-preview",
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "提示词" },
        { "type": "image_url", "image_url": { "url": "data:image/jpeg;base64,..." } }
      ]
    }
  ]
}
```

### 响应格式

```javascript
{
  "choices": [
    {
      "message": {
        "content": "AI 分析结果文本..."
      }
    }
  ]
}
```

## 🛠️ 技术栈

- **前端**：HTML5, TailwindCSS, Vanilla JavaScript
- **API**：OpenRouter (Gemini 2.5 Flash Image)
- **图标**：Font Awesome 6.5.1

## 📱 移动端优化

- 触摸反馈动画
- 相机拍照支持 (`capture="environment"`)
- 自适应提示文字
- 响应式布局

## 🔒 隐私说明

- 图片仅在浏览器本地处理（base64 编码）
- 上传到 API 的数据通过 HTTPS 加密传输
- 不存储用户上传的图片和提示词

## 📄 License

MIT License

---

**Made with 🍌 and AI**
