/**
 * 搜索结果管理器
 * 职责:
 * - 监听搜索事件
 * - 过滤和渲染工具列表
 * - 无结果状态处理
 * - 分类筛选
 */

class SearchResultsManager {
  constructor() {
    this.resultSection = document.getElementById('search-results-section');
    this.toolGrid = document.getElementById('tool-grid');
    this.noResults = document.getElementById('no-results');
    this.resultCount = document.getElementById('result-count');
    this.countPrefix = document.querySelector('.count-prefix');
    this.resultSubtitleEn = document.getElementById('result-subtitle-en');
    this.searchQueryDisplay = document.getElementById('search-query-display');
    this.resetBtn = document.getElementById('reset-search-btn');

    this.allTools = [];
    this.currentQuery = '';
    this.currentCategory = null;
  }

  async init() {
    // 加载所有工具
    await this.loadTools();

    // 绑定事件
    this.bindEvents();

    // 初始显示推荐工具
    this.showFeaturedTools();
  }

  bindEvents() {
    // 监听全局搜索事件
    window.addEventListener('search', (e) => {
      this.currentQuery = e.detail.query;
      this.handleSearch(e.detail.query);
    });

    // 监听分类筛选事件
    window.addEventListener('categoryChange', (e) => {
      this.currentCategory = e.detail.category;
      this.handleCategoryFilter(e.detail.category);
    });

    // 重置按钮
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.resetSearch();
      });
    }
  }

  /**
   * 加载工具数据
   */
  async loadTools() {
    try {
      const dataPath = window.APP_CONFIG?.DATA_PATHS?.tools || '/data/tools.json';
      const response = await fetch(dataPath);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.allTools = data.tools || [];

      console.log(`Loaded ${this.allTools.length} tools`);
    } catch (error) {
      console.error('Failed to load tools:', error);
      this.allTools = [];
    }
  }

  /**
   * 处理搜索
   * @param {string} query - 搜索关键词
   */
  handleSearch(query) {
    if (!query || !query.trim()) {
      this.showFeaturedTools();
      return;
    }

    const results = this.searchTools(query);
    this.renderResults(results, query, 'search');
  }

  /**
   * 处理分类筛选
   * @param {string} category - 分类ID
   */
  handleCategoryFilter(category) {
    // 清空搜索
    this.currentQuery = '';
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = '';
    }

    if (category === 'all' || !category) {
      this.showFeaturedTools();
      return;
    }

    const results = this.filterByCategory(category);
    this.renderResults(results, category, 'category');
  }

  /**
   * 搜索工具（模糊匹配）
   * @param {string} query - 搜索关键词
   * @returns {Array} - 匹配的工具数组
   */
  searchTools(query) {
    const lowerQuery = query.toLowerCase();

    return this.allTools.filter(tool => {
      // 匹配工具名称
      if (tool.name.toLowerCase().includes(lowerQuery)) return true;
      if (tool.nameEn.toLowerCase().includes(lowerQuery)) return true;

      // 匹配描述
      if (tool.description.toLowerCase().includes(lowerQuery)) return true;
      if (tool.descriptionEn && tool.descriptionEn.toLowerCase().includes(lowerQuery)) return true;

      // 匹配标签
      if (tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;

      // 匹配分类
      if (tool.category.toLowerCase().includes(lowerQuery)) return true;
      if (tool.categoryEn && tool.categoryEn.toLowerCase().includes(lowerQuery)) return true;

      return false;
    });
  }

  /**
   * 按分类筛选
   * @param {string} category - 分类名称
   * @returns {Array} - 筛选后的工具数组
   */
  filterByCategory(category) {
    return this.allTools.filter(tool =>
      tool.category === category || tool.categoryEn.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * 渲染搜索结果
   * @param {Array} results - 搜索结果数组
   * @param {string} query - 搜索关键词或分类
   * @param {string} type - 'search' 或 'category'
   */
  renderResults(results, query, type = 'search') {
    // 更新标题
    this.updateResultHeader(results.length, query, type);

    // 清空网格
    this.toolGrid.innerHTML = '';

    // 无结果处理
    if (results.length === 0) {
      this.showNoResults(query);
      return;
    }

    // 隐藏无结果提示
    this.noResults.style.display = 'none';

    // 渲染工具卡片
    results.forEach(tool => {
      const card = createToolCard(tool);
      if (card) {
        this.toolGrid.appendChild(card);
      }
    });

    // 滚动到结果区域（轻微延迟以确保渲染完成）
    setTimeout(() => {
      this.scrollToResults();
    }, 100);
  }

  /**
   * 更新结果头部
   * @param {number} count - 结果数量
   * @param {string} query - 查询内容
   * @param {string} type - 类型
   */
  updateResultHeader(count, query, type) {
    if (type === 'search') {
      this.countPrefix.textContent = `找到 ${count} 个工具`;
      this.resultSubtitleEn.textContent = `FOUND ${count} TOOLS`;
    } else if (type === 'category') {
      this.countPrefix.textContent = `${query} 分类`;
      this.resultSubtitleEn.textContent = `${count} TOOLS`;
    }

    this.resultCount.textContent = '';
  }

  /**
   * 显示无结果状态
   * @param {string} query - 搜索关键词
   */
  showNoResults(query) {
    this.toolGrid.innerHTML = '';
    this.noResults.style.display = 'flex';
    this.searchQueryDisplay.textContent = query;
  }

  /**
   * 显示推荐工具（默认状态）
   */
  showFeaturedTools() {
    const featured = this.allTools.filter(tool => tool.featured);

    // 更新标题
    this.countPrefix.textContent = '推荐工具';
    this.resultCount.textContent = '';
    this.resultSubtitleEn.textContent = 'FEATURED TOOLS';

    // 渲染
    this.toolGrid.innerHTML = '';
    this.noResults.style.display = 'none';

    featured.forEach(tool => {
      const card = createToolCard(tool);
      if (card) {
        this.toolGrid.appendChild(card);
      }
    });
  }

  /**
   * 重置搜索
   */
  resetSearch() {
    this.currentQuery = '';
    this.currentCategory = null;

    // 清空搜索框
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = '';
    }

    // 重置导航栏active状态
    if (window.navigationModule) {
      window.navigationModule.setActiveCategory('all');
    }

    // 显示推荐工具
    this.showFeaturedTools();

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * 滚动到结果区域
   */
  scrollToResults() {
    if (this.resultSection) {
      const navHeight = 80; // 导航栏高度
      const elementPosition = this.resultSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// 自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.searchResultsManager === 'undefined') {
      window.searchResultsManager = new SearchResultsManager();
      window.searchResultsManager.init();
    }
  });
} else {
  if (typeof window.searchResultsManager === 'undefined') {
    window.searchResultsManager = new SearchResultsManager();
    window.searchResultsManager.init();
  }
}
