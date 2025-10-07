/**
 * 工具卡片组件
 * 职责:
 * - 根据数据渲染卡片
 * - 卡片点击跳转
 * - 分类颜色映射
 */

/**
 * 创建工具卡片元素
 * @param {Object} tool - 工具数据对象
 * @returns {HTMLElement} - 卡片DOM元素
 */
function createToolCard(tool) {
  // 获取模板
  const template = document.getElementById('tool-card-template');
  if (!template) {
    console.error('Tool card template not found');
    return null;
  }

  // 克隆模板
  const card = template.content.cloneNode(true).querySelector('.tool-card');

  // 设置数据属性
  card.setAttribute('data-tool-id', tool.id);
  card.setAttribute('data-category', tool.category);

  // 设置CSS变量（分类颜色）
  const colorConfig = getCategoryColor(tool.color);
  card.style.setProperty('--category-color', colorConfig.primary);
  card.style.setProperty('--category-glow', colorConfig.glow);

  // 设置光晕颜色类
  const glow = card.querySelector('.tool-card__glow');
  glow.classList.add(`tool-card__glow--${tool.color}`);

  // 设置图标
  const icon = card.querySelector('.tool-icon-img');
  icon.src = tool.thumbnail;
  icon.alt = tool.name;

  // 设置标题
  card.querySelector('.tool-card__title').textContent = tool.name;
  card.querySelector('.tool-card__subtitle').textContent = tool.nameEn;

  // 设置分类标签
  const categorySpan = card.querySelector('.tool-card__category');
  categorySpan.classList.add(`tool-card__category--${tool.color}`);
  categorySpan.querySelector('.tool-category-icon').className = `fa-solid ${tool.icon}`;
  categorySpan.querySelector('.tool-category-name').textContent = tool.category;

  // 设置描述
  card.querySelector('.tool-card__description').textContent = tool.description;

  // 设置标签
  const tagsContainer = card.querySelector('.tool-card__tags');
  tool.tags.forEach(tag => {
    const tagSpan = document.createElement('span');
    tagSpan.className = 'tag';
    tagSpan.textContent = tag;
    tagsContainer.appendChild(tagSpan);
  });

  // 绑定点击事件
  card.addEventListener('click', () => {
    navigateToTool(tool.route);
  });

  return card;
}

/**
 * 获取分类颜色配置
 * @param {string} colorName - 颜色名称
 * @returns {Object} - 颜色配置对象
 */
function getCategoryColor(colorName) {
  const config = window.APP_CONFIG?.COLOR_MAP || {};
  return config[colorName] || config.blue || {
    primary: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.2)'
  };
}

/**
 * 导航到工具页面
 * @param {string} route - 工具路由
 */
function navigateToTool(route) {
  window.location.href = route;
}

/**
 * 批量渲染工具卡片
 * @param {Array} tools - 工具数组
 * @param {HTMLElement} container - 容器元素
 */
function renderToolCards(tools, container) {
  if (!container) {
    console.error('Container not found');
    return;
  }

  // 清空容器
  container.innerHTML = '';

  // 渲染卡片
  tools.forEach(tool => {
    const card = createToolCard(tool);
    if (card) {
      container.appendChild(card);
    }
  });
}

// 暴露到全局
window.ToolCard = {
  create: createToolCard,
  renderMultiple: renderToolCards
};
