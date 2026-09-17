/* 上下课导航渲染 */
window.LessonNav = {
    render(container, lessons, currentId) {
        if (!container) return;
        const index = lessons.findIndex(l => l.id === currentId);
        if (index < 0) {
            container.innerHTML = '';
            return;
        }
        const prev = index > 0 ? lessons[index - 1] : null;
        const next = index < lessons.length - 1 ? lessons[index + 1] : null;

        container.innerHTML = `
      ${prev ? `
        <a class="lesson-nav-btn prev" href="course.html?id=${prev.id}">
          <span class="nav-arrow">←</span>
          <span class="nav-text">
            <small>上一课</small>${window.Format.escape(prev.title)}
          </span>
        </a>` : '<span></span>'}
      ${next ? `
        <a class="lesson-nav-btn next" href="course.html?id=${next.id}">
          <span class="nav-text">
            <small>下一课</small>${window.Format.escape(next.title)}
          </span>
          <span class="nav-arrow">→</span>
        </a>` : '<span></span>'}
    `;
    }
};