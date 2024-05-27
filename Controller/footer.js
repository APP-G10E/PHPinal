document.addEventListener('DOMContentLoaded', function () {

    let footerParametresCookies;
    footerParametresCookies.addEventListener('click', function () {
        const footerMiniPage = `
            <div id="footer-truc" class="footer-truc">
                <div class="footer-retour traductible" data-translation-key="footerRetour">X</div>
                <div id="footer-content"></div>
            </div>
            <div id="page-mask"></div>
        `;

        document.body.insertAdjacentHTML('beforeend', footerMiniPage);

        // Sélectionnez l'élément .footer-retour et ajoutez-lui un gestionnaire d'événements pour la suppression
        const footerRetourElement = document.querySelector('.footer-retour');
        footerRetourElement.addEventListener('click', function () {
            // Supprimez l'élément parent de l'élément .footer-retour lorsqu'il est cliqué
            document.getElementById('footer-truc').remove();
            document.getElementById('page-mask').remove();
        });
    });


    footerProtectionDonnees.addEventListener('click', function () {

    });

    footerMentionsLegales.addEventListener('click', function () {

    });

    footerCGV.addEventListener('click', function () {

    });

    footerContactUs.addEventListener('click', function () {

    });

    footerFAQ.addEventListener('click', function () {

    });


});