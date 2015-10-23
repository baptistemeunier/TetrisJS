/* Appelq de fichier Object */
includeFile("blockObject.js");
includeFile("graphicObject.js");
includeFile("gameObject.js");

/* Initialisation des variables global */
setCanvasFont("Arial", "25px", "bold"); // Selection de la police
var tetros = JSON.parse(readFile("data/tetrominos.json")); // Liste de pieces
var color = ["cyan", "yellow", "purple", "orange", "blue", "red", "lime"]; // Couleur des pièces
var Graphic = new Graphic(); // Instance de l'objet Graphic
var Game = new Game(); // Instance de l'objet Graphic
var routine; // ...
var stop = false;

/* Gestion des controles en jeu */
window.onkeyup = function(event) { // Lorsque qu'une touche est relaché
  switch (event.keyCode) {
  case 16:
    //Touche MAJ : Rotation 90° gauche
    Game.grid = Game.block.rotate(Game.grid, -1);
    Game.debugGrid();
    break;
  case 35:
    // Touche Fin : Rotation 90° droite
    Game.grid = Game.block.rotate(Game.grid, 1);
    Game.debugGrid();
    break;
  case 37:
    // Touche <- : Deplacement gauche
    Game.grid = Game.block.move(Game.grid, -1);
    Game.debugGrid();

    break;
  case 39:
    // Touche -> : Deplacement droite
    Game.grid = Game.block.move(Game.grid, 1);
    Game.debugGrid();
    break;
  case 40:
    // Touche BAS : Deplacement bas (soft drop)
    Game.grid = Game.block.down(Game.grid);
    Game.debugGrid();
    break;
  }
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

/* On initialise les Objets nesessaire à la partie */
Game.initialiser();
Graphic.initialiser();

Game.start();
