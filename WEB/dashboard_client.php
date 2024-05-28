<!DOCTYPE html>
<html lang="fr">

<?php
$page_title = "Home - EventsIT";
$css_file = "homepage.css";
include '../Styles/head.php';
?>

<head>
    <meta charset="UTF-8">
    <title>Accueil-EventsIT</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/Assets/Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/Assets/Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/Assets/Favicon/favicon-16x16.png">
    <link rel="manifest" href="/Assets/Favicon/site.webmanifest">

    <link rel="stylesheet" href="/CSS/global.css">
    <link rel="stylesheet" href="/CSS/dashboard_client.css">
</head>

<!--Pop-up validation des cookies-->
<!--<script src="/Controller/cookies.js"></script>-->

<header>
    <div id="header-background"><img src="/Assets/fade_logo_banner.png" id="fade-logo-banner" alt="Logo Champions">
    </div>

    <div id="left-side-header">
        <img src="/Assets/Champion.png" id="logo-header" alt="Logo Champions">
    </div>

    <div id="right-side-header">
        <div class="translatable" id="header-hi-text" data-translation-key="headerHiText"></div>
        <div id="lang-select">
            <div class="dropdown">
                <div class="dropbtn"><a id="flag1"></a></div>
                <div class="dropdown-content">
                    <div><a class="undraggable flagplus" id="flag2"></a></div>
                    <div><a class="undraggable flagplus" id="flag3"></a></div>
                </div>
            </div>
        </div>
        <div class="translatable right-header-button" data-translation-key="disconnection"></div>
    </div>
</header>

<body>
<div id="spectateur-container">
    <div class="translatable" data-translation-key="spectateur" id="spectateur"></div>
</div>
<div id="body-container">
    <div id="festival-banner-container">
        <img id="selected-festival" class="center-column" src="/Assets/WLG.png" alt="Festival sélectionné">
    </div>

    <div id="festival-info-container" class="center-column">
        <div id="festival-recherche-container">
            <p class="translatable festival-info-title" data-translation-key="choixFestival"></p>
            <input type="text" class="translatable" id="festival-recherche" data-translation-key="festivalRecherche">

            <p class="translatable" data-translation-key="festivalsRecherchesTitre" id="festivals-recherches-titre"></p>
            <div id="festivals-populaires">
                <div class="festival-populaire" id="festival-populaire-1">
                    <p>Solidays</p>
                    <p>🟢</p>
                </div>
                <div class="festival-populaire" id="festival-populaire-2">
                    <p>We Love Green</p>
                    <p>⭕</p>
                </div>
                <div class="festival-populaire" id="festival-populaire-3">
                    <p>Lollapalooza</p>
                    <p>⭕</p>
                </div>
                <div class="festival-populaire" id="festival-populaire-4">
                    <p>Garo Rock</p>
                    <p>🟢</p>
                </div>
            </div>
            <div id="festivals-partenaires-liste" class="translatable lien-precisions"
                 data-translation-key="festivalsPartenairesListe"><p></p></div>
        </div>

        <div id="festival-capteurs-container">
            <p class="translatable festival-info-title" data-translation-key="volumeFestival"></p>
            <div id="sensor-elements-container">

                <div class="sensor-element">
                    <div class="avis-volume">
                        <p class="translatable capt-position" data-translation-key="volumeAvantDroite"></p>
                        <div class="vote-buttons-container">
                            <div class="avis-son translatable monter-son" data-translation-key="monterSon"></div>
                            <div class="avis-son translatable baisser-son" data-translation-key="baisserSon"></div>
                        </div>
                    </div>
                    <div class="sound-level">
                        <div class="volume soundred"><p>102</p></div>
                        <div class="db"><p>dB</p></div>
                    </div>
                </div>

                <div class="sensor-element">
                    <div class="avis-volume">
                        <p class="translatable capt-position" data-translation-key="volumeAvantDroite"></p>
                        <div class="vote-buttons-container">
                            <div class="avis-son translatable monter-son" data-translation-key="monterSon"></div>
                            <div class="avis-son translatable baisser-son" data-translation-key="baisserSon"></div>
                        </div>
                    </div>
                    <div class="sound-level">
                        <div class="volume soundwhite"><p>98</p></div>
                        <div class="db"><p>dB</p></div>
                    </div>
                </div>

                <div class="sensor-element">
                    <div class="avis-volume">
                        <p class="translatable capt-position" data-translation-key="volumeArriereGauche"></p>
                        <div class="vote-buttons-container">
                            <div class="avis-son translatable monter-son" data-translation-key="monterSon"></div>
                            <div class="avis-son translatable baisser-son" data-translation-key="baisserSon"></div>
                        </div>
                    </div>
                    <div class="sound-level">
                        <div class="volume soundgreen"><p>50</p></div>
                        <div class="db"><p>dB</p></div>
                    </div>
                </div>

                <div class="sensor-element">
                    <div class="avis-volume">
                        <p class="translatable capt-position" data-translation-key="volumeArriereDroite"></p>
                        <div class="vote-buttons-container">
                            <div class="avis-son translatable monter-son" data-translation-key="monterSon"></div>
                            <div class="avis-son translatable baisser-son" data-translation-key="baisserSon"></div>
                        </div>
                    </div>
                    <div class="sound-level">
                        <div class="volume soundgreen"><p>45</p></div>
                        <div class="db"><p>dB</p></div>
                    </div>
                </div>
            </div>
            <p id="risques-son" class="translatable lien-precisions" data-translation-key="risquesSon"></p>
        </div>
    </div>
</div>
</body>

<?php
include '../Styles/footer.php';
?>

</html>
<script src="../Controller/lang-select.js"></script>
<script src="../Controller/popups.js"></script>

<!--
Ajouter système de coordonnées pour les capteurs qui change les translation keys en fonction de celles-ci
Faire la liste des capteurs avec les deux scripts
changer les images selon le festival sélectionné
...
-->