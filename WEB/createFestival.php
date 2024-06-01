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
        if($check !== false) {
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

        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        } else {
            if (move_uploaded_file($_FILES["festivalImage"]["tmp_name"], $target_file)) {
                echo "The file ". basename( $_FILES["festivalImage"]["name"]). " has been uploaded.";

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
    while($row = $result->fetch_assoc()) {
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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            height: 100vh;
            margin: 0;
            font-family: 'Inter', sans-serif;
            background-color: #121721;
            color: #fff;
        }

        .container {
            display: flex;
            gap: 20px;
        }
        
        .container form input{
            max-width: 280px;
        }

        #blabla, #blabla1{
            min-width: 300px;
        }

        form, .event-list {
            background-color: #1d1f27;
            padding: 30px;
            border-radius: 12px;
            width: 300px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            min-height: 450px;
            align-content: center;
        }


        label {
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
        }

        input[type="text"], input[type="date"], input[type="file"], input[type="submit"], button {
            width: 280px;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #05c7e6;
            border-radius: 5px;
            color: #ffffff;
            background: #2c2f36;
        }

        input[type="submit"], button {
            background-color: #00ADEF;
            color: white;
            cursor: pointer;
            border: none;
            width: 100%;
        }

        input[type="submit"]:hover, button:hover {
            background-color: #008DB9;
        }

        input::placeholder {
            color: #aaaaaa;
        }

        .event-list {
            max-height: 443px;
            overflow-y: scroll;
        }

        .event-item {
            margin-bottom: 15px;
            padding: 15px;
            background-color: #2c2f36;
            border-radius: 8px;
        }

        .event-item h3 {
            margin: 0 0 10px 0;
        }

    </style>
</head>
<body>
<div class="container">
    <form action="" method="post" enctype="multipart/form-data">
        <input type="hidden" name="add" value="1">
        <label for="festivalName">Nom du Festival:</label>
        <input type="text" id="festivalName" name="festivalName" required>

        <label for="beginTime">Heure de début:</label>
        <input type="date" id="beginTime" name="beginTime" required>

        <label for="endTime">Heure de fin:</label>
        <input type="date" id="endTime" name="endTime" required>

        <label for="ticketPrice">Prix du billet:</label>
        <input type="text" id="ticketPrice" name="ticketPrice" required>

        <label for="festivalImage">Image du Festival:</label>
        <input type="file" id="festivalImage" name="festivalImage" required>

        <input type="submit" value="Ajouter" id="blabla">
    </form>

    <div class="event-list">
        <h2>Événements</h2>
        <?php foreach ($events as $event): ?>
        <div class="event-item">
            <h3><?php echo $event['festivalName']; ?></h3>
            <p>Début: <?php echo $event['beginTime']; ?></p>
            <p>Fin: <?php echo $event['endTime']; ?></p>
            <p>Prix: <?php echo $event['ticketPrice']; ?> €</p>
            <p><img src="<?php echo $event['IMG-PATH']; ?>" alt="Image du Festival" style="width:100%;"></p>

            <!-- Form to delete event -->
            <form action="" method="post" style="display:inline; padding:0;">
                <input type="hidden" name="festivalId" value="<?php echo $event['festivalId']; ?>">
                <input type="hidden" name="delete" value="1">
                <button type="submit">Supprimer</button>
            </form>

            <!-- Button to show update form -->
            <button onclick="showUpdateForm('<?php echo $event['festivalId']; ?>', '<?php echo addslashes($event['festivalName']); ?>', '<?php echo $event['beginTime']; ?>', '<?php echo $event['endTime']; ?>', '<?php echo $event['ticketPrice']; ?>')">Modifier</button>
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
</body>
</html>
