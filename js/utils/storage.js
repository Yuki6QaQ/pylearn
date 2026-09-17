/* 本地存储 */
window.Store = {
    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('[Store] 写入失败', e);
        }
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
};

/* 课程进度 */
window.ProgressStore = {
    key() { return window.PYLEARN_CONFIG.storageKeys.done; },
    all() { return window.Store.get(this.key(), []); },
    has(id) { return this.all().includes(id); },
    add(id) {
        const list = this.all();
        if (!list.includes(id)) {
            list.push(id);
            window.Store.set(this.key(), list);
        }
    },
    remove(id) {
        const list = this.all().filter(x => x !== id);
        window.Store.set(this.key(), list);
    },
    reset() {
        window.Store.set(this.key(), []);
    }
};

/* 主题 */
window.ThemeStore = {
    key() { return window.PYLEARN_CONFIG.storageKeys.theme; },
    get() { return window.Store.get(this.key(), 'dark'); },
    set(v) { window.Store.set(this.key(), v); }
};