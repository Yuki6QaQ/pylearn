/* 文本/代码处理 */
window.Format = {
    /* 把 ~~~ ... ~~~ 代码块转义并包装为 <pre class="code-block"> */
    codeBlocks(raw) {
        if (!raw) return '';
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
    },

    /* HTML 转义 */
    escape(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }
};