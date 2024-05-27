<?php
session_start();
global $conn;

include '../Controller/db_controller.php';

// Toggle the auto clear condition
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['toggle'])) {
        $_SESSION['auto_clear'] = !isset($_SESSION['auto_clear']) || !$_SESSION['auto_clear'];
        echo json_encode(['status' => $_SESSION['auto_clear']]);
        exit;
    }
}

// Clear expired verifications
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['clear'])) {
    $now = date('Y-m-d H:i:s');
    $sql = "DELETE FROM verifier WHERE expireTime < '$now'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['cleared_at' => $now]);
    } else {
        echo json_encode(['error' => $conn->error]);
    }
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Auto Clear</title>
    <link rel="stylesheet" href="../CSS/clear.css">
    <script>
        let autoClear = <?php echo isset($_SESSION['auto_clear']) && $_SESSION['auto_clear'] ? 'true' : 'false'; ?>;

        function toggleAutoClear() {
            fetch('auto_clear.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'toggle=true'
            })
                .then(response => response.json())
                .then(data => {
                    autoClear = data.status;
                    alert('Auto clear is now ' + (autoClear ? 'ON' : 'OFF'));
                    updateButton();
                    if (autoClear) {
                        startAutoClear();
                    }
                });
        }

        function startAutoClear() {
            if (autoClear) {
                clearExpiredVerifications();
                setTimeout(startAutoClear, 10 * 60 * 1000); // 10 minutes
            }
        }

        function clearExpiredVerifications() {
            fetch('auto_clear.php?clear=true')
                .then(response => response.json())
                .then(data => {
                    if (data.cleared_at) {
                        alert('Cleared at ' + data.cleared_at);
                    } else if (data.error) {
                        alert('Error: ' + data.error);
                    }
                });
        }

        function updateButton() {
            const button = document.querySelector('button');
            if (autoClear) {
                button.classList.add('auto-clear-on');
            } else {
                button.classList.remove('auto-clear-on');
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            updateButton();
            if (autoClear) {
                startAutoClear();
            }
        });
    </script>
</head>
<body>
<button onclick="toggleAutoClear()">Auto Clear</button>
</body>
</html>
