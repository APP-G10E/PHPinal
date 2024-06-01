document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get('lang');

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
            popUp(footerPopUpProtectionDonnees);
        });

        document.getElementById('footerMentionsLegales').addEventListener('click', function () {
            popUp(popups[lang]['htmlMentionsLegales']);
        });

        document.getElementById('footerCGV').addEventListener('click', function () {
            popUp(popups[lang]['htmlCGU']);
        });

        document.getElementById('footerContactUs').addEventListener('click', function () {
            popUp(footerPopUpContactUs);
        });

        document.getElementById('footerFAQ').addEventListener('click', function () {
            popUp(popups[lang]['htmlFAQ']);
        });

        document.getElementById('festivals-partenaires-liste').addEventListener('click', function () {
            popUp(popUpFestivalsPartenaires);
        });

        document.getElementById('risques-son').addEventListener('click', function () {
            popUp(popUpRisquesAuditifs);
        });

        cookies();
    }

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Footer Protection des données

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const footerPopUpProtectionDonnees = `
            <div id="footer-truc" class="pop-up">
                <div class="pop-up-content">
                    <h2 class="titre">Qu'est-ce que la charte des données personnelles ?</h2>
                    <p>En France, la loi Informatique et Libertés règlemente la collecte et le traitement des données personnelles, relatives à des personnes humaines. Créée en 1978, elle continue d’évoluer, ses dernières modifications datent du 6 août 2004.

                    Ses principes sont le respect des libertés individuelles ou publiques, de la vie privée, des droits de l’homme. <br>Le consentement reste une donnée majeure. Le recueil, l’enregistrement, le traitement ou l’utilisation d’une donnée ne peut se faire sans le consentement explicite de la personne concernée. <br>La pertinence est essentielle : seules les données indispensables à ce pour quoi la collecte a été établie peuvent être collectées et enregistrées. Une fois l’objectif atteint, elles doivent être détruites.

                    La loi rappelle également les droits de la personne propriétaire de ses propres données : <br><br>

                    - Le droit d’information, selon lequel toute personne a le droit de savoir si elle est fichée, c’est-à-dire que ses données ont été collectées et enregistrées, ainsi que le droit de savoir dans quel(s) fichier(s) se trouvent ses données.<br>
                    - Le droit d’opposition, où toute personne peut s’opposer à figurer dans un fichier, ou à ce que ses données soient utilisées pour de la prospection ou à des fins commerciales, avec ou sans justification.<br>
                    - Le droit d’accès, qui permet de consulter à tout moment ses propres données, et d’en obtenir une copie. La demande d’accès ne doit pas être abusive, son motif doit être justifié.<br>
                    - Le droit de rectification, par lequel il est possible de modifier ses données, de les compléter ou de les actualiser.<br><br>

                    Ainsi, la création d’un fichier client, l’enregistrement de données sur ses salariés, la collecte d’adresses pour une campagne d’e-mailing ne peuvent se faire au détriment des principes de la loi.<br>

                    La loi Informatique et Liberté constitue le socle de la politique interne de l’entreprise vis-à-vis de la protection des données personnelles, à partir duquel se construit le contenu de la charte des données personnelles propre à l’entreprise.</p>
                </div>
                <span class="close">&times;</span>
            </div>
            <div id="page-mask"></div>
            <script src="/Controller/lang-select.js"></script>
        `;

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Footer Contactez-nous

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const footerPopUpContactUs = `
    <div id="footer-truc" class="pop-up">
        <div class="pop-up-content">
            <h2 class="titre">Nous contacer :</h2>
            <p>Nous sommes là pour répondre à vos questions, écouter vos suggestions ou prendre en compte vos préoccupations. N'hésitez pas à nous contacter via l'un des moyens suivants : <br>

            <h2 class="titre">Formulaire de Contact :<br></h2>
            Remplissez simplement le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.<br>

            Adresse Postale :<br>
            7 rue de Vanves<br>
            92130, Issy-Les-Moulineaux<br><br>

            Téléphone : <br>
            +33 1 95 83 57 35<br><br>

            Email :<br>
            Chamπons@gmail.com<br><br>

            <h2 class="titre">Réseaux Sociaux :<br></h2>
            Suivez-nous sur nos réseaux sociaux pour rester informé(e) de nos dernières actualités et échanger avec nous :<br><br>

            - Facebook : https://facebook.com<br>
            - Twitter : https://twitter.com<br>
            - Instagram : https://instagram.com<br>
            N'hésitez pas à nous contacter pour toute demande d'information supplémentaire. Votre satisfaction est notre priorité !<br>  </p>
            
            <h2 class="titre">Formulaire de contact :<br></h2>
            <div class="form-group">
                <label for="user_name"></label><input type="text" id="user_name" name="user_name" placeholder="First Name">
            </div>
            <div class="form-group">
                <label for="user_Fname"></label><input type="text" id="user_Fname" name="user_Fname" placeholder="Last Name">
            </div>
            <div class="form-group">
                <label for="user_email"></label><input type="text" id="user_email" name="user_email" placeholder="example@email.com">
            </div>
            <div class="form-group">
                <label for="demande"></label>
                <textarea cols="50" rows="10" class="translatable" type="text" id="demande" name="demande" placeholder="Détail de la demande"></textarea>
            </div>
            <div class="form-group">
                <button type="submit" name="spectatorForm" id="footerSend" class="translatable" data-translation-key="connect">Envoyer</button>
            </div>
        </div>
        <span class="close">&times;</span>
        <script type="text/javascript" src="../Controller/contact_handler.js"></script>
    </div>
    <div id="page-mask"></div>
    `;

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Festivals partenaires

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const popUpFestivalsPartenaires = `
            <div id="footer-truc" class="pop-up">
                <div class="pop-up-content">
                    <h2 class="titre">Qu'est-ce que la charte des données personnelles ?</h2>
                    <p>En France, la loi Informatique et Libertés règlemente la collecte et le traitement des données personnelles, relatives à des personnes humaines. Créée en 1978, elle continue d’évoluer, ses dernières modifications datent du 6 août 2004.

                    Ses principes sont le respect des libertés individuelles ou publiques, de la vie privée, des droits de l’homme. <br>Le consentement reste une donnée majeure. Le recueil, l’enregistrement, le traitement ou l’utilisation d’une donnée ne peut se faire sans le consentement explicite de la personne concernée. <br>La pertinence est essentielle : seules les données indispensables à ce pour quoi la collecte a été établie peuvent être collectées et enregistrées. Une fois l’objectif atteint, elles doivent être détruites.

                    La loi rappelle également les droits de la personne propriétaire de ses propres données : <br><br>

                    - Le droit d’information, selon lequel toute personne a le droit de savoir si elle est fichée, c’est-à-dire que ses données ont été collectées et enregistrées, ainsi que le droit de savoir dans quel(s) fichier(s) se trouvent ses données.<br>
                    - Le droit d’opposition, où toute personne peut s’opposer à figurer dans un fichier, ou à ce que ses données soient utilisées pour de la prospection ou à des fins commerciales, avec ou sans justification.<br>
                    - Le droit d’accès, qui permet de consulter à tout moment ses propres données, et d’en obtenir une copie. La demande d’accès ne doit pas être abusive, son motif doit être justifié.<br>
                    - Le droit de rectification, par lequel il est possible de modifier ses données, de les compléter ou de les actualiser.<br><br>

                    Ainsi, la création d’un fichier client, l’enregistrement de données sur ses salariés, la collecte d’adresses pour une campagne d’e-mailing ne peuvent se faire au détriment des principes de la loi.<br>

                    La loi Informatique et Liberté constitue le socle de la politique interne de l’entreprise vis-à-vis de la protection des données personnelles, à partir duquel se construit le contenu de la charte des données personnelles propre à l’entreprise.</p>
                </div>
                <span class="close">&times;</span>
            </div>
            <div id="page-mask"></div>
            <script src="/Controller/lang-select.js"></script>
        `;

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Risques auditifs

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const popUpRisquesAuditifs = `
            <div id="footer-truc" class="pop-up">
                <div class="pop-up-content">
                    <h2 class="titre">Qu'est-ce que la charte des données personnelles ?</h2>
                    <p>En France, la loi Informatique et Libertés règlemente la collecte et le traitement des données personnelles, relatives à des personnes humaines. Créée en 1978, elle continue d’évoluer, ses dernières modifications datent du 6 août 2004.

                    Ses principes sont le respect des libertés individuelles ou publiques, de la vie privée, des droits de l’homme. <br>Le consentement reste une donnée majeure. Le recueil, l’enregistrement, le traitement ou l’utilisation d’une donnée ne peut se faire sans le consentement explicite de la personne concernée. <br>La pertinence est essentielle : seules les données indispensables à ce pour quoi la collecte a été établie peuvent être collectées et enregistrées. Une fois l’objectif atteint, elles doivent être détruites.

                    La loi rappelle également les droits de la personne propriétaire de ses propres données : <br><br>

                    - Le droit d’information, selon lequel toute personne a le droit de savoir si elle est fichée, c’est-à-dire que ses données ont été collectées et enregistrées, ainsi que le droit de savoir dans quel(s) fichier(s) se trouvent ses données.<br>
                    - Le droit d’opposition, où toute personne peut s’opposer à figurer dans un fichier, ou à ce que ses données soient utilisées pour de la prospection ou à des fins commerciales, avec ou sans justification.<br>
                    - Le droit d’accès, qui permet de consulter à tout moment ses propres données, et d’en obtenir une copie. La demande d’accès ne doit pas être abusive, son motif doit être justifié.<br>
                    - Le droit de rectification, par lequel il est possible de modifier ses données, de les compléter ou de les actualiser.<br><br>

                    Ainsi, la création d’un fichier client, l’enregistrement de données sur ses salariés, la collecte d’adresses pour une campagne d’e-mailing ne peuvent se faire au détriment des principes de la loi.<br>

                    La loi Informatique et Liberté constitue le socle de la politique interne de l’entreprise vis-à-vis de la protection des données personnelles, à partir duquel se construit le contenu de la charte des données personnelles propre à l’entreprise.</p>
                </div>
                <span class="close">&times;</span>
            </div>
            <div id="page-mask"></div>
            <script src="/Controller/lang-select.js"></script>
        `;

    function popUp(footerPopUp) {
        document.body.insertAdjacentHTML('beforeend', footerPopUp);

        document.getElementById('page-mask').addEventListener('click', closePopUp);

        document.addEventListener('keydown', function (e) {
            if (e.key === "Escape") {
                closePopUp();
            }
        });

        document.body.addEventListener('click', function (event) {
            if (event.target.matches('.close')) {
                closePopUp();
            }
        });
    }

    function closePopUp() {
        document.querySelectorAll(".pop-up").forEach(el => el.remove());
        const pageMask = document.getElementById('page-mask');
        if (pageMask) {
            pageMask.style.visibility = 'none';
        }
    }

    function cookies() {
        const cookiesResponse = localStorage.getItem('cookiesResponse');

        if (!cookiesResponse) {
            const cookieConsentHTML = `
                <div id="cookieConsent" class="cookie-consent">
                    <div id="cookie-content">
                        <h3>Champions utilise des cookies pour faire fonctionner ce site</h3>
                        <p>Champions prend à cœur de protéger vos données personnelles...</p>
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
    }

    init();
});