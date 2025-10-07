/**
 * 英雄区模块
 * 职责:
 * - 搜索框交互（实时搜索、防抖）
 * - 键盘快捷键（Cmd+K / Ctrl+K）
 * - 搜索建议下拉（可选）
 */

class HeroSearchBox {
  constructor() {
    this.input = document.getElementById('search-input');
    this.suggestions = document.getElementById('search-suggestions');
    this.debounceTimer = null;
    this.debounceDelay = 300; // 毫秒
  }

  init() {
    if (!this.input) {
      console.warn('Search input not found');
      return;
    }

    this.bindEvents();
  }

  bindEvents() {
    // 监听输入事件（防抖）
    this.input.addEventListener('input', (e) => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.handleSearch(e.target.value);
      }, this.debounceDelay);
    });

    // 键盘快捷键 Cmd+K / Ctrl+K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.input.focus();
      }

      // ESC键清空搜索
      if (e.key === 'Escape' && document.activeElement === this.input) {
        this.input.value = '';
        this.hideSuggestions();
        this.handleSearch('');
      }
    });

    // 点击外部关闭建议框
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.hero__search')) {
        this.hideSuggestions();
      }
    });

    // 输入框获得焦点时，如果有内容则显示建议
    this.input.addEventListener('focus', () => {
      if (this.input.value.trim()) {
        this.showSuggestions();
      }
    });
  }

  /**
   * 处理搜索
   * @param {string} query - 搜索关键词
   */
  handleSearch(query) {
    // 触发全局搜索事件
    window.dispatchEvent(new CustomEvent('search', {
      detail: { query: query.trim() }
    }));

    // 显示/隐藏建议框
    if (query.trim()) {
      // TODO: 实现搜索建议功能
      // this.showSuggestions(query);
    } else {
      this.hideSuggestions();
    }
  }

  /**
   * 显示搜索建议
   * @param {string} query - 搜索关键词（可选）
   */
  showSuggestions(query) {
    if (this.suggestions) {
      this.suggestions.classList.add('active');
      // TODO: 根据query生成建议内容
    }
  }

  /**
   * 隐藏搜索建议
   */
  hideSuggestions() {
    if (this.suggestions) {
      this.suggestions.classList.remove('active');
    }
  }

  /**
   * 清空搜索
   */
  clear() {
    this.input.value = '';
    this.hideSuggestions();
    this.handleSearch('');
  }
}

// 自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.heroSearchBox === 'undefined') {
      window.heroSearchBox = new HeroSearchBox();
      window.heroSearchBox.init();
    }
  });
} else {
  if (typeof window.heroSearchBox === 'undefined') {
    window.heroSearchBox = new HeroSearchBox();
    window.heroSearchBox.init();
  }
}
