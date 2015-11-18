/** Objet Game
 * 
 * Classe contenant toutes les variables nessessaire a la partie de tetris 
 *
 * @author Baptiste Meunier baptistemeunier0@gmail.com 
 * @since v0.1.0--alpha
 *
 **/

function Game() {

  this.score = 0; // Entier : Score du joueur
  this.level = 0; // Entier : Niveau du joueur
  this.lineScore = 0; // Entier : Nombre de ligne detruite
  this.nextBlock = null; // Entier : Id de la prochaine piéce
  this.grid = Tableau(20, 10); // Tableau : Grille du plateau de jeu 
  this.block = null; // Object Block : Block du jeu en cours
  this.save = null; // Entier : Block mis en memoire
  this.speed = 1000; // Entier : Vitesse de descente des blocks
  this.paused = false; // Le jeu est t'il en pause ?
  this.generatorList = [0, 1, 2, 3, 4, 5, 6]; // Tableau qui génere les piéces
  this.generatorKey = -1; // Prochaine pieces à génerer (n+1)
  this.pseudo = ""; // Pseudo de la personne qui joue
  /** Methode initialiser
   *   Crée la grille de jeu 
   *   @return void
   **/
  this.initialiser = function() { /* On initialise le tableau grille du jeu */
    for (var i = 0; i < Taille(this.grid); i++) {
      for (var j = 0; j < Taille(this.grid[i]); j++) {
        this.grid[i][j] = Tableau(2);
        this.grid[i][j][0] = false;
      }
    }
    this.generateList(); // On génere un liste de aleatoire des piéces
    this.block = new Block(this.findNextBlock(), 0, 0); // On crée la piéce
    this.nextBlock = this.findNextBlock(); // On prépare la prochaine piéce
  };

  /** Methode generateList
   *   génere un liste de aleatoire des 7 prochaines piéces.
   *   @return void
   **/
  this.generateList = function() {
    var tampon, random;

    for (i = 6; i >= 0; i--) {
      random = Math.floor(Math.random() * i); // On prends un chiffre au hasard
      /* Puis on procéde a un échange de variable */
      tampon = this.generatorList[i];
      this.generatorList[i] = this.generatorList[random];
      this.generatorList[random] = tampon;
    }
  };

  /** Methode findNextBlock
   *   Cherche la prochaine piéce de la liste
   *   @return void
   **/
  this.findNextBlock = function() {
    this.generatorKey++;
    if (this.generatorKey == 7) { // Si on sort du tableau 
      this.generatorKey = 0;
      this.generateList(); // On en crée un nouveau
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

  /** Methode saveBlock
   *   Sauvegarde la piéce
   *   @params key : Code de la touche (integer)
   *   @return void
   **/
  this.saveBlock = function() {
    if (this.save == this.block.type) { // Si la piéce est identique
      return false; // On annule
    }
    Graphic.changeSave(this.block.type); // On affiche graphiuement le piéce
    clearInterval(routine); // On arrete le jeu
    this.grid = this.block.remove(this.grid); // On efface le piéce
    if (this.save == null) { // Si il n'a pas de piéce sauvegardé
      this.save = this.block.type; // On met la piéce en memoire
      return this.next(); // On lance la prochaine piéce
    }
    var save = this.block.type; // On stoque la piece
    this.block = null;
    routine = null;
    this.block = new Block(this.save, 0, 0); // On utilise la piéce précedament mise en memoire  
    this.save = save; // On met la piéce en memoire
    routine = setInterval(function() { // On redemarre le jeu
      interval();
    }, this.speed);
  };

  /** Methode pause
   *   Sert à mettre la jeu en pause
   *   @return void
   **/
  this.pause = function() {
    if (this.paused) { // Si le jeu est en pause
      routine = setInterval(function() { // O, redemarre le jeu
        interval();
      }, this.speed);
      Graphic.majGrid(this.grid); // Est on affiche la grille
    } else { // Sinom
      clearInterval(routine); // On arrete le jeu
      routine = null;
      Graphic.pause(); // On affiche PAUSE en graphique
    }
    this.paused = (this.paused == false) ? true : false; // On change l'etat de la pause
  };
  /** Methode start
   *   Permet de lancée la partie
   *   @return void
   **/
  this.start = function() {
    this.grid = this.block.draw(this.grid); // On affiche la piéce (grille)
    Graphic.drawNextBlock(this.nextBlock); // On affiche la piéce (graphic)
    routine = setInterval(function() { // On demarrre la jeu
      interval();
    }, this.speed);
  };

  /** Methode next
   *   Permet de passer à la piéce suivantes
   *   @return void
   **/
  this.next = function() {
    this.checkLine(); // On detruit les lignes complétée
    this.block = null;
    this.routine = null;
    if (this.checkLose() == true) {
      Graphic.end();
      for (var i = Taille(bestScores) - 1; i >= 0; i--) {
        if (bestScores[i].score < this.score) {
          bestScores.push({
            "pseudo": this.pseudo,
            "score": this.score
          });
          bestScores.sort(function(key1, key2) {
            return key1.score < key2.score;
          });
          if (bestScores.length > 10) {
            bestScores.pop();
          }
          writeFile("data/score.json", JSON.stringify(bestScores));
          break;
        }
      }
      Graphic.drawBestscore();
      return false;
    }
    this.block = new Block(this.nextBlock, 0, 0); // On crée le nouvelle piéce 
    this.grid = this.block.draw(this.grid); // On affiche la piéce (grille)
    this.nextBlock = this.findNextBlock(); // On prepare le prochain block
    Graphic.drawNextBlock(this.nextBlock); // On affiche la piéce (graphic)
    clearInterval(this.routine);
    routine = null;


    routine = setInterval(function() {
      interval();
    }, this.speed);
  };
/* Fonction de tets qui permet de lire la grille
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
	*/

  /** Methode checkline
   *   Detruit les lignes compléte
   *   @return void
   **/
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
  /** Methode checklose
   *   Permet de détecter la fin de la partie
   *   @return void
   **/
  this.checkLose = function() {
    for (var i = 0; i < Taille(Game.grid[0]); i++) {
      if (Game.grid[0][i][0] == true) {
        return true;
      }
    }
    return false;
  };
}
