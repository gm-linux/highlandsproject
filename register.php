<?php
// Debugging output to check if the script is reached
if (isset($_GET['debug']) && $_GET['debug'] === 'true') {
    echo "Register.php script reached successfully.<br>";
}

// Simulate basic functionality for testing
echo "This is the registration page.<br>";

$servername = "74.208.248.189";
$username = "reikanjordan";
$password = "Amee1166@!@";
$dbname = "highlands_project";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $conn->real_escape_string($_POST['username']);
    $email = $conn->real_escape_string($_POST['email']);
    $pass = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (username, email, password) VALUES ('$user', '$email', '$pass')";

    if ($conn->query($sql) === TRUE) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
