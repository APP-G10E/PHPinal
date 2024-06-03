<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "app_g10e";
$festivalId = uniqid();
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['add'])) {
        // Handle add event
        $festivalName = $conn->real_escape_string($_POST['festivalName']);
        $beginTime = $conn->real_escape_string($_POST['beginTime']);
        $endTime = $conn->real_escape_string($_POST['endTime']);
        $ticketPrice = $conn->real_escape_string($_POST['ticketPrice']);

        // Handle file upload
        $target_dir = "../Assets/";
        $target_file = $target_dir . basename($_FILES["festivalImage"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        $check = getimagesize($_FILES["festivalImage"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }

        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }

        if ($_FILES["festivalImage"]["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }

        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        } else {
            if (move_uploaded_file($_FILES["festivalImage"]["tmp_name"], $target_file)) {
                echo "The file " . basename($_FILES["festivalImage"]["name"]) . " has been uploaded.";

                $sql = "INSERT INTO festival (festivalId, festivalName, beginTime, endTime, ticketPrice, `IMG-PATH`) VALUES ('$festivalId','$festivalName', '$beginTime', '$endTime', '$ticketPrice', '$target_file')";

                if ($conn->query($sql) === TRUE) {
                    echo "";
                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    } elseif (isset($_POST['delete'])) {
        // Handle delete event
        $festivalIdToDelete = $conn->real_escape_string($_POST['festivalId']);
        $sql = "DELETE FROM festival WHERE festivalId='$festivalIdToDelete'";
        if ($conn->query($sql) === TRUE) {
            echo "";
        } else {
            echo "Error deleting record: " . $conn->error;
        }
    } elseif (isset($_POST['update'])) {
        // Handle update event
        $festivalIdToUpdate = $conn->real_escape_string($_POST['festivalId']);
        $festivalName = $conn->real_escape_string($_POST['festivalName']);
        $beginTime = $conn->real_escape_string($_POST['beginTime']);
        $endTime = $conn->real_escape_string($_POST['endTime']);
        $ticketPrice = $conn->real_escape_string($_POST['ticketPrice']);

        $sql = "UPDATE festival SET festivalName='$festivalName', beginTime='$beginTime', endTime='$endTime', ticketPrice='$ticketPrice' WHERE festivalId='$festivalIdToUpdate'";

        if ($conn->query($sql) === TRUE) {
            echo "";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    }
}

// Retrieve events from the database
$events = [];
$sql = "SELECT * FROM festival";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $events[] = $row;
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ajouter un Festival</title>
    <link rel="stylesheet" href="/CSS/global.css">
    <link rel="stylesheet" href="/CSS/dashboard_organiser.css">
</head>
<div class="container">
    <form action="" method="post" enctype="multipart/form-data">
        <h2 class="translatable" data-translation-key="addFestival"></h2><br>

        <input type="hidden" name="add" value="1">
        <label for="festivalName" class="translatable" data-translation-key="festivalName"></label>
        <input type="text" id="festivalName" name="festivalName" required>

        <label for="beginTime" class="translatable" data-translation-key="beginTime"></label>
        <input type="date" id="beginTime" name="beginTime" required>

        <label for="endTime" class="translatable" data-translation-key="endTime"></label>
        <input type="date" id="endTime" name="endTime" required>

        <label for="ticketPrice" class="translatable" data-translation-key="ticketPrice"></label>
        <input type="text" id="ticketPrice" name="ticketPrice" required>

        <label for="festivalImage" class="translatable" data-translation-key="festivalImage"></label>
        <input type="file" id="festivalImage" name="festivalImage" required>

        <input type="submit" class="translatable" data-translation-key="add" value="Ajouter" id="blabla">
    </form>

    <div class="event-list">
        <h2 class="translatable" data-translation-key="event"></h2>
        <?php foreach ($events as $event): ?>
            <div class="event-item">
                <h3><?php echo $event['festivalName']; ?></h3>
                <p class="translatable" data-translation-key="beginning"></p> <nobr><?php echo $event['beginTime']; ?></nobr><br>
                <p class="translatable" data-translation-key="end"></p> <nobr><?php echo $event['endTime']; ?></nobr><br>
                <p class="translatable" data-translation-key="price"></p> <nobr><?php echo $event['ticketPrice']; ?> €</nobr><br>
                <p><img src="<?php echo $event['IMG-PATH']; ?>" alt="Image du Festival" style="width:100%;"></p>

                <!-- Form to delete event -->
                <form action="" method="post" style="display:inline; padding:0;">
                    <input type="hidden" name="festivalId" value="<?php echo $event['festivalId']; ?>">
                    <input type="hidden" name="delete" value="1">
                    <button type="submit">Supprimer</button>
                </form>

                <!-- Button to show update form -->
                <button onclick="showUpdateForm('<?php echo $event['festivalId']; ?>', '<?php echo addslashes($event['festivalName']); ?>', '<?php echo $event['beginTime']; ?>', '<?php echo $event['endTime']; ?>', '<?php echo $event['ticketPrice']; ?>')">
                    Modifier
                </button>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<!-- Update form -->
<div id="updateFormContainer" style="display:none;">
    <form id="updateForm" action="" method="post">
        <input type="hidden" name="festivalId" id="updateFestivalId">
        <input type="hidden" name="update" value="1">
        <label for="updateFestivalName">Nom du Festival:</label>
        <input type="text" id="updateFestivalName" name="festivalName" required>

        <label for="updateBeginTime">Heure de début:</label>
        <input type="date" id="updateBeginTime" name="beginTime" required>

        <label for="updateEndTime">Heure de fin:</label>
        <input type="date" id="updateEndTime" name="endTime" required>

        <label for="updateTicketPrice">Prix du billet:</label>
        <input type="text" id="updateTicketPrice" name="ticketPrice" required>

        <input type="submit" value="Mettre à jour" id="blabla1">
    </form>
</div>

<script>
    function showUpdateForm(id, name, beginTime, endTime, ticketPrice) {
        document.getElementById('updateFestivalId').value = id;
        document.getElementById('updateFestivalName').value = name;
        document.getElementById('updateBeginTime').value = beginTime;
        document.getElementById('updateEndTime').value = endTime;
        document.getElementById('updateTicketPrice').value = ticketPrice;

        document.getElementById('updateFormContainer').style.display = 'block';
    }
</script>
</html>
<script src="../Controller/lang-select.js"></script>