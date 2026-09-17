/* 主题切换 */
window.Theme = {
    init() {
        const saved = window.ThemeStore.get();
        if (saved === 'light') document.body.classList.add('light');
    },
    toggle() {
        document.body.classList.toggle('light');
        window.ThemeStore.set(
            document.body.classList.contains('light') ? 'light' : 'dark'
        );
    },
    currentIcon() {
        return document.body.classList.contains('light') ? '☾' : '☀';
    }
};