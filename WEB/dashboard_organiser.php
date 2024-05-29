<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Accueil-EventsIT</title>
    <link rel="apple-touch-icon" sizes="180x180" href="../Assets/Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../Assets/Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../Assets/Favicon/favicon-16x16.png">
    <link rel="manifest" href="../Assets/Favicon/site.webmanifest">

    <link rel="stylesheet" href="../CSS/global.css">
    <link rel="stylesheet" href="../CSS/dashboard_organiser.css">
</head>

<!--Pop-up validation des cookies-->
<!--<script src="/Controller/cookies.js"></script>-->

<header>
    <div id="header-background"><img src="../Assets/fade_logo_banner.png" id="fade-logo-banner" alt="Logo Champions">
    </div>

    <div id="left-side-header">
        <img src="../Assets/Champion.png" id="logo-header" alt="Logo Champions">
    </div>

    <div id="right-side-header">
        <div class="traductible" id="header-hi-text" data-translation-key="headerHiText"></div>
        <div id="lang-select">
            <div class="dropdown">
                <div class="dropbtn"><a id="flag1"></a></div>
                <div class="dropdown-content">
                    <div><a class="undraggable flagplus" id="flag2"></a></div>
                    <div><a class="undraggable flagplus" id="flag3"></a></div>
                </div>
            </div>
        </div>
        <div class="traductible right-header-button" id="header-logout" data-translation-key="rightHeaderButtonDC"></div>
    </div>
</header>

<body>

<div id="body-container">
    <div id="button-box">
        <div class="miniPageButton" id="showNewFestival">Ajouter un festival</div>
        <div class="miniPageButton" id="showFestivalInfo">Gérer les festivals</div>
        <div class="miniPageButton" id="showUserInformations">Gérer les utilisateurs</div>
    </div>
    <div id="miniPageContainer">

    </div>
</div>

</body>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        // Function to load page content
        function loadPageContent(pageUrl) {
            fetch(pageUrl)
                .then(response => response.text())
                .then(data => {
                    // Load content into miniPageContainer div
                    document.getElementById("miniPageContainer").innerHTML = data;
                })
                .catch(error => {
                    console.error('Error fetching page content:', error);
                });
        }

        // Event listeners for each button
        document.getElementById("showNewFestival").addEventListener("click", function() {
            loadPageContent("miniPageNewFestival.php");
        });

        document.getElementById("showFestivalInfo").addEventListener("click", function() {
            loadPageContent("miniPageFestivalInfo.php");
        });

        document.getElementById("showUserInformations").addEventListener("click", function() {
            loadPageContent("customerList.php");
        });
    });
</script>

<footer>
    <img src="../Assets/Champion.png" alt="logo" id="logo-foot">
    <div class="container-liens">
        <div><p class="footer-link traductible" data-translation-key="footerParametresCookies"
                id="footerParametresCookies"></p></div>
        <div><p class="footer-link traductible" data-translation-key="footerProtectionDonnees"
                id="footerProtectionDonnees"></p></div>
        <div><p class="footer-link traductible" data-translation-key="footerMentionsLegales"
                id="footerMentionsLegales"></p></div>
        <div><p class="footer-link traductible" data-translation-key="footerCGV" id="footerCGV"></p></div>
        <div><p class="footer-link traductible" data-translation-key="footerContactUs" id="footerContactUs"></p></div>
        <div><p class="footer-link traductible empty" data-translation-key="footerFAQ" id="footerFAQ"></p></div>
    </div>
    <br>

    <div class="container-reseaux">
        <a target="_blank" href="https://www.instagram.com/">
            <svg class="footerSVG" id="instagram-svg" data-name="Google alt" viewBox="0 0 420 419.997"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M342.818 100.279a24.3 24.3 0 1 1-24.295-24.295 24.3 24.3 0 0 1 24.295 24.295M420 209.999l-.005.306-1.38 88.105a121.58 121.58 0 0 1-120.2 120.2L210 419.999l-.306-.006-88.105-1.376a121.586 121.586 0 0 1-120.206-120.2L0 209.999l.006-.306 1.376-88.108a121.59 121.59 0 0 1 120.206-120.2L210-.001l.306.006 88.105 1.376a121.584 121.584 0 0 1 120.2 120.2Zm-39.112 0-1.374-87.8A82.654 82.654 0 0 0 297.8 40.484L210 39.113l-87.8 1.371a82.66 82.66 0 0 0-81.716 81.715l-1.371 87.8 1.371 87.8a82.655 82.655 0 0 0 81.716 81.715l87.8 1.371 87.8-1.371a82.65 82.65 0 0 0 81.714-81.715Zm-63.048 0A107.841 107.841 0 1 1 210 102.158a107.96 107.96 0 0 1 107.84 107.841m-39.107 0A68.734 68.734 0 1 0 210 278.733a68.81 68.81 0 0 0 68.732-68.734Z"/>
            </svg>
        </a>

        <a target="_blank" href="https://www.whatsapp.com/">
            <svg class="footerSVG" id="whatsapp-svg"
                 style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
                 viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                <path d="M373.295 307.064c-6.37-3.188-37.687-18.596-43.526-20.724-5.838-2.126-10.084-3.187-14.331 3.188-4.246 6.376-16.454 20.725-20.17 24.976-3.715 4.251-7.431 4.785-13.8 1.594-6.37-3.187-26.895-9.913-51.225-31.616-18.935-16.89-31.72-37.749-35.435-44.126s-.397-9.824 2.792-13c2.867-2.854 6.371-7.44 9.555-11.16 3.186-3.718 4.247-6.377 6.37-10.626 2.123-4.252 1.062-7.971-.532-11.159-1.591-3.188-14.33-34.542-19.638-47.298-5.171-12.419-10.422-10.737-14.332-10.934-3.711-.184-7.963-.223-12.208-.223-4.246 0-11.148 1.594-16.987 7.969-5.838 6.377-22.293 21.789-22.293 53.14 0 31.355 22.824 61.642 26.009 65.894s44.916 68.59 108.816 96.181c15.196 6.564 27.062 10.483 36.312 13.418 15.259 4.849 29.145 4.165 40.121 2.524 12.238-1.827 37.686-15.408 42.995-30.286 5.307-14.882 5.307-27.635 3.715-30.292s-5.838-4.251-12.208-7.44M257.071 465.757h-.086c-38.022-.015-75.313-10.23-107.845-29.535l-7.738-4.592-80.194 21.037 21.405-78.19-5.037-8.017c-21.211-33.735-32.414-72.726-32.397-112.763.047-116.825 95.1-211.87 211.976-211.87 56.595.019 109.795 22.088 149.801 62.139 40.005 40.05 62.023 93.286 62.001 149.902-.048 116.834-95.1 211.889-211.886 211.889M437.403 73.533C389.272 25.347 325.265-1.202 257.068-1.23 116.554-1.23 2.193 113.124 2.136 253.681c-.018 44.932 11.72 88.786 34.03 127.448L0 513.231l135.141-35.45c37.236 20.31 79.159 31.015 121.826 31.029h.105c140.499 0 254.87-114.366 254.928-254.925.026-68.117-26.467-132.166-74.597-180.352"/>
            </svg>
        </a>

        <a target="_blank" href="https://www.twitter.com/">
            <svg id="twitter-svg" class="footerSVG" xmlns="http://www.w3.org/2000/svg" viewBox="13.82 16.15 32.35 27.7">
                <g fill="none" fill-rule="evenodd">
                    <g/>
                    <path d="M41.052 18.437c-1.209-1.375-2.931-2.25-4.838-2.282-3.66-.061-6.628 3.032-6.628 6.908 0 .55.058 1.087.171 1.602-5.508-.358-10.393-3.226-13.662-7.55a7.3 7.3 0 0 0-.897 3.544c0 2.456 1.17 4.636 2.949 5.922a6.34 6.34 0 0 1-3.003-.916v.089c0 3.43 2.285 6.307 5.317 6.977a6.24 6.24 0 0 1-2.993.1c.843 2.813 3.29 4.866 6.191 4.934-2.268 1.883-5.126 3.004-8.232 2.998a13 13 0 0 1-1.58-.102c2.933 2.012 6.417 3.184 10.16 3.185 12.192.003 18.859-10.606 18.859-19.81q0-.452-.02-.9a13.6 13.6 0 0 0 3.308-3.557 12.7 12.7 0 0 1-3.807 1.041 6.8 6.8 0 0 0 2.914-3.806 12.7 12.7 0 0 1-4.209 1.623"
                          fill="#000"/>
                </g>
            </svg>
        </a>
    </div>
</footer>

</html>
<script src="/Controller/lang-select.js"></script>
<script src="/Controller/popups.js"></script>
<script src="/Controller/header.js"></script>
<script src="/Controller/dashboard-orga-minipages.js"></script>