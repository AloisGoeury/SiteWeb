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
        <title>Vizualise ta Bibliotheque</title>
        <script type="module" src="closeModal.js" defer></script>
        <script type="module" src="bibliotheque.js" defer></script>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <?php include './header_logged.php' ?>

        <main>
            <p>Nous sommes en travaux ! Tu pourras bientôt :
                <ul>
                    <li>Voir ta bibliothèque et la ranger à ta volonté</li>
                    <li>La décorer à ta guise</li>
                    <li>Connaitre comment la reproduire !</li>
                </ul>
                Désolé c'est beaucoup de boulot je pensais avoir plus de temps et mes ambitions sont un peu grande...
            </p>
            <div>
                <h3>Attention, il y a un bug quand on clique nous ne sommes pas forcement sur le bon livre ce sera corrigé prochainement</h3>
                <p>
                <div>
                    <p>Représentation de la bibliothèque :</p>
                    <div id="bibliotheque">
                        <button id="generateBooksButton">Générer les livres</button>
                        <canvas id="myCanvas"></canvas>
                    </div>
                    <div id="modal" class="modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <p id="bookInfo">Informations du livre : </p>
                        </div>
                    </div>
                    <button class="btn"><a href="createBibliotheque.php">Créer une bibliothèque</a></button>
                </div>
                </p>
            </div>
        </main>
    </body>
</html>