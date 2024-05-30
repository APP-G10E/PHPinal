<?php
// Include necessary files and initialize database connection
include '../Controller/lang_retrieve.php';
include '../Controller/db_controller.php';

// Get customerId from the URL parameter
$customerId = $_GET['customerId'];
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Dashboard Client - EventsIT</title>
    <link rel="stylesheet" type="text/css" href="../Styles/dashboard_client.css">
</head>
<body>
<div class="container">
    <h2>Welcome to Your Dashboard</h2>
    <a href="edit_profile.php?customerId=<?php echo htmlspecialchars($customerId); ?>">
        <button type="button">Edit Profile</button>
    </a>
</div>
</body>
</html>
