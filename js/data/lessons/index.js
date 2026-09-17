/* ============================================================
   把各阶段课程汇总成统一的 window.Lessons 数组
   ============================================================ */

window.Lessons = (window.__PyLearnLessons || []).slice();

// 按 id 数字排序（l01、l02 ... l36）
window.Lessons.sort((a, b) => {
    const na = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
    const nb = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
    return na - nb;
});

console.log('[PyLearn] Lessons 汇总完成，共', window.Lessons.length, '节');