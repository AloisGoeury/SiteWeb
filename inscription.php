<?php
require_once 'config.php';
// Vérifier si l'utilisateur est déjà connecté
session_start();
if (isset($_SESSION['username'])) {
    header("Location: profil.php");
    exit();
}

// Vérifier si le formulaire d'inscription est soumis
if (isset($_POST['submit'])) {
    // Récupérer les données du formulaire
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hasher le mot de passe
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Connexion à la base de données

    // Utilisez les constantes ou les variables pour établir la connexion à la base de données
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérifier si l'utilisateur existe déjà dans la base de données
    $stmt = $conn->prepare("SELECT * FROM utilisateurs WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch();

    if ($user) {
        // L'utilisateur existe déjà
        $errorMessage = "Ce nom d'utilisateur est déjà pris.";
    } else {
        // L'utilisateur n'existe pas, procéder à l'inscription

        // Hasher le mot de passe
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Requête d'insertion des informations d'inscription
        $stmt = $conn->prepare("INSERT INTO utilisateurs (username, password) VALUES (:username, :password)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->execute();

        header("Location: login.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Page d'Inscription</title>
</head>
<body>

<h2>Inscription</h2>

<h3><?php if (isset($errorMessage)){echo $errorMessage;} ?></h3>

<form action="" method="POST">
    <div>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" name="username" required>
    </div>
    <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required>
    </div>
    <div>
        <input type="submit" name="submit" value="S'inscrire">
    </div>
    <p>Déjà inscrit ? <a href="index.php">Se connecter</a></p>
</form>

</body>
</html>
