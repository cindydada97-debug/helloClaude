// Image Upload Functionality
const dropZone = document.getElementById("dropZone")
const fileInput = document.getElementById("fileInput")
const uploadPrompt = document.getElementById("uploadPrompt")
const imagePreview = document.getElementById("imagePreview")
const previewImg = document.getElementById("previewImg")
const removeImage = document.getElementById("removeImage")

// 检测是否为移动设备
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

// 根据设备类型更新提示文字
if (isMobile) {
  const hintText = uploadPrompt.querySelector('.text-xs')
  if (hintText) {
    hintText.textContent = '点击选择图片或拍照'
  }
}

// Click to upload (移动端和桌面端都支持)
dropZone.addEventListener("click", () => {
  fileInput.click()
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

// File input change (移动端和桌面端都支持)
fileInput.addEventListener("change", (e) => {
  handleFile(e.target.files[0])
})

// Drag and drop (仅桌面端)
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

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFile(file)
    }
  })
}

// 存储上传的图片 base64 数据
let uploadedImageBase64 = null

// Handle file upload
function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    alert("Please upload a valid image file")
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    uploadedImageBase64 = e.target.result // 保存 base64 数据用于 API 调用
    previewImg.src = e.target.result
    uploadPrompt.classList.add("hidden")
    imagePreview.classList.remove("hidden")
  }
  reader.readAsDataURL(file)
}

// Remove image
removeImage.addEventListener("click", (e) => {
  e.stopPropagation()
  uploadedImageBase64 = null // 清除保存的图片数据
  previewImg.src = ""
  fileInput.value = ""
  uploadPrompt.classList.remove("hidden")
  imagePreview.classList.add("hidden")
})

// Generate Button
const generateBtn = document.getElementById("generateBtn")
const mainPrompt = document.getElementById("mainPrompt")
const outputArea = document.getElementById("outputArea")
const generatedImage = document.getElementById("generatedImage")
const resultImg = document.getElementById("resultImg")

generateBtn.addEventListener("click", async () => {
  const prompt = mainPrompt.value.trim()
  const hasImage = uploadedImageBase64 !== null

  if (!prompt) {
    alert("请输入提示词 / Please enter a prompt")
    return
  }

  if (!hasImage) {
    alert("请先上传图片 / Please upload an image first")
    return
  }

  // 显示加载状态
  generateBtn.innerHTML = "⏳ Generating..."
  generateBtn.disabled = true
  outputArea.innerHTML = `
    <div class="flex flex-col items-center justify-center">
      <div class="w-16 h-16 border-4 border-banana-200 border-t-banana-500 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-600 font-medium">AI 正在处理您的图片...</p>
      <p class="text-gray-400 text-sm mt-2">这可能需要 10-30 秒</p>
    </div>
  `

  try {
    console.log('🚀 开始调用 Gemini API...')
    console.log('📝 Prompt:', prompt)
    console.log('🖼️ Image size:', uploadedImageBase64.length, 'bytes')

    // 调用 Gemini 2.5 Flash Image API
    const result = await callGeminiAPI(uploadedImageBase64, prompt)

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
 * 调用 Gemini 2.5 Flash Image API
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
function displayResult(resultText) {
  console.log('🎨 开始显示结果...')
  console.log('📝 结果文本:', resultText)
  console.log('🖼️ 原图 base64 长度:', uploadedImageBase64?.length)

  outputArea.classList.add("hidden")
  generatedImage.classList.remove("hidden")

  console.log('✅ 已隐藏 outputArea，显示 generatedImage')

  // 检查返回的内容是否包含图片 URL
  // Gemini 通常返回文本描述，我们显示文本结果和原图
  const resultContainer = document.getElementById("generatedImage")

  // 检查返回结果是否包含图片URL（某些模型可能返回图片链接）
  // const imageUrlMatch = resultText.match(/https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp)/i)

  if (resultText) {
    // 如果返回的是图片URL，显示图片
    const imageUrl = resultText[0].image_url.url;
    resultContainer.innerHTML = `
      <div class="space-y-4">
        <!-- API 生成的图片 -->
        <div class="relative">
          <img src="${imageUrl}" class="w-full rounded-xl shadow-lg mx-auto" alt="Generated Image"
               style="max-height: 600px; object-fit: contain;">
          <div class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            ✨ AI Generated
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-3">
          <button onclick="downloadGeneratedImage('${imageUrl}')" class="flex-1 px-4 py-3 bg-banana-500 text-white rounded-lg hover:bg-banana-600 transition font-medium shadow-md">
            <i class="fa-solid fa-download mr-2"></i>下载图片
          </button>
          <button onclick="copyImageUrl('${imageUrl}')" class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">
            <i class="fa-solid fa-copy mr-2"></i>复制链接
          </button>
          <button onclick="resetGeneration()" class="px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
            <i class="fa-solid fa-rotate-right mr-2"></i>重新生成
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
 * 下载上传的原图
 */
function downloadImage() {
  const link = document.createElement('a')
  link.href = uploadedImageBase64
  link.download = `nano-banana-${Date.now()}.png`
  link.click()
}

/**
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
