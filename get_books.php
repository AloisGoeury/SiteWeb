<?php
require_once 'config.php';
session_start();

$username = $_SESSION['username'];

$utilisateurId = $_SESSION['id'];

// Connexion à la base de données
$conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// $query = "SELECT nom_livre,nom_serie,numero_tome,couleur_tranche,epaisseur_livre,hauteur_livre
//           AS nom_livre,nom_serie,numero_tome,couleur_tranche,epaisseur_livre,hauteur_livre
//           FROM livres WHERE id_utilisateur=:utilisateurId";
// $stmt = $conn->prepare($query);
// $stmt->bindParam(':utilisateurId', $utilisateurId);
// $stmt->execute();
$query = "SELECT nom_livre,nom_serie,numero_tome,couleur_tranche,epaisseur_livre,hauteur_livre
          FROM livres WHERE id_utilisateur=:utilisateurId";
$stmt = $conn->prepare($query);
$stmt->bindParam(':utilisateurId', $utilisateurId);
$stmt->execute();

// Récupérer le résultat
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Vérifier si la requête a réussi
if ($result !== false) {
    // $nom_livre = $result['nom_livre'];
    // $nom_serie = $result['nom_serie'];
    // $numero_tome = $result['numero_tome'];
    // $couleur_tranche = $result['couleur_tranche'];
    // $epaisseur_livre = $result['epaisseur_livre'];
    // $hauteur_livre = $result['hauteur_livre'];
    // header('Content-Type: application/json');
    // echo json_encode(['nom_livre' => $nom_livre,'nom_serie' => $nom_serie,'numero_tome' => $numero_tome,
    //                   'couleur_tranche' => $couleur_tranche,'epaisseur_livre' => $epaisseur_livre,
    //                   'hauteur_livre' => $hauteur_livre]);
    $books = array(); // Initialiser le tableau des livres

    foreach ($result as $row) {
        $books[] = array(
            'nom_livre' => $row['nom_livre'],
            'nom_serie' => $row['nom_serie'],
            'numero_tome' => $row['numero_tome'],
            'couleur_tranche' => $row['couleur_tranche'],
            'epaisseur_livre' => $row['epaisseur_livre'],
            'hauteur_livre' => $row['hauteur_livre']
        );
    }

    
    // Convert array to JSON
    $jsonData = json_encode(['jsonBooks' => $books]);

    header('Content-Type: application/json');
    echo $jsonData;

}else {
    echo "Erreur lors de la récupération du nom de la bibliothèque.";
}

    
?>