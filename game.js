/* Appelq de fichier Object */
includeFile("blockObject.js");
includeFile("graphicObject.js");
includeFile("gameObject.js");

/* Initialisation des variables global */
setCanvasFont("Arial", "15px", "bold"); // Selection de la police
var bestScores = JSON.parse(readFile("data/score.json")); // Liste de pieces
var tetros = JSON.parse(readFile("data/tetrominos.json")); // Liste de pieces
var color = ["cyan", "yellow", "purple", "orange", "blue", "red", "lime"]; // Couleur des pièces
var Graphic = new Graphic(); // Instance de l'objet Graphic
var Game = new Game(); // Instance de l'objet Graphic
var routine; // ...
var stop = false;

window.onkeyup = function(event) { // Lorsque qu'une touche est relaché
  if (event.keyCode == 27) {
    Game.pause();
  }
};
window.onkeydown = function(event) { // Lorsque qu'une touche est relaché
  Game.control(event.keyCode);
};

function interval() {
  Game.block.down(Game.grid);
  Game.debugGrid();
  if (stop == true) {
    stop = false;
    clearInterval(routine);
    Game.next();
  }
}
pseudo = Saisie("Merci de saisir votre pseudo"); /* On initialise les Objets nesessaire à la partie */
Game.initialiser();
Graphic.initialiser();

Game.start();
