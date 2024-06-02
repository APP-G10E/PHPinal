<?php
include 'db_controller.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['user_name']) && isset($_POST['user_Fname']) && isset($_POST['user_email']) && isset($_POST['demande'])) {
        $userName = $_POST['user_name'];
        $userFname = $_POST['user_Fname'];
        $userEmail = $_POST['user_email'];
        $demande = $_POST['demande'];
        $sql = "INSERT INTO contact_us (firstName, surname, email, msg) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss",$userFname, $userName, $userEmail, $demande);

        $response = [];
        if ($stmt->execute()) {
            $response['success'] = true;
        } else {
            $response['success'] = false;
        }

        echo json_encode($response);

    } else {
        $response = ['success' => false, 'message' => 'POST data does not exist'];
        echo json_encode($response);
    }
}
?>