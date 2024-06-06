<?php

global $lang;
global $conn;

include '../Controller/lang_retrieve.php';
include '../Controller/db_controller.php';

// Form submission handling
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $parse_lang = $_POST["parse_lang"];
    $firstName = $_POST["firstName"];
    $surname = $_POST["surname"];
    $email = $_POST["email"];
    $phoneNumber = $_POST["phoneNumber"];
    $password = $_POST["password"];
    $raison = $_POST["raison"];

    // Generate a unique organiserId
    $organiserId = uniqid();

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert organiser data into database
    $sql = "INSERT INTO organisers (organiserId, firstName, surname, email, password, phoneNumber, reason, verified)
            VALUES ('$organiserId', '$firstName', '$surname', '$email', '$hashedPassword', '$phoneNumber', '$raison', 0)";

    if ($conn->query($sql) === TRUE) {
        // Redirect to mail_verify.php with email and hashed password
        header("Location: mail_verify.php?email=$email&lang=$parse_lang");
        exit;
    } else {
        echo "<script>alert('Error: " . addslashes($conn->error) . "'); window.history.back();</script>";
    }
}

// Close connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">

<?php
$page_title = "Organiser Sign Up - EventsIT";
$css_file = "sign_up.css";
include '../Styles/head.php';
?>

<?php
include '../Styles/header.php';
?>

<body>

<div class="container">
    <form id="organiserForm" class="login-form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
        <input type="hidden" name="parse_lang" value="<?php echo $lang; ?>">
        <div class="back_home translatable" data-translation-key="back_to_HomePage" onclick="goToHomePage()"></div>
        <div class="signup">
            <p class="translatable" data-translation-key="signupPrompt"></p>
        </div>
        <div class="form-group">
            <label for="firstName"></label>
            <input type="text" id="firstName" name="firstName" class="translatable" data-translation-key="firstNamePlaceholder" required>
        </div>
        <div class="form-group">
            <label for="surname"></label>
            <input type="text" id="surname" name="surname" class="translatable" data-translation-key="surnamePlaceholder" required>
        </div>
        <div class="form-group">
            <label for="email"></label>
            <input type="text" id="email" name="email" class="translatable" data-translation-key="emailPlaceholder" required>
        </div>
        <div class="form-group">
            <label for="confirmEmail"></label>
            <input type="text" id="confirmEmail" name="confirmEmail" class="translatable" data-translation-key="confirmEmailPlaceholder" required>
        </div>
        <div class="form-group">
            <label for="phoneNumber"></label>
            <input type="text" id="phoneNumber" name="phoneNumber" class="translatable" data-translation-key="telephonePlaceholder" required>
        </div>
        <div class="form-group">
            <label for="raison"></label>
            <input type="text" id="raison" name="raison" class="translatable" data-translation-key="raisonPlaceHolder" required>
        </div>
        <div class="form-group">
            <input type="password" id="password" name="password" class="translatable" data-translation-key="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}" title="Doit contenir au moins un chiffre et une lettre majuscule et minuscule, et au moins 8 caractères." required>
        </div>
        <div class="form-group">
            <div class="terms-container">
                <input type="checkbox" id="terms" name="terms" required>
                <label for="terms" class="translatable" data-translation-key="termsLabel"></label>
            </div>
        </div>
        <div class="form-group">
            <button type="submit" id="create" class="translatable" data-translation-key="createAccButton"></button>
        </div>
        <div class="under_links">
            <p class="translatable" data-translation-key="alreadyHaveAccountPrompt"></p>
            <a class="translatable" href="login.php?lang=<?php echo $lang; ?>" data-translation-key="backToConnectionPrompt"></a>
        </div>
        <div class="under_links">
            <a class="translatable" href="demand_acc_customer.php?lang=<?php echo $lang; ?>" data-translation-key="customerRequestPrompt"></a>
        </div>
        <div id="error-message"></div>
    </form>
    <div class="image-container">
        <img src="../Assets/fade_logo_banner.png" alt="Image">
    </div>
</div>

</body>

<script>
    document.getElementById('organiserForm').addEventListener('submit', function(event) {
        const email = document.getElementById('email').value;
        const confirmEmail = document.getElementById('confirmEmail').value;

        if (email !== confirmEmail) {
            alert('Les emails ne correspondent pas.');
            event.preventDefault();
        }
    });
</script>

<?php
include '../Styles/footer.php';
?>

</html>

<script src="../Controller/lang-select.js"></script>