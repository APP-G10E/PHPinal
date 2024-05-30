<?php
include '../Controller/lang_retrieve.php';
include '../Controller/db_controller.php';

if (!isset($_GET['customerId'])) {
    // If no customerId is provided, redirect to login page
    header("Location: login.php");
    exit;
}

$customerId = $_GET['customerId'];

// Fetch user data
$sql = "SELECT surname, firstName, phoneNumber FROM customers WHERE customerId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $customerId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Edit Profile - EventsIT</title>
    <link rel="stylesheet" type="text/css" href="../Styles/edit_profile.css">
</head>
<body>
<div class="container">
    <h2>Edit Profile</h2>
    <form method="post" action="update_profile.php">
        <input type="hidden" name="customerId" value="<?php echo htmlspecialchars($customerId); ?>">
        <label for="surname">Surname:</label>
        <input type="text" name="surname" value="<?php echo htmlspecialchars($user['surname']); ?>" required><br>

        <label for="firstName">First Name:</label>
        <input type="text" name="firstName" value="<?php echo htmlspecialchars($user['firstName']); ?>" required><br>

        <label for="phoneNumber">Phone Number:</label>
        <input type="text" name="phoneNumber" value="<?php echo htmlspecialchars($user['phoneNumber']); ?>" required><br>

        <input type="submit" value="Update">
    </form>
</div>
</body>
</html>
