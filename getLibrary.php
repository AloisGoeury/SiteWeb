<?php
require_once 'config.php';
session_start();

$username = $_SESSION['username'];

$utilisateurId = $_SESSION['id'];

// Connexion à la base de données
$conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$query = "SELECT chemin_json AS json_path FROM bibliotheque WHERE id_bibliotheque = (SELECT MAX(id_bibliotheque) FROM bibliotheque WHERE id_utilisateur=:utilisateurId)";
$stmt = $conn->prepare($query);
$stmt->bindParam(':utilisateurId', $utilisateurId);
$stmt->execute();

// Récupérer le résultat
$result = $stmt->fetch(PDO::FETCH_ASSOC);

// Vérifier si la requête a réussi
if ($result !== false) {
    $jsonPath = $result['json_path'];
    // echo "Le chemin de la bibliothèque la plus récente est : " . $jsonPath;
    header('Content-Type: application/json');
    echo json_encode(['json_path' => $jsonPath]);
}else {
    echo "Erreur lors de la récupération du nom de la bibliothèque.";
}

    
?>