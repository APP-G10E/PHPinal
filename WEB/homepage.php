<!DOCTYPE html>
<html lang="fr">

<?php
$page_title = "Home - EventsIT";
$css_file = "homepage.css";
include '../Styles/head.php';
?>

<script src="../Controller/common.js"></script>

<header>

    <div id="left-side-header">
        <img src="../Assets/Champion.png" id="logo-header" alt="Logo Champions">
    </div>

    <div id="right-side-header">
        <div id="lang-select">
            <div class="dropdown">
                <div class="dropbtn"><a id="flag1"></a></div>
                <div class="dropdown-content">
                    <div><a class="undraggable flagplus" id="flag2"></a></div>
                    <div><a class="undraggable flagplus" id="flag3"></a></div>
                </div>
            </div>
        </div>
        <div class="translatable right-header-button" id="header-subscribe" data-translation-key="subscribe"></div>
        <div class="translatable right-header-button" id="header-login" data-translation-key="connection"></div>
    </div>
</header>


<body>


<section>
    <div class="id">
        <img src="../Assets/Logo_high_res_center.png" alt="logo" id="img2">
        <p class="slogan translatable" data-translation-key="ourSlogan"></p>
    </div>
    <br></br>
</section>

<main>
    <div class="image-container">
        <img src="../Assets/fest3.png" alt="fest3" id="img8">
        <div class="image-text-title"><strong class="translatable" data-translation-key="stayInDirectContact"></strong></div>
        <div class="image-text-first-line translatable" data-translation-key="comfortableAndSafeListeningExperience"></div>
        <div class="image-text-second-line translatable" data-translation-key="championCaresForHealth"></div>
    </div>
    <br>
    <div class="image-container">
        <img src="../Assets/fest1.png" alt="logo" id="img3">
        <div class="image-text-title"><strong class="translatable" data-translation-key="interactWithFestivals"></strong></div>
        <div class="image-text-second-line translatable" data-translation-key="vote"></div>
    </div>
    <br>
    <div class="image-container">
        <img src="../Assets/fest2.png" alt="fest2" id="img4">
        <div class="image-text-title"><strong class="translatable" data-translation-key="accessPartnerFestivals"></strong></div>
        <div class="image-text-second-line translatable" data-translation-key="subscriptionBenefits"></div>
    </div>

    <div class="image-container">
        <div class="featured-festivals"><strong class="translatable" data-translation-key="featuredFestivals"></strong></div>
        <br></br>
        <div class="partner-festivals-list translatable" data-translation-key="partnerFestivalsList"></div>
    </div>
    <br></br>


    <div class="image-list">
        <a target="_blank" href="https://www.solidays.com/"><img src="../Assets/soli.jpeg" alt="solidays"
                                                                 class="image-item"></a>
        <a target="_blank" href="https://www.welovegreen.fr/"><img src="../Assets/WLG.png" alt="wlg"
                                                                   class="image-item"></a>
        <a target="_blank" href="https://hellfest.fr/"><img src="../Assets/hell.jpg" alt="Hellfest"
                                                            class="image-item"></a>
        <a target="_blank" href="https://lesardentes.be/"><img src="../Assets/arde.jpg" alt="arde"
                                                               class="image-item"></a>
    </div>
</main>
</body>
<br></br>
<br></br>

<?php
include '../Styles/footer.php';
?>


</html>

<script src="../Controller/lang-select.js"></script>