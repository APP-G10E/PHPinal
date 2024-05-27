<?php

global $lang;
global $conn;

include '../Controller/lang_retrieve.php';
include '../Controller/db_controller.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $parse_lang = $_POST['parse_lang'];
    // Check which form is submitted
    if (isset($_POST['spectatorForm'])) {
        $user_email = $_POST['user_email'];
        $password = $_POST['password'];

        // Check if the username exists in the customers table
        $sql = "SELECT * FROM customers WHERE email = '$user_email' AND verified = TRUE";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            // Verify password
            if (password_verify($password, $row['password'])) {
                // Password is correct, set session or redirect to dashboard_client.php with customer ID
                $customer_id = $row['customerId'];
                // Set login expire time to current time + 12 hours
                $login_expire_time = date('Y-m-d H:i:s', strtotime('+12 hours'));
                // Redirect to dashboard_client.php with customer ID and login expire time
                header("Location: dashboard_client.php?customerId=$customer_id&loginExpireTime=$login_expire_time&lang=$parse_lang");
                exit;
            } else {
                // Incorrect password
                echo "<script>alert('Incorrect password.'); window.history.back();</script>";
            }
        } else {
            // Username not found
            echo "<script>alert('User not found.'); window.history.back();</script>";
        }
    } elseif (isset($_POST['organiserForm'])) {
        $user_email = $_POST['user_email'];
        $password = $_POST['password'];

        // Check if the username exists in the organisers table
        $sql = "SELECT * FROM organisers WHERE email = '$user_email' AND verified = TRUE";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            // Verify password
            if (password_verify($password, $row['password'])) {
                // Password is correct, set session or redirect to dashboard_organiser.php with organiser ID
                $organiser_id = $row['organiserId'];
                // Set login expire time to current time + 12 hours
                $login_expire_time = date('Y-m-d H:i:s', strtotime('+12 hours'));
                // Redirect to dashboard_organiser.php with organiser ID and login expire time
                header("Location: dashboard_organiser.php?organiserId=$organiser_id&loginExpireTime=$login_expire_time&lang=$parse_lang");
                exit;
            } else {
                // Incorrect password
                echo "<script>alert('Incorrect password.'); window.history.back();</script>";
            }
        } else {
            // Username not found
            echo "<script>alert('User not found.'); window.history.back();</script>";
        }
    }
}
?>


<!DOCTYPE html>
<html lang="fr">

<?php
$page_title = "Login - EventsIT";
$css_file = "login.css";
include '../Styles/head.php';
?>

<?php
include '../Styles/header.php';
?>

<body>
<div class="container">

    <form id="spectatorForm" class="login-form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <input type="hidden" name="parse_lang" value="<?php echo $lang; ?>">
        <div class="back_home translatable" data-translation-key="back_to_HomePage" onclick="goToHomePage()"></div>

        <div class="switch">
            <p><span class=" translatable" data-translation-key="spectator"></span>
                <a href="#" id="showOrganiserForm">
                    <span class=" translatable" data-translation-key="organiser"></span></a></p>
        </div>

        <div class="form-group">
            <label for="user_email"></label><input type="text" id="user_email" name="user_email" placeholder="example@email.com">
        </div>
        <div class="form-group">
            <label for="password"></label>
            <input class="translatable" type="password" id="password" name="password" data-translation-key="password">
        </div>
        <div class="form-group">
            <button type="submit" name="spectatorForm" id="login" class=" translatable" data-translation-key="connect"></button>
        </div>
        <div class="under_links">
            <p class="translatable" data-translation-key="newUserPrompt"></p>
            <a class="translatable" href="sign_up.php?lang=<?php echo $lang; ?>" data-translation-key="createAccount"></a>
        </div>

        <div class="under_links">
            <a href="mdp_recover.php?lang=<?php echo $lang; ?>" class="translatable" data-translation-key="forgotPasswordPrompt"></a>
        </div>
    </form>
    <form id="organiserForm" style="display: none;" class="login-form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <input type="hidden" name="parse_lang" value="<?php echo $lang; ?>">
        <div class="back_home translatable" data-translation-key="back_to_HomePage" onclick="goToHomePage()"></div>

        <div class="switch">
            <p><a href="#" id="showSpectatorForm"><span class=" translatable" data-translation-key="spectator"></span>
                </a>
                    <span class=" translatable" data-translation-key="organiser"></span></p>
        </div>
        <div class="form-group">
            <input type="text" id="user_email" name="user_email" placeholder="example@email.com">
        </div>
        <div class="form-group">
            <label for="password"></label>
            <input class="translatable" type="password" id="password" name="password" data-translation-key="password">
        </div>
        <div class="form-group">
            <button type="submit" name="organiserForm" id="login" class="translatable" data-translation-key="connect"></button>
        </div>
        <div class="under_links">
            <p class="translatable" data-translation-key="manageFestivalsPrompt"></p>
            <a class="translatable" href="demand_acc_organiser.php?lang=<?php echo $lang; ?>" data-translation-key="contactUsPrompt"></a>
        </div>
        <div class="under_links">
            <a href="mdp_recover.php?lang=<?php echo $lang; ?>"  class="translatable" data-translation-key="forgotPasswordPrompt"></a>
        </div>
    </form>
    <div class="image-container">
        <img src="../Assets/fade_logo_banner.png" alt="Image">
    </div>
</div>

</body>

<script>
    document.getElementById('showSpectatorForm').addEventListener('click', function() {
        document.getElementById('spectatorForm').style.display = 'block';
        document.getElementById('organiserForm').style.display = 'none';
    });

    document.getElementById('showOrganiserForm').addEventListener('click', function() {
        document.getElementById('spectatorForm').style.display = 'none';
        document.getElementById('organiserForm').style.display = 'block';
    });
</script>

<?php
include '../Styles/footer.php';
?>


</html>

<script src="../Controller/lang-select.js"></script>