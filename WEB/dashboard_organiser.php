<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/Assets/Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/Assets/Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/Assets/Favicon/favicon-16x16.png">
    <link rel="manifest" href="/Assets/Favicon/site.webmanifest">

    <link rel="stylesheet" href="/CSS/global.css">
    <link rel="stylesheet" href="/CSS/dashboard_organiser.css">

    <script src="../Controller/popups.js"></script>
</head>

<header>
    <div id="header-background"><img src="../Assets/fade_logo_banner.png" id="fade-logo-banner" alt="Logo Champions">
    </div>

    <div id="left-side-header">
        <img src="../Assets/Champion.png" id="logoHeader" alt="Logo Champions">
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
        <div class="translatable right-header-button" data-translation-key="disconnection"></div>
    </div>
</header>

<body>
<div id="body-container">
    <div id="navbar">
        <div id="navbar-button" class="content-selector" data-tab="userList">Liste des utilisateurs</div>
        <div id="navbar-button" class="content-selector" data-tab="addFestival">Ajouter un festival</div>
    </div>
    <div id="content-container">
        <div id="userList" class="tab-content">
            <?php include 'customerList.php'; ?>
        </div>
        <div id="addFestival" class="tab-content">
            <?php include 'createFestival.php'; ?>
        </div>
    </div>
</div>
</body>

<?php
include '../Styles/footer.php';
?>

</html>
<script src="../Controller/lang-select.js"></script>
<script src="../Controller/dashboard_organiser.js"></script>