(function () {
    const page = document.body.dataset.page || 'home';

    /* 安全初始化：单个组件报错不影响其他 */
    function safeInit(name, fn) {
        try {
            fn();
        } catch (e) {
            console.warn(`[PyLearn] ${name} 初始化失败：${e.message}`);
        }
    }

    /* 全局组件 */
    if (window.Theme && window.Theme.init)
        safeInit('Theme', () => window.Theme.init());
    if (window.Nav && window.Nav.render)
        safeInit('Nav', () => window.Nav.render());
    if (window.ScrollReveal && window.ScrollReveal.init)
        safeInit('ScrollReveal', () => window.ScrollReveal.init());

    /* 返回顶部按钮 */
    const backTop = document.getElementById('backTop');
    if (backTop) {
        window.addEventListener('scroll', () => {
            backTop.classList.toggle('show', window.scrollY > 400);
        });
        backTop.addEventListener('click', () =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
        );
    }

    /* 返回首页淡出动画 */
    const backLink = document.getElementById('backLink');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.style.transition = 'opacity 0.28s ease';
            document.body.style.opacity = '0';
            setTimeout(() => { window.location.href = backLink.href; }, 260);
        });
    }

    /* 页面级初始化——无论前面发生什么，这里一定会执行 */
    const pages = {
        home: () => window.HomePage && window.HomePage.init(),
        course: () => window.CoursePage && window.CoursePage.init(),
        practice: () => window.PracticePage && window.PracticePage.init(),
        progress: () => window.ProgressPage && window.ProgressPage.init()
    };
    safeInit('Page:' + page, pages[page] || (() => { }));

    console.log(`[PyLearn] 页面已就绪：${page} | 课程数：${(window.Lessons || []).length}`);
})();