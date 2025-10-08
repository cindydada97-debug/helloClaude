// DOM Elements
const dropZone = document.getElementById("dropZone")
const fileInput = document.getElementById("fileInput")
const uploadPrompt = document.getElementById("uploadPrompt")
const imagePreviewContainer = document.getElementById("imagePreviewContainer")
const imageCount = document.getElementById("imageCount")
const imageUploadSection = document.getElementById("imageUploadSection")

// Mode Selection Elements
const modeImageToImage = document.getElementById("modeImageToImage")
const modeTextToImage = document.getElementById("modeTextToImage")

// Prompt and Output Elements
const mainPrompt = document.getElementById("mainPrompt")
const generateBtn = document.getElementById("generateBtn")
const outputArea = document.getElementById("outputArea")
const generatedImage = document.getElementById("generatedImage")
const resultImg = document.getElementById("resultImg")

// 检测是否为移动设备
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

console.log('📱 设备检测结果:', isMobile ? '移动端' : '桌面端')
console.log('🌐 User Agent:', navigator.userAgent)

// 存储上传的图片数组（最多9张）
const MAX_IMAGES = 9
let uploadedImages = []

// 当前模式：'image-to-image' 或 'text-to-image'
let currentMode = 'image-to-image'

// 初始化检查 - 验证所有必要元素是否正确加载
function checkInitialization() {
  console.log('🔍 开始初始化检查...')

  const elements = {
    'dropZone': dropZone,
    'fileInput': fileInput,
    'uploadPrompt': uploadPrompt,
    'imagePreviewContainer': imagePreviewContainer,
    'imageCount': imageCount,
    'imageUploadSection': imageUploadSection,
    'modeImageToImage': modeImageToImage,
    'modeTextToImage': modeTextToImage,
    'mainPrompt': mainPrompt,
    'generateBtn': generateBtn,
    'outputArea': outputArea,
    'generatedImage': generatedImage
  }

  let allGood = true
  for (const [name, element] of Object.entries(elements)) {
    if (element) {
      console.log(`✅ ${name} - 已找到`)
    } else {
      console.error(`❌ ${name} - 未找到！`)
      allGood = false
    }
  }

  if (allGood) {
    console.log('✅ 所有元素初始化成功！')
  } else {
    console.error('❌ 部分元素初始化失败，请检查 HTML 结构')
  }

  return allGood
}

// 页面加载完成后执行初始化检查
document.addEventListener('DOMContentLoaded', () => {
  checkInitialization()
})

// 如果 DOM 已经加载完成，立即执行
if (document.readyState === 'loading') {
  console.log('⏳ 等待 DOM 加载完成...')
} else {
  checkInitialization()
}

// 根据设备类型更新提示文字
if (isMobile) {
  const hintText = uploadPrompt.querySelector('.text-xs')
  if (hintText) {
    hintText.textContent = '点击选择图片或拍照'
  }
}

// Click to upload (移动端和桌面端都支持)
dropZone.addEventListener("click", () => {
  console.log('🖱️ dropZone 点击事件触发')
  console.log('📊 当前已上传图片数:', uploadedImages.length)

  if (uploadedImages.length < MAX_IMAGES) {
    console.log('✅ 触发文件选择器')
    fileInput.click()
  } else {
    console.log('⚠️ 已达到最大上传数量')
    alert(`最多只能上传${MAX_IMAGES}张图片`)
  }
})

// 移动端触摸反馈
if (isMobile) {
  dropZone.addEventListener("touchstart", (e) => {
    dropZone.classList.add("bg-banana-100")
  })

  dropZone.addEventListener("touchend", (e) => {
    dropZone.classList.remove("bg-banana-100")
  })

  dropZone.addEventListener("touchcancel", (e) => {
    dropZone.classList.remove("bg-banana-100")
  })
}

// File input change (移动端和桌面端都支持) - 支持多选
fileInput.addEventListener("change", (e) => {
  console.log('📂 fileInput change 事件触发')
  console.log('📂 选中的文件:', e.target.files)
  const files = Array.from(e.target.files)
  console.log('📂 转换后的文件数组:', files)
  handleFiles(files)
  fileInput.value = "" // 清空input，允许重复选择相同文件
})

// Drag and drop (仅桌面端) - 支持多张图片
if (!isMobile) {
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault()
    dropZone.classList.add("border-banana-500", "bg-banana-100")
  })

  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault()
    dropZone.classList.remove("border-banana-500", "bg-banana-100")
  })

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault()
    dropZone.classList.remove("border-banana-500", "bg-banana-100")

    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith("image/"))
    handleFiles(files)
  })
}

// Handle multiple files upload
function handleFiles(files) {
  console.log('📁 handleFiles 被调用，文件数量:', files.length)

  // 检查是否超过最大数量
  const remainingSlots = MAX_IMAGES - uploadedImages.length
  if (files.length > remainingSlots) {
    alert(`最多还能上传${remainingSlots}张图片，已为您选择前${remainingSlots}张`)
    files = files.slice(0, remainingSlots)
  }

  // 读取并添加图片
  files.forEach((file, index) => {
    console.log(`📷 处理第 ${index + 1} 张图片:`, file.name, file.type, file.size)

    if (!file.type.startsWith("image/")) {
      console.warn('⚠️ 跳过非图片文件:', file.name)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = {
        id: Date.now() + Math.random(), // 唯一ID
        base64: e.target.result,
        name: file.name
      }
      uploadedImages.push(imageData)
      console.log('✅ 图片已添加到数组，当前总数:', uploadedImages.length)
      console.log('📊 图片数据 base64 长度:', e.target.result.length)

      updateImagePreview()
      updateImageCount()
    }
    reader.onerror = (error) => {
      console.error('❌ 读取图片失败:', file.name, error)
    }
    reader.readAsDataURL(file)
  })
}

// Update image preview area
function updateImagePreview() {
  console.log('🖼️ updateImagePreview 被调用，图片数量:', uploadedImages.length)
  console.log('📦 imagePreviewContainer 元素:', imagePreviewContainer)

  if (uploadedImages.length === 0) {
    imagePreviewContainer.classList.add("hidden")
    console.log('⚠️ 没有图片，隐藏预览区域')
    return
  }

  imagePreviewContainer.classList.remove("hidden")
  console.log('✅ 显示预览区域')

  // 移动端删除按钮始终显示，桌面端悬停显示
  const deleteButtonClass = isMobile
    ? "absolute top-1 right-1 w-7 h-7 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition shadow-lg flex items-center justify-center"
    : "absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition shadow-lg"

  const previewHTML = uploadedImages.map((img, index) => {
    console.log(`🖼️ 生成预览 ${index + 1}:`, img.name, 'base64前20字符:', img.base64.substring(0, 20))
    return `
      <div class="relative group bg-gray-100 rounded-lg overflow-hidden" style="aspect-ratio: 1; min-height: 80px;">
        <img src="${img.base64}" class="w-full h-full object-contain" alt="Preview ${index + 1}" loading="lazy">
        <button onclick="removeImageById('${img.id}')" class="${deleteButtonClass}" type="button">×</button>
      </div>
    `
  }).join('')

  console.log('📝 生成的 HTML 长度:', previewHTML.length)
  imagePreviewContainer.innerHTML = previewHTML
  console.log('✅ HTML 已插入到容器中')
}

// Update image count display
function updateImageCount() {
  imageCount.textContent = `${uploadedImages.length}/${MAX_IMAGES}`
}

// Remove image by ID
function removeImageById(id) {
  console.log('🗑️ 删除图片，ID:', id)
  console.log('📊 删除前图片数量:', uploadedImages.length)
  uploadedImages = uploadedImages.filter(img => img.id != id)
  console.log('📊 删除后图片数量:', uploadedImages.length)
  updateImagePreview()
  updateImageCount()
}

// 调试辅助函数 - 输出当前状态
window.debugNanoBanana = function() {
  console.log('🔍 ========== Nano Banana 状态调试 ==========')
  console.log('📱 设备类型:', isMobile ? '移动端' : '桌面端')
  console.log('🎯 当前模式:', currentMode)
  console.log('📊 已上传图片数量:', uploadedImages.length)
  console.log('📷 图片列表:', uploadedImages.map(img => ({
    id: img.id,
    name: img.name,
    size: img.base64.length + ' bytes'
  })))
  console.log('👁️ 图片上传区域可见性:', !imageUploadSection.classList.contains('hidden'))
  console.log('👁️ 图片预览容器可见性:', !imagePreviewContainer.classList.contains('hidden'))
  console.log('📝 Main Prompt 值:', mainPrompt.value)
  console.log('📝 Main Prompt Placeholder:', mainPrompt.placeholder)
  console.log('🔍 ========================================')
}

// Mode switching logic
function switchToImageToImageMode() {
  console.log('🔄 切换到 Image to Image 模式')
  currentMode = 'image-to-image'

  // Update button styles
  modeImageToImage.className = "flex-1 px-4 py-3 bg-banana-500 text-white rounded-lg font-medium shadow-md hover:bg-banana-600 transition"
  modeTextToImage.className = "flex-1 px-4 py-3 bg-banana-50 text-banana-700 rounded-lg font-medium hover:bg-banana-100 transition"

  // Show image upload section - 移除 hidden 类并清除内联样式
  imageUploadSection.classList.remove("hidden")
  imageUploadSection.style.display = ""
  console.log('✅ 显示图片上传区域')
  console.log('📊 imageUploadSection.classList:', imageUploadSection.classList)
  console.log('📊 imageUploadSection.style.display:', imageUploadSection.style.display)

  // Clear uploaded images
  uploadedImages = []
  updateImagePreview()
  updateImageCount()
  console.log('✅ 已清空上传的图片')

  // Reset main prompt
  if (mainPrompt) {
    mainPrompt.value = ""
    mainPrompt.placeholder = "A futuristic city powered by nano technology, golden hour lighting, ultra detailed..."
    console.log('✅ 已重置 main prompt 输入和 placeholder')
  } else {
    console.error('❌ mainPrompt 元素未找到')
  }

  // Reset output gallery
  resetGeneration()
  console.log('✅ 已重置 output gallery')
}

function switchToTextToImageMode() {
  console.log('🔄 切换到 Text to Image 模式')
  currentMode = 'text-to-image'

  // Update button styles
  modeTextToImage.className = "flex-1 px-4 py-3 bg-banana-500 text-white rounded-lg font-medium shadow-md hover:bg-banana-600 transition"
  modeImageToImage.className = "flex-1 px-4 py-3 bg-banana-50 text-banana-700 rounded-lg font-medium hover:bg-banana-100 transition"

  // Hide image upload section - 使用多种方式确保隐藏
  imageUploadSection.classList.add("hidden")
  imageUploadSection.style.display = "none"
  console.log('✅ 隐藏图片上传区域')
  console.log('📊 imageUploadSection.classList:', imageUploadSection.classList)
  console.log('📊 imageUploadSection.style.display:', imageUploadSection.style.display)

  // Clear uploaded images
  uploadedImages = []
  updateImagePreview()
  updateImageCount()
  console.log('✅ 已清空上传的图片')

  // Reset main prompt
  if (mainPrompt) {
    mainPrompt.value = ""
    mainPrompt.placeholder = "A beautiful sunset over mountains, vibrant colors, photorealistic, 4k quality..."
    console.log('✅ 已重置 main prompt 输入和 placeholder:', mainPrompt.placeholder)
  } else {
    console.error('❌ mainPrompt 元素未找到')
  }

  // Reset output gallery
  resetGeneration()
  console.log('✅ 已重置 output gallery')
}

// 桌面端和移动端都支持 click 事件
modeImageToImage.addEventListener("click", switchToImageToImageMode)
modeTextToImage.addEventListener("click", switchToTextToImageMode)

// 移动端额外添加触摸反馈
if (isMobile) {
  // Image to Image 按钮触摸反馈
  modeImageToImage.addEventListener("touchstart", (e) => {
    if (currentMode !== 'image-to-image') {
      modeImageToImage.classList.add("bg-banana-100")
    }
  })
  modeImageToImage.addEventListener("touchend", (e) => {
    modeImageToImage.classList.remove("bg-banana-100")
  })
  modeImageToImage.addEventListener("touchcancel", (e) => {
    modeImageToImage.classList.remove("bg-banana-100")
  })

  // Text to Image 按钮触摸反馈
  modeTextToImage.addEventListener("touchstart", (e) => {
    if (currentMode !== 'text-to-image') {
      modeTextToImage.classList.add("bg-banana-100")
    }
  })
  modeTextToImage.addEventListener("touchend", (e) => {
    modeTextToImage.classList.remove("bg-banana-100")
  })
  modeTextToImage.addEventListener("touchcancel", (e) => {
    modeTextToImage.classList.remove("bg-banana-100")
  })
}

// 移动端 Generate 按钮触摸反馈
if (isMobile) {
  generateBtn.addEventListener("touchstart", (e) => {
    if (!generateBtn.disabled) {
      generateBtn.style.transform = "scale(0.98)"
    }
  })
  generateBtn.addEventListener("touchend", (e) => {
    generateBtn.style.transform = "scale(1)"
  })
  generateBtn.addEventListener("touchcancel", (e) => {
    generateBtn.style.transform = "scale(1)"
  })
}

generateBtn.addEventListener("click", async () => {
  const prompt = mainPrompt.value.trim()
  const hasImages = uploadedImages.length > 0

  if (!prompt) {
    alert("请输入提示词 / Please enter a prompt")
    return
  }

  // 根据模式判断是否需要图片
  if (currentMode === 'image-to-image' && !hasImages) {
    alert("请先上传图片 / Please upload at least one image")
    return
  }

  // 显示加载状态
  generateBtn.innerHTML = "⏳ Generating..."
  generateBtn.disabled = true

  const loadingMessage = currentMode === 'text-to-image'
    ? 'AI 正在根据您的描述生成图片...'
    : `AI 正在处理您的 ${uploadedImages.length} 张图片...`

  outputArea.innerHTML = `
    <div class="flex flex-col items-center justify-center">
      <div class="w-16 h-16 border-4 border-banana-200 border-t-banana-500 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-600 font-medium">${loadingMessage}</p>
      <p class="text-gray-400 text-sm mt-2">这可能需要 10-30 秒</p>
    </div>
  `

  try {
    console.log('🚀 开始调用 Gemini API...')
    console.log('📝 Mode:', currentMode)
    console.log('📝 Prompt:', prompt)

    let result
    if (currentMode === 'text-to-image') {
      // Text to Image 模式
      console.log('🎨 Text to Image 模式')
      result = await callTextToImageAPI(prompt)
    } else {
      // Image to Image 模式
      console.log('🖼️ Images count:', uploadedImages.length)
      const firstImage = uploadedImages[0].base64
      console.log('🖼️ Image size:', firstImage.length, 'bytes')
      result = await callGeminiAPI(firstImage, prompt)
    }

    console.log('✅ API 返回结果:', result)

    // 显示生成结果
    displayResult(result)

  } catch (error) {
    console.error('❌ API Error:', error)
    console.error('Error details:', error.stack)
    showError(error.message || '未知错误，请查看控制台')
  } finally {
    // 恢复按钮状态
    generateBtn.innerHTML = "⚡ Generate Now"
    generateBtn.disabled = false
  }
})

/**
 * 调用 Text to Image API (Gemini 2.5 Flash Image - Nano Banana)
 */
