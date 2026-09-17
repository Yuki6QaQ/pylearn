/* DOM 工具 */
window.$ = (sel, ctx = document) => ctx.querySelector(sel);
window.$$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

window.createElement = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (k === 'class') el.className = v;
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'text') el.textContent = v;
        else if (k.startsWith('on') && typeof v === 'function') {
            el.addEventListener(k.slice(2).toLowerCase(), v);
        } else el.setAttribute(k, v);
    }
    (Array.isArray(children) ? children : [children]).forEach(c => {
        if (c == null) return;
        el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return el;
};

window.on = (el, evt, fn) => el && el.addEventListener(evt, fn);