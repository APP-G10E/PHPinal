<?php

// Import
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "app_g10e";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if database exists
$db_selected = $conn->select_db($dbname);

if ($db_selected) {
    echo "Database exists. Dropping and recreating database...\n";

    // Drop the database
    $drop_db_query = "DROP DATABASE $dbname";
    if ($conn->query($drop_db_query) === TRUE) {
        echo "Database dropped successfully.\n";
    } else {
        die("Error dropping database: " . $conn->error);
    }
}

// Create the database
$create_db_query = "CREATE DATABASE $dbname";
if ($conn->query($create_db_query) === TRUE) {
    echo "Database created successfully.\n";
} else {
    die("Error creating database: " . $conn->error);
}

// Select the newly created database
$conn->select_db($dbname);

// Read the SQL file
$sqlFile = 'app_g10e.sql';
$sqlContent = file_get_contents($sqlFile);

if ($sqlContent === false) {
    die("Could not read file $sqlFile");
}

// Split the SQL file into individual queries
$sqlQueries = explode(';', $sqlContent);

// Execute each query
foreach ($sqlQueries as $query) {
    $trimmedQuery = trim($query);
    if (!empty($trimmedQuery)) {
        if ($conn->query($trimmedQuery) === false) {
            echo "Error executing query: " . $conn->error . "\n";
        }
    }
}

echo "Database import completed successfully.";

$conn->close();