async function callTextToImageAPI(promptText) {
  const config = window.NANO_BANANA_CONFIG

  console.log('🔍 检查配置...', config)

  if (!config || !config.API_KEY) {
    throw new Error('API 配置未找到，请检查 config.js')
  }

  const requestBody = {
    model: config.MODEL,
    messages: [
      {
        role: "user",
        content: promptText
      }
    ],
    max_tokens: config.MAX_TOKENS,
    temperature: config.TEMPERATURE
  }

  console.log('📤 发送 Text to Image 请求到:', `${config.API_BASE_URL}/chat/completions`)
  console.log('📦 请求体:', requestBody)

  const response = await fetch(`${config.API_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.API_KEY}`,
      'HTTP-Referer': config.SITE_URL,
      'X-Title': config.SITE_NAME
    },
    body: JSON.stringify(requestBody)
  })

  console.log('📥 响应状态:', response.status, response.statusText)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('❌ API 错误响应:', errorData)
    throw new Error(errorData.error?.message || `API 请求失败: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  console.log('📊 完整响应数据:', data)

  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error('❌ 数据格式异常:', data)
    throw new Error('API 返回数据格式异常')
  }

  return data.choices[0].message.images
}

/**
 * 调用 Gemini 2.5 Flash Image API (Image to Image)
 */
async function callGeminiAPI(imageBase64, promptText) {
  const config = window.NANO_BANANA_CONFIG

  console.log('🔍 检查配置...', config)

  if (!config || !config.API_KEY) {
    throw new Error('API 配置未找到，请检查 config.js')
  }

  const requestBody = {
    model: config.MODEL,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: promptText
          },
          {
            type: "image_url",
            image_url: {
              url: imageBase64 // base64 格式：data:image/jpeg;base64,/9j/4AAQ...
            }
          }
        ]
      }
    ],
    max_tokens: config.MAX_TOKENS,
    temperature: config.TEMPERATURE
  }

  console.log('📤 发送请求到:', `${config.API_BASE_URL}/chat/completions`)
  console.log('📦 请求体:', { ...requestBody, messages: [{ role: "user", content: "[图片和文本已隐藏]" }] })

  const response = await fetch(`${config.API_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.API_KEY}`,
      'HTTP-Referer': config.SITE_URL,
      'X-Title': config.SITE_NAME
    },
    body: JSON.stringify(requestBody)
  })

  console.log('📥 响应状态:', response.status, response.statusText)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('❌ API 错误响应:', errorData)
    throw new Error(errorData.error?.message || `API 请求失败: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  console.log('📊 完整响应数据:', data)

  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error('❌ 数据格式异常:', data)
    throw new Error('API 返回数据格式异常')
  }

  return data.choices[0].message.images
}

/**
 * 显示生成结果
 */
function displayResult(resultImages) {
  console.log('🎨 开始显示结果...')
  console.log('📝 结果文本:', resultImages)
  // console.log('🖼️ 原图 base64 长度:', uploadedImageBase64?.length)

  outputArea.classList.add("hidden")
  generatedImage.classList.remove("hidden")

  console.log('✅ 已隐藏 outputArea，显示 generatedImage')

  // 检查返回的内容是否包含图片 URL
  // Gemini 通常返回文本描述，我们显示文本结果和原图
  const resultContainer = document.getElementById("generatedImage")

  // 检查返回结果是否包含图片URL（某些模型可能返回图片链接）
  // const imageUrlMatch = resultText.match(/https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp)/i)

  if (resultImages) {
    // 如果返回的是图片URL，显示图片（居中）
    const imageUrl = resultImages[0].image_url.url;
    resultContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center space-y-6">
        <!-- API 生成的图片 - 居中显示 -->
        <div class="relative max-w-full">
          <img src="${imageUrl}" class="rounded-xl shadow-lg" alt="Generated Image"
               style="max-height: 600px; max-width: 100%; object-fit: contain;">
          <div class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            ✨ AI Generated
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-3 w-full max-w-2xl">
          <button onclick="downloadGeneratedImage('${imageUrl}')" class="flex-1 px-4 py-3 bg-banana-500 text-white rounded-lg hover:bg-banana-600 transition font-medium shadow-md">
            下载图片
          </button>
          <button onclick="copyImageUrl('${imageUrl}')" class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">
            复制链接
          </button>
          <button onclick="resetGeneration()" class="px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
            重新生成
          </button>
        </div>
      </div>
    `
  } else {
    // 如果返回的是文本，居中显示文本结果
    resultContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center space-y-6 p-8">
        <!-- AI 分析结果 -->
        <div class="w-full max-w-3xl bg-gradient-to-br from-banana-50 to-orange-50 rounded-2xl p-8 border-2 border-banana-200 shadow-xl">
          <div class="flex items-center justify-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-banana-500 rounded-full flex items-center justify-center">
              <span class="text-2xl">🤖</span>
            </div>
            <h3 class="font-bold text-gray-900 text-2xl">AI 分析结果</h3>
          </div>
          <div class="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap text-center">${escapeHtml(resultText)}</div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-4">
          <button onclick="copyResult()" class="px-6 py-3 bg-banana-500 text-white rounded-lg hover:bg-banana-600 transition font-medium shadow-md">
            <i class="fa-solid fa-copy mr-2"></i>复制结果
          </button>
          <button onclick="resetGeneration()" class="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
            <i class="fa-solid fa-rotate-right mr-2"></i>重新生成
          </button>
        </div>
      </div>
    `
  }

  console.log('✅ 结果已渲染到页面')
}

/**
 * 显示错误信息
 */
function showError(errorMessage) {
  outputArea.classList.remove("hidden")
  generatedImage.classList.add("hidden")

  outputArea.innerHTML = `
    <div class="flex flex-col items-center justify-center text-center py-8">
      <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-exclamation-triangle text-4xl text-red-500"></i>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">生成失败</h3>
      <p class="text-gray-600 max-w-md mb-4">${escapeHtml(errorMessage)}</p>
      <button onclick="location.reload()" class="px-6 py-2 bg-banana-500 text-white rounded-lg hover:bg-banana-600 transition">
        <i class="fa-solid fa-rotate-right mr-2"></i>刷新页面重试
      </button>
    </div>
  `
}

/**
 * HTML 转义（防止 XSS）
 */
function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * 下载上传的原图 - depreacted
 */
function downloadImage() {
  const link = document.createElement('a')
  // link.href = uploadedImageBase64
  link.download = `nano-banana-${Date.now()}.png`
  link.click()
}

/*
 * 下载生成的图片
 */
function downloadGeneratedImage(imageUrl) {
  const link = document.createElement('a')
  link.href = imageUrl
  link.download = `nano-banana-generated-${Date.now()}.jpg`
  link.target = '_blank'
  link.click()
}

/**
 * 复制图片URL
 */
function copyImageUrl(imageUrl) {
  navigator.clipboard.writeText(imageUrl).then(() => {
    alert('✅ 图片链接已复制到剪贴板！')
  }).catch(() => {
    alert('❌ 复制失败，请手动复制链接')
  })
}

/**
 * 复制结果文本
 */
function copyResult() {
  const resultText = document.querySelector('.whitespace-pre-wrap')?.textContent
  if (resultText) {
    navigator.clipboard.writeText(resultText).then(() => {
      alert('✅ 结果已复制到剪贴板！')
    }).catch(() => {
      alert('❌ 复制失败，请手动选择文本复制')
    })
  }
}

/**
 * 重置生成
 */
function resetGeneration() {
  outputArea.classList.remove("hidden")
  generatedImage.classList.add("hidden")
  outputArea.innerHTML = `
    <div class="w-24 h-24 bg-banana-100 rounded-full flex items-center justify-center mb-4">
      <span class="text-5xl">🖼️</span>
    </div>
    <h3 class="text-xl font-bold text-gray-900 mb-2">Ready for Instant Generation</h3>
    <p class="text-gray-600 max-w-md">Enter your prompt and unleash the power</p>
  `
}

// FAQ Accordion
const faqButtons = document.querySelectorAll(".faq-button")

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling
    const icon = button.querySelector(".faq-icon")

    // Close all other FAQs
    faqButtons.forEach((otherButton) => {
      if (otherButton !== button) {
        const otherContent = otherButton.nextElementSibling
        const otherIcon = otherButton.querySelector(".faq-icon")
        otherContent.classList.add("hidden")
        otherIcon.textContent = "+"
      }
    })

    // Toggle current FAQ
    if (content.classList.contains("hidden")) {
      content.classList.remove("hidden")
      icon.textContent = "−"
    } else {
      content.classList.add("hidden")
      icon.textContent = "+"
    }
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
