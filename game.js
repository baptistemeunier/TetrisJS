/* Appels des differents Objects */
includeFile("blockObject.js"); // Object qui gére les piéces
includeFile("graphicObject.js"); // Object qui gére la partie graphique
includeFile("gameObject.js"); // Object qui gére la grille de jeu et le mecanique de gameplay
/* Initialisation des variables global */
setCanvasFont("Arial", "15px", "bold"); // Selection de la police
var bestScores = JSON.parse(readFile("data/score.json")); // Tableau des scores
var tetros = JSON.parse(readFile("data/tetrominos.json")); // Tableau des pieces
var color = ["cyan", "yellow", "purple", "orange", "blue", "red", "lime"]; // Tableau de couleur des pièces
var Graphic = new Graphic(); // Instance de l'objet Graphic
var Game = new Game(); // Instance de l'objet Game
var routine; // Variable qui contient le setInverval() 

window.onkeyup = function(event) { // Lorsque qu'une touche est relachée
  if (event.keyCode == 27) { // Touche echap
    Game.pause();
  }
};
window.onkeydown = function(event) { // Lorsque qu'une touche est enfoncée
  Game.control(event.keyCode); // Fonction qui gére les controles
};

function interval() { // Fonction qui gére la routine du jeu
  Game.block.down(Game.grid); // La piéce decend
  if (Game.block.isDown == true) { // Si la piéce est bloquée
    clearInterval(routine); // On arrete le routine
    Game.next(); // On recommence
  }
}
/* On initialise les objects */
Game.initialiser();
Graphic.initialiser();
Game.pseudo = Saisie("Merci de saisir votre pseudo");

/* On demarre la partie */
Game.start();
