<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<title>Bon anniversaire</title>
		<script type="module" src="nameQuiz.js" defer></script>
 
	</head>
    <body>
        <header>
            <h1>Devine le nom de ce personnage</h1>
            <h2>coucou</h2>
        </header>
        <main>
            <section class="Score">
                <p class="AffichageScore">Vous n'avez pas encore commencé</p>
            </section>
            <section class="Image">
            </section>
            <div class="Reponse"></div>
            <button class="nextPersonButton">Suivant</button>

            <section class="Buttons">
                <form role="form" id="formReponse" method="POST">
                    <input type="text" name="reponseDonnee" id="reponseDonnee" placeholder="Prénom Nom">
                    <button type="submit" name="formJeu" id="formJeu" class="sendAnswer">Valider la réponse</button>
                </form>
                <br>
                <br>
                <button class="showAnswer">Afficher la Solution</button>

            </section>
            
            <script>
                
                let contactForm = document.querySelector('#formReponse')
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault()

                var xhr = new XMLHttpRequest();
                xhr.open('POST', '../jeu_traitement.php', true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            console.log(xhr);
                            // Success Message == 'Title', 'Message body', Last one leave as it is
                        } else {
                            // Error Message == 'Title', 'Message body', Last one leave as it is
                        }
                    }
                };
                xhr.send(new FormData(contactForm));
                })
                
            </script>
        </main>
    </body>