<?php
include '../Controller/db_controller.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['customerId'])) {
        // If no customerId is provided, redirect to login page
        header("Location: login.php");
        exit;
    }

    $customerId = $_POST['customerId'];
    $surname = $_POST['surname'];
    $firstName = $_POST['firstName'];
    $phoneNumber = $_POST['phoneNumber'];

    // Update user data
    $sql = "UPDATE customers SET surname = ?, firstName = ?, phoneNumber = ? WHERE customerId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $surname, $firstName, $phoneNumber, $customerId);

    if ($stmt->execute()) {
        // Fetch login expiration time from the database
        $sql = "SELECT subscriptionExpireDate FROM customers WHERE customerId = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $customerId);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $login_expire_time = $row['subscriptionExpireDate'];

        // Fetch language from the URL
        $parse_lang = $_POST['parse_lang'];

        // Redirect to dashboard_client.php with parameters
        $customer_id = $customerId;
        $redirect_url = "dashboard_client.php?customerId=$customer_id&loginExpireTime=$login_expire_time&lang=$parse_lang";
        header("Location: $redirect_url");
        exit;
    } else {
        echo "Error updating profile: " . $stmt->error;
    }
}
?>
