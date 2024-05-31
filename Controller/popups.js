document.addEventListener('DOMContentLoaded', function () {

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Footer Protection des données

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const footerPopUpProtectionDonnees = `
            <div id="footer-truc" class="pop-up">
                <div class="pop-up-retour traductible" data-translation-key="footerRetour"></div>
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
            </div>
            <div id="page-mask"></div>
            <script src="/Controller/lang-select.js"></script>
        `;

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Footer mentions légales

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const footerPopUpMentionsLegales = `
            <div id="footer-truc" class="pop-up">
                <div class="pop-up-retour traductible" data-translation-key="footerRetour"></div>
                <div class="pop-up-content">
                    <p>Ce site Internet "le Site web" est exploité par Chamπons.

                    Le siège social de Chamπons est situé au 10 rue de Vanves, Issy-Les-Moulineaux.

                    Veuillez lire nos politiques avant d'utiliser ce site Web - la Politique de confidentialité explique comment nous traiterons les données personnelles et notre Politique sur les cookies explique comment nous utilisons les cookies. L'utilisation de ce site Web indique que vous acceptez ces politiques.</p>
                    <h2 class="titre">Liens vers d'autres sites Web</h2>
                    <p>Les liens vers d'autres sites Web sont fournis uniquement pour la commodité de l'utilisateur et aucune garantie de quelque nature que ce soit n'est donnée à l'égard de ces sites ou de leur contenu et Stellantis décline toute responsabilité pour les sites Web de tiers.</p>
                    <h2 class="titre">Propriété intellectuelle</h2>
                    <p>Tous les éléments du Site sont la propriété intellectuelle de Chamπons et de ses filiales. Ces documents ne peuvent être copiés ou reproduits, sauf dans la mesure nécessaire pour pouvoir les consulter en ligne. Toutefois, vous pouvez imprimer les pages complètes du Site sur papier pour votre usage personnel, selon les modalités suivantes :<br>
                    (a) vous ne modifiez d’aucune manière des documents ou des images qui leur sont associés sur le Site ;<br>
                    (b) vous n’utilisez aucune image indépendamment du texte qui lui est associé sur le Site ; et <br>
                    (c) les droits d’auteur et la marque commerciale de Chamπons ou d’autres avis figurent sur toutes les copies.<br>
                    Tout usage d’extraits du Site autrement que conformément à ces conditions à quelques fins que ce soit est interdit.</p>
                    <h2 class="titre">Droit et juridiction</h2>
                    <p>Ce site web a été créé et est exploité conformément aux lois de la France et les présentes conditions seront régies et interprétées conformément à ces lois. Pour trancher tout litige relatif à ce Site et aux présentes conditions, les lois de la France s'appliqueront et les tribunaux de la France auront compétence exclusive.</p>
                </div>
            </div>
            <div id="page-mask"></div>
        `;

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Footer CGV et CGU

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const footerPopUpCGV = `
            <div id="footer-truc" class="pop-up">
                <div class="pop-up-retour traductible" data-translation-key="footerRetour"></div>
                <div class="pop-up-content">
                    <h2 class="titre">Conditions Générales de Vente (CGV) :</h2>
                    <p>
                    Veuillez lire attentivement les présentes conditions générales de vente avant d'utiliser notre site web. En accédant ou en utilisant une quelconque partie de ce site, vous acceptez d'être lié(e) par ces conditions. Si vous n'acceptez pas toutes les conditions, vous ne pouvez pas accéder au site ou utiliser ses services. Si ces conditions sont considérées comme une offre, l'acceptation est expressément limitée à ces conditions. <br><br>

                    1. Commandes<br>
                    En passant commande sur notre site, vous déclarez être majeur(e) et avoir la capacité juridique nécessaire pour contracter. Vous vous engagez à fournir des informations exactes, complètes et à jour lors de la commande. Nous nous réservons le droit de refuser toute commande pour quelque raison que ce soit.<br><br>

                    2. Prix et Paiement<br>
                    Les prix affichés sur le site sont en devise locale et peuvent être modifiés à tout moment sans préavis. Le paiement s'effectue en ligne au moment de la commande. Nous utilisons des services de paiement sécurisés pour garantir la confidentialité de vos informations.<br><br>

                    3. Livraison<br>
                    Les délais de livraison sont estimatifs et peuvent varier en fonction de votre lieu de résidence et d'autres facteurs indépendants de notre volonté. Nous nous efforçons de respecter les délais de livraison annoncés, mais nous ne pouvons garantir leur exactitude.<br><br>

                    4. Retours et Remboursements<br>
                    Nous acceptons les retours dans les conditions prévues par notre politique de retour, disponible sur notre site web. Les remboursements sont soumis à certaines conditions et peuvent être effectués selon le mode de paiement initial.<br><br>
                    </p>
                    <h2 class="titre">Conditions Générales d'Utilisation (CGU)</h2>
                    <p>Veuillez lire attentivement les présentes conditions générales d'utilisation avant d'utiliser notre site web. En accédant ou en utilisant une quelconque partie de ce site, vous acceptez d'être lié(e) par ces conditions. Si vous n'acceptez pas toutes les conditions, vous ne pouvez pas accéder au site ou utiliser ses services. Si ces conditions sont considérées comme une offre, l'acceptation est expressément limitée à ces conditions.<br><br>

                    1. Utilisation du Site<br>
                    Vous vous engagez à utiliser notre site uniquement à des fins légales et conformément aux présentes conditions. Vous acceptez de ne pas utiliser le site d'une manière qui pourrait compromettre sa sécurité ou sa disponibilité.<br><br>

                    2. Propriété Intellectuelle<br>
                    Tous les contenus présents sur ce site, y compris mais non limité aux textes, images, logos, vidéos, sont la propriété exclusive de notre société ou de nos partenaires et sont protégés par les lois sur la propriété intellectuelle. Toute reproduction, distribution ou utilisation non autorisée est strictement interdite.<br><br>

                    3. Limitation de Responsabilité<br>
                    Nous nous efforçons de maintenir notre site web à jour et sécurisé, mais nous ne pouvons garantir son exactitude ou son caractère exempt de défauts. En accédant ou en utilisant ce site, vous acceptez de le faire à vos propres risques. Nous déclinons toute responsabilité en cas de dommages directs, indirects, accessoires, spéciaux ou consécutifs découlant de l'utilisation ou de l'impossibilité d'utiliser ce site.<br><br>

                    4. Modification des Conditions<br>
                    Nous nous réservons le droit de modifier à tout moment les présentes conditions générales d'utilisation. Toute modification sera publiée sur cette page et entrera en vigueur dès sa publication. En continuant à utiliser ce site après la publication des modifications, vous acceptez les conditions mises à jour.</p>
                    </div>
            </div>
            <div id="page-mask"></div>
        `;

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Footer Contactez-nous

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const footerPopUpContactUs = `
    <div id="footer-truc" class="pop-up">
        <div class="pop-up-retour traductible" data-translation-key="footerRetour"></div>
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
    </div>
    <div id="page-mask"></div>
    <script src="../Controller/contact_handler.js"></script>
`;

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    PopUp Text Editor

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const popupTextEditor = `
    <label htmlFor="language-select">Select Language:</label>
    <select id="language-select">
        <option value="cnko" class="translatable" data-translation-key="cnko"></option>
        <option value="en" class="translatable" data-translation-key="en"></option>
        <option value="fr" class="translatable" data-translation-key="fr"></option>
    </select>

    <label htmlFor="html-select">Select HTML:</label>
    <select id="html-select">
        <option value="htmlCGU" class="translatable" data-translation-key="cgu"></option>
        <option value="htmlFAQ" class="translatable" data-translation-key="faq"></option>
        <option value="htmlMentionLegales" class="translatable" data-translation-key="footerLegalNotice"></option>
    </select>

    <textarea id="html-editor" rows="10" cols="50"></textarea>
    <br/>
    <button id="save-button">Save</button>

    <script src="../Controller/footerTextHandler.js"></script>
`;

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Footer FAQ

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const footerPopUpFAQ = `
            <div id="footer-truc" class="pop-up">
                <div class="pop-up-retour traductible" data-translation-key="footerRetour"></div>
                <div class="pop-up-content">
                    <h2 class="titre">Foire Aux Questions (FAQ) - Billets d'Accès au Festival</h2>
                    <p>Bienvenue dans notre section FAQ dédiée à l'achat de billets d'accès à notre festival. Si vous avez des questions spécifiques qui ne sont pas abordées ici, n'hésitez pas à nous contacter directement. <br><br>

                    <strong class="titre">1. Comment puis-je acheter des billets pour le festival ?<br></strong>
                    Pour acheter des billets pour notre festival, vous pouvez visiter notre site web et accéder à la page dédiée à la billetterie. Choisissez le type de billet et la quantité désirée, puis suivez les instructions pour finaliser votre achat en ligne.<br><br>

                    <strong class="titre">2. Quels sont les différents types de billets disponibles ?<br></strong>
                    Nous proposons plusieurs types de billets, y compris des billets d'accès général, des billets VIP, des billets pour des événements spéciaux, etc. Chaque type de billet offre des avantages et des privilèges différents.<br><br>

                    <strong class="titre">3. Comment recevrai-je mes billets après l'achat ?<br></strong>
                    Une fois votre achat effectué, vous recevrez vos billets par email sous forme de fichier électronique PDF. Vous devrez imprimer ces billets et les présenter à l'entrée du festival pour obtenir votre accès.<br><br>

                    <strong class="titre">4. Puis-je revendre ou transférer mes billets à quelqu'un d'autre ?<br></strong>
                    Oui, dans la plupart des cas, vous pouvez revendre ou transférer vos billets à une autre personne. Cependant, veuillez vérifier les conditions spécifiques à notre festival concernant les transferts de billets et les politiques de revente.<br><br>

                    <strong class="titre">5. Quelle est la politique de remboursement en cas d'annulation du festival ?<br></strong>
                    En cas d'annulation du festival, vous serez admissible à un remboursement intégral du prix du billet. Nous vous contacterons directement pour vous fournir des instructions sur la manière d'obtenir votre remboursement.<br><br>

                    <strong class="titre">6. Y a-t-il des restrictions d'âge pour assister au festival ?<br></strong>
                    Oui, notre festival peut comporter des restrictions d'âge selon les règlements locaux et les politiques de l'événement. Veuillez consulter les informations spécifiques à chaque événement sur notre site web pour connaître les restrictions d'âge applicables.<br><br>

                    <strong class="titre">7. Est-il possible d'acheter des billets sur place le jour du festival ?<br></strong>
                    Dans la mesure où des billets seront disponibles, il sera possible d'en acheter sur place le jour du festival. Cependant, nous recommandons fortement d'acheter vos billets à l'avance en ligne pour garantir votre accès.<br><br>

                    <strong class="titre">8. Comment puis-je contacter le service client en cas de problème avec mes billets ?<br></strong>
                    Si vous rencontrez des problèmes avec vos billets ou si vous avez des questions supplémentaires, vous pouvez contacter notre service clientèle par email à Chamπons@gmail.com ou par téléphone au +33 1 95 83 57 35.<br><br></p>
                </div>
            </div>
            <div id="page-mask"></div>
        `;

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Festivals partenaires

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const popUpFestivalsPartenaires = `
            <div id="footer-truc" class="pop-up">
                <div class="pop-up-retour traductible" data-translation-key="footerRetour"></div>
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
            </div>
            <div id="page-mask"></div>
            <script src="/Controller/lang-select.js"></script>
        `;

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Risques auditifs

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    const popUpRisquesAuditifs = `
            <div id="footer-truc" class="pop-up">
                <div class="pop-up-retour traductible" data-translation-key="footerRetour"></div>
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
            </div>
            <div id="page-mask"></div>
            <script src="/Controller/lang-select.js"></script>
        `;

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Event Listeners

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    document.getElementById('footerProtectionDonnees').addEventListener('click', function () {
        popUp(footerPopUpProtectionDonnees);
    });

    document.getElementById('footerMentionsLegales').addEventListener('click', function () {
        popUp(footerPopUpMentionsLegales);
    });

    document.getElementById('footerCGV').addEventListener('click', function () {
        popUp(footerPopUpCGV);
    });

    document.getElementById('footerContactUs').addEventListener('click', function () {
        popUp(footerPopUpContactUs);
    });

    document.getElementById('footerFAQ').addEventListener('click', function () {
        popUp(footerPopUpFAQ);
    });

    document.getElementById('festivals-partenaires-liste').addEventListener('click', function () {
        popUp(popUpFestivalsPartenaires);
    });

    document.getElementById('risques-son').addEventListener('click', function () {
        popUp(popUpRisquesAuditifs);
    });

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Cookies

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    document.addEventListener('DOMContentLoaded', function () {
        cookies();
    });

    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    Fonctions actives du footer

    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

    function popUp(footerPopUp) {
        document.body.insertAdjacentHTML('beforeend', footerPopUp);

        const footerRetourElement = document.querySelector('.pop-up-retour');
        footerRetourElement.addEventListener('click', function () {
            document.querySelectorAll(".pop-up").forEach(el => el.remove());
            document.getElementById('page-mask').remove();
        });

        document.getElementById('page-mask').addEventListener('click', function () {
            document.querySelectorAll(".pop-up").forEach(el => el.remove());
            document.getElementById('page-mask').remove();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === "Escape") {
                document.querySelectorAll(".pop-up").forEach(el => el.remove());
                document.getElementById('page-mask').remove();
            }
        });
    }
});

function cookies() {
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

            acceptCookiesBtn.addEventListener('click', function () {
                cookieConsent.style.display = 'none';
                pageMask.style.display = 'none';
                document.body.style.overflow = 'visible';
                localStorage.setItem('cookiesResponse', 'true');

                console.log("Choix des cookies", cookiesResponse);
            });

            refuseCookiesBtn.addEventListener('click', function () {
                cookieConsent.style.display = 'none';
                pageMask.style.display = 'none';
                document.body.style.overflow = 'visible';
                localStorage.setItem('cookiesResponse', 'false');

                console.log("Choix des cookies", cookiesResponse);
            });
        }
    }