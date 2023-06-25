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
<p><?php 
    $utilisateurId = $_SESSION['id'];
    $stmt2 = $conn->prepare("SELECT MAX(score) FROM parties WHERE utilisateur_id = :utilisateurId");
    $stmt2->bindParam(':utilisateurId', $utilisateurId);
    $stmt2->execute();
    $result = $stmt2->fetch();
    if ($result && isset($result[0])) {
        $maxScore = $result[0];
        echo "Mon meilleur score sur devine le perso Naruto : $maxScore";
    } else {
        echo "Vous n'avez jamais joué à devine le perso Naruto !";
    }
    ?>   </p>

<a href="deconnexion.php">Déconnexion</a>
<a href="index.php">Home</a>


</body>
</html>