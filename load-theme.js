(function() {
    const html = document.documentElement;

    // دالة سحرية لإصلاح الألوان المعاندة
    function enforceDarkTheme() {
        const isDark = html.getAttribute('data-theme') === 'dark';
        if (!isDark) return;

        // استهداف كل العناصر التي قد تحتوي على ألوان ثابتة
        document.querySelectorAll('*').forEach(el => {
            const style = window.getComputedStyle(el);
            
            // 1. إذا كان النص غامقاً جداً في الوضع الليلي، اجعله فاتحاً
            if (style.color === 'rgb(0, 0, 0)' || style.color.includes('rgba(0, 0, 0')) {
                el.style.setProperty('color', 'var(--text-prime)', 'important');
            }

            // 2. إذا كانت الخلفية بيضاء ثابتة، اجعلها داكنة
            if (style.backgroundColor === 'rgb(255, 255, 255)') {
                el.style.setProperty('background-color', 'var(--bg-prime)', 'important');
            }
            
            // 3. معالجة الصور التي قد تكون فاقعة (اختياري)
            if (el.tagName === 'IMG' && !el.classList.contains('no-filter')) {
                el.style.filter = 'brightness(0.8) contrast(1.2)';
            }
        });
    }

    function toggleTheme() {
        const isDark = html.getAttribute('data-theme') === 'dark';
        if (isDark) {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            location.reload(); // إعادة تحميل لضمان تنظيف الأنماط المحقونة
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            enforceDarkTheme();
        }
    }

    // تشغيل المصحح عند تحميل الصفحة وعند أي تغيير في المحتوى
    const observer = new MutationObserver(enforceDarkTheme);
    
    window.addEventListener('DOMContentLoaded', () => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            html.setAttribute('data-theme', 'dark');
            enforceDarkTheme();
            observer.observe(document.body, { childList: true, subtree: true });
        }
        
        // ربط الزر
        document.addEventListener('click', (e) => {
            if (e.target.closest('#theme-toggle')) toggleTheme();
        });
    });
})();
