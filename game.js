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
var routine; // 
//var stop = false;
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
  if (Game.block.isDown == true) {
    Game.block.isDown = false;
    clearInterval(this.routine);
    Game.next();
  }
}
pseudo = Saisie("Merci de saisir votre pseudo"); /* On initialise les Objets nesessaire à la partie */
Game.initialiser();
Graphic.initialiser();

Game.start();
