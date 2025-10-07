/**
 * 页脚模块
 * 职责:
 * - 动态更新年份
 * - 链接交互（可选）
 */

class FooterModule {
  constructor() {
    this.footer = document.getElementById('main-footer');
    this.yearSpan = document.getElementById('current-year');
  }

  init() {
    this.updateYear();
    this.bindEvents();
  }

  /**
   * 更新当前年份
   */
  updateYear() {
    if (this.yearSpan) {
      const currentYear = new Date().getFullYear();
      this.yearSpan.textContent = currentYear;
    }
  }

  /**
   * 绑定事件（可选功能）
   */
  bindEvents() {
    // 可以添加链接点击跟踪等功能
    const links = this.footer?.querySelectorAll('.footer__link');
    links?.forEach(link => {
      link.addEventListener('click', (e) => {
        // 可以添加分析跟踪代码
        // console.log('Footer link clicked:', link.href);
      });
    });
  }
}

// 自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.footerModule === 'undefined') {
      window.footerModule = new FooterModule();
      window.footerModule.init();
    }
  });
} else {
  if (typeof window.footerModule === 'undefined') {
    window.footerModule = new FooterModule();
    window.footerModule.init();
  }
}
