// La bibliotheque sera d'abord pas modifiable. ce sera un carré de 1m de coté avec 5 cases
// 2 en haut et 3 en bas et avec des hauteurs différentes
// Ce sera représenté par une matrice de cette forme 
// (On inclue un materiaux de 15mm d'épaisseur)
// Attention aux diférentes hauteur qui pour l'instant peuvent poser probleme donc on oublie dans un premier temps
import { closeModal } from './closeModal.js';

// let biblio = [
//     [[430,430],[525,430]], // [[lenght,height]]
//     [[300,525],[200,525],[440,525]]
// ];


// let widthMat = 15;

let bookFirst = [23,144,[122, 35, 194]];
let bookSecond = [44,112,[35, 194, 59]];
let bookThird = [120,440,[224, 18, 35]];
let bookFourth = [320,440,[18, 214, 224]];
let bookFifth = [170,500,[97, 96, 76]]
let bookSixth = [620,440,[9, 68, 71]];
let bookSeventh = [510,30,[237, 230, 19]];
let bookHeigth = [170,480,[209, 208, 190]];
let bookNineth = [170,440,[61, 245, 5]];
let bookTenth = [360,400,[245, 5, 221]];
let bookEleventh = [23,144,[122, 35, 194]];

let bookBiblio = [];

bookBiblio.push(bookFirst);
bookBiblio.push(bookSecond);
bookBiblio.push(bookThird);
bookBiblio.push(bookFourth);
bookBiblio.push(bookFifth);
bookBiblio.push(bookSixth);
bookBiblio.push(bookSeventh);
bookBiblio.push(bookHeigth);
bookBiblio.push(bookNineth);
bookBiblio.push(bookTenth);
bookBiblio.push(bookEleventh);

function wichCase(biblioFilled,book,biblio){
    let caseBiblio = [];
    let endOfLoop = false
    let freeSpace
    for (let i = 0; i < biblioFilled.length; i++){
        for (let j = 0; j < biblioFilled[i].length;j++){
            freeSpace = biblio[i][j][0]
            for (let placedBook of biblioFilled[i][j]){
                freeSpace -= placedBook[0][0] + 1
            }
            if (freeSpace > book[0] && biblio[i][j][1] > book[1]){
                endOfLoop = true
                caseBiblio.push(j)
                freeSpace = biblio[i][j][0] - freeSpace
                break
            }
        }
        if (endOfLoop){
            caseBiblio.push(i)
            break
        }
    }
    if (endOfLoop){
        let result = [caseBiblio,freeSpace]
        return result
    } else {
        let result = [0,0]
        return result
    }
}

function generateBooks(biblio,bookBiblio,context){
    let biblioFilled = [];
    let notEnoughSpace = [];
    for (let i = 0; i < biblio.length;i++){
        biblioFilled.push([]);
        for (let j = 0; j < biblio[i].length;j++){
            biblioFilled[i].push([]);
        }
    }
    for (let book of bookBiblio){
        let result = wichCase(biblioFilled,book,biblio);
        let caseBiblio = result[0];
        let freeSpace = result[1];
        if (Array.isArray(caseBiblio)){
            let y = (widthMat - 1) + biblio[0][0][1] - book[1];
            for (let newi = 0; newi < caseBiblio[1]; newi++){
                y += biblio[newi+1][0][1] + widthMat;
            }

            let x = (widthMat + 1) + freeSpace;
            for (let newj = 0; newj < caseBiblio[0]; newj++){
                x += biblio[caseBiblio[1]][newj][0] + widthMat;
            }

            biblioFilled[caseBiblio[1]][caseBiblio[0]].push([book,x,y]);
            context.strokeRect(x,y,book[0],book[1]);
            context.fillStyle = `rgba(${book[2][0]}, ${book[2][1]}, ${book[2][2]}, 1)`;
            context.fillRect(x,y,book[0],book[1]);
        } else {
            notEnoughSpace.push(book)
            // console.log(`Le livre '${book[3]}' n'a pas de place`)
        }
    }
    return biblioFilled
}

