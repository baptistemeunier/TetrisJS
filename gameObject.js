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
  this.nextBlock = null; // Id de la prochaine piéce
  this.grid = Tableau(20, 10); // Grille du plateau de jeu 
  this.block = null; // Block du jeu en cours
  this.save = null; // Block mis en memoire
  this.speed = 1000; // Vitesse de descente des blocks
  this.paused = false; // true si le jeu est en pause
  this.generatorList = [0, 1, 2, 3, 4, 5, 6];
  this.generatorKey = -1;
  this.blockdown = false;
  /** Methode initialiser
   *   Crée la grille de jeu 
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
    this.generateList();
    this.block = new Block(this.findNextBlock(), 0, 0);
    this.nextBlock = this.findNextBlock();

  };
  this.generateList = function() {
    var key = 7;
    var tampon, random;

    for (i = 6; i >= 0; i--) {
      // Pick a remaining element...
      random = Math.floor(Math.random() * i);

      // And swap it with the current element.
      tampon = this.generatorList[i];
      this.generatorList[i] = this.generatorList[random];
      this.generatorList[random] = tampon;
    }
  };
  this.findNextBlock = function() {
    this.generatorKey++;
    if(this.generatorKey == 7) {
      this.generatorKey = 0;
      this.generateList();
    }
    return this.generatorList[this.generatorKey];
  };


  /** Methode control
   *   Gere les controles en jeu (touche de jeu)
   *   @params key : Code de la touche (integer)
   *   @return void
   **/
  this.control = function(key) {
    if (this.paused) return false;
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
    case 38:
      // Touche UP : Hard drop
      this.grid = this.block.hardDrop(this.grid);
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
    }, this.speed);
  };

  this.pause = function() {
    if (this.paused) {
      routine = setInterval(function() {
        interval();
      }, this.speed);
      Graphic.majGrid(this.grid);
    } else {
      clearInterval(routine);
      routine = null;
      Graphic.pause();
    }
    this.paused = (this.paused == false) ? true : false;
  };

  this.start = function() {
    this.grid = this.block.draw(this.grid);
    Graphic.drawNextBlock(this.nextBlock);
    routine = setInterval(function() {
      interval();
    }, this.speed);
  };

  this.next = function() {
    this.checkLine();
    this.block = null;
    this.routine = null;
    this.block = new Block(this.nextBlock, 0, 0);
    this.grid = this.block.draw(this.grid);
    this.nextBlock = this.findNextBlock();
    Graphic.drawNextBlock(this.nextBlock);
	clearInterval(this.routine);
    routine = null;
    if (this.checkLose() == true) {
      Graphic.end();
      for (var i = Taille(bestScores) - 1; i >= 0; i--) {
        if (bestScores[i].score > this.score) {
          bestScores.push({
            "pseudo": pseudo,
            "score": this.score
          });
          bestScores.sort(function(key1, key2) {
            return key1.score < key2.score;
          });
          bestScores.pop();
          writeFile("data/score.json", JSON.stringify(bestScores));
          break;
        }
      }
      return false;
    }

    routine = setInterval(function() {
      interval();
    }, this.speed);
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
    var line = 0;
    for (var i = 0; i < Taille(Game.grid); i++) {
      var complete = true;
      for (var j = 0; j < Taille(Game.grid[i]); j++) {
        if (Game.grid[i][j][0] == false) {
          complete = false;
        }
      }
      if (complete == true) {
        line++;
        var oldgrid = this.grid;
        this.grid = Tableau(20, 10);
        this.initialiser();
        for (var l = 0; l < Taille(Game.grid); l++) {
          if (l > i) {
            this.grid[l] = oldgrid[l];
          } else if (l < i) {
            this.grid[l + 1] = oldgrid[l];
          }
        }
        this.lineScore++;
      }
    }
    if (line != 0) {
      this.score += ((line == 1) ? 40 : (line == 2) ? 100 : (line == 3) ? 300 : 1200) * (this.level + 1);
      if (this.lineScore >= ((this.level + 1) * 10)) {
        this.level++;
        this.speed -= this.speed / 5;
      }
      Graphic.drawInfo(this.level, this.score, this.lineScore);
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
