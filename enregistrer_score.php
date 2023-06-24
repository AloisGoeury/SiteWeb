<?php   
    require_once 'config.php';
    session_start();

$username = $_SESSION['username'];
var_dump($_SESSION);

// Connexion à la base de données
$conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    

$score = $_POST['score'];
$scoreInt = intval($score);
var_dump($scoreInt);
$datePartie = date('Y-m-d'); // Date actuelle
var_dump($datePartie);


// Obtenez l'ID de l'utilisateur actuellement connecté à partir de la session ou d'une autre méthode
$utilisateurId = $_SESSION['id'];

// Effectuez l'insertion du score dans la table "partie"
$query = "INSERT INTO parties (utilisateur_id, date_partie, score) VALUES ('$utilisateurId', '$datePartie', '$score')";

// Exécutez la requête
if ($conn->query($query) === TRUE) {
    var_dump('Le score a été enregistré avec succès dans la table partie.');
} else {
    var_dump('Une erreur s\'est produite lors de l\'enregistrement du score : ' . $conn->error);
}
var_dump($scoreInt);



?>
