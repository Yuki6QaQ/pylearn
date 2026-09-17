/* ============================================================
   PyLearn 主逻辑
   根据 body[data-page] 执行不同页面的初始化
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    initCommon();
    if (page === 'home') initHome();
    if (page === 'course') initCourseDetail();
    if (page === 'practice') initPractice();
    if (page === 'progress') initProgress();
});

/* ---------- 通用：主题、返回顶部、滚动渐入 ---------- */
function initCommon() {
    // 主题切换
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        const saved = localStorage.getItem('pylearn-theme');
        if (saved === 'light') document.body.classList.add('light');
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light');
            localStorage.setItem('pylearn-theme', document.body.classList.contains('light') ? 'light' : 'dark');
        });
    }

    // 返回顶部
    const backTop = document.getElementById('backTop');
    if (backTop) {
        window.addEventListener('scroll', () => {
            backTop.classList.toggle('show', window.scrollY > 400);
        });
        backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // 返回链接动画（二级页）
    const backLink = document.getElementById('backLink');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '0';
            setTimeout(() => { window.location.href = backLink.href; }, 300);
        });
    }

    // 滚动渐入
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

const statNums = document.querySelectorAll('.hero-stats .stat b');
if (statNums.length >= 2 && window.LESSONS && window.STAGES) {
    statNums[0].textContent = window.LESSONS.length;
    statNums[1].textContent = window.STAGES.length;
}
/* ---------- 首页 ---------- */
function initHome() {
    // 渲染阶段
    const stageGrid = document.getElementById('stageGrid');
    if (stageGrid && window.STAGES) {
        stageGrid.innerHTML = window.STAGES.map(s => `
      <div class="stage-card fade-up">
        <div class="stage-num">阶段 ${s.num}</div>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
    }

    // 渲染课程卡片
    const lessonGrid = document.getElementById('lessonGrid');
    if (lessonGrid && window.LESSONS) {
        lessonGrid.innerHTML = window.LESSONS.map(l => `
      <a class="lesson-card fade-up" href="course.html?id=${l.id}">
        <span class="lesson-stage">阶段 ${l.stage}</span>
        <h3>${l.title}</h3>
        <p>${l.desc}</p>
      </a>
    `).join('');
    }

    // 重新观察新增的 fade-up 元素
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* ---------- 课程详情页 ---------- */
function initCourseDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('courseDetail');
    const nav = document.getElementById('lessonNav');
    if (!container) return;

    const lessons = window.LESSONS || [];
    const index = lessons.findIndex(l => l.id === id);
    const lesson = lessons[index];

    if (!lesson) {
        container.innerHTML = '<div class="loading-state">未找到该课程，<a href="index.html">返回首页</a></div>';
        return;
    }

    const stage = window.STAGES?.find(s => s.num === lesson.stage);

    container.innerHTML = `
    <div class="course-breadcrumb">阶段 ${lesson.stage} · ${stage ? stage.name : ''}</div>
    <h1>${lesson.title}</h1>
    <div class="meta">${lesson.desc}</div>
    <div class="content">${renderContent(lesson.content || '<p>内容准备中…</p>')}</div>
  `;

    // 上一课 / 下一课 导航
    if (nav) {
        const prev = index > 0 ? lessons[index - 1] : null;
        const next = index < lessons.length - 1 ? lessons[index + 1] : null;
        nav.innerHTML = `
      ${prev
                ? `<a class="lesson-nav-btn prev" href="course.html?id=${prev.id}">
             <span class="nav-arrow">←</span>
             <span class="nav-text"><small>上一课</small>${prev.title}</span>
           </a>`
                : '<span></span>'}
      ${next
                ? `<a class="lesson-nav-btn next" href="course.html?id=${next.id}">
             <span class="nav-text"><small>下一课</small>${next.title}</span>
             <span class="nav-arrow">→</span>
           </a>`
                : '<span></span>'}
    `;
    }

    markLessonDone(lesson.id);
}

/* ---------- 把 ~~~ 代码块转成安全的 <pre><code> ---------- */
function renderContent(raw) {
    const blocks = [];
    let text = raw.replace(/~~~\w*\n([\s\S]*?)~~~/g, (m, code) => {
        const escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        blocks.push(`<pre class="code-block"><code>${escaped}</code></pre>`);
        return `\u0000B${blocks.length - 1}\u0000`;
    });
    text = text.replace(/\u0000B(\d+)\u0000/g, (m, i) => blocks[+i]);
    return text;
}

/* ---------- 练习场 ---------- */
function initPractice() {
    const runBtn = document.getElementById('runCode');
    const clearBtn = document.getElementById('clearCode');
    const input = document.getElementById('codeInput');
    const output = document.getElementById('codeOutput');
    if (!runBtn || !input || !output) return;

    runBtn.addEventListener('click', () => {
        const code = input.value;
        output.textContent = '// 模拟执行结果\n';
        // 简单模拟：识别 print 语句
        const lines = code.split('\n');
        let hasOutput = false;
        lines.forEach(line => {
            const match = line.match(/print\s*\(\s*(.*?)\s*\)/);
            if (match) {
                let expr = match[1];
                // 去掉引号
                expr = expr.replace(/^["']|["']$/g, '');
                output.textContent += expr + '\n';
                hasOutput = true;
            }
        });
        if (!hasOutput) output.textContent += '(没有检测到 print 输出)';
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        output.textContent = '// 输出将显示在这里';
    });
}

/* ---------- 进度页 ---------- */
function initProgress() {
    const bar = document.getElementById('progressBar');
    const text = document.getElementById('progressText');
    const resetBtn = document.getElementById('resetProgress');
    if (!bar || !text) return;

    function update() {
        const done = JSON.parse(localStorage.getItem('pylearn-done') || '[]');
        const total = window.LESSONS?.length || 1;
        const percent = Math.min(100, Math.round((done.length / total) * 100));
        bar.style.width = percent + '%';
        text.textContent = `已完成 ${done.length} / ${total} 节课`;
    }

    resetBtn?.addEventListener('click', () => {
        localStorage.removeItem('pylearn-done');
        update();
    });

    update();
}

/* 标记课程完成 */
function markLessonDone(id) {
    const done = JSON.parse(localStorage.getItem('pylearn-done') || '[]');
    if (!done.includes(id)) {
        done.push(id);
        localStorage.setItem('pylearn-done', JSON.stringify(done));
    }
}