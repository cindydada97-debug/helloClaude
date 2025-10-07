/**
 * 全局配置文件
 * 包含应用的所有配置常量
 */

const CONFIG = {
  // API配置（如果有后端）
  API_BASE_URL: '',

  // CDN配置
  CDN: {
    tailwind: 'https://cdn.tailwindcss.com',
    fontAwesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    chartJs: 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap'
  },

  // 数据文件路径
  DATA_PATHS: {
    tools: './data/tools.json'
  },

  // 搜索配置
  SEARCH: {
    debounceDelay: 300, // 搜索防抖延迟（毫秒）
    minQueryLength: 1,  // 最小搜索字符数
  },

  // 分类颜色映射
  CATEGORY_COLORS: {
    programming: {
      primary: '#3B82F6',
      glow: 'rgba(59, 130, 246, 0.2)'
    },
    productivity: {
      primary: '#10B981',
      glow: 'rgba(16, 185, 129, 0.2)'
    },
    image: {
      primary: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.2)'
    },
    office: {
      primary: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.2)'
    },
    gaming: {
      primary: '#EC4899',
      glow: 'rgba(236, 72, 153, 0.2)'
    }
  },

  // 颜色名称映射
  COLOR_MAP: {
    blue: {
      primary: '#3B82F6',
      light: '#60A5FA',
      glow: 'rgba(59, 130, 246, 0.2)'
    },
    green: {
      primary: '#10B981',
      light: '#34D399',
      glow: 'rgba(16, 185, 129, 0.2)'
    },
    purple: {
      primary: '#8B5CF6',
      light: '#A78BFA',
      glow: 'rgba(139, 92, 246, 0.2)'
    },
    orange: {
      primary: '#F59E0B',
      light: '#FBBF24',
      glow: 'rgba(245, 158, 11, 0.2)'
    },
    pink: {
      primary: '#EC4899',
      light: '#F472B6',
      glow: 'rgba(236, 72, 153, 0.2)'
    }
  }
};

// 将配置暴露到全局（用于其他模块访问）
window.APP_CONFIG = CONFIG;