function handleCanvasClick(event, biblioFilled, biblio, widthMat, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`Il y a un click à x : ${x} et y : ${y}`)
  
    // Parcourir tous les livres dans biblioFilled pour vérifier si le clic est à l'intérieur d'un livre
    for (let i = 0; i < biblioFilled.length; i++) {
      for (let j = 0; j < biblioFilled[i].length; j++) {
        for (let k = 0; k < biblioFilled[i][j].length; k++) {
          const book = biblioFilled[i][j][k][0];
          const bookX = biblioFilled[i][j][k][1] * 0.5; // Remplacez par la propriété y du livre (coordonnée y du coin supérieur gauche)
          const bookY = biblioFilled[i][j][k][2] * 0.5; // Remplacez par la propriété y du livre (coordonnée y du coin supérieur gauche)
          const bookWidth = book[0] * 0.5;
          const bookHeight = book[1] * 0.5; 
  
          // Vérifiez si le clic est à l'intérieur du livre
          if (x >= bookX && x <= bookX + bookWidth && y >= bookY && y <= bookY + bookHeight) {
            console.log(`La boite est entre ${bookX} et ${bookX + bookWidth} en x et entre ${bookY} et ${bookY + bookHeight} en y`)
            const modal = document.getElementById("modal");
            const bookInfo = document.getElementById("bookInfo");
            bookInfo.textContent = `Informations du livre : Largeur - ${book[0]}, Hauteur - ${book[1]}, Couleur - [${book[2]}]`;
            modal.style.display = "block";
            return; // Sortez de la fonction après avoir trouvé le livre cliqué
          }
        }
      }
    }
  }
  
  function loadJSONFile(filePath) {
    fetch(filePath)
  .then(response => response.json())
  .then(data => {
    // Le contenu du fichier JSON est maintenant disponible dans la variable "data"
    console.log("Contenu du fichier JSON :", data);

    // Vous pouvez accéder aux éléments spécifiques du fichier JSON
    biblio = data.biblio;
    widthMat = data.widthMat;

    console.log("Contenu de biblio :", biblio);
    console.log("Contenu de widthMat :", widthMat);

    // Vous pouvez maintenant utiliser les données comme vous le souhaitez
    // Par exemple, vous pouvez appeler une fonction pour traiter les données
    // processJsonData(biblio, widthMat);
  })
  .catch(error => {
    console.error("Erreur lors de la récupération du fichier JSON :", error);
    // Gérez les erreurs ici
  });
  }

window.onload = function() {
    let biblio;
    let widthMat;
    fetch("getLibrary.php")
    .then(response => response.json())
    .then(data => {
        // Le contenu du fichier JSON est maintenant disponible dans la variable "data"
        console.log("Contenu du fichier JSON :", data);

        // Vous pouvez accéder aux valeurs spécifiques du fichier JSON
        console.log("Chemin du fichier JSON :", data.json_path);

        // Maintenant, vous pouvez utiliser les données comme bon vous semble
        // Par exemple, vous pouvez charger le fichier JSON à partir du chemin spécifié
        ({ biblio, widthMat } = loadJSONFile(data.json_path));
    })
    .catch(error => {
        console.error("Erreur lors de la récupération du fichier JSON :", error);
        // Gérez les erreurs ici
    });

    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");

    // Dessiner les contours:
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
            console.log(`x ${x}, y ${y}, biblio width ${biblio[i][j][0]}, biblio heigth ${biblio[i][j][1]}`);
        }
    }

    let generateButton = document.getElementById("generateBooksButton");
    let biblioFilled = [];
    generateButton.addEventListener("click", function(){
        biblioFilled = generateBooks(biblio,bookBiblio,context)
    let compt = 0;
    for (let i = 0; i<biblioFilled.length;i++){
        for (let j = 0; j < biblioFilled[i].length;j++){
            for (let k = 0; k < biblioFilled[i][j].length;k++){
                console.log(`Le livre ${compt} est à la entre ${biblioFilled[i][j][k][1]} et ${biblioFilled[i][j][k][0][0]+biblioFilled[i][j][k][1]} en x et entre ${biblioFilled[i][j][k][2]} et ${biblioFilled[i][j][k][0][1]+biblioFilled[i][j][k][2]} en y`)
                compt++
            }
        }
    }
    canvas.addEventListener('click', function(event) {
        handleCanvasClick(event, biblioFilled, biblio, widthMat, canvas);
        });
    });
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');
    if (event.target === modal || event.target === closeButton) {
      closeModal();
    }
  });


// import { closeModal } from './closeModal.js';
// let bookBiblio = [];

// function wichCase(biblioFilled, book, biblio) {
//     let caseBiblio = [];
//     let endOfLoop = false
//     let freeSpace
//     for (let i = 0; i < biblioFilled.length; i++){
//         for (let j = 0; j < biblioFilled[i].length;j++){
//             freeSpace = biblio[i][j][0]
//             for (let placedBook of biblioFilled[i][j]){
//                 freeSpace -= placedBook[0][0] + 1
//             }
//             if (freeSpace > book[0] && biblio[i][j][1] > book[1]){
//                 endOfLoop = true
//                 caseBiblio.push(j)
//                 freeSpace = biblio[i][j][0] - freeSpace
//                 break
//             }
//         }
//         if (endOfLoop){
//             caseBiblio.push(i)
//             break
//         }
//     }
//     if (endOfLoop){
//         let result = [caseBiblio,freeSpace]
//         return result
//     } else {
//         let result = [0,0]
//         return result
//     }
// }

// function generateBooks(biblio, bookBiblio, context) {
//     let biblioFilled = [];
//     let notEnoughSpace = [];
//     for (let i = 0; i < biblio.length;i++){
//         biblioFilled.push([]);
//         for (let j = 0; j < biblio[i].length;j++){
//             biblioFilled[i].push([]);
//         }
//     }
//     for (let book of bookBiblio){
//         let result = wichCase(biblioFilled,book,biblio);
//         let caseBiblio = result[0];
//         let freeSpace = result[1];
//         if (Array.isArray(caseBiblio)){
//             let y = (widthMat - 1) + biblio[0][0][1] - book[1];
//             for (let newi = 0; newi < caseBiblio[1]; newi++){
//                 y += biblio[newi+1][0][1] + widthMat;
//             }

//             let x = (widthMat + 1) + freeSpace;
//             for (let newj = 0; newj < caseBiblio[0]; newj++){
//                 x += biblio[caseBiblio[1]][newj][0] + widthMat;
//             }

//             biblioFilled[caseBiblio[1]][caseBiblio[0]].push([book,x,y]);
//             context.strokeRect(x,y,book[0],book[1]);
//             context.fillStyle = `rgba(${book[2][0]}, ${book[2][1]}, ${book[2][2]}, 1)`;
//             context.fillRect(x,y,book[0],book[1]);
//         } else {
//             notEnoughSpace.push(book)
//             // console.log(`Le livre '${book[3]}' n'a pas de place`)
//         }
//     }
//     return biblioFilled
// }

// function handleCanvasClick(event, biblioFilled, biblio, widthMat, canvas) {
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
//     console.log(`Il y a un click à x : ${x} et y : ${y}`)
  
//     // Parcourir tous les livres dans biblioFilled pour vérifier si le clic est à l'intérieur d'un livre
//     for (let i = 0; i < biblioFilled.length; i++) {
//       for (let j = 0; j < biblioFilled[i].length; j++) {
//         for (let k = 0; k < biblioFilled[i][j].length; k++) {
//           const book = biblioFilled[i][j][k][0];
//           const bookX = biblioFilled[i][j][k][1] * 0.5; // Remplacez par la propriété y du livre (coordonnée y du coin supérieur gauche)
//           const bookY = biblioFilled[i][j][k][2] * 0.5; // Remplacez par la propriété y du livre (coordonnée y du coin supérieur gauche)
//           const bookWidth = book[0] * 0.5;
//           const bookHeight = book[1] * 0.5; 
  
