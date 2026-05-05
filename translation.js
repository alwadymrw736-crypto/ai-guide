// ملف الترجمة الخارجي - translation.js

// إضافة الـ CSS للزر
var style = document.createElement('style');
style.textContent = `
#langBtn {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 10000;
    padding: 10px 20px;
    background: #8b5cf6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size: 13px;
}
#langBtn:hover { background: #7c3aed; }
.goog-te-banner-frame { display: none !important; }
.skiptranslate { display: none !important; }
body { top: 0 !important; }
`;
document.head.appendChild(style);

// إضافة الزر
var button = document.createElement('button');
button.id = 'langBtn';
button.textContent = 'English';
document.body.appendChild(button);

// إضافة عنصر Google Translate المخفي
var translateDiv = document.createElement('div');
translateDiv.id = 'google_translate_element';
translateDiv.style.display = 'none';
document.body.appendChild(translateDiv);

// إضافة سكريبت Google Translate
var script = document.createElement('script');
script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
document.head.appendChild(script);

// تهيئة Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'ar',
        includedLanguages: 'ar,en',
        autoDisplay: false
    }, 'google_translate_element');
}

// دالة التبديل
function toggleLanguage() {
    var combo = document.querySelector('.goog-te-combo');
    var btn = document.getElementById('langBtn');
    if (combo) {
        combo.value = combo.value === 'ar' ? 'en' : 'ar';
        btn.textContent = combo.value === 'ar' ? 'English' : 'العربية';
        combo.dispatchEvent(new Event('change'));
    }
}

// ربط الزر بالدالة
document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('langBtn');
    if (btn) {
        btn.onclick = toggleLanguage;
    }
});

// إذا كان الـ DOM محمل بالفعل
if (document.readyState !== 'loading') {
    var btn = document.getElementById('langBtn');
    if (btn) {
        btn.onclick = toggleLanguage;
    }
}
