createFestival.php

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
    }
}

$conn->close();
?>