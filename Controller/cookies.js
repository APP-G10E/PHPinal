document.addEventListener('DOMContentLoaded', function () {
    const cookiesResponse = localStorage.getItem('cookiesResponse');

    if (!cookiesResponse || cookiesResponse) {
        const cookieConsentHTML = `
            <div id="cookieConsent" class="cookie-consent">
                <div id="cookie-content">
                    <h3>Champions utilise des cookies pour faire fonctionner ce site</h3>
                    <p>Champions prend à cœur de protéger vos données personnelles.<br>
                    <div id="cookie-text">
                        <p>Champions et ses 6 partenaires peuvent, indépendamment ou conjointement, déposer lors de votre visite sur notre site des cookies et technologies similaires, afin de stocker et/ou accéder à des informations sur votre terminal, et traitent des données personnelles telles que votre adresse IP, identifiants uniques, données de navigation, historique de recherche et les pages que vous visitez. Cela nous permet, entre autres, d'améliorer notre site internet et développer des services adaptés à vos besoins, et de diffuser des publicités personnalisées, mesurer leurs performances.<br>
                        <p id="p-sep">En cliquant sur “Accepter”, vous acceptez l'utilisation, par nos partenaires, de cookies et autres traceurs servant à vous proposer des offres et publicités personnalisées, adaptées à votre profil.<br>
                        Vous pouvez également configurer vos choix en cliquant sur « Préférences » ou refuser le dépôt de cookies publicitaires personnalisés en cliquant sur “Refuser”.</p>
                    </div>
                    
                    <p>Pour en savoir plus sur la façon dont nous utilisons vos informations, veuillez consulter notre <a href="#">Politique de Confidentialité</a> et notre <a href="#">Charte en matière de cookies</a>.</p>
                    <div id="buttons">
                        <div id="acceptCookies">
                            <button class="consentBt">Accepter</button>
                        </div>
                        <div id="refuseCookies">
                            <button class="consentBt">Refuser</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="page-mask"></div>
        `;

        document.body.insertAdjacentHTML('beforeend', cookieConsentHTML);

        const cookieConsent = document.getElementById('cookieConsent');
        const pageMask = document.getElementById('page-mask');
        const acceptCookiesBtn = document.getElementById('acceptCookies');
        const refuseCookiesBtn = document.getElementById('refuseCookies');

        cookieConsent.style.display = 'block';

        /*document.body.style.overflow = 'hidden'; Décommenter pour empêcher le scroll quand pop-up de cookies visible*/

        acceptCookiesBtn.addEventListener('click', function () {
            cookieConsent.style.display = 'none';
            pageMask.style.display = 'none';
            document.body.style.overflow = 'visible';
            localStorage.setItem('cookiesResponse', 'true');
        });

        refuseCookiesBtn.addEventListener('click', function () {
            cookieConsent.style.display = 'none';
            pageMask.style.display = 'none';
            document.body.style.overflow = 'visible';
            localStorage.setItem('cookiesResponse', 'false');
        });
    }
});
