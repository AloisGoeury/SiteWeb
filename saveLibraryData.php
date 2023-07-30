<?php
    require_once 'config.php';
    session_start();

$username = $_SESSION['username'];
var_dump($_SESSION);

// Connexion à la base de données
$conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Étape 1 : Récupérer les données JSON envoyées depuis le formulaire
$biblio = $_POST['biblio'];
$data = json_decode($biblio, true);


// Étape 2 : Enregistrer le fichier JSON dans un dossier sur le serveur
$folderPath = "./libraryFolder"; 
$fileName = "libraryData_" . time() . ".json"; // Créez un nom de fichier unique (en utilisant le timestamp) pour éviter les conflits de noms

// Vérifiez si le dossier existe, sinon, créez-le
if (!file_exists($folderPath)) {
    mkdir($folderPath, 0777, true); // Vous pouvez ajuster les droits d'accès (0777) selon vos besoins
}

// Chemin complet du fichier JSON à enregistrer
$filePath = $folderPath . "/" . $fileName;

// Enregistrez le fichier JSON sur le serveur
if (file_put_contents($filePath, json_encode($data))) { // Fait ici l'enregistrement
    $utilisateurId = $_SESSION['id'];

    // Obtenir le nombre de bibliothèques déjà enregistrées pour cet utilisateur
    $selectQuery = "SELECT COUNT(nom_bibliotheque) as count FROM bibliotheque WHERE id_utilisateur=:utilisateurId";
    $stmt = $conn->prepare($selectQuery);
    $stmt->bindParam(':utilisateurId', $utilisateurId);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $count = $result['count'];

    // Générer le nom de la bibliothèque
    $nom_bibliotheque = "biblioteque($count)";

    // Insérer le chemin du fichier JSON dans la table bibliotheque
    $query = "INSERT INTO bibliotheque (id_utilisateur, nom_bibliotheque, chemin_json) VALUES (:utilisateurId, :nom_bibliotheque, :filePath)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':utilisateurId', $utilisateurId);
    $stmt->bindParam(':nom_bibliotheque', $nom_bibliotheque);
    $stmt->bindParam(':filePath', $filePath);
    if ($stmt->execute()) {
        var_dump('La bibliotheque a été enregistré avec succès dans la table bibliotheque.');
    } else {
        var_dump('Une erreur s\'est produite lors de l\'enregistrement de la bibliotheque : ' . $conn->error);
    }


} else {
    // Erreur lors de l'enregistrement du fichier
    echo json_encode(["message" => "Erreur lors de l'enregistrement du fichier JSON sur le serveur."]);
}
?>
