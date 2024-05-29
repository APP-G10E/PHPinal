<?php
// Database connection parameters
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "app_g10e";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to select all customers
$sql = "SELECT surname, firstName, email, phoneNumber FROM customers";
$result = $conn->query($sql);

// Close MySQL connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User List</title>
    <link rel="stylesheet" href="../CSS/customerList.css">
</head>
<body>
<table>
    <thead>
    <tr>
        <th>Prénom</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Numéro de téléphone</th>
    </tr>
    </thead>
    <tbody>
    <?php
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>{$row['firstName']}</td>";
            echo "<td>{$row['surname']}</td>";
            echo "<td>{$row['email']}</td>";
            echo "<td>{$row['phoneNumber']}</td>";
            echo "</tr>";
        }
    } else {
        echo "<tr><td colspan='4'>Aucun utilisateur</td></tr>";
    }
    ?>
    </tbody>
</table>
<script src="scripts.js"></script>
</body>
</html>



