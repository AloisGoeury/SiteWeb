<?php 
    require_once 'config.php';
    session_start();

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
    <title>ACCUEIL Jeu</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <?php include './header_logged.php' ?>

<h1>
    Bonjour 
    <?php 
    echo "$username. ";
    $utilisateurId = $_SESSION['id'];
    $stmt2 = $conn->prepare("SELECT MAX(score) FROM parties WHERE utilisateur_id = :utilisateurId");
    $stmt2->bindParam(':utilisateurId', $utilisateurId);
    $stmt2->execute();
    $result = $stmt2->fetch();
    if ($result && isset($result[0])) {
        $maxScore = $result[0];
        echo "Votre meilleur score est : $maxScore";
    } else {
        echo "Aucun score trouvé ! Vous êtes nouveau ? Jouez !";
    }
    ?>    
</h1>

<p>
<a href="profil.php">Profil</a>
<a href="accueil.php">Retour à l'accueil</a>
</p>


<p>Choisissez la difficulté si tu veux te tester:</p>
<ul>
  <li><a href="jeu.php">JOUER AU JEU avec tous les persos</a></li>
  <li><a href="jeu.php?difficulty=easy">Facile</a></li>
  <li><a href="jeu.php?difficulty=medium">Moyen</a></li>
  <li><a href="jeu.php?difficulty=hard">Difficile</a></li>
</ul>

</body>
</html>