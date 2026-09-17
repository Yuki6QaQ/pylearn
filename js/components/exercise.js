/* ============================================================
   Exercise —— 渲染本章要点 + 练习区（含验证答案 + 查看答案）
   ============================================================ */

window.Exercise = {
    render(lesson) {
        const wrap = document.createElement('section');
        wrap.className = 'exercise-section';

        /* ========== 1. 本章要点 ========== */
        const summary = (window.Summaries && window.Summaries[lesson.id]) || [];
        if (summary.length) {
            const sumEl = document.createElement('div');
            sumEl.className = 'lesson-summary';
            sumEl.innerHTML = `
        <div class="summary-title">📚 本章要点</div>
        <ul class="summary-list">
          ${summary.map(s => `<li>${this.escape(s)}</li>`).join('')}
        </ul>
      `;
            wrap.appendChild(sumEl);
        }

        /* ========== 2. 练习题标题 ========== */
        const header = document.createElement('div');
        header.className = 'exercise-header-wrap';
        header.innerHTML = `
      <h2 class="exercise-title">✏️ 动手练习</h2>
      <p class="exercise-hint">
        在代码框里写 Python 代码，点「运行」查看结果，点「验证答案」检查对错。
        <span class="exercise-note">首次运行需要加载 Python 环境，约 5—10 秒。</span>
      </p>
    `;
        wrap.appendChild(header);

        /* ========== 3. 练习列表 ========== */
        const exercises = (window.Exercises && window.Exercises[lesson.id]) || [];
        if (exercises.length) {
            exercises.forEach((ex, i) => wrap.appendChild(this.renderOne(ex, i + 1)));
        } else {
            wrap.appendChild(this.renderOne({
                title: '自由练习',
                desc: '把上面的代码改一改，运行看看效果。',
                code: 'print("Hello, PyLearn!")\n',
                answer: 'print("Hello, PyLearn!")\n',
                check: ['Hello']
            }, 1));
        }

        return wrap;
    },

    renderOne(ex, num) {
        const box = document.createElement('div');
        box.className = 'exercise-item';

        const answerId = 'ans-' + Math.random().toString(36).slice(2, 8);

        box.innerHTML = `
      <div class="exercise-header">
        <span class="exercise-num">练习 ${num}</span>
        <h4 class="exercise-name">${this.escape(ex.title || '')}</h4>
      </div>
      <p class="exercise-desc">${ex.desc || ''}</p>
      <textarea class="exercise-code" spellcheck="false">${this.escape(ex.code || '')}</textarea>
      <div class="exercise-actions">
        <button class="btn btn-primary btn-run">▶ 运行</button>
        <button class="btn btn-success btn-check">✓ 验证答案</button>
        <button class="btn btn-secondary btn-answer">💡 查看答案</button>
        <button class="btn btn-secondary btn-reset">重置</button>
        <span class="exercise-status"></span>
      </div>
      <pre class="exercise-output">// 运行结果将显示在这里</pre>
      <div class="exercise-answer" id="${answerId}" style="display:none">
        <div class="answer-head">参考答案</div>
        <pre class="answer-code">${this.escape(ex.answer || '（无参考答案）')}</pre>
      </div>
    `;

        const codeEl = box.querySelector('.exercise-code');
        const outputEl = box.querySelector('.exercise-output');
        const statusEl = box.querySelector('.exercise-status');
        const runBtn = box.querySelector('.btn-run');
        const checkBtn = box.querySelector('.btn-check');
        const answerBtn = box.querySelector('.btn-answer');
        const resetBtn = box.querySelector('.btn-reset');
        const answerEl = box.querySelector('#' + answerId);
        const originalCode = codeEl.value;

        const setStatus = (text, type) => {
            statusEl.textContent = text;
            statusEl.className = 'exercise-status' + (type ? ' is-' + type : '');
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
            const ok = this.verify(result.output, codeEl.value, ex.check);
            if (ok) {
                setStatus('✓ 通过！', 'ok');
                outputEl.textContent += '\n\n✓ 答案验证通过';
            } else {
                setStatus('✗ 未通过，再试试', 'fail');
                outputEl.textContent += '\n\n✗ 答案未通过验证，可点击「查看答案」参考';
            }
            checkBtn.disabled = false;
        });

        answerBtn.addEventListener('click', () => {
            const show = answerEl.style.display === 'none';
            answerEl.style.display = show ? 'block' : 'none';
            answerBtn.textContent = show ? '🙈 隐藏答案' : '💡 查看答案';
        });

        resetBtn.addEventListener('click', () => {
            codeEl.value = originalCode;
            outputEl.textContent = '// 运行结果将显示在这里';
            setStatus('', '');
            answerEl.style.display = 'none';
            answerBtn.textContent = '💡 查看答案';
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

        return box;
    },

    verify(output, code, check) {
        if (!check) return !!output && !output.includes('❌');
        if (typeof check === 'function') return !!check(output, code);

        if (Array.isArray(check)) {
            return check.every(kw => output.includes(kw));
        }

        if (typeof check === 'object') {
            let ok = true;
            if (Array.isArray(check.output)) {
                ok = ok && check.output.every(kw => output.includes(kw));
            }
            if (Array.isArray(check.code)) {
                ok = ok && check.code.every(kw => code.includes(kw));
            }
            if (Array.isArray(check.notOutput)) {
                ok = ok && check.notOutput.every(kw => !output.includes(kw));
            }
            return ok;
        }

        return false;
    },

    escape(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
};