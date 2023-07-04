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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma Bibliothèque</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<h1>
    Nous sommes dans ta bibliothèque 
    <?php 
    echo "$username ! ";
    ?>    
     Que veux tu faire aujourd'hui ?
</h1>



<p>
<a href="login.php">Profil</a>
<a href="accueil.php">Retour à l'accueil</a>
</p>

<ul>
  <li><a href="biblioViz.php">Visualiser ma bibliothèque</a></li>
  <li><a href="biblioGere.php">Gérer ma bibliothèque</a></li>
  <li><a href="stats.php">Statistiques</a></li>
</ul>


</body>
</html>