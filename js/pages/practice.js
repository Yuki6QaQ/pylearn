/* ============================================================
   PracticePage —— 闯关练习页逻辑
   ============================================================ */

window.PracticePage = {
    currentLevel: 'easy',

    init() {
        this.bindTabs();
        this.renderLevel(this.currentLevel);
    },

    bindTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentLevel = btn.dataset.level;
                this.renderLevel(this.currentLevel);
            });
        });
    },

    renderLevel(level) {
        const area = document.getElementById('questionArea');
        const data = window.PracticeQuestions;
        if (!area || !data) return;

        if (level === 'free') {
            area.innerHTML = this.renderFreeMode(data.free);
            this.bindFreeMode();
            return;
        }

        const questions = data[level] || [];
        if (!questions.length) {
            area.innerHTML = '<p class="empty-tip">该难度暂无题目。</p>';
            return;
        }

        area.innerHTML = questions.map((q, i) => this.renderQuestion(q, i + 1)).join('');
        this.bindQuestionEvents();
    },

    renderQuestion(q, num) {
        const answerId = 'ans-' + q.id;
        return `
      <div class="question-item" data-id="${q.id}">
        <div class="question-header">
          <span class="question-num">第 ${num} 题</span>
          <h3 class="question-title">${this.escape(q.title)}</h3>
        </div>
        <p class="question-desc">${q.desc}</p>
        <textarea class="question-code" spellcheck="false">${this.escape(q.starterCode)}</textarea>
        <div class="question-actions">
          <button class="btn btn-primary btn-run">▶ 运行</button>
          <button class="btn btn-success btn-check">✓ 验证答案</button>
          <button class="btn btn-secondary btn-answer">💡 查看解答</button>
          <button class="btn btn-secondary btn-reset">重置</button>
          <span class="question-status"></span>
        </div>
        <pre class="question-output">// 运行结果将显示在这里</pre>
        <div class="question-answer" id="${answerId}" style="display:none">
          <div class="answer-head">参考解答</div>
          <pre class="answer-code">${this.escape(q.answer)}</pre>
        </div>
      </div>
    `;
    },

    bindQuestionEvents() {
        document.querySelectorAll('.question-item').forEach(item => {
            const id = item.dataset.id;
            const q = this.findQuestion(id);
            if (!q) return;

            const codeEl = item.querySelector('.question-code');
            const outputEl = item.querySelector('.question-output');
            const statusEl = item.querySelector('.question-status');
            const runBtn = item.querySelector('.btn-run');
            const checkBtn = item.querySelector('.btn-check');
            const answerBtn = item.querySelector('.btn-answer');
            const resetBtn = item.querySelector('.btn-reset');
            const answerEl = item.querySelector('.question-answer');
            const originalCode = codeEl.value;

            const setStatus = (text, type) => {
                statusEl.textContent = text;
                statusEl.className = 'question-status' + (type ? ' is-' + type : '');
            };

            runBtn.addEventListener('click', async () => {
                runBtn.disabled = true;
                setStatus('', '');
                await window.PythonRunner.run(codeEl.value, outputEl, statusEl);
                runBtn.disabled = false;
            });

            checkBtn.addEventListener('click', async () => {
                checkBtn.disabled = true;
                setStatus('检查中…', '');
                const result = await window.PythonRunner.run(codeEl.value, outputEl, null);
                const ok = this.verify(result.output, codeEl.value, q.check);
                if (ok) {
                    setStatus('✓ 通过！', 'ok');
                    outputEl.textContent += '\n\n✓ 答案验证通过';
                } else {
                    setStatus('✗ 未通过，再试试', 'fail');
                    outputEl.textContent += '\n\n✗ 答案未通过验证，可点击「查看解答」参考';
                }
                checkBtn.disabled = false;
            });

            answerBtn.addEventListener('click', () => {
                const show = answerEl.style.display === 'none';
                answerEl.style.display = show ? 'block' : 'none';
                answerBtn.textContent = show ? '🙈 隐藏解答' : '💡 查看解答';
            });

            resetBtn.addEventListener('click', () => {
                codeEl.value = originalCode;
                outputEl.textContent = '// 运行结果将显示在这里';
                setStatus('', '');
                answerEl.style.display = 'none';
                answerBtn.textContent = '💡 查看解答';
            });

            codeEl.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = codeEl.selectionStart;
                    const end = codeEl.selectionEnd;
                    codeEl.value = codeEl.value.slice(0, start) + '    ' + codeEl.value.slice(end);
                    codeEl.selectionStart = codeEl.selectionEnd = start + 4;
                }
            });
        });
    },

    renderFreeMode(free) {
        return `
      <div class="question-item free-mode">
        <div class="question-header">
          <span class="question-num">自由练习</span>
        </div>
        <p class="question-desc">${free.desc}</p>
        <textarea class="question-code" spellcheck="false">${this.escape(free.starterCode)}</textarea>
        <div class="question-actions">
          <button class="btn btn-primary btn-run">▶ 运行</button>
          <button class="btn btn-secondary btn-reset">重置</button>
          <span class="question-status"></span>
        </div>
        <pre class="question-output">// 运行结果将显示在这里</pre>
      </div>
    `;
    },

    bindFreeMode() {
        const item = document.querySelector('.free-mode');
        if (!item) return;
        const codeEl = item.querySelector('.question-code');
        const outputEl = item.querySelector('.question-output');
        const statusEl = item.querySelector('.question-status');
        const runBtn = item.querySelector('.btn-run');
        const resetBtn = item.querySelector('.btn-reset');
        const originalCode = codeEl.value;

        runBtn.addEventListener('click', async () => {
            runBtn.disabled = true;
            statusEl.textContent = '';
            await window.PythonRunner.run(codeEl.value, outputEl, statusEl);
            runBtn.disabled = false;
        });

        resetBtn.addEventListener('click', () => {
            codeEl.value = originalCode;
            outputEl.textContent = '// 运行结果将显示在这里';
            statusEl.textContent = '';
        });

        codeEl.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = codeEl.selectionStart;
                const end = codeEl.selectionEnd;
                codeEl.value = codeEl.value.slice(0, start) + '    ' + codeEl.value.slice(end);
                codeEl.selectionStart = codeEl.selectionEnd = start + 4;
            }
        });
    },

    findQuestion(id) {
        const data = window.PracticeQuestions;
        const all = [...(data.easy || []), ...(data.normal || []), ...(data.hard || [])];
        return all.find(q => q.id === id);
    },

    verify(output, code, check) {
        if (!check) return !!output && !output.includes('❌');
        if (typeof check === 'function') return !!check(output, code);
        if (Array.isArray(check)) return check.every(kw => output.includes(kw));
        if (typeof check === 'object') {
            let ok = true;
            if (Array.isArray(check.output)) ok = ok && check.output.every(kw => output.includes(kw));
            if (Array.isArray(check.code)) ok = ok && check.code.every(kw => code.includes(kw));
            if (Array.isArray(check.notOutput)) ok = ok && check.notOutput.every(kw => !output.includes(kw));
            return ok;
        }
        return false;
    },

    escape(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
};