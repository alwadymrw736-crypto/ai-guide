document.addEventListener("DOMContentLoaded", () => {
  const translateBtn = document.getElementById("sidebar-translate-btn");

  function setLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("site_language", lang);
    if (translateBtn) {
      translateBtn.textContent = lang === "ar" ? "English" : "العربية";
    }
    // إرسال حدث مخصص لإعلام السكربتات الأخرى بتغيير اللغة
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));

    // إذا كان هناك دالة ترجمة عالمية في translations-complete.js، يمكن استدعاؤها هنا
    // مثال: if (typeof applyGlobalTranslation === 'function') { applyGlobalTranslation(lang); }
  }

  function toggleLanguage() {
    const currentLang = document.documentElement.getAttribute("lang");
    setLanguage(currentLang === "ar" ? "en" : "ar");
  }

  function initLanguage() {
    const savedLang = localStorage.getItem("site_language") || "ar"; // الافتراضي هو العربية
    setLanguage(savedLang);
  }

  if (translateBtn) {
    translateBtn.addEventListener("click", toggleLanguage);
  }

  initLanguage();
});

window.addEventListener("storage", () => {
  const savedLang = localStorage.getItem("site_language") || "ar";
  setLanguage(savedLang);
});
