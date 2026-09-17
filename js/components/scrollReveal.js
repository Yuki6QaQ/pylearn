/* 滚动渐入 */
window.ScrollReveal = {
    observer: null,

    init() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
            return;
        }
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        this.observeAll();
    },

    observeAll() {
        if (!this.observer) return;
        document.querySelectorAll('.fade-up:not(.visible)').forEach(el => {
            this.observer.observe(el);
        });
    }
};