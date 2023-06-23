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
    <title>ACCUEIL</title>
</head>
<body>

<p>Mes points : <?= $user['points']; ?> </p>

    

<h1>coucou</h1>
<a href="login.php">CONNEXION</a>

<a href="./siteweb/jeu.php">JOUER AU JEU</a>

</body>
</html>
