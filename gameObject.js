/** Objet Game
 * 
 * Classe contenant toutes les variables nessessaire a la partie de tetris 
 *
 * @author Baptiste Meunier baptistemeunier0@gmail.com 
 * @since v0.1.0--alpha
 *
 **/

function Game() {

  this.score = 0; // Score du joueur
  this.level = 0; // Niveau du joueur
  this.lineScore = 0; // Nombre de ligne detruite
  this.nextBlock = Hasard(7); // Id de la prochaine piéce
  this.grid = Tableau(20, 10); // Grille du plateau de jeu 
  this.block = new Block(Hasard(7), 0, 0); // Block du jeu en cours
  this.save = null; // Block mis en memoire
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

  this.control = function(key) {
    switch (key) {
    case 16:
      //Touche MAJ : Rotation 90° gauche
      this.grid = this.block.rotate(this.grid, -1);
      break;
    case 35:
      // Touche Fin : Rotation 90° droite
      this.grid = this.block.rotate(this.grid, 1);
      break;
    case 37:
      // Touche <- : Deplacement gauche
      this.grid = this.block.move(this.grid, -1);
      break;
    case 39:
      // Touche -> : Deplacement droite
      this.grid = this.block.move(this.grid, 1);
      break;
    case 40:
      // Touche BAS : Deplacement bas (soft drop)
      this.grid = this.block.down(this.grid);
      break;
    case 32:
      // Touche ESPACE : Save block
      this.saveBlock();
      break;
    }
  };
  this.saveBlock = function() {
    if (this.save == this.block.type) {
      return false;
    }
    Graphic.changeSave(this.block.type);
    clearInterval(routine);
    this.grid = this.block.remove(this.grid);
    if (this.save == null) {
      this.save = this.block.type;
      return this.next();
    }
    var save = this.block.type;
    this.block = null;
    routine = null;
    this.block = new Block(this.save, 0, 0);
    this.save = save;
    routine = setInterval(function() {
      interval();
    }, 1000);
  };
  this.start = function() {
    this.grid = this.block.draw(this.grid);
    Graphic.drawNextBlock(this.nextBlock);
    this.debugGrid();
    routine = setInterval(function() {
      interval();
    }, 1000);
  };

  this.next = function() {
    this.checkLine();
    this.block = null;
    routine = null;
    this.block = new Block(this.nextBlock, 0, 0);
    this.nextBlock = Hasard(7);
    Graphic.drawNextBlock(this.nextBlock);
    if (this.checkLose() == true) {
      Graphic.end();
      return false;
    }
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

  this.checkLine = function() {
    for (var i = 0; i < Taille(Game.grid); i++) {
      var complete = true;
      for (var j = 0; j < Taille(Game.grid[i]); j++) {
        if (Game.grid[i][j][0] == false) {
          complete = false;
        }
      }
      if (complete == true) {
        for (var l = i; l > 0; l--) {
          if (l != 0) {
            Game.grid[l] = Game.grid[l - 1];
          } else {
            for (var j = 0; j < Taille(this.grid[l]); j++) {
              this.grid[l][j][0] = false;
              this.grid[l][j][1] = undefined;
            }
          }
        }
        this.score += 100;
        this.lineScore++;
        Graphic.drawInfo(this.level, this.score, this.lineScore);
      }
    }
  };

  this.checkLose = function() {
    for (var i = 0; i < Taille(Game.grid[0]); i++) {
      if (Game.grid[0][i][0] == true) {
        return true;
      }
    }
    return false;
  };
}
