<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gère ta Bibliotheque</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <?php include './header_logged.php' ?>
        <main>
            <p>Nous sommes en travaux ! Tu pourras bientôt :
                <ul>
                    <li>Ajouter des livres à ta bibliothèque</li>
                    <li>Créer une liste de voeux</li>
                    <li>Mettre des notes ainsi que des commentaires aux différents livres</li>
                </ul>
                Désolé c'est beaucoup de boulot je pensais avoir plus de temps et mes ambitions sont un peu grande...
            </p>
            <input type="text" id="searchInput" placeholder="Rechercher un livre...">
            <ul id="resultsList"></ul>
            <div>
                <button class="btn"><a href="add_book.php">Ajouter un Nouveau Livre</a></button>
                <button class="btn"><a href="biblioViz.php">Gerer la collection</a></button>
            </div>
        </main>
    </body>
</html>