/**
 * 主应用逻辑
 * 职责:
 * - 初始化所有模块
 * - 协调模块间通信
 * - 处理全局事件
 */

class HappyPuppyApp {
  constructor() {
    this.modules = {
      navigation: null,
      hero: null,
      searchResults: null,
      footer: null
    };

    this.initialized = false;
  }

  /**
   * 初始化应用
   */
  async init() {
    if (this.initialized) {
      console.warn('App already initialized');
      return;
    }

    console.log('Initializing HappyPuppy.ai...');

    try {
      // 1. 等待所有模块初始化
      await this.initializeModules();

      // 2. 设置全局事件监听
      this.setupGlobalListeners();

      // 3. 处理初始路由
      this.handleInitialRoute();

      // 4. 标记为已初始化
      this.initialized = true;

      console.log('✓ HappyPuppy.ai initialized successfully');
    } catch (error) {
      console.error('Failed to initialize app:', error);
    }
  }

  /**
   * 初始化所有模块
   */
  async initializeModules() {
    // 导航栏模块
    if (window.navigationModule) {
      this.modules.navigation = window.navigationModule;
    }

    // 英雄区模块（搜索框）
    if (window.heroSearchBox) {
      this.modules.hero = window.heroSearchBox;
    }

    // 搜索结果模块
    if (window.searchResultsManager) {
      this.modules.searchResults = window.searchResultsManager;
      // 确保数据加载完成
      if (!this.modules.searchResults.initialized) {
        await this.modules.searchResults.init();
      }
    }

    // 页脚模块
    if (window.footerModule) {
      this.modules.footer = window.footerModule;
    }

    console.log('Modules initialized:', Object.keys(this.modules));
  }

  /**
   * 设置全局事件监听
   */
  setupGlobalListeners() {
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.onPageVisible();
      }
    });

    // 监听在线/离线状态
    window.addEventListener('online', () => {
      this.onOnline();
    });

    window.addEventListener('offline', () => {
      this.onOffline();
    });

    // 监听窗口大小变化（可选：响应式处理）
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.onResize();
      }, 250);
    });
  }

  /**
   * 处理初始路由
   * - 检查URL参数
   * - 恢复用户状态
   */
  handleInitialRoute() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const query = urlParams.get('q');

    if (query) {
      // 如果有搜索参数，触发搜索
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.value = query;
        window.dispatchEvent(new CustomEvent('search', {
          detail: { query }
        }));
      }
    } else if (category) {
      // 如果有分类参数，触发分类筛选
      window.dispatchEvent(new CustomEvent('categoryChange', {
        detail: { category }
      }));
    }
  }

  /**
   * 页面重新可见时触发
   */
  onPageVisible() {
    // 可以在此处刷新数据或重新检查状态
    console.log('Page visible');
  }

  /**
   * 网络连接恢复
   */
  onOnline() {
    console.log('Network online');
    // 可以显示提示或重新加载数据
  }

  /**
   * 网络断开
   */
  onOffline() {
    console.log('Network offline');
    // 可以显示离线提示
  }

  /**
   * 窗口大小变化
   */
  onResize() {
    const width = window.innerWidth;
    console.log('Window resized:', width);

    // 可以根据屏幕大小执行不同操作
    if (width < 768) {
      // 移动端
    } else if (width < 1024) {
      // 平板
    } else {
      // 桌面
    }
  }

  /**
   * 获取模块实例
   * @param {string} moduleName - 模块名称
   * @returns {Object|null} - 模块实例
   */
  getModule(moduleName) {
    return this.modules[moduleName] || null;
  }
}

// 创建全局应用实例
window.happyPuppyApp = new HappyPuppyApp();

// DOM加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.happyPuppyApp.init();
  });
} else {
  // 如果DOM已经加载完成，直接初始化
  window.happyPuppyApp.init();
}

// 导出供外部使用
export default HappyPuppyApp;
