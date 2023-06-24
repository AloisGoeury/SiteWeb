<?php
    require_once 'config.php';
    session_start();

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Récupérer les informations de l'utilisateur connecté
$username = $_SESSION['username'];

// Connexion à la base de données
$conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Requête pour obtenir les informations de l'utilisateur
$stmt = $conn->prepare("SELECT * FROM utilisateurs WHERE username = :username");
$stmt->bindParam(':username', $username);
$stmt->execute();
$user = $stmt->fetch();

// Vérifier si l'utilisateur existe dans la base de données
if (!$user) {
    echo "Utilisateur introuvable.";
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Profil de <?= $username; ?></title>
</head>
<body>

<h2>Profil de <?= $username; ?></h2>

<p>Nom d'utilisateur : <?= $user['username']; ?></p>
<p>Mes points : <?= $user['points']; ?> </p>

<a href="deconnexion.php">Déconnexion</a>
<a href="index.php">Home</a>


</body>
</html>