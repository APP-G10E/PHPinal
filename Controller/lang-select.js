function changeLanguageAndReload(lang) {
    localStorage.setItem('lang', lang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);

    // Reload the window with the updated URL
    window.location.href = url.toString();
}

document.addEventListener('DOMContentLoaded', async function () {
    // Check if 'lang' parameter is present in the URL
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get('lang');

    if (!lang) {
        // If 'lang' is not in the URL, get it from localStorage, cookies, or default to 'fr'
        lang = urlParams.get('lang') || localStorage.getItem('lang') || document.documentElement.lang || 'fr';


        // Add 'lang' parameter to the URL and reload the page
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.location.href = url.toString();
    } else {
        // If 'lang' is already in the URL, proceed with fetching translations
        const translations = await fetchTranslations();
        if (translations) {
            initializePage(translations);
        } else {
            console.error('Failed to load translations');
        }
    }
});

async function fetchTranslations() {
    try {
        const response = await fetch('../Language/translations.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching translations:', error);
        return null;
    }
}

function initializePage(translations) {
    // Extract language from URL
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get('lang') || localStorage.getItem('lang') || document.documentElement.lang || 'fr';

    // Set the lang attribute of <html> element
    document.documentElement.lang = lang;

    changeLanguage(translations, lang);
    setupFlags(lang);

    // Add your additional initialization code here
}

function setupFlags(lang) {
    const flagContainer1 = document.getElementById("flag1");
    const flagContainer2 = document.getElementById("flag2");
    const flagContainer3 = document.getElementById("flag3");

    // Remove existing event listeners
    flagContainer1.removeEventListener('click', changeLanguageAndReload);
    flagContainer2.removeEventListener('click', changeLanguageAndReload);
    flagContainer3.removeEventListener('click', changeLanguageAndReload);

    // Set up flags based on selected language
    if (lang === 'fr') {
        flagContainer1.innerHTML = '<img src="../Assets/frflag.svg" alt="Flag 1">';
        flagContainer2.innerHTML = '<img src="../Assets/ukflag.svg" alt="Flag 2">';
        flagContainer3.innerHTML = '<img src="../Assets/cnkoflag.svg" alt="Flag 3">';
        flagContainer2.addEventListener('click', () => {
            changeLanguageAndReload('en');
        });
        flagContainer3.addEventListener('click', () => {
            changeLanguageAndReload('cnko');
        });
    } else if (lang === 'en') {
        flagContainer1.innerHTML = '<img src="../Assets/ukflag.svg" alt="Flag 1">';
        flagContainer2.innerHTML = '<img src="../Assets/cnkoflag.svg" alt="Flag 2">';
        flagContainer3.innerHTML = '<img src="../Assets/frflag.svg" alt="Flag 3">';
        flagContainer2.addEventListener('click', () => {
            changeLanguageAndReload('cnko');
        });
        flagContainer3.addEventListener('click', () => {
            changeLanguageAndReload('fr');
        });
    } else if (lang === 'cnko') {
        flagContainer1.innerHTML = '<img src="../Assets/cnkoflag.svg" alt="Flag 1">';
        flagContainer2.innerHTML = '<img src="../Assets/frflag.svg" alt="Flag 2">';
        flagContainer3.innerHTML = '<img src="../Assets/ukflag.svg" alt="Flag 3">';
        flagContainer2.addEventListener('click', () => {
            changeLanguageAndReload('fr');
        });
        flagContainer3.addEventListener('click', () => {
            changeLanguageAndReload('en');
        });
    }
}

function changeLanguage(translations, lang) {
    const langTranslations = translations[lang];
    const translatableElements = document.querySelectorAll('.translatable');

    translatableElements.forEach(element => {
        const key = element.dataset.translationKey;
        element.textContent = langTranslations[key];
        if (element.tagName === 'INPUT') {
            element.placeholder = langTranslations[key];
        }
    });
}

