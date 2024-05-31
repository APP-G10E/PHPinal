<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
global $conn;

include '../Controller/db_controller.php';

function checkAdmin($admin_name, $admin_password): bool
{
    global $conn;

    // Prepare the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT admin_password FROM super WHERE admin_name = ?");
    $stmt->bind_param("s", $admin_name);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        // Admin name doesn't exist
        echo "<script>alert('Name does not exist');</script>";
        return false;
    } else {
        // Fetch the row
        $row = $result->fetch_assoc();

        // Verify the password
        if (password_verify($admin_password, $row['admin_password'])) {
            // Password is correct
            return true;
        } else {
            // Password is incorrect
            echo "<script>alert('Password mismatch');</script>";
            return false;
        }
    }
}

function ensureAdmin($page) {
    if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
        header('Location: admin_login.php?page=' . urlencode($page));
        exit;
    }
}

function loginAdmin($admin_name, $admin_password, $page) {
    if (checkAdmin($admin_name, $admin_password)) {
        $_SESSION['admin_logged_in'] = true;
        header("Location: $page");
        exit;
    } else {
        $_SESSION['admin_logged_in'] = false;
        echo "<script>alert('Invalid credentials');</script>";
    }
}

