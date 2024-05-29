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
    $festivalName = $conn->real_escape_string($_POST['festivalName']);
    $beginTime = $conn->real_escape_string($_POST['beginTime']);
    $endTime = $conn->real_escape_string($_POST['endTime']);
    $ticketPrice = $conn->real_escape_string($_POST['ticketPrice']);

    // Handle file upload
    $target_dir = "../Assets/";
    $target_file = $target_dir . basename($_FILES["festivalImage"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["festivalImage"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["festivalImage"]["size"] > 500000) { // 500 KB limit
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["festivalImage"]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["festivalImage"]["name"]). " has been uploaded.";

            // Save the file path to the database
            $sql = "INSERT INTO festival (festivalId, festivalName, beginTime, endTime, ticketPrice, `IMG-PATH`) VALUES ('$festivalId','$festivalName', '$beginTime', '$endTime', '$ticketPrice', '$target_file')";

            if ($conn->query($sql) === TRUE) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
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
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: 'Inter', sans-serif;
            background-color: #121721;
            color: #fff;
        }

        form {
            background-color: #1d1f27;
            padding: 30px;
            border-radius: 12px;
            width: 300px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        label {
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
        }

        input[type="text"], input[type="date"], input[type="file"], input[type="submit"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #05c7e6;
            border-radius: 5px;
            color: #ffffff;
            background: #2c2f36;
        }

        input[type="submit"] {
            background-color: #00ADEF;
            color: white;
            cursor: pointer;
            border: none;
        }

        input[type="submit"]:hover {
            background-color: #008DB9;
        }

        input::placeholder {
            color: #aaaaaa;
        }
    </style>
</head>
<body>
<form action="" method="post" enctype="multipart/form-data">
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

    <input type="submit" value="Ajouter">
</form>
</body>
</html>
