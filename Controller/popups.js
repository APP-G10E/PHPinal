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

        /* Event Listeners */

        document.getElementById('footerProtectionDonnees').addEventListener('click', function () {
            popUp(popups[lang]['htmlProtectionDonnees']);
        });

        document.getElementById('footerMentionsLegales').addEventListener('click', function () {
            popUp(popups[lang]['htmlMentionsLegales']);
        });

        document.getElementById('footerCGV').addEventListener('click', function () {
            popUp(popups[lang]['htmlCGU']);
        });

        document.getElementById('footerContactUs').addEventListener('click', function () {
            popUp(popups[lang]['htmlContactUs']);
            window.setupContactForm();
        });

        document.getElementById('footerFAQ').addEventListener('click', function () {
            popUp(popups[lang]['htmlFAQ']);
        });

        document.getElementById('festivals-partenaires-liste').addEventListener('click', function () {
            popUp(popups[lang]['htmlFestivalsPartenaires']);
        });

        document.getElementById('risques-son').addEventListener('click', function () {
            popUp(popups[lang]['htmlRisquesAuditifs']);
        });

        document.getElementById('footerCookieSettings').addEventListener('click', function () {
            console.log('footerCookieSettings clicked');
            console.log('lang:', lang);
            console.log('popups[lang]:', popups[lang]);
            console.log('popups[lang][\'htmlCookies\']:', popups[lang]['htmlCookies']);
            cookies(popups[lang]['htmlCookies']);
        });

        cookies(popups[lang]['htmlCookies']);
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

        if (!cookiesResponse) {

            document.body.insertAdjacentHTML('beforeend', cookieConsentHTML);

            document.body.appendChild(mask);

            const cookieConsent = document.getElementById('cookieConsent');
            const acceptCookiesBtn = document.getElementById('acceptCookies');
            const refuseCookiesBtn = document.getElementById('refuseCookies');

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

    init().then(r => console.log('Popups loaded'));
});