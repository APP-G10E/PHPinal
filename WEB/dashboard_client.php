<!DOCTYPE html>
<html lang="fr">

<?php
$page_title = "Home - EventsIT";
$css_file = "homepage.css";
$customerId = $_GET['customerId'];
include '../Styles/head.php';

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "app_g10e";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$customerId = $conn->real_escape_string($_GET['customerId']);

$sql = "SELECT firstName FROM customers WHERE customerId = '$customerId'";
$result = $conn->query($sql);
$user = $result->fetch_assoc();


$sql = "SELECT surname, firstName, phoneNumber FROM customers WHERE customerId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $customerId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

$conn->close();


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

    <script src="../Controller/popups.js"></script>
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
        <div class="translatable header-hi-text" data-translation-key="headerHiText"></div>
        <div class="header-hi-text" id="header-name" data-translation-key="headerName"></div>
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
    <div class="translatable bjrSpectateur" data-translation-key="hello"></div>
    <div class="bjrSpectateur" id="bjrSpectateur"> <?php echo '&nbsp;' . htmlspecialchars($user['firstName']); ?></div>
</div>
<div id="body-container">
    <div id="festival-banner-container">
        <div class="translatable selectionnerFestival" data-translation-key="selectionnerFestival"></div>
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
                    <p>Les Ardentes</p>
                    <p>⭕</p>
                </div>
                <div class="festival-populaire" id="festival-populaire-4">
                    <p>Hellfest</p>
                    <p>🟢</p>
                </div>
            </div>
            <div id="festivals-partenaires-liste" class="translatable lien-precisions"
                 data-translation-key="festivalsPartenairesListe"><p></p></div>
        </div>

        <div id="festival-capteurs-container">
            <p class="translatable festival-info-title" data-translation-key="volumeFestival"></p>
            <div id="sensor-elements-container">
                <div class="translatable selectionnerFestival" data-translation-key="selectionnerFestival"></div>
            </div>
            <p id="risques-son" class="translatable lien-precisions" data-translation-key="risquesSon"></p>
        </div>
    </div>
</div>
<script src="../Controller/dashboard_client.js"></script>
</body>

<?php
include '../Styles/footer.php';
?>

</html>
<script src="../Controller/lang-select.js"></script>

<!--
Ajouter système de coordonnées pour les capteurs qui change les translation keys en fonction de celles-ci
Faire la liste des capteurs avec les deux scripts avec le html des sensor elements
Pareil pour les festivals populaires
Changer la bannière (image) selon le festival sélectionné
...
-->