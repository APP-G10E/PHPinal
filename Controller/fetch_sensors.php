<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "app_g10e";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$festivalName = $conn->real_escape_string($_POST['festivalName']);

$sql = "SELECT * FROM sensors WHERE festivalName = '$festivalName'";
$result = $conn->query($sql);

$sensors = array();
while($row = $result->fetch_assoc()) {
    $sensors[] = $row;
}

echo json_encode($sensors);

$conn->close();
?>