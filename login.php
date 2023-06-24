<?php
    require_once 'config.php';
    session_start();

// Vérifier si l'utilisateur est déjà connecté
if (isset($_SESSION['username'])) {
    header("Location: profil.php");
    exit();
}

// Vérifier si le formulaire de connexion est soumis
if (isset($_POST['submit'])) {
    // Récupérer les données du formulaire
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Connexion à la base de données

    // Utilisez les constantes ou les variables pour établir la connexion à la base de données
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête pour vérifier les informations de connexion
    $stmt = $conn->prepare("SELECT * FROM utilisateurs WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch();

    // Vérifier le mot de passe
    if ($user && password_verify($password, $user['password'])) {
        // Authentification réussie, créer une session
        $_SESSION['username'] = $username;
        header("Location: profil.php");
        exit();
    } else {
        $errorMessage = "Identifiants de connexion incorrects.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>

<h2>Connexion</h2>

<form action="" method="POST">
    <?php if (isset($errorMessage)) { ?>
        <h3><?php echo $errorMessage; ?></h3>
    <?php } ?>
    <div>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" name="username" required>
    </div>
    <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required>
    </div>
    <div>
        <input type="submit" name="submit" value="Se connecter">
    </div>
    <p>Pas encore inscrit ? <a href="inscription.php">S'inscrire</a></p>
</form>

</body>
</html>