<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="styles.css">
        <script type="module" src="createBiblio.js" defer></script>
    </head>
    <body>
        <header>
            <?php include './header_logged.php' ?>
        </header>
        <main>
            <div class="titre-create">
                <h1>Vous voulez créer une nouvelle bibliothèque !</h1>
            </div>
            <div>
                <label>Longueur : <span id="longueurOutput">1000</span> mm</label>
                <input type="range" min="50" max="2500" value="1000" id="longueurRange">
            </div>
            <div>
                <label>Hauteur : <span id="hauteurOutput">1000</span> mm</label>
                <input type="range" min="100" max="3000" value="1000" id="hauteurRange">
            </div>
            <div>
                <label>Epaisseur du matériau : <span id="epaisseurOutput">10</span> mm</label>
                <input type="range" min="5" max="30" value="10" id="epaisseurRange">
            </div>
            <div>
                <label>Nombre de rangées : <span id="rangOutput">3</span></label>
                <input type="range" min="1" max="10" value="3" id="rangRange">
            </div>
            <div id="case-par-rangee">
                <div id="sep0">
                    <label>Nombre de séparation pour la rangé n°1 : <span id="sep0Output">3</span></label>
                    <input type="range" min="0" max="10" value="3" id="sep0Range">
                </div>
                <div id="sep1">
                    <label>Nombre de séparation pour la rangé n°2 : <span id="sep1Output">3</span></label>
                    <input type="range" min="0" max="10" value="3" id="sep1Range">
                </div>
                <div id="sep2">
                    <label>Nombre de séparation pour la rangé n°3 : <span id="sep2Output">3</span></label>
                    <input type="range" min="0" max="10" value="3" id="sep2Range">
                </div>
            </div>
            <div id="save-biblio">
                <button id="save-button">Sauvegarder cette bibliotheque !</button>
            </div>
            <canvas id="canvas-create-bibli"></canvas>
        </main>
    </body>
</html>