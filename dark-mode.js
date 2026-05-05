
    /* 1. تعريف الألوان الأساسية */
    :root {
        --bg-site: #f3f4f6;
        --bg-card: #ffffff;
        --text-prime: #111827;
        --border-color: #e5e7eb;

        --navbar-text: #0f172a;

        --income-bg: #f0fdf4;
        --income-border: #10b981;

        --info-bg: #eff6ff;
        --info-border: #3b82f6;

        /* متغيرات جديدة لبطاقة صناعة المحتوى */
        --content-bg: #fffbeb;
        --content-border: #f59e0b;
    }

    /* 2. ألوان الوضع الليلي */
    [data-theme="dark"] {
        --bg-site: #0b0f1a;
        --bg-card: #161b2a;
        --text-prime: #f9fafb;
        --border-color: #2d334a;

        --navbar-text: #f9fafb;

        --income-bg: #052e2b;
        --income-border: #34d399;

        --info-bg: #0b1e3a;
        --info-border: #60a5fa;

        /* ألوان الوضع الليلي لبطاقة صناعة المحتوى */
        --content-bg: #2d2006;
        --content-border: #d97706;
    }

    /* 3. تطبيق الألوان */

    body, html, .main-content, section, .container {
        background-color: var(--bg-site) !important;
        background-image: none !important;
        color: var(--text-prime) !important;
        transition: 0.3s ease;
    }

    .tool-card,
    .card,
    .bg-white,
    [class*="card"],
    div[style*="background-color: white"],
    div[style*="background: white"],
    div[style*="background-color: #ffffff"],
    div[style*="background: #ffffff"],
    .shadow-sm,
    .shadow-md {
        background-color: var(--bg-card) !important;
        background: var(--bg-card) !important;
        color: var(--text-prime) !important;
        border: 1px solid var(--border-color) !important;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.18) !important;
    }

    /* بطاقات أخضر فاتح مثل زيادة الدخل */
    .tool-card[style*="#f0fdf4"],
    div[style*="background: #f0fdf4"],
    div[style*="background-color: #f0fdf4"],
    div[style*="background: #ecfdf5"],
    div[style*="background-color: #ecfdf5"] {
        background: var(--income-bg) !important;
        background-color: var(--income-bg) !important;
        border-color: var(--income-border) !important;
    }

    /* بطاقات أزرق فاتح مثل #eff6ff */
    div[style*="background: #eff6ff"],
    div[style*="background-color: #eff6ff"] {
        background: var(--info-bg) !important;
        background-color: var(--info-bg) !important;
        border-color: var(--info-border) !important;
    }

    /* إصلاح بطاقة صناعة المحتوى (الأصفر/البني) */
    div[style*="background: #fffbeb"],
    div[style*="background-color: #fffbeb"] {
        background: var(--content-bg) !important;
        background-color: var(--content-bg) !important;
        border-color: var(--content-border) !important;
    }

    /* إصلاح الشريط الجانبي - منع تسويد الصفحة */
    #sideSidebar {
        background-color: var(--bg-card) !important;
        border-left: 1px solid var(--border-color) !important;
        width: 0; /* ضمان البدء من عرض صفر */
    }

    #sideSidebar a {
        color: var(--text-prime) !important;
    }

    #sideSidebar a:hover {
        background-color: rgba(139, 92, 246, 0.1) !important;
    }

    /* النصوص */
    h1, h2, h3, h4, h5, h6, p, span, li, b, strong, i, small,
    [style*="color: #0"],
    [style*="color: #1"],
    [style*="color: navy"],
    [style*="color: #92400e"], /* لون عنوان صناعة المحتوى */
    [style*="color: #b45309"]  /* لون نص صناعة المحتوى */
    {
        color: var(--text-prime) !important;
    }

    /* العنوان الكحلي داخل navbar */
    .navbar {
        color: var(--navbar-text) !important;
        background-color: var(--bg-card) !important;
        border-bottom: 1px solid var(--border-color) !important;
    }

    /* تعديل استهداف العناصر الثابتة لمنع التسويد */
    header, nav, .header-container {
        background-color: var(--bg-card) !important;
        background: var(--bg-card) !important;
        border-bottom: 1px solid var(--border-color) !important;
    }

    /* استهداف زر المنيو فقط دون التأثير على كامل الصفحة */
    div[onclick="openMenu()"] {
        background: transparent !important;
    }

    .tool-card *, .card *, div[class*="card"] * {
        color: var(--text-prime) !important;
    }

    a:not([class*="btn"]) {
        color: inherit;
    }

    button, .btn {
        color: inherit;
    }