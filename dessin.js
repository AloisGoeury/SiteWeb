// Récupérer le canvas
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// Variables pour stocker les coordonnées de la souris
var isDrawing = false;
var previousX = 0;
var previousY = 0;

// Fonction pour démarrer le dessin
function startDrawing(e) {
  isDrawing = true;
  previousX = e.clientX - canvas.offsetLeft;
  previousY = e.clientY - canvas.offsetTop;
}

// Fonction pour arrêter le dessin
function stopDrawing() {
  isDrawing = false;
}

// Fonction pour dessiner lors du déplacement de la souris
function draw(e) {
  if (!isDrawing) return;
  
  var currentX = e.clientX - canvas.offsetLeft;
  var currentY = e.clientY - canvas.offsetTop;
  
  context.beginPath();
  context.moveTo(previousX, previousY);
  context.lineTo(currentX, currentY);
  context.stroke();
  
  previousX = currentX;
  previousY = currentY;
}

// Ajouter les gestionnaires d'événements
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
