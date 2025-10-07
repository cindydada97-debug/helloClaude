/**
 * Nano Banana Configuration
 *
 * ⚠️ 安全提示：
 * 在生产环境中，API Key 不应该暴露在前端代码中。
 * 建议使用后端代理服务器来调用 API。
 * 当前配置仅用于开发测试。
 */

const NANO_BANANA_CONFIG = {
  // OpenRouter API 配置
  API_KEY: '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',
  API_BASE_URL: 'https://openrouter.ai/api/v1',
  MODEL: 'google/gemini-2.5-flash-image-preview',

  // 网站信息（用于 OpenRouter 排名）
  SITE_URL: 'http://localhost:8000',
  SITE_NAME: 'Nano Banana - HappyPuppy.ai',

  // 请求配置
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
}

// 暴露到全局
window.NANO_BANANA_CONFIG = NANO_BANANA_CONFIG
