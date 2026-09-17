/* 进度页 */
window.ProgressPage = {
    init() {
        this.render();
        const resetBtn = document.getElementById('resetProgress');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('确定要重置学习进度吗？')) {
                    window.ProgressStore.reset();
                    this.render();
                }
            });
        }
    },

    render() {
        const bar = document.getElementById('progressBar');
        const text = document.getElementById('progressText');
        const listEl = document.getElementById('doneList');
        const lessons = window.Lessons || [];
        const total = lessons.length || 1;
        const done = window.ProgressStore.all();
        const percent = Math.min(100, Math.round((done.length / total) * 100));

        if (bar) bar.style.width = percent + '%';
        if (text) text.textContent = `已完成 ${done.length} / ${total} 节课（${percent}%）`;

        if (listEl) {
            if (!done.length) {
                listEl.innerHTML = '<li class="empty">还没有完成的课程，去首页开始第一课吧</li>';
            } else {
                listEl.innerHTML = done
                    .map(id => lessons.find(l => l.id === id))
                    .filter(Boolean)
                    .map(l => `<li><a href="course.html?id=${l.id}" style="color:inherit;text-decoration:none">阶段 ${l.stage} · ${window.Format.escape(l.title)}</a></li>`)
                    .join('');
            }
        }
    }
};