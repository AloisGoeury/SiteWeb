<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">
        <link rel="stylesheet" href="styles.css">
        <script type="module" src="" defer></script>
    </head>

    <body>
        <header>
            <?php include './header_logged.php' ?>
        </header>
        <main>
            <h3>Attention à l'avenir créer une db pour les livres et une db pour les possessions pour éviter les redites (id unique avec isbn)</h3>
            <h1>Vous allez ajouter un nouveau livre à votre collection !</h1>
            <form id="myForm" action="">
                <label for="book-name">Nom du livre :</label>
                <input type="text" id="book-name" name="book-name" required>
                
                <label for="serie-name">Nom de la serie :</label>
                <input type="text" id="serie-name" name="serie-name">
                
                <label for="tome-number">Numéro du tome</label>
                <input type="number" id="tome-number" name="tome-number" min="0" step="1">

                <label for="tranche-color">Couleur de la tranche</label>
                <input type="color" id="tranche-color" name="tranche-color" required>

                <label for="book-width">Epaisseur du livre (en mm):</label>
                <input type="number" id="book-width" name="book-width" required>

                <label for="book-height">Hauteur du livre (en mm):</label>
                <input type="number" id="book-height" name="book-height" required>

                <input type="submit" id="submit-new-book" value="Enregistrer le livre">
            </form>

            <script>
                const serieNameInput = document.getElementById('serie-name');
                const tomeNumberInput = document.getElementById('tome-number');

                serieNameInput.addEventListener('input', function() {
                    if (serieNameInput.value.trim() !== '') {
                        tomeNumberInput.setAttribute('required', true);
                    } else {
                        tomeNumberInput.removeAttribute('required');
                    }
                });
                const myForm = document.getElementById('myForm');

                // Fonction d'envoi des données via AJAX
                function sendData() {
                    const formData = new FormData(myForm);

                    fetch('add_book_to_sql.php', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.text())
                    .then(data => {
                        // Traitement de la réponse si nécessaire
                        console.log(data);
                    })
                    .catch(error => {
                        console.error('Une erreur s\'est produite lors de la requête AJAX :', error);
                    });
                }

                // Événement "submit" sur le formulaire
                myForm.addEventListener('submit', function(event) {
                    event.preventDefault(); // Empêche l'envoi du formulaire par défaut
                    sendData(); // Appelle la fonction pour envoyer les données via AJAX
                });
            </script>

        </main>
    </body>
</html>