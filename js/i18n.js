// js/i18n.js

document.addEventListener('DOMContentLoaded', function () {
    if (typeof i18next !== 'undefined' && typeof i18nextBrowserLanguageDetector !== 'undefined') {
        i18next
            .use(i18nextBrowserLanguageDetector)
            .init({
                resources: resources,
                fallbackLng: 'es',
                supportedLngs: ['es', 'en'], // Solo español e inglés
                debug: false,
                detection: {
                    order: ['localStorage', 'navigator'],
                    caches: ['localStorage']
                }
            }, function (err, t) {
                if (err) return console.error('Error loading i18n:', err);
                updateContent();
                updateLangButton();
            });
    } else {
        console.warn('i18next libraries not loaded');
    }

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(function (element) {
            const key = element.getAttribute('data-i18n');
            const isHtml = element.getAttribute('data-i18n-html') === 'true';
            
            if (isHtml) {
                element.innerHTML = i18next.t(key);
            } else {
                element.innerText = i18next.t(key);
            }
        });
    }

    function updateLangButton() {
        const langBtn = document.getElementById('lang-toggle');
        if (langBtn) {
            // Mostrar el idioma actual en mayúsculas (ES o EN)
            const currentLang = i18next.language.substring(0, 2).toUpperCase();
            langBtn.innerText = currentLang;
        }
    }

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', function () {
            const currentLang = i18next.language.substring(0, 2);
            const newLang = currentLang === 'es' ? 'en' : 'es';
            i18next.changeLanguage(newLang, function () {
                updateContent();
                updateLangButton();
            });
        });
    }
});
