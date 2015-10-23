/** Objet Game
 * 
 * Classe contenant toutes les variables nessessaire a la partie de tetris 
 *
 * @author Baptiste Meunier baptistemeunier0@gmail.com 
 * @since v0.1.0--alpha
 *
 **/

function Game() {

  this.score = 40; // Score du joueur
  this.level = 20; // Niveau du joueur
  this.lineScore = 20; // Nombre de ligne detruite
  this.nextBlock = Hasard(7); // Id de la prochaine piéce
  this.grid = Tableau(20, 10); // Grille du plateau de jeu 
  this.block = new Block(Hasard(7), 0, 0);

  /** Methode initialiser
   *   Crée la grille est lance la partie 
   *   @return void
   **/
  this.initialiser = function() {
    //On initialise le tableau grille du jeu
    for (var i = 0; i < Taille(this.grid); i++) {
      for (var j = 0; j < Taille(this.grid[i]); j++) {
        this.grid[i][j] = Tableau(2);
        this.grid[i][j][0] = false;
      }
    }
  };
  this.start = function() {
    this.grid = this.block.draw(this.grid);
    this.debugGrid();
    routine = setInterval(function() {
      interval();
    }, 1000);
  };

  this.next = function() {
    this.block = null;
    routine = null;
    this.block = new Block(this.nextBlock, 0, 0);
    this.nextBlock = Hasard(7);
    routine = setInterval(function() {
      interval();
    }, 1000);
  };

  this.debugGrid = function() {
    EffacerEcran();
    for (var i = 0; i < Taille(Game.grid); i++) {
      var ret = "";
      for (var j = 0; j < Taille(Game.grid[i]); j++) {
        ret += Game.grid[i][j][0] + " : ";
      }
      Ecrire(ret + " fin");
    }

    for (var i = 0; i < Taille(Game.grid); i++) {
      var ret = "";
      for (var j = 0; j < Taille(Game.grid[i]); j++) {
        ret += Game.grid[i][j][1] + " : ";
      }
      Ecrire(ret + " fin");
    }
  };
}
