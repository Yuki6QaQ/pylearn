/* 顶部导航 */
window.Nav = {
    render() {
        const root = document.getElementById('navRoot');
        if (!root) return;

        const cfg = window.PYLEARN_CONFIG;
        const current = document.body.dataset.page || 'home';

        const links = cfg.nav.map(item => {
            const active = item.page === current ? ' class="active"' : '';
            return `<a href="${item.href}"${active}>${item.label}</a>`;
        }).join('');

        root.innerHTML = `
      <div class="nav-inner">
        <a href="index.html" class="logo">
          <span class="logo-dot"></span> ${cfg.siteName}
        </a>
        <nav class="nav-links">${links}</nav>
        <button class="nav-theme" id="themeToggle" aria-label="切换主题">
          ${window.Theme.currentIcon()}
        </button>
      </div>
    `;

        const btn = document.getElementById('themeToggle');
        btn.addEventListener('click', () => {
            window.Theme.toggle();
            btn.textContent = window.Theme.currentIcon();
        });
    }
};