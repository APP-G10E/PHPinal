<?php
$page = "verify_organisers.php";
include 'auth.php';
ensureAdmin($page);
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

global $conn;

include '../Controller/db_controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['verify'])) {
        $organiserId = $_POST['organiserId'];
        $sql = "UPDATE `organisers` SET verified = TRUE WHERE organiserId = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $organiserId);
        $stmt->execute();
        echo json_encode(['status' => 'verified']);
        exit;
    } elseif (isset($_POST['reject'])) {
        $organiserId = $_POST['organiserId'];
        $sql = "DELETE FROM `organisers` WHERE organiserId = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $organiserId);
        $stmt->execute();
        echo json_encode(['status' => 'rejected']);
        exit;
    }
}

$unverifiedOrganisers = [];
$sql = "SELECT organiserId, email, surname, firstName, phoneNumber, reason FROM `organisers` WHERE verified = FALSE";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $unverifiedOrganisers[] = $row;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Verify Organisers</title>
    <link rel="stylesheet" href="../CSS/verify.css">
    <script>
        function showReasonPopup(organiser) {
            const popup = document.createElement('div');
            popup.className = 'popup';
            popup.innerHTML = `
                <h2>${organiser.firstName} ${organiser.surname}</h2>
                <p>${organiser.reason}</p>
                <button onclick="verifyOrganiser('${organiser.organiserId}')">Verify</button>
                <button onclick="rejectOrganiser('${organiser.organiserId}')">Reject</button>
                <button onclick="document.body.removeChild(this.parentElement)">Close</button>
            `;
            document.body.appendChild(popup);
        }

        function verifyOrganiser(organiserId) {
            fetch('verify_organisers.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'verify=true&organiserId=' + encodeURIComponent(organiserId)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'verified') {
                        alert('Organiser verified');
                        location.reload();
                    }
                });
        }

        function rejectOrganiser(organiserId) {
            fetch('verify_organisers.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'reject=true&organiserId=' + encodeURIComponent(organiserId)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'rejected') {
                        alert('Organiser rejected');
                        location.reload();
                    }
                });
        }

        window.addEventListener('beforeunload', function () {
            fetch('logout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: ''
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'logged_out') {
                        console.log('Logged out successfully');
                    }
                });
        });
    </script>
</head>
<body>
<h2>Verify Organisers</h2>
<table>
    <thead>
    <tr>
        <th>Email</th>
        <th>Surname</th>
        <th>First Name</th>
        <th>Phone Number</th>
        <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <?php foreach ($unverifiedOrganisers as $organiser): ?>
        <tr>
            <td><?php echo htmlspecialchars($organiser['email']); ?></td>
            <td><?php echo htmlspecialchars($organiser['surname']); ?></td>
            <td><?php echo htmlspecialchars($organiser['firstName']); ?></td>
            <td><?php echo htmlspecialchars($organiser['phoneNumber']); ?></td>
            <td>
                <button onclick='showReasonPopup(<?php echo json_encode($organiser); ?>)'>Check</button>
            </td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>
</body>
</html>
