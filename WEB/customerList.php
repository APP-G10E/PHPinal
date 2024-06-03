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

// Handle delete request
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['email'])) {
    $email = $_POST['email'];

    // SQL to delete a record
    $sql = "DELETE FROM customers WHERE email = ?";

    // Prepare and bind
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);

    if ($stmt->execute()) {
        $message = "Record deleted successfully";
    } else {
        $message = "Error deleting record: " . $conn->error;
    }

    $stmt->close();
}

// Query to select all customers
$sql = "SELECT surname, firstName, email, phoneNumber FROM customers";
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User List</title>
    <link rel="stylesheet" href="../CSS/dashboard_organiser.css">
    <link rel="stylesheet" href="../CSS/global.css">
</head>
<body>
<?php
if (isset($message)) {
    echo "<p>$message</p>";
}
?>
<table>
    <thead>
    <tr>
        <th>Prénom</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Numéro de téléphone</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <?php
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>{$row['firstName']}</td>";
            echo "<td>{$row['surname']}</td>";
            echo "<td>{$row['email']}</td>";
            echo "<td>{$row['phoneNumber']}</td>";
            echo "<td>
                    
                        <button type='submit'>Delete</button>
                    
                  </td>";
            echo "</tr>";
        }
    } else {
        echo "<tr><td colspan='5'>Aucun utilisateur</td></tr>";
    }
    ?>
    </tbody>
</table>
</body>
</html>

<?php
// Close MySQL connection
$conn->close();
?>
