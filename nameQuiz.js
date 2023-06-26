const reponse = await fetch('perso.json');

let persos = await reponse.json();




const urlParams = new URLSearchParams(window.location.search);
let difficulty = urlParams.get('difficulty');

if (difficulty){
  if(difficulty === 'easy'){
    persos = persos.filter(item => item.difficulte === 'easy');
  } else if(difficulty === 'medium'){
    persos = persos.filter(item => item.difficulte === 'medium');
  }else if(difficulty === 'hard'){
    persos = persos.filter(item => item.difficulte === 'hard');
  }
} else {
  difficulty = 'all';

}

const Size = persos.length;
console.log('Difficulté sélectionnée :', difficulty);

let persoSelectionne = [];

function compareNameAndLastName(answer, correct) {
  const trimmedAnswer = answer.trim();
  const parts = trimmedAnswer.split(' ');
  const givenName = parts[0];
  const givenLastName = parts[1];
  const Correctparts = correct.split(' ');
  const correctName = Correctparts[0];
  const correctLastName = Correctparts[1];

  if (parts.length === 1) {
    if (givenName === correctName) {
      return true;
    } else {
      console.log("Le nom n'est pas correct.");
    }
  } else if (givenName === correctName && givenLastName === correctLastName) {
    console.log("Le nom et le prénom sont corrects.");
  } else if (givenName === correctName) {
    return true;
  } else if (givenLastName === correctLastName) {
    return true;
  } else if (givenName === correctLastName) {
    return true;
  } else if (givenLastName === correctName) {
    return true;
  } else {
    return false;
  }
}


function generateImage(persos,Size){
    let whichOne = 0;
    while (true) {
      whichOne = Math.floor(Math.random() * Size);
      
      // Vérifie si le nombre généré n'est pas présent dans la liste
      if (!persoSelectionne.includes(whichOne)) {
        break;
      }
    }
    persoSelectionne.push(whichOne);

    const perso = persos[whichOne];

    const sectionImage = document.querySelector(".Image");

    const element = document.createElement("article");

    const image = document.createElement("img");
    image.src = perso.Image;
    console.log(image)


    sectionImage.appendChild(element);
    element.appendChild(image);
    let Answer = ''



    if (perso.nom === ''){
        Answer = `${perso.prenom}`;
    } else {
        Answer = `${perso.prenom} ${perso.nom}`;
    }


    const Tot = [Answer,perso];
    return(Tot)

} 

function showTheAnswer(GoodResponse){
    const sectionImage = document.querySelector(".Image");
    const Reponse = document.createElement("p");
    Reponse.innerText = GoodResponse;
    sectionImage.appendChild(Reponse);
}

function verifierReponse() {
  if (isAnswered) {
    return; 
  }

  const reponseDonnee = inputReponse.value;
  if (reponseDonnee.toLowerCase().trim() === GoodAnswer.toLowerCase().trim()) {
    guesses += 1;
    if (essai === 0) {
      point += 4;
    } else if (essai === 1) {
      point += 2;
    }
    essai = 0;
    console.log(`Félicitations, vous avez maintenant ${point} points`);
    const ParagrapheAffichageScore = document.querySelector(".AffichageScore");
    ParagrapheAffichageScore.textContent = `Votre de score est de ${point}`
    isAnswered = true;
    inputReponse.style.display = 'none';
    boutonValider.style.display = 'none';
    BoutonTuTriches.style.display = 'none';

    const sectionReponse = document.querySelector(".Reponse");
    const resultMessage = document.createElement("p");
    resultMessage.textContent = `Félicitations, c'était bien "${GoodAnswer}" !`;
    sectionReponse.style.display = 'block';
    sectionReponse.appendChild(resultMessage);
    nextPersonButton.style.display = 'block';

    if (guesses === 10) {
      // Envoi du score au serveur via une requête AJAX
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'enregistrer_score.php');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            // Traitement de la réponse du serveur (par exemple, affichage d'un message à l'utilisateur)
            const response = xhr.responseText;
            console.log(response);
          } else {
            console.error('Une erreur s\'est produite lors de l\'envoi du score.');
          }
        }
      };
      //if (difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard'){
       // difficulty = 'all'
      //}
      xhr.send('score=' + point + '&difficulte=' + difficulty);


      console.log(`Score final : ${point}`);
      const replay = confirm(`Score final : ${point}\nVous avez terminé le jeu ! Voulez-vous rejouer ?`);
      if (replay) {
        point = 0;
        guesses = 0;
        //document.querySelector(".Reponse").innerHTML = "";
        //document.querySelector(".Image").innerHTML = "";
        //ListResult = generateImage(persos, Size);
        //GoodAnswer = ListResult[0];
        //perso = ListResult[1];
        location.reload();
      } else {
        window.location.href = "accueil.php";
      }
    }
  } else if(compareNameAndLastName(reponseDonnee.toLowerCase(),GoodAnswer.toLowerCase())){
    if (essai === 0) {
      point += 2;
    } 
      essai += 1;
      const sectionReponse = document.querySelector(".Reponse");
      const resultMessage = document.createElement("p");
      sectionReponse.style.display = 'block';
      resultMessage.textContent = `Faux! Ce n'est pas "${inputReponse.value}" ! Mais un élément est correct continuez`;
      sectionReponse.appendChild(resultMessage);

  } else {
      essai += 1;
      const sectionReponse = document.querySelector(".Reponse");
      const resultMessage = document.createElement("p");
      sectionReponse.style.display = 'block';
      resultMessage.textContent = `Faux! Ce n'est pas "${inputReponse.value}" !`;
      sectionReponse.appendChild(resultMessage);
    
  }
  inputReponse.value = '';
}

  

let ListResult = generateImage(persos,Size);
let GoodAnswer = ListResult[0]
let perso = ListResult[1]
let point = 0;
let essai = 0;
let shown = 0;
let guesses = 0;


const BoutonTuTriches = document.querySelector('.showAnswer');
BoutonTuTriches.addEventListener("click", function () {
  if (!(shown === 0)) {
    return;
  }

  showTheAnswer(GoodAnswer);
  guesses += 1;
  isAnswered = true;
  shown += 1;
  console.log(`Dommage, vous avez toujours ${point} points`);
  const ParagrapheAffichageScore = document.querySelector(".AffichageScore");
  ParagrapheAffichageScore.textContent = `Votre de score est de ${point}`;
  inputReponse.style.display = 'none';
  boutonValider.style.display = 'none';
  BoutonTuTriches.style.display = 'none';

  const sectionReponse = document.querySelector(".Reponse");
  const resultMessage = document.createElement("p");
  resultMessage.textContent = `C'était "${GoodAnswer}" ! Revise tes classiques voyons...`;
  sectionReponse.style.display = 'block';
  sectionReponse.appendChild(resultMessage);
  nextPersonButton.style.display = 'block';

  if (guesses === 10) {
    // Envoi du score au serveur via une requête AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'enregistrer_score.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Traitement de la réponse du serveur (par exemple, affichage d'un message à l'utilisateur)
          const response = xhr.responseText;
          console.log(response);
        } else {
          console.error('Une erreur s\'est produite lors de l\'envoi du score.');
        }
      }
    };
    xhr.send('score=' + point + '&difficulte=' + difficulty);


  
    console.log(`Score final : ${point}`);
    const replay = confirm(`Score final : ${point}\nVous avez terminé le jeu ! Voulez-vous rejouer ?`);
    if (replay) {
      point = 0;
      guesses = 0;
      //ListResult = generateImage(persos, Size);
      //GoodAnswer = ListResult[0];
      //perso = ListResult[1];
      location.reload();
    } else {
      window.location.href = "accueil.php";
    }
  }
});


const inputReponse = document.getElementById('reponseDonnee');
const boutonValider = document.querySelector('.sendAnswer');
let isAnswered = false;
console.log(isAnswered)

boutonValider.addEventListener('click', verifierReponse);
inputReponse.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    if (inputReponse.value !== ''){
        verifierReponse();
        nextPersonButton.focus()
    }
  }
});

const nextPersonButton = document.querySelector('.nextPersonButton');
nextPersonButton.style.display = 'none'

nextPersonButton.addEventListener('click', function() {

    const resultPage = document.querySelector('.Reponse'); 
    resultPage.style.display = 'none';
    nextPersonButton.style.display = 'none'
    const scorePara = document.querySelector('.guesses');
    const guess = guesses + 1
    scorePara.textContent = guess.toString() + 'eme personnage'
  

    isAnswered = false;
    inputReponse.style.display = 'inline-block';
    boutonValider.style.display = 'inline-block';
    BoutonTuTriches.style.display = 'block';
    inputReponse.value = '';
    document.querySelector(".Reponse").innerHTML = "";
    document.querySelector(".Image").innerHTML = "";
    inputReponse.focus()
  
    ListResult = generateImage(persos, Size);
    GoodAnswer = ListResult[0];
    perso = ListResult[1];
    shown = 0;
  });

