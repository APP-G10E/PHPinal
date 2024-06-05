<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "app_g10e";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['festivalId'])) {
        $festivalId = $conn->real_escape_string($_POST['festivalId']);

        $sql = "SELECT * FROM festival WHERE festivalId = '$festivalId'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $festival = $result->fetch_assoc();

            $imagePath = $festival['IMG-PATH'];
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

            $sql = "DELETE FROM festival WHERE festivalId = '$festivalId'";
            if ($conn->query($sql) === TRUE) {
                echo "Festival deleted successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        } else {
            echo "Festival not found";
        }
    }
}

$conn->close();
?>