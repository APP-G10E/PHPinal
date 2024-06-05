<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "app_g10e";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$rawData = file_get_contents("php://input");

$data = json_decode($rawData, true);

$firstName = "%" . $data['first_name'] . "%";
$surname = "%" . $data['surname'] . "%";
$email = "%" . $data['email'] . "%";
$phoneNumber = "%" . $data['phone_number'] . "%";
$verified = $data['verified'];
$customerId = "%" . $data['customer_id'] . "%";
$expireDateStart = $data['expire_date_start'];
$expireDateEnd = $data['expire_date_end'];

$sql = "SELECT email, surname, firstName, phoneNumber, verified, customerId, subscriptionExpireDate FROM `customers` WHERE firstName LIKE ? OR surname LIKE ? OR email LIKE ? OR phoneNumber LIKE ? OR verified = ? OR customerId LIKE ? OR (subscriptionExpireDate BETWEEN ? AND ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssssissi', $firstName, $surname, $email, $phoneNumber, $verified, $customerId, $expireDateStart, $expireDateEnd);
$stmt->execute();
$result = $stmt->get_result();
$listcustomers = $result->fetch_all(MYSQLI_ASSOC);

header('Content-Type: application/json');
echo json_encode($listcustomers);
exit;
?>