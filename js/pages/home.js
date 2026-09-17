window.HomePage = {
    init() {
        this.renderStages();
        this.renderLessons();
        this.updateStats();
        if (window.ScrollReveal) window.ScrollReveal.observeAll();
    },

    stageFirstLesson: {
        '01': 'l01', '02': 'l04', '03': 'l08', '04': 'l12', '05': 'l17',
        '06': 'l21', '07': 'l24', '08': 'l27', '09': 'l30', '10': 'l33'
    },

    renderStages() {
        const grid = document.getElementById('stageGrid');
        if (!grid || !window.Stages) return;
        grid.innerHTML = window.Stages.map(s => {
            const firstId = this.stageFirstLesson[s.num] || 'l01';
            return `
        <a class="stage-card fade-up" href="course.html?id=${firstId}">
          <div class="stage-num">阶段 ${s.num}</div>
          <h3>${window.Format.escape(s.name)}</h3>
          <p>${window.Format.escape(s.desc)}</p>
        </a>
      `;
        }).join('');
    },

    renderLessons() {
        const grid = document.getElementById('lessonGrid');
        if (!grid || !window.Lessons) return;
        grid.innerHTML = window.Lessons.map(l => `
      <a class="lesson-card fade-up" href="course.html?id=${l.id}">
        <span class="lesson-stage">阶段 ${l.stage}</span>
        <h3>${window.Format.escape(l.title)}</h3>
        <p>${window.Format.escape(l.desc)}</p>
      </a>
    `).join('');
    },

    updateStats() {
        if (window.Lessons) {
            const el = document.querySelector('[data-stat="lessons"]');
            if (el) el.textContent = window.Lessons.length;
        }
        if (window.Stages) {
            const el = document.querySelector('[data-stat="stages"]');
            if (el) el.textContent = window.Stages.length;
        }
    }
};