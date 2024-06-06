document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get('lang');

    let mask = document.createElement('div');
    mask.style.position = 'fixed';
    mask.style.top = '0';
    mask.style.left = '0';
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.zIndex = '999'; // Ensure it's below the popup
    mask.style.background = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black
    mask.id = 'mask'; // Give it an ID so we can remove it later

    async function fetchPopups() {
        try {
            const response = await fetch('../Language/footerText.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching popups:', error);
            return null;
        }
    }

    async function init() {
        let popups = await fetchPopups();
        console.log("contenu de popups", popups);

        if (popups && popups[lang]) {
            const elements = [
                { id: 'footerProtectionDonnees', callback: () => popUp(popups[lang]['htmlProtectionDonnees']) },
                { id: 'footerMentionsLegales', callback: () => popUp(popups[lang]['htmlMentionsLegales']) },
                { id: 'footerCGV', callback: () => popUp(popups[lang]['htmlCGU']) },
                { id: 'footerContactUs', callback: () => { popUp(popups[lang]['htmlContactUs']); window.setupContactForm(); } },
                { id: 'footerFAQ', callback: () => popUp(popups[lang]['htmlFAQ']) },
                { id: 'risques-son', callback: () => popUp(popups[lang]['htmlRisquesAuditifs']) },
                { id: 'footerCookieSettings', callback: () => { console.log('footerCookieSettings clicked'); console.log('lang:', lang); console.log('popups[lang]:', popups[lang]); console.log('popups[lang][\'htmlCookies\']:', popups[lang]['htmlCookies']); resetAndShowCookies(popups[lang]['htmlCookies']); } },
            ];

            elements.forEach(element => {
                const el = document.getElementById(element.id);
                if (el) {
                    el.addEventListener('click', element.callback);
                }
            });

            cookies(popups[lang]['htmlCookies']);
        }
    }

    function bodyClickHandler(event) {
        if (event.target.matches('.close')) {
            closePopUp();
        }
    }

    function escapeKeyHandler(e) {
        if (e.key === "Escape") {
            closePopUp();
        }
    }

    function popUp(footerPopUp) {
        document.body.insertAdjacentHTML('beforeend', footerPopUp);

        document.body.appendChild(mask);

        document.addEventListener('keydown', escapeKeyHandler);

        document.body.addEventListener('click', bodyClickHandler);
    }

    function closePopUp() {
        document.querySelectorAll(".pop-up").forEach(el => el.remove());

        // Remove the mask
        let mask = document.getElementById('mask');
        if (mask) {
            mask.remove();
        }

        document.removeEventListener('keydown', escapeKeyHandler);

        document.body.removeEventListener('click', bodyClickHandler);
    }

    function cookies(cookieConsentHTML) {
        const cookiesResponse = localStorage.getItem('cookiesResponse');

        if (!cookiesResponse || cookiesResponse === null) {

            document.body.insertAdjacentHTML('beforeend', cookieConsentHTML);

            document.body.appendChild(mask);

            const cookieConsent = document.getElementById('cookieConsent');
            const acceptCookiesBtn = document.getElementById('acceptCookies');
            const refuseCookiesBtn = document.getElementById('refuseCookies');

            if (acceptCookiesBtn && refuseCookiesBtn) {
                cookieConsent.style.display = 'block';

                acceptCookiesBtn.addEventListener('click', function () {
                    cookieConsent.style.display = 'none';
                    // Remove the mask
                    let mask = document.getElementById('mask');
                    if (mask) {
                        mask.remove();
                    }
                    document.body.style.overflow = 'visible';
                    localStorage.setItem('cookiesResponse', 'true');
                });

                refuseCookiesBtn.addEventListener('click', function () {
                    cookieConsent.style.display = 'none';
                    // Remove the mask
                    let mask = document.getElementById('mask');
                    if (mask) {
                        mask.remove();
                    }
                    document.body.style.overflow = 'visible';
                    localStorage.setItem('cookiesResponse', 'false');
                });
            }
        }
    }

    function resetAndShowCookies(cookieConsentHTML) {
        localStorage.removeItem('cookiesResponse');
        cookies(cookieConsentHTML);
    }

    init().then(r => console.log('Popups loaded'));
});
