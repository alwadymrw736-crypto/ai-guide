(function() {
    const html = document.documentElement;

    // دالة لتحديث واجهة المستخدم (الألوان + نص الزر)
    function updateUI(isDark) {
        const icon = document.getElementById('theme-icon');
        const text = document.getElementById('theme-text');

        if (isDark) {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (icon) icon.innerText = '🌓';
            if (text) text.innerText = 'الوضع النهاري';
        } else {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (icon) icon.innerText = '🌓';
            if (text) text.innerText = 'الوضع الليلي';
        }
    }

    // 1. التنفيذ الفوري عند تحميل الملف (يمنع الوميض)
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || (!saved && systemDark);
    updateUI(shouldBeDark);

    // 2. انتظر تحميل الصفحة لربط الزر
    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('theme-toggle');
        if (btn) {
            // تحديث النص مرة أخرى للتأكد بعد تحميل الـ DOM
            updateUI(html.getAttribute('data-theme') === 'dark');
            
            btn.addEventListener('click', () => {
                const isCurrentlyDark = html.getAttribute('data-theme') === 'dark';
                updateUI(!isCurrentlyDark);
            });
        }
    });
})();
