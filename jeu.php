<?php?>

<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<title>Bon anniversaire</title>
		<script type="module" src="nameQuiz.js" defer></script>
        <link rel="stylesheet" href="styles.css">
	</head>
    <body>
        <header>
            <h1>Devine le nom de ce personnage</h1>
        </header>
        <main>
            <section class="Score">
                <p class="AffichageScore">Vous n'avez pas encore commencé</p>

                <p class="guesses">1er personnage</p>
            </section>
            <section class="Image">
            </section>
            <div class="Reponse"></div>
            <button class="nextPersonButton">Suivant</button>

            <section class="Buttons">
                <input type="text" name="reponseDonnee" id="reponseDonnee" placeholder="Prénom Nom">
                <button class="sendAnswer">Valider la réponse</button>
                <br>
                <br>
                <button class="showAnswer">Afficher la Solution</button>

            </section>
            <a href="accueil_jeu.php">RETOURNER AU MENU</a>
        </main>
    </body>