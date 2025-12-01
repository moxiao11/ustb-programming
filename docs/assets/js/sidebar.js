/**
 * Docsify Sidebar Smooth Sync Plugin
 * 侧边栏平滑滚动同步插件 - 优化版
 */

const scrollBarSyncPlugin = (hook, vm) => {
  // 页面加载完成后执行
  hook.doneEach(() => {
    // 使用 setTimeout 给 DOM 渲染留出一点缓冲时间，避免瞬闪
    setTimeout(() => {
      const activeNode = getActiveNode();
      syncScrollTop(activeNode);
    }, 150);
  });

  // 监听哈希变化，处理点击链接后的侧边栏状态
  hook.ready(() => {
    window.addEventListener('hashchange', () => {
      setTimeout(() => {
        const activeNode = getActiveNode();
        syncScrollTop(activeNode);
      }, 150);
    });
  });
};

/**
 * 平滑滚动到激活节点
 * @param {HTMLElement} activeNode 
 */
const syncScrollTop = (activeNode) => {
  if (activeNode) {
    // 核心优化：使用 smooth 模式，并将元素滚动到视口中间，体验更聚焦
    activeNode.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  }
};

/**
 * 获取当前激活的侧边栏节点
 */
const getActiveNode = () => {
  // 1. 尝试直接获取 Docsify 标记的 active 类
  let node = document.querySelector('.sidebar-nav .active');

  // 2. 如果没找到（有时 Docsify 延迟），手动根据 URL 匹配
  if (!node) {
    const currentHash = decodeURIComponent(location.hash).replace(/ /gi, '%20');
    const curLink = document.querySelector(`.sidebar-nav a[href="${currentHash}"]`);
    
    if (curLink) {
      // 找到链接所在的 li 标签
      node = findTagParent(curLink, 'LI');
      if (node) {
        node.classList.add('active'); // 手动补上 active 类
      }
    }
  }
  return node;
};

/**
 * 向上查找指定标签名的父元素 (辅助函数)
 * @param {HTMLElement} element 起始元素
 * @param {String} tagName 目标标签名 (如 'LI')
 */
const findTagParent = (element, tagName) => {
  if (!element) return null;
  let current = element;
  tagName = tagName.toUpperCase();
  
  while (current && current.tagName !== tagName && current.classList && !current.classList.contains('sidebar-nav')) {
    current = current.parentElement;
  }
  
  // 如果找到了对应的标签
  if (current && current.tagName === tagName) {
    return current;
  }
  return null;
};

// 注册插件
window.$docsify = window.$docsify || {};
window.$docsify.plugins = (window.$docsify.plugins || []).concat([scrollBarSyncPlugin]);