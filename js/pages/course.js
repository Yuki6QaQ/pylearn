/* 课程详情 */
window.CoursePage = {
    init() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const container = document.getElementById('courseDetail');
        const nav = document.getElementById('lessonNav');
        if (!container) return;

        const lessons = window.Lessons || [];
        if (!lessons.length) {
            container.innerHTML = this.errorHTML('课程数据未加载，请检查 js/data 目录下的脚本是否都正确引入。');
            return;
        }

        const index = lessons.findIndex(l => l.id === id);
        if (!id || index < 0) {
            if (!id) {
                window.location.replace('course.html?id=' + lessons[0].id);
                return;
            }
            container.innerHTML = this.errorHTML(
                `未找到课程：<code>${window.Format.escape(id)}</code>`
            );
            return;
        }

        const lesson = lessons[index];
        const stage = (window.Stages || []).find(s => s.num === lesson.stage);

        container.innerHTML = `
      <div class="course-breadcrumb">
        阶段 ${lesson.stage} · ${stage ? window.Format.escape(stage.name) : ''}
      </div>
      <h1>${window.Format.escape(lesson.title)}</h1>
      <div class="meta">${window.Format.escape(lesson.desc || '')}</div>
      <div class="content">${window.Format.codeBlocks(lesson.content || '<p>内容准备中…</p>')}</div>
    `;

        if (window.Exercise) {
            const exerciseEl = window.Exercise.render(lesson);
            container.appendChild(exerciseEl);
        }

        window.LessonNav.render(nav, lessons, lesson.id);
        window.ProgressStore.add(lesson.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    errorHTML(msg) {
        return `
      <div class="loading-state">
        <p>${msg}</p>
        <p style="margin-top:16px"><a href="index.html">← 返回首页</a></p>
      </div>`;
    }
};