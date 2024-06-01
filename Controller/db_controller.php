<?php
$servername = "herogu.garageisep.com";
$username = "TBpQTaenke_champions";
$password = "hZ0hRGmX5Kna1oIh";
$dbname = "GOolbSJmUM_champions";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
