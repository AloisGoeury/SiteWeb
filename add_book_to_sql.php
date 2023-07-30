<?php   
require_once 'config.php';
session_start();

    
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données du formulaire
    $nom_livre = $_POST['book-name'];
    $nom_serie = $_POST['serie-name'];
    $numero_tome = $_POST['tome-number'];
    $couleur_tranche = $_POST['tranche-color'];
    $epaisseur_livre = $_POST['book-width'];
    $hauteur_livre = $_POST['book-height'];
    $utilisateurId = $_SESSION['id'];

    // Transformer la couleur hexadécimale en une liste RGB
    list($r, $g, $b) = sscanf($couleur_tranche, "#%02x%02x%02x");
    $couleur_tranche_rgb = [$r,$g,$b];
    $couleur_tranche_json = json_encode($couleur_tranche_rgb);

    // Connexion à la base de données
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête SQL pour insérer les données dans la table
    $query = "INSERT INTO livres (id_utilisateur, nom_livre, nom_serie, numero_tome, couleur_tranche, epaisseur_livre, hauteur_livre) 
              VALUES (:utilisateurID, :nom_livre, :nom_serie, :numero_tome, :couleur_tranche_json, :epaisseur_livre, :hauteur_livre)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':nom_livre', $nom_livre);
    $stmt->bindParam(':nom_serie', $nom_serie);
    $stmt->bindParam(':numero_tome', $numero_tome);
    $stmt->bindParam(':couleur_tranche_json', $couleur_tranche_json);
    $stmt->bindParam(':epaisseur_livre', $epaisseur_livre);
    $stmt->bindParam(':hauteur_livre', $hauteur_livre);
    $stmt->bindParam(':utilisateurID', $utilisateurId);

    // Exécution de la requête
    if ($stmt->execute()) {
        echo "Le livre a été enregistré avec succès dans la table.";
    } else {
        echo "Une erreur s'est produite lors de l'enregistrement du livre : " . $conn->error;
    }
}

?>