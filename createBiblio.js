// Il me faut la longueur, la Hauteur, L'épaisseur du matériau, 
// Le nombre de rangé et ensuite le nombre de séparation
// Pourquoi ne pas faire une barre que l'on bouge et on voit 
// en meme temps ou ca se place

const canvas = document.getElementById("canvas-create-bibli");
const context = canvas.getContext("2d");

function largeurCaseDeterminateur(longueur, epaisseur, separation) {
    let largeurCase = longueur-2*epaisseur-separation*epaisseur;
    let rangCaseWidth = [];
    const width = parseInt(Math.floor(largeurCase/separation));
    for (let i = 0;i < separation;i++){
        rangCaseWidth.push(width);
    }
    const number = largeurCase % separation;
    if (number !== 0){
        for (let j = 0; j < number;j++){
            rangCaseWidth[j]++
        }
    }
    return rangCaseWidth
}

function bibliShape(longueur, hauteur, epaisseur, rang, separations){
    let biblio = [];
    const hauteurCase = largeurCaseDeterminateur(hauteur,epaisseur,rang).reverse();
    for (let i = 0; i < rang; i++){
        let rangBiblio = []
        const largeurCase = largeurCaseDeterminateur(longueur, epaisseur, separations[i]); //Peut etre besoin de parseInt
        for (let j = 0;j < separations[i];j++){
            rangBiblio.push([largeurCase[j],hauteurCase[i]]);
        }
        biblio.push(rangBiblio);
    }
    return biblio;
}

// Fonction pour dessiner la bibliothèque
function drawLibrary(longueur, hauteur, epaisseur, rang, separations) {
    // Effacer le canvas
    context.clearRect(0, 0, longueur, hauteur);

    const biblio = bibliShape(longueur, hauteur, epaisseur, rang, separations);

    let widthMat = epaisseur;
    let totalWidth =  widthMat;
    for (let i = 0; i < biblio[0].length; i++){
        totalWidth += biblio[0][i][0] + widthMat
    }

    let totalHeight = widthMat;
    for (let i = 0; i < biblio.length;i++){
        totalHeight += biblio[i][0][1] + widthMat
    }

    canvas.width = totalWidth;
    canvas.height = totalHeight;
    
    context.lineWidth = 1
    context.strokeRect(widthMat, widthMat, totalWidth - 2*widthMat, totalHeight- 2*widthMat);

    // Dessiner les cellules
    let y = widthMat;
    for (let i = 0; i < biblio.length; i++) {
        if (i!=0){
            y += biblio[i-1][0][1] + widthMat
        }
        let x = widthMat;
        for (let j = 0; j < biblio[i].length; j++) {
            if (j!=0){
                x+= biblio[i][j-1][0] + widthMat
            }
    
            context.strokeRect(x, y, biblio[i][j][0], biblio[i][j][1]);
            context.fillStyle = `rgba(110, 74, 9, 1)`
            context.fillRect(x,y,biblio[i][j][0],biblio[i][j][1])
        }
    }
    return biblio;
}

function elementExists(id) {
    return !!document.getElementById(id);
}

function updateSeparationNumber(rang) {
    const sep = document.getElementById("case-par-rangee");
    const divs = sep.querySelectorAll("div");
    let separations = [];
    let nombreDivs = divs.length;
    if (nombreDivs > rang){
        while (nombreDivs > rang) {
            let toDelete = document.getElementById(`sep${nombreDivs-1}`);
          //   divs.removeChild(toDelete)
          //   document.getElementById(`sep${nombreDivs-1}`).innerHTML = ''; // Apres ca faudrait que j'essaye de voir s'il existe déja et s'il existe alors on lui redonne juste la tete
              toDelete.remove()
              nombreDivs--
          }
    } else if (nombreDivs < rang){
        while (nombreDivs < rang) {
            const nouvelElement = document.createElement("div");
            nouvelElement.id = `sep${nombreDivs}`
            const nouveauLabel = document.createElement("label");
            nouveauLabel.textContent = `Nombre de séparation pour la rangé n°${nombreDivs+1} : `;
            const nouveauSpan = document.createElement("span");
            nouveauSpan.id = `sep${nombreDivs}Output`;
            nouveauSpan.textContent = "3";
            nouveauLabel.appendChild(nouveauSpan);
            const nouvelInput = document.createElement("input");
            nouvelInput.type = "range";
            nouvelInput.min = "0";
            nouvelInput.max = "10";
            nouvelInput.value = "3";
            nouvelInput.id = `sep${nombreDivs}Range`;
            // nouvelInput.addEventListener("input", updateLibraryDimensions);
            nouvelElement.appendChild(nouveauLabel);
            nouvelElement.appendChild(nouvelInput);
            sep.appendChild(nouvelElement);
            nombreDivs++
          }
    }

    for (let i = 0; i < rang; i++) {
        separations.push(document.getElementById(`sep${i}Range`).value)
        document.getElementById(`sep${i}Output`).textContent = separations[i];
        document.getElementById(`sep${i}Range`).addEventListener("input", updateLibraryDimensions);
    }
    return separations
  }
  


// Fonction pour mettre à jour les dimensions de la bibliothèque en fonction de la barre déplaçable
function updateLibraryDimensions() {
    const longueur = document.getElementById("longueurRange").value;
    const hauteur = document.getElementById("hauteurRange").value;
    const epaisseur = document.getElementById("epaisseurRange").value;
    const rang = document.getElementById("rangRange").value;

    // Mettre à jour les valeurs affichées à côté des barres
    document.getElementById("longueurOutput").textContent = longueur;
    document.getElementById("hauteurOutput").textContent = hauteur;
    document.getElementById("epaisseurOutput").textContent = epaisseur;
    document.getElementById("rangOutput").textContent = rang;
    const separations = updateSeparationNumber(rang);

    // Dessiner la bibliothèque avec les nouvelles dimensions
    const biblio = drawLibrary(parseInt(longueur), parseInt(hauteur), parseInt(epaisseur), parseInt(rang), separations);
    return {
        biblio : biblio,
        widthMat : epaisseur
    };
}

// Écouteurs d'événements pour mettre à jour la bibliothèque en fonction des barres déplaçables
document.getElementById("longueurRange").addEventListener("input", updateLibraryDimensions);
document.getElementById("hauteurRange").addEventListener("input", updateLibraryDimensions);
document.getElementById("epaisseurRange").addEventListener("input", updateLibraryDimensions);
document.getElementById("rangRange").addEventListener("input", updateLibraryDimensions);
document.getElementById("sep0Range").addEventListener("input", updateLibraryDimensions);

// Dessiner la bibliothèque initiale avec les valeurs par défaut
updateLibraryDimensions();

let saveButton = document.getElementById("save-button");
saveButton.addEventListener("click",function(event){
    const { biblio, widthMat } = updateLibraryDimensions();
    const biblioJson = {"biblio":biblio,"widthMat":widthMat};
    const xhr = new XMLHttpRequest();
      xhr.open('POST', 'saveLibraryData.php');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            console.log("La bibliotheque à été enregistrée")
          } else {
            console.error('Une erreur s\'est produite lors de l\'envoi de la bibliotheque.');
          }
        }
      };
      xhr.send('biblio=' + JSON.stringify(biblioJson));

})