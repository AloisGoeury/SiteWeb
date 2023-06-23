<?php 
session_start();
require_once 'config.php';

    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $value = 0;

    if (isset($_POST['reponseDonnee'])) {
        $username = $_SESSION['username'];
        $value = $value + 2;

        $stmt = $conn->prepare("UPDATE utilisateurs SET points = points + :value WHERE username = :username");
        $stmt->bindParam(':value', $value);
        $stmt->bindParam(':username', $username);
        $stmt->execute();
    
    }



?>