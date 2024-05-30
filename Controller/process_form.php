<?php
header('Content-Type: application/json');

if (isset($_POST['user_name']) && isset($_POST['user_Fname']) && isset($_POST['user_email']) && isset($_POST['demande'])) {
    $userName = $_POST['user_name'];
    $userFname = $_POST['user_Fname'];
    $userEmail = $_POST['user_email'];
    $demande = $_POST['demande'];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "app_g10e";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO contact_form (firstName, surname, email, msg) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $userName, $userFname, $userEmail, $demande);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Données insérées avec succès']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'insertion des données']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Données du formulaire manquantes']);
}
?>
