/* ============================================================
   PythonRunner —— 用 Pyodide 在浏览器里运行 Python 代码
   ============================================================ */

window.PythonRunner = {
    pyodide: null,
    loading: false,
    loadPromise: null,

    async init() {
        if (this.pyodide) return this.pyodide;
        if (this.loadPromise) return this.loadPromise;

        this.loadPromise = (async () => {
            console.log('[PythonRunner] 正在加载 Pyodide…');
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
            document.head.appendChild(script);

            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = () => reject(new Error('Pyodide 脚本加载失败，请检查网络'));
            });

            this.pyodide = await window.loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
            });
            console.log('[PythonRunner] Pyodide 就绪');
            return this.pyodide;
        })();

        return this.loadPromise;
    },

    async run(code, outputEl, statusEl) {
        outputEl.textContent = '';

        if (!this.pyodide) {
            if (statusEl) statusEl.textContent = '正在加载 Python 环境（首次约 5—10 秒）…';
            try {
                await this.init();
            } catch (e) {
                const msg = '❌ ' + e.message;
                outputEl.textContent = msg;
                if (statusEl) statusEl.textContent = '加载失败';
                return { success: false, output: msg };
            }
            if (statusEl) statusEl.textContent = '运行中…';
        }

        const pyodide = this.pyodide;
        let buffer = '';

        pyodide.setStdout({ batched: (str) => { buffer += str + '\n'; } });
        pyodide.setStderr({ batched: (str) => { buffer += str + '\n'; } });

        try {
            await pyodide.runPythonAsync(code);
            const out = buffer || '(无输出)';
            outputEl.textContent = out;
            if (statusEl) statusEl.textContent = '✓ 完成';
            return { success: true, output: out };
        } catch (e) {
            const msg = buffer + '\n❌ ' + (e.message || String(e));
            outputEl.textContent = msg;
            if (statusEl) statusEl.textContent = '✗ 出错了';
            return { success: false, output: msg };
        }
    }
};