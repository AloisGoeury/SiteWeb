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
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<h2>Profil de <?= $username; ?></h2>

<p>Nom d'utilisateur : <?= $user['username']; ?></p>
<p><?php 
    $utilisateurId = $_SESSION['id'];
    $stmt2 = $conn->prepare("SELECT MAX(score) FROM parties WHERE utilisateur_id = :utilisateurId AND difficulte = 'all'");
    $stmt2->bindParam(':utilisateurId', $utilisateurId);
    $stmt2->execute();
    $result = $stmt2->fetch();
    if ($result && isset($result[0])) {
        $maxScore = $result[0];
        echo "Mon meilleur score sur devine le perso Naruto avec tous les persos: $maxScore";
    } else {
        echo "Vous n'avez jamais joué à devine le perso Naruto avec tous les persos!";
    }
    ?> 
    <br>
    <?php 
    $utilisateurId = $_SESSION['id'];
    $stmt2 = $conn->prepare("SELECT MAX(score) FROM parties WHERE utilisateur_id = :utilisateurId AND 'easy' = difficulte");
    $stmt2->bindParam(':utilisateurId', $utilisateurId);
    $stmt2->execute();
    $result = $stmt2->fetch();
    if ($result && isset($result[0])) {
        $maxScore = $result[0];
        echo "Mon meilleur score sur devine le perso Naruto mode easy : $maxScore";
    } else {
        echo "Vous n'avez jamais joué à devine le perso Naruto mode easy !";
    }
    ?>
    <br>
    <?php 
    $utilisateurId = $_SESSION['id'];
    $stmt2 = $conn->prepare("SELECT MAX(score) FROM parties WHERE utilisateur_id = :utilisateurId AND 'medium' = difficulte");
    $stmt2->bindParam(':utilisateurId', $utilisateurId);
    $stmt2->execute();
    $result = $stmt2->fetch();
    if ($result && isset($result[0])) {
        $maxScore = $result[0];
        echo "Mon meilleur score sur devine le perso Naruto mode medium: $maxScore";
    } else {
        echo "Vous n'avez jamais joué à devine le perso Naruto mode medium !";
    }
    ?> 
    <br>
    <?php 
    $utilisateurId = $_SESSION['id'];
    $stmt2 = $conn->prepare("SELECT MAX(score) FROM parties WHERE utilisateur_id = :utilisateurId AND 'hard' = difficulte");
    $stmt2->bindParam(':utilisateurId', $utilisateurId);
    $stmt2->execute();
    $result = $stmt2->fetch();
    if ($result && isset($result[0])) {
        $maxScore = $result[0];
        echo "Mon meilleur score sur devine le perso Naruto mode hard : $maxScore";
    } else {
        echo "Vous n'avez jamais joué à devine le perso Naruto mode hard !";
    }
    ?>



    




</p>

<a href="deconnexion.php">Déconnexion</a>
<a href="accueil.php">Home</a>


</body>
</html>