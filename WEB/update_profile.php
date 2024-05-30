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
        echo "Profile updated successfully.";
    } else {
        echo "Error updating profile: " . $stmt->error;
    }
}
?>
