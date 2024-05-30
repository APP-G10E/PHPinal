<?php
global $page;
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
include 'auth.php';

// Retrieve the page from the URL parameter if available
$page = isset($_GET['page']) ? $_GET['page'] : 'HelloUser.html';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $admin_name = $_POST['admin_name'];
    $admin_password = $_POST['admin_password'];
    $page = $_POST['page'];
    loginAdmin($admin_name, $admin_password, $page);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Login</title>
    <link rel="stylesheet" href="../CSS/admin_login.css">
</head>
<body>
<form method="post" action="admin_login.php" class="login-form">
    <label for="admin_name">Super User Name</label>
    <input type="text" id="admin_name" name="admin_name" placeholder="Super User Name" required>

    <label for="admin_password">Password</label>
    <input type="password" id="admin_password" name="admin_password" placeholder="Password" required>

    <input type="hidden" name="page" value="<?php echo htmlspecialchars($page); ?>">

    <button type="submit">Login</button>
</form>
</body>
</html>
