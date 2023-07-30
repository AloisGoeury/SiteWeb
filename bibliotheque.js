import { closeModal } from './closeModal.js';

function generateColor(){
    let color = [];
    for (let i = 0; i<3;i++){
        const randomValue = Math.floor(Math.random() * 256);
        color.push(randomValue)
    }
    return color
}

function getRandomElement(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomElement = list[randomIndex];
    return randomElement;
  }

function generateBook(){
    const possibleWidth = [15,16,17,18,19,20,21,22,23,24,25];
    const possibleHeight = [150,155,160,165,170,175,180];
    const heigth = getRandomElement(possibleHeight);
    const width = getRandomElement(possibleWidth);
    const color = generateColor();
    const book = [width,heigth,color];
    return book;
}

function generateLibrary(howManyBooks){
    let bookBiblio = [];
    for (let i =0;i<howManyBooks;i++){
        const book = generateBook();
        bookBiblio.push(book);
    }
    return bookBiblio;
}

// const howManyBooks = 20;
// const bookBiblio = generateLibrary(howManyBooks);



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

function generateBooks(biblio,bookBiblio,context,widthMat){
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
          const bookX = biblioFilled[i][j][k][1] * 0.5; 
          const bookY = biblioFilled[i][j][k][2] * 0.5;
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
  
async function getBooks() {
    try {
      const response = await fetch("get_books.php");
      const data = await response.json();
      console.log(data);
    
      const books = data.jsonBooks;
      let bookBiblio = [];
  
      for (let i = 0; i<books.length;i++){
          let book = [];
          book.push(parseInt(books[i].epaisseur_livre));
          book.push(parseInt(books[i].hauteur_livre));
          book.push(JSON.parse(books[i].couleur_tranche));
          bookBiblio.push(book);
          console.log(book)
      }
      return bookBiblio;
    } catch (error) {
      console.error("Erreur lors de la récupération du fichier JSON :", error);
      throw error;
    }
  }

function start(biblio,widthMat) {
    console.log(biblio)
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
            //console.log(`x ${x}, y ${y}, biblio width ${biblio[i][j][0]}, biblio heigth ${biblio[i][j][1]}`);
        }
    }

    let generateButton = document.getElementById("generateBooksButton");
    let biblioFilled = [];
    generateButton.addEventListener("click", function(){
        // const bookBiblio = getBooks();
    
        fetch("get_books.php")
        .then((response) => response.json())
        .then((data) => {
        // Process the retrieved JSON data
        console.log(data);
        
        const books = data.jsonBooks;
        let bookBiblio = [];

        for (let i = 0; i<books.length;i++){
            let book = [];
            book.push(parseInt(books[i].epaisseur_livre));
            book.push(parseInt(books[i].hauteur_livre));
            book.push(JSON.parse(books[i].couleur_tranche));
            bookBiblio.push(book);
            console.log(book)
        }
        // For example, you can pass the data to your "generateBooks" function
        biblioFilled = generateBooks(biblio, bookBiblio, context, widthMat);

        let compt = 0;
        for (let i = 0; i < biblioFilled.length; i++) {
            for (let j = 0; j < biblioFilled[i].length; j++) {
            for (let k = 0; k < biblioFilled[i][j].length; k++) {
                compt++;
            }
            }
        }
        canvas.addEventListener('click', function(event) {
            handleCanvasClick(event, biblioFilled, biblio, widthMat, canvas);
            });
        })
        .catch((error) => {
        console.error("Error fetching JSON data:", error);
        // Handle errors here
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

  async function loadJSONFile(filePath) {
    try {
      const response = await fetch(filePath);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement du fichier JSON :", error);
      throw error;
    }
  }
  
  async function getLibrary() {
    try {
      const response = await fetch("getLibrary.php");
      const data = await response.json();
      console.log("Contenu du fichier JSON :", data);
      console.log("Chemin du fichier JSON :", data.json_path);
  
      const jsonNew = await loadJSONFile(data.json_path);
      console.log(jsonNew);
      return jsonNew;
    } catch (error) {
      console.error("Erreur lors de la récupération du fichier JSON :", error);
      throw error;
    }
  }
  
  (async () => {
    try {
      const jsonNew = await getLibrary();
      const biblio = jsonNew.biblio;
      const widthMat = parseInt(jsonNew.widthMat);
  
      console.log("Contenu de biblio :", biblio);
      console.log("Contenu de widthMat :", widthMat);
      start(biblio,widthMat)

  

    } catch (error) {
      console.error("Erreur lors du traitement des données :", error);
      // Gérez les erreurs ici
    }
  })();