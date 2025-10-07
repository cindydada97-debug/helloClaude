/**
 * 导航栏模块
 * 职责:
 * - 分类筛选交互
 * - 移动端汉堡菜单
 * - Active状态管理
 * - 滚动时导航栏样式变化（可选）
 */

class NavigationModule {
  constructor() {
    this.nav = document.getElementById('main-navigation');
    this.categoryNav = document.getElementById('category-nav');
    this.categoryLinks = document.querySelectorAll('.category-link');
    this.hamburgerBtn = document.getElementById('hamburger-menu-btn');
    this.searchTriggerBtn = document.getElementById('search-trigger-btn');
    this.currentCategory = null;
  }

  /**
   * 初始化导航栏
   */
  init() {
    this.bindEvents();
    this.handleInitialRoute();
    this.initScrollEffect(); // 可选：滚动效果
  }

  /**
   * 绑定事件监听器
   */
  bindEvents() {
    // 分类链接点击
    this.categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.dataset.category;
        this.handleCategoryClick(category);
      });
    });

    // 汉堡菜单切换
    if (this.hamburgerBtn) {
      this.hamburgerBtn.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    // 搜索按钮（聚焦到搜索框）
    if (this.searchTriggerBtn) {
      this.searchTriggerBtn.addEventListener('click', () => {
        this.focusSearchBox();
      });
    }

    // 监听URL变化（浏览器前进/后退）
    window.addEventListener('popstate', () => {
      this.handleInitialRoute();
    });

    // 点击外部关闭移动菜单
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!e.target.closest('.navigation')) {
          this.closeMobileMenu();
        }
      }
    });
  }

  /**
   * 处理分类点击
   * @param {string} category - 分类ID
   */
  handleCategoryClick(category) {
    // 更新Active状态
    this.setActiveCategory(category);

    // 更新URL（不刷新页面）
    const url = category === 'all' ? '/' : `?category=${category}`;
    window.history.pushState({ category }, '', url);

    // 关闭移动菜单
    this.closeMobileMenu();

    // 触发全局分类筛选事件
    window.dispatchEvent(new CustomEvent('categoryChange', {
      detail: { category }
    }));
  }

  /**
   * 设置Active分类
   * @param {string} category - 分类ID
   */
  setActiveCategory(category) {
    this.currentCategory = category;

    // 移除所有Active类
    this.categoryLinks.forEach(link => {
      link.classList.remove('category-link--active');
    });

    // 添加Active类到当前分类
    if (category && category !== 'all') {
      const activeLink = document.querySelector(`[data-category="${category}"]`);
      if (activeLink) {
        activeLink.classList.add('category-link--active');
      }
    }
  }

  /**
   * 处理初始路由（页面加载或浏览器后退）
   */
  handleInitialRoute() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    this.setActiveCategory(category);
  }

  /**
   * 切换移动菜单
   */
  toggleMobileMenu() {
    this.categoryNav.classList.toggle('active');
    this.hamburgerBtn.classList.toggle('active');
  }

  /**
   * 关闭移动菜单
   */
  closeMobileMenu() {
    this.categoryNav.classList.remove('active');
    this.hamburgerBtn.classList.remove('active');
  }

  /**
   * 聚焦到搜索框
   */
  focusSearchBox() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();

      // 滚动到搜索框位置
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  /**
   * 初始化滚动效果（可选）
   * - 滚动时改变导航栏透明度/阴影
   */
  initScrollEffect() {
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // 向下滚动超过100px后，增强导航栏背景
      if (scrollTop > 100) {
        this.nav.style.background = 'rgba(10, 10, 15, 0.95)';
        this.nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
      } else {
        this.nav.style.background = 'rgba(10, 10, 15, 0.8)';
        this.nav.style.boxShadow = 'none';
      }

      lastScrollTop = scrollTop;
    });
  }
}

// 自动初始化（如果在主页面中引入）
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.navigationModule === 'undefined') {
      window.navigationModule = new NavigationModule();
      window.navigationModule.init();
    }
  });
} else {
  if (typeof window.navigationModule === 'undefined') {
    window.navigationModule = new NavigationModule();
    window.navigationModule.init();
  }
}
