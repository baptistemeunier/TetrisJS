/** Objet Graphic
 * 
 * Classe contenant toutes les variables nessessaire à la partie graphique du tetris
 * Elle permet l'affichage de tout les elements graphiques.
 *
 * @author Baptiste Meunier baptistemeunier0@gmail.com 
 * @since v0.1.0--alpha
 *
 **/
var tetros = JSON.parse(readFile("data/tetrominos.json"));
var color = ["cyan", "yellow", "purple", "orange", "blue", "red", "lime"];

function Graphic() {

  this.c = 30; // Longeur en px d'un coté d'un bloc
  this.bordGauche = 20; // Position x du bord gauche du plateau (en px)
  this.bordHaut = 20; // Position y du bord haut (en px)
  /** Methode initialiser
   *   Crée le plateau de jeu, le cadre next, le cadre l'information avec (Niveau et score).
   *   @return void
   **/
  this.initialiser = function() {
    Rectangle(this.bordGauche - 1, this.bordHaut - 1, 10 * this.c + 2, 20 * this.c + 2);   
    Rectangle(3 * this.bordGauche + 10 * this.c, this.bordHaut, 5 * this.c, 3 * this.c);
    Texte(3 * this.bordGauche + 10 * this.c + this.c/2, this.bordHaut + 12 , "Prochaine Piece", "black");
    Rectangle(3 * this.bordGauche + 10 * this.c, this.bordHaut + 4 * this.c, 5 * this.c, 3 * this.c);
    Texte(3 * this.bordGauche + 10 * this.c + this.c/2, this.bordHaut + 4 * this.c + 12 , "Piece sauvegardée", "black");
    Rectangle(3 * this.bordGauche + 10 * this.c, this.bordHaut + 8 * this.c, 5 * this.c, 12 * this.c);
    this.drawInfo(1, 0, 0);
  };

  /** Methode drawInfo
   *   Met à jours le cadre des informations de la partie en cours
   *
   *   @params level Niveau du joueur
   *   @params score Score du joueur
   *   @params line Nombre de ligne detruite par le joueur
   *   @return void
   **/
  this.drawInfo = function(level, score, line) {
    RectanglePlein(3 * this.bordGauche + 10 * this.c + 1, this.bordHaut + 8 * this.c + 1, 5 * this.c - 2, 12 * this.c - 2, "white");
    Texte(3 * this.bordGauche + 10 * this.c + this.c / 4, this.bordHaut + 9 * this.c, "Niveau : " + level, "black");
    Texte(3 * this.bordGauche + 10 * this.c + this.c / 4, this.bordHaut + 10 * this.c, "Score : " + score, "black");
    Texte(3 * this.bordGauche + 10 * this.c + this.c / 4, this.bordHaut + 11 * this.c, "Ligne : " + line, "black");
  };

  /** Methode drawInfo
   *   Met à jours le cadre des informations de la partie en cours
   *
   *   @params level Niveau du joueur
   *   @params score Score du joueur
   *   @params line Nombre de ligne detruite par le joueur
   *   @return void
   **/
  this.drawNextBlock = function(block) {
    var coord = tetros[block][0];
    RectanglePlein(3 * this.bordGauche + 10 * this.c + this.c / 2, this.bordHaut + this.c / 2, 4 * this.c, 2 * this.c, "white");
    for (var i = 0; i < Taille(coord); i++) {
      for (var j = 0; j < Taille(coord[i]); j++) {
        RectanglePlein(3 * this.bordGauche + 10 * this.c + this.c / 2 + coord[i][j] * this.c, this.bordHaut + this.c / 2 + i * this.c, this.c, this.c, color[block]);
      }
    }
  };
  

  /** Methode drawInfo
   *   Met à jours le cadre des informations de la partie en cours
   *
   *   @params level Niveau du joueur
   *   @params score Score du joueur
   *   @params line Nombre de ligne detruite par le joueur
   *   @return void
   **/
  this.changeSave = function(block) {
    var coord = tetros[block][0];
    RectanglePlein(3 * this.bordGauche + 10 * this.c + this.c / 2, this.bordHaut + 4 * this.c + this.c / 2, 4 * this.c, 2 * this.c, "white");
    for (var i = 0; i < Taille(coord); i++) {
      for (var j = 0; j < Taille(coord[i]); j++) {
        RectanglePlein(3 * this.bordGauche + 10 * this.c + this.c / 2 + coord[i][j] * this.c, this.bordHaut + 4 * this.c + this.c / 2 + i * this.c, this.c, this.c, color[block]);
      }
    }
  };
  
  
  this.majGrid = function(grid){
    RectanglePlein(this.bordGauche , this.bordHaut , 10 * this.c, 20 * this.c, "white");
    for (var i = 0; i < Taille(grid); i++) {
      for (var j = 0; j < Taille(grid[i]); j++) {
        if (grid[i][j][0]) {
          RectanglePlein(this.bordGauche + j * this.c, this.bordHaut + i * this.c, this.c, this.c, grid[i][j][1]);
        }
      }
    }
    return true;
  };
  
  this.end = function(){
	var exe = 0;
    root = setInterval(function() {
      Ecrire(exe);
      RectanglePlein(Graphic.bordGauche, Graphic.bordHaut + exe*Graphic.c, 10 * Graphic.c, Graphic.c, "grey");   
      exe++;
      if(exe == 20){
        clearInterval(root);
      }
    }, 100);
  };
}
