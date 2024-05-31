<?php
global $lang;
global $conn;

include '../Controller/lang_retrieve.php';
include '../Controller/db_controller.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to generate a random verification code
function generateVerificationCode(): int
{
    return mt_rand(100000, 999999); // Generates a 6-digit random number
}

// Handle the email verification process when the page is loaded
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["email"])) {
    $email = $_GET["email"];
    $parse_lang = $_GET["lang"];

    $sql = "SELECT surname FROM customers WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch the surname
        $row = $result->fetch_assoc();
        $name = $row['surname'];

        // Generate a verifierId
        $verifierId = uniqid();

        // Generate a verification code
        $verificationCode = generateVerificationCode();

        // Calculate expire time (now + 5 minutes)
        $expireTime = date('Y-m-d H:i:s', strtotime('+5 minutes'));

        // Insert verification data into verifier table
        $sql = "INSERT INTO verifier (verifierId, userEmail, verificationCode, expireTime) 
                VALUES ('$verifierId', '$email', '$verificationCode', '$expireTime')";

        if ($conn->query($sql) === TRUE) {
            // Call the code_sending.php to send the email
            include '../Mail/code_sending.php';
            if (sendVerificationEmail($email, $name, $parse_lang, $verificationCode)) {
                // Email sent successfully
            } else {
                echo "<script>alert('Failed to send verification email.'); window.history.back();</script>";
            }
        } else {
            echo "<script>alert('Error: " . addslashes($conn->error) . "'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('No customer found with that email.'); window.history.back();</script>";
    }
}

// Handle the verification code submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["code"]) && isset($_POST["email"])) {
    $email = $_POST["email"];
    $code = $_POST["code"];
    $parse_lang = $_POST["parse_lang"];

    $sql = "SELECT * FROM verifier WHERE userEmail = '$email' AND verificationCode = '$code'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Mark the user as verified
        $sql = "UPDATE customers SET verified = 1 WHERE email = '$email'";
        if ($conn->query($sql) === TRUE) {
            echo "success";
        } else {
            echo "<script>alert('Error updating record: " . addslashes($conn->error) . "'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('Verification failed.'); window.history.back();</script>";
    }
    exit;
}

// Close connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">
<?php
$page_title = "Email Verification - EventsIT";
$css_file = "mail_verify.css";
include '../Styles/head.php';
?>

<?php
include '../Styles/header.php';
?>

<body>
<div class="container">
    <form id="verificationForm" class="verification-form" method="post">

        <input type="hidden" name="parse_lang" value="<?php echo $lang; ?>">
        <input type="hidden" name="email" value="<?php echo isset($_GET["email"]) ? $_GET["email"] : ''; ?>">

        <div class="back_home translatable" data-translation-key="back_to_HomePage" onclick="goToHomePage()"></div>
        <div class="signup">
            <p class="translatable" data-translation-key="verification_step"></p>
        </div>

        <div class="under_links">
            <p class="translatable" data-translation-key="check_inbox"></p>
        </div>

        <div class="form-group">
            <label for="code"></label>
            <input type="text" id="code" name="code" class="translatable" data-translation-key="enter_code" required>
        </div>

        <div class="form-group">
            <button class="translatable" type="submit" id="verifyButton" data-translation-key="verify"></button>
        </div>

        <div class="form-group-1">
            <button class="translatable" type="button" id="sendAgain" onclick="resendCode()" data-translation-key="resend_code"></button>
        </div>

        <div class="form-group-1">
            <a href="login.php?lang=<?php echo $lang; ?>">
                <button class="translatable" type="button" id="goToLoginButton" data-translation-key="go_to_login"></button>
            </a>
        </div>
    </form>
    <div class="image-container">
        <img src="../Assets/fade_logo_banner.png" alt="Image">
    </div>
</div>

<script>
    function resendCode() {
        // Disable the button for 1 minute
        document.getElementById('sendAgain').disabled = true;
        setTimeout(function() {
            document.getElementById('sendAgain').disabled = false;
        }, 60000); // 1 minute in milliseconds

        // AJAX request to resend verification code
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // Handle response if needed
            }
        };
        xhttp.open("GET", "mail_verify.php?email=<?php echo isset($_GET['email']) ? $_GET['email'] : ''; ?>&lang=<?php echo $lang; ?>", true);
        xhttp.send();
    }

    document.getElementById('verificationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        var code = document.getElementById('code').value;
        var email = "<?php echo isset($_GET['email']) ? $_GET['email'] : ''; ?>";
        var parse_lang = "<?php echo $lang; ?>";

        // AJAX request to verify code
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var response = this.responseText.trim();
                if (response === "success") {
                    // Redirect to login page with language parameter
                    window.location.replace("login.php?lang=" + parse_lang);
                } else {
                    // Show alert if verification fails
                    alert("Code incorrect or expired. Please try again.");
                }
            }
        };
        xhttp.open("POST", "mail_verify.php", true); // The same PHP file
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("code=" + code + "&email=" + email + "&parse_lang=" + parse_lang);
    });
</script>

<?php
include '../Styles/footer.php';
?>


</html>

<script src="../Controller/lang-select.js"></script>
<script src="../Controller/popups.js"></script>

