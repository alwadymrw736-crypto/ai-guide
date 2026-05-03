// translations-complete.js
(() => {
    "use strict";

    const SWITCHER_ID = "custom-lang-switcher";
    const STYLE_ID = "custom-lang-switcher-style";
    const GT_CONTAINER_ID = "google_translate_element";
    const GT_SCRIPT_ID = "google-translate-script";

    function initTranslator() {
        if (document.getElementById(SWITCHER_ID)) return;

        injectStyles();
        createSwitcher();
        loadGoogleTranslateScript();
    }

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = `
            :root {
                --lang-accent: #8b5cf6;
                --lang-accent-2: #7c3aed;

                --lang-surface: rgba(255, 255, 255, 0.92);
                --lang-surface-hover: rgba(249, 250, 251, 0.98);
                --lang-surface-dark: rgba(17, 24, 39, 0.92);
                --lang-surface-dark-hover: rgba(31, 41, 55, 0.98);

                --lang-text: #111827;
                --lang-text-dark: #f9fafb;

                --lang-border: rgba(0, 0, 0, 0.08);
                --lang-border-dark: rgba(255, 255, 255, 0.12);

                --lang-shadow: 0 10px 24px rgba(124, 58, 237, 0.28);
                --lang-shadow-dark: 0 10px 24px rgba(0, 0, 0, 0.35);
            }

            #${SWITCHER_ID} {
                position: fixed;
                top: 18px;
                left: 18px;
                z-index: 1000000 !important;
                direction: ltr;
                font-family: inherit;
                user-select: none;
            }

            #${SWITCHER_ID} * {
                box-sizing: border-box;
                -webkit-tap-highlight-color: transparent;
            }

            .lang-fab {
                width: 42px;
                height: 42px;
                border: 0;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 18px;
                line-height: 1;
                transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                box-shadow: var(--lang-shadow);
                background: var(--lang-surface);
                color: var(--lang-text);
                border: 1px solid var(--lang-border);
            }

            .lang-fab:hover {
                transform: translateY(-1px);
            }

            .lang-fab:active {
                transform: translateY(0);
            }

            .lang-menu {
                position: absolute;
                top: 52px;
                left: 0;
                display: none;
                flex-direction: column;
                gap: 8px;
                padding: 8px;
                border-radius: 14px;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                background: var(--lang-surface);
                border: 1px solid var(--lang-border);
                box-shadow: var(--lang-shadow);
                min-width: 58px;
            }

            .show-langs .lang-menu {
                display: flex;
            }

            .lang-option {
                width: 42px;
                height: 34px;
                border-radius: 10px;
                border: 1px solid var(--lang-border);
                background: var(--lang-surface);
                color: var(--lang-text);
                font-weight: 800;
                font-size: 12px;
                cursor: pointer;
                transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
            }

            .lang-option:hover {
                transform: translateY(-1px);
                background: var(--lang-surface-hover);
                border-color: var(--lang-accent);
            }

            .lang-option.active {
                background: linear-gradient(135deg, var(--lang-accent) 0%, var(--lang-accent-2) 100%);
                color: #fff;
                border-color: transparent;
            }

            @media (prefers-color-scheme: dark) {
                .lang-fab,
                .lang-menu,
                .lang-option {
                    background: var(--lang-surface-dark);
                    color: var(--lang-text-dark);
                    border-color: var(--lang-border-dark);
                    box-shadow: var(--lang-shadow-dark);
                }

                .lang-option:hover {
                    background: var(--lang-surface-dark-hover);
                }
            }

            body.dark #${SWITCHER_ID},
            html.dark #${SWITCHER_ID},
            [data-theme="dark"] #${SWITCHER_ID},
            [data-mode="dark"] #${SWITCHER_ID} {
                --lang-surface: var(--lang-surface-dark);
                --lang-text: var(--lang-text-dark);
                --lang-border: var(--lang-border-dark);
                --lang-shadow: var(--lang-shadow-dark);
            }

            .goog-te-banner-frame,
            .skiptranslate,
            #goog-gt-tt,
            .goog-te-balloon-frame {
                display: none !important;
            }

            body {
                top: 0 !important;
            }

            #${GT_CONTAINER_ID} {
                position: absolute !important;
                width: 1px !important;
                height: 1px !important;
                overflow: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                left: -9999px !important;
                top: -9999px !important;
            }
        `;
        document.head.appendChild(style);
    }

    function createSwitcher() {
        const switcher = document.createElement("div");
        switcher.id = SWITCHER_ID;

        switcher.innerHTML = `
            <button class="lang-fab" type="button" aria-label="Change language" title="Language">
                🌐
            </button>

            <div class="lang-menu" role="menu" aria-label="Language options">
                <button class="lang-option" type="button" data-lang="ar">AR</button>
                <button class="lang-option" type="button" data-lang="en">EN</button>
            </div>

            <div id="${GT_CONTAINER_ID}"></div>
        `;

        document.body.appendChild(switcher);

        const fab = switcher.querySelector(".lang-fab");
        const menu = switcher.querySelector(".lang-menu");

        fab.addEventListener("click", (e) => {
            e.stopPropagation();
            switcher.classList.toggle("show-langs");
        });

        menu.addEventListener("click", (e) => {
            const btn = e.target.closest(".lang-option");
            if (!btn) return;
            const lang = btn.dataset.lang;
            setLanguage(lang);
            menu.querySelectorAll(".lang-option").forEach((el) => el.classList.toggle("active", el.dataset.lang === lang));
        });

        document.addEventListener("click", (e) => {
            if (!switcher.contains(e.target)) {
                switcher.classList.remove("show-langs");
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") switcher.classList.remove("show-langs");
        });
    }

    function setLanguage(lang, attempt = 0) {
        const combo = document.querySelector(".goog-te-combo");

        if (!combo) {
            if (attempt < 20) {
                setTimeout(() => setLanguage(lang, attempt + 1), 250);
            }
            return;
        }

        combo.value = lang;
        combo.dispatchEvent(new Event("change", { bubbles: true }));

        const switcher = document.getElementById(SWITCHER_ID);
        if (switcher) {
            switcher.classList.remove("show-langs");
            switcher.querySelectorAll(".lang-option").forEach((el) => {
                el.classList.toggle("active", el.dataset.lang === lang);
            });
        }
    }

    function loadGoogleTranslateScript() {
        if (document.getElementById(GT_SCRIPT_ID)) return;

        window.googleTranslateElementInit = function () {
            if (!window.google || !google.translate || !google.translate.TranslateElement) return;

            new google.translate.TranslateElement(
                {
                    pageLanguage: "ar",
                    includedLanguages: "ar,en",
                    autoDisplay: false
                },
                GT_CONTAINER_ID
            );

            const switcher = document.getElementById(SWITCHER_ID);
            if (switcher) {
                const defaultBtn = switcher.querySelector('.lang-option[data-lang="ar"]');
                if (defaultBtn) defaultBtn.classList.add("active");
            }
        };

        const script = document.createElement("script");
        script.id = GT_SCRIPT_ID;
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.head.appendChild(script);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initTranslator);
    } else {
        initTranslator();
    }
})();