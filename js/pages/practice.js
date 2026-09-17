/* 练习场 */
window.PracticePage = {
    init() {
        const runBtn = document.getElementById('runCode');
        const clearBtn = document.getElementById('clearCode');
        const input = document.getElementById('codeInput');
        const output = document.getElementById('codeOutput');
        if (!runBtn || !input || !output) return;

        runBtn.addEventListener('click', () => {
            output.textContent = this.simulate(input.value);
        });

        clearBtn.addEventListener('click', () => {
            input.value = '';
            output.textContent = '// 输出将显示在这里';
        });
    },

    /* 简单模拟：识别 print(...) 和 for i in range(n) 循环 */
    simulate(code) {
        const lines = code.split('\n');
        const out = [];
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];
            const trimmed = line.trim();

            // 跳过注释和空行
            if (!trimmed || trimmed.startsWith('#')) { i++; continue; }

            // 处理 for i in range(n):
            const forMatch = trimmed.match(/^for\s+(\w+)\s+in\s+range\s*\(\s*(\d+)\s*\)\s*:/);
            if (forMatch) {
                const [, varname, nStr] = forMatch;
                const n = parseInt(nStr, 10);
                // 收集缩进的循环体
                const body = [];
                let j = i + 1;
                while (j < lines.length && /^\s+/.test(lines[j])) {
                    body.push(lines[j].replace(/^\s{2,4}/, ''));
                    j++;
                }
                for (let k = 0; k < n; k++) {
                    body.forEach(bLine => {
                        const expr = this.evalPrint(bLine, { [varname]: k });
                        if (expr !== null) out.push(expr);
                    });
                }
                i = j;
                continue;
            }

            // 处理普通 print
            const printMatch = trimmed.match(/^print\s*\((.*)\)\s*$/);
            if (printMatch) {
                const expr = this.evalPrint(trimmed);
                if (expr !== null) out.push(expr);
            }

            i++;
        }

        if (!out.length) return '(没有检测到 print 输出)';
        return out.join('\n');
    },

    /* 尽量模拟 print 输出 */
    evalPrint(line, vars = {}) {
        const m = line.match(/print\s*\((.*)\)/);
        if (!m) return null;
        let argStr = m[1];

        // 拆分逗号分隔的参数（不考虑嵌套，简化处理）
        const args = this.splitArgs(argStr);
        const values = args.map(a => this.evalArg(a.trim(), vars));
        return values.join(' ');
    },

    splitArgs(s) {
        const out = [];
        let depth = 0, cur = '', inStr = false, quote = '';
        for (const ch of s) {
            if (inStr) {
                cur += ch;
                if (ch === quote) inStr = false;
                continue;
            }
            if (ch === '"' || ch === "'") { inStr = true; quote = ch; cur += ch; continue; }
            if (ch === '(') depth++;
            if (ch === ')') depth--;
            if (ch === ',' && depth === 0) { out.push(cur); cur = ''; continue; }
            cur += ch;
        }
        if (cur.trim()) out.push(cur);
        return out;
    },

    evalArg(a, vars) {
        if (!a) return '';
        // 字符串
        if (/^["'].*["']$/.test(a)) return a.slice(1, -1);
        // 变量
        if (vars[a] !== undefined) return String(vars[a]);
        // 数字运算
        try {
            // eslint-disable-next-line no-new-func
            const result = Function('vars', `with(vars){ return (${a}); }`)(vars);
            return String(result);
        } catch {
            return a;
        }
    }
};