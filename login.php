<?php
// Debugging output to check if the script is reached
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Form submitted successfully.<br>";

    // Capture and display submitted data for debugging
    $email = $_POST['email'] ?? 'No email provided';
    $password = $_POST['password'] ?? 'No password provided';
    $debug = $_POST['debug'] ?? 'false';

    echo "Email: " . htmlspecialchars($email) . "<br>";
    echo "Password: " . htmlspecialchars($password) . "<br>";
    echo "Debug mode: " . htmlspecialchars($debug) . "<br>";
} else {
    echo "Invalid request method.";
}
?>