//           // Vérifiez si le clic est à l'intérieur du livre
//           if (x >= bookX && x <= bookX + bookWidth && y >= bookY && y <= bookY + bookHeight) {
//             console.log(`La boite est entre ${bookX} et ${bookX + bookWidth} en x et entre ${bookY} et ${bookY + bookHeight} en y`)
//             const modal = document.getElementById("modal");
//             const bookInfo = document.getElementById("bookInfo");
//             bookInfo.textContent = `Informations du livre : Largeur - ${book[0]}, Hauteur - ${book[1]}, Couleur - [${book[2]}]`;
//             modal.style.display = "block";
//             return; // Sortez de la fonction après avoir trouvé le livre cliqué
//           }
//         }
//       }
//     }
// }

// function getJSONData() {
//     const xhr = new XMLHttpRequest();
//     const url = "http://exemple.com/api/end_point"; // Remplacez cette URL par l'URL de votre API
  
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === XMLHttpRequest.DONE) {
//         if (xhr.status === 200) {
//           const jsonData = JSON.parse(xhr.responseText);
//           console.log("Données JSON :", jsonData);
//           // Vous pouvez utiliser les données JSON ici
//         } else {
//           console.error("Erreur lors de la requête GET :", xhr.status);
//           // Gérez les erreurs ici
//         }
//       }
//     };
  
//     xhr.open("GET", url);
//     xhr.send();
//   }

// window.onload = function () {
//     let biblio;
//     let widthMat;
// // C'est pourtant si simple merde je veux juste récupérer un fichier avec son path et le lire 

//       let canvas = document.getElementById("myCanvas");
//       let context = canvas.getContext("2d");

      
//     // Dessiner les contours:
//     let totalWidth =  widthMat;
//     for (let i = 0; i < biblio[0].length; i++){
//         totalWidth += biblio[0][i][0] + widthMat
//     }

//     let totalHeight = widthMat;
//     for (let i = 0; i < biblio.length;i++){
//         totalHeight += biblio[i][0][1] + widthMat
//     }
//     canvas.width = totalWidth;
//     canvas.height = totalHeight;

//     context.lineWidth = 1
//     context.strokeRect(widthMat, widthMat, totalWidth - 2*widthMat, totalHeight- 2*widthMat);

//     // Dessiner les cellules
//     let y = widthMat;
//     for (let i = 0; i < biblio.length; i++) {
//         if (i!=0){
//             y += biblio[i-1][0][1] + widthMat
//         }
//         let x = widthMat;
//         for (let j = 0; j < biblio[i].length; j++) {
//             if (j!=0){
//                 x+= biblio[i][j-1][0] + widthMat
//             }
    
//             context.strokeRect(x, y, biblio[i][j][0], biblio[i][j][1]);
//             context.fillStyle = `rgba(110, 74, 9, 1)`
//             context.fillRect(x,y,biblio[i][j][0],biblio[i][j][1])
//             console.log(`x ${x}, y ${y}, biblio width ${biblio[i][j][0]}, biblio heigth ${biblio[i][j][1]}`);
//         }
//     }

//       let generateButton = document.getElementById("generateBooksButton");
//       let biblioFilled = [];

//       generateButton.addEventListener("click", function () {
//         biblioFilled = generateBooks(biblio, bookBiblio, context);
//         let compt = 0;
//         for (let i = 0; i < biblioFilled.length; i++) {
//           for (let j = 0; j < biblioFilled[i].length; j++) {
//             for (let k = 0; k < biblioFilled[i][j].length; k++) {
//               console.log(`Le livre ${compt} est à la entre ${biblioFilled[i][j][k][1]} et ${biblioFilled[i][j][k][0][0] + biblioFilled[i][j][k][1]} en x et entre ${biblioFilled[i][j][k][2]} et ${biblioFilled[i][j][k][0][1] + biblioFilled[i][j][k][2]} en y`)
//               compt++
//             }
//           }
//         }
//         canvas.addEventListener('click', function (event) {
//           handleCanvasClick(event, biblioFilled, biblio, widthMat, canvas);
//         });
//       });
// }



// window.addEventListener('click', function (event) {
//   const modal = document.getElementById('modal');
//   const closeButton = document.querySelector('.close');
//   if (event.target === modal || event.target === closeButton) {
//     closeModal();
//   }