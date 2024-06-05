<?php
$page_title = "Dashboard - EventsIT";
$organiserId = $_GET['organiserId'];
include '../Styles/head.php';

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "app_g10e";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the customer ID from the URL
$organiserId = $conn->real_escape_string($_GET['organiserId']);
$login_expire_time = date('Y-m-d H:i:s', strtotime('+12 hours'));
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/Assets/Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/Assets/Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/Assets/Favicon/favicon-16x16.png">
    <link rel="manifest" href="/Assets/Favicon/site.webmanifest">

    <link rel="stylesheet" href="../CSS/global.css">
    <link rel="stylesheet" href="../CSS/dashboard_organiser.css">

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
        <div class="translatable right-header-button" data-translation-key="back_to_HomePage"></div>
        <div class="translatable right-header-button" data-translation-key="disconnection"></div>

        <script>
            document.addEventListener("DOMContentLoaded", function () {
                const button = document.querySelector('.translatable.right-header-button[data-translation-key="disconnection"]');
                if (button) {
                    button.addEventListener('click', function () {
                        window.location.href = 'homepage.php';
                    });
                }
            });
        </script>
        <script>
            document.addEventListener("DOMContentLoaded", function () {
                const organiserId = "<?php echo $organiserId; ?>";
                const loginExpireTime = "<?php echo $login_expire_time; ?>";

                const button = document.querySelector('.translatable.right-header-button[data-translation-key="back_to_HomePage"]');

                if (button) {
                    button.addEventListener('click', function () {
                        const url = `homepage.php?organiserId=${organiserId}&loginExpireTime=${encodeURIComponent(loginExpireTime)}`;
                        window.location.href = url;
                    });
                }
            });
        </script>
    </div>
</header>

<body>
<div id="body-container">
    <div id="organiserText" class="translatable" data-translation-key="organiser"></div>
    <div id="navbar">
        <div id="user-list-button" class="navbar-button translatable" data-translation-key="userList"
             data-tab="userList"></div>
        <div id="add-festival-button" class="navbar-button translatable" data-translation-key="addFestival"
             data-tab="addFestival"></div>
        <div id="select-festival-button" class="navbar-button translatable" data-translation-key="selectionnerFestival"
             data-tab="selectionnerFestival"></div>
    </div>
</div>
<div id="mini-page-container">

</div>
</body>

<?php
include '../Styles/footer.php';
?>

</html>
<script src="../Controller/mini-page-handler.js"></script>
<script src="../Controller/lang-select.js"></script>