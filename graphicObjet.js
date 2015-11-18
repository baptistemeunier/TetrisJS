/** Objet Graphic
 * 
 * Classe contenant toutes les variables nessessaire à la partie graphique du tetris
 * Elle permet l'affichage de tout les elements graphiques.
 *
 * @author Baptiste Meunier baptistemeunier0@gmail.com 
 * @since v0.1.0--alpha
 *
 **/

function Graphic() {

  this.c = 30; // Longeur en px d'un coté d'un bloc
  this.bordGauche = 20; // Position x du bord gauche du plateau (en px)
  this.bordHaut = 20; // Position y du bord haut (en px)
  /** Methode initialiser
   *   Crée le plateau de jeu, le cadre next, le cadre l'information avec (Niveau et score).
   *   @return void
   **/
  this.initialiser = function() { /*   */
    setCanvasFont("Arial", "15px", "bold"); // Selection de la police
    RectanglePlein(0, 0, 1024, 768, "#ebdfdf"); // Création du fond 
    RectanglePlein(this.bordGauche - 1, this.bordHaut - 1, 10 * this.c + 2, 20 * this.c + 2, "white"); // Création du fond de l'aire jouable
    /* Création des cadres rouges */
    Rectangle(this.bordGauche - 1, this.bordHaut - 1, 10 * this.c + 2, 20 * this.c + 2);
    Rectangle(3 * this.bordGauche + 10 * this.c, this.bordHaut, 5 * this.c, 3 * this.c, "red");
    Rectangle(3 * this.bordGauche + 17 * this.c, this.bordHaut, 12 * this.c, 10 * this.c, "red");
    Rectangle(3 * this.bordGauche + 17 * this.c, this.bordHaut + 12 * this.c, 12 * this.c, 8 * this.c, "red");
    Rectangle(3 * this.bordGauche + 10 * this.c, this.bordHaut + 4 * this.c, 5 * this.c, 3 * this.c, "red");
    Rectangle(3 * this.bordGauche + 10 * this.c, this.bordHaut + 8 * this.c, 5 * this.c, 12 * this.c, "red");

    /* Ajout des block de texte fixe */
    Texte(3 * this.bordGauche + 17.2 * this.c + this.c / 2, this.bordHaut + 40, "UP : Hard Drop", "black");
    Texte(3 * this.bordGauche + 17.2 * this.c + this.c / 2, this.bordHaut + 60, "DOWN : Soft Drop", "black");
    Texte(3 * this.bordGauche + 17.2 * this.c + this.c / 2, this.bordHaut + 80, "LEFT : Deplacement gauche", "black");
    Texte(3 * this.bordGauche + 17.2 * this.c + this.c / 2, this.bordHaut + 100, "RIGHT : Deplacement droite", "black");
    Texte(3 * this.bordGauche + 17.2 * this.c + this.c / 2, this.bordHaut + 120, "MAJ : Rotation -90°", "black");
    Texte(3 * this.bordGauche + 17.2 * this.c + this.c / 2, this.bordHaut + 140, "FIN : Rotation +90°", "black");
    Texte(3 * this.bordGauche + 21 * this.c + this.c / 2, this.bordHaut + 12, "Help box", "black");
    Texte(3 * this.bordGauche + 10 * this.c + this.c / 2, this.bordHaut + 12, "Prochaine Piece", "black");
    Texte(3 * this.bordGauche + 10 * this.c + this.c / 2, this.bordHaut + 4 * this.c + 12, "Piece sauvegardée", "black");
    Texte(3 * this.bordGauche + 21 * this.c + this.c / 2, this.bordHaut + 12 * this.c + this.c / 2, "Meilleur joueur", "black");

    setCanvasFont("Arial", "12px", "bold"); // Selection de la police
    this.drawInfo(0, 0, 0); // Ecriture du scrore
	this.drawBestscore();
  };
  /** Methode drawInfo
   *   Met à jours le cadre des informations de la partie en cours
   *
   *   @params level Niveau du joueur
   *   @params score Score du joueur
   *   @params line Nombre de ligne detruite par le joueur
   *   @return void
   **/
  this.drawBestscore = function(level, score, line) {
    RectanglePlein(3 * this.bordGauche + 17 * this.c + 2, this.bordHaut + 13 * this.c + 2, 10 * this.c-2, 6 * this.c-2, "#ebdfdf");
    for (var i = 0; i < Taille(bestScores); i++) { // Affiche des meuilleur scores
      Texte(3 * this.bordGauche + 18 * this.c, this.bordHaut + 14 * this.c + i * 17, bestScores[i].pseudo + " avec un score de " + bestScores[i].score, "black");
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
  this.drawInfo = function(level, score, line) {
    RectanglePlein(3 * this.bordGauche + 10 * this.c + 1, this.bordHaut + 8 * this.c + 1, 5 * this.c - 2, 12 * this.c - 2, "#ebdfdf"); // On vide la case des scores
    /* On affiche les information (niveau, score, nbr de lignes) */
    Texte(3 * this.bordGauche + 10 * this.c + this.c / 4, this.bordHaut + 9 * this.c, "Niveau : " + level, "black");
    Texte(3 * this.bordGauche + 10 * this.c + this.c / 4, this.bordHaut + 10 * this.c, "Score : " + score, "black");
    Texte(3 * this.bordGauche + 10 * this.c + this.c / 4, this.bordHaut + 11 * this.c, "Ligne : " + line, "black");
  };

  /** Methode drawNextBlock
   *   Met à jours le prochain block
   *
   *   @params block le block à afficher
   *   @return void
   **/
  this.drawNextBlock = function(block) {
    var coord = tetros[block][0]; // On cherche les coordonnées du block
    RectanglePlein(3 * this.bordGauche + 10 * this.c + this.c / 2, this.bordHaut + this.c / 2, 4 * this.c, 2 * this.c, "#ebdfdf"); // On vide la case du prochain block
    for (var i = 0; i < Taille(coord); i++) { // On affiche le block
      for (var j = 0; j < Taille(coord[i]); j++) {
        RectanglePlein(3 * this.bordGauche + 10 * this.c + this.c / 2 + coord[i][j] * this.c, this.bordHaut + this.c / 2 + i * this.c, this.c, this.c, color[block]);
      }
    }
  };

  /** Methode pause
   *   Gére l'affichage du mode pause
   *
   *   @return void
   **/
  this.pause = function() {
    RectanglePlein(this.bordGauche, this.bordHaut, 10 * this.c, 20 * this.c, "grey"); // On change le fond de l'aire de jeu
    setCanvasFont("Arial", "35px", "bold"); // Selection de la police
    Texte(this.bordGauche + this.c, this.bordHaut + 10 * this.c, "Jeu en pause", "red"); // On affiche
    setCanvasFont("Arial", "15px", "bold"); // Selection de la police
  };
  /** Methode changeSave
   *   Met à jours le block sauvegardé
   *
   *   @params block le block à afficher
   *   @return void
   **/
  this.changeSave = function(block) {
    var coord = tetros[block][0]; // On cherche les coordonnées du block
    RectanglePlein(3 * this.bordGauche + 10 * this.c + this.c / 2, this.bordHaut + 4 * this.c + this.c / 2, 4 * this.c, 2 * this.c, "#ebdfdf"); // On vide la case du block en memoire
    for (var i = 0; i < Taille(coord); i++) { // On affiche le block
      for (var j = 0; j < Taille(coord[i]); j++) {
        RectanglePlein(3 * this.bordGauche + 10 * this.c + this.c / 2 + coord[i][j] * this.c, this.bordHaut + 4 * this.c + this.c / 2 + i * this.c, this.c, this.c, color[block]);
      }
    }
  };

  /** Methode majGrid
   *   Met à jours l'aire de jeu en fonction de la grille de jeu
   *   @params grid la grille de jeu
   *   @return void
   **/
  this.majGrid = function(grid) {
    RectanglePlein(this.bordGauche - 1, this.bordHaut - 1, 10 * this.c + 2, 20 * this.c + 2, "white"); // Vide l'aire de jeu
    for (var i = 0; i < Taille(grid); i++) { // Parcours la grille
      for (var j = 0; j < Taille(grid[i]); j++) {
        if (grid[i][j][0]) { // Si la grille nous dis qu'il y a un block
          RectanglePlein(this.bordGauche + j * this.c, this.bordHaut + i * this.c, this.c, this.c, grid[i][j][1]); // On l'affiche
        }
      }
    }
    return true;
  };

  /** Methode end
   *   Affiche l'amination de fin de partie
   *   @return void
   **/
  this.end = function() {
    var exe = 0;
    root = setInterval(function() {
      Ecrire(exe);
      RectanglePlein(Graphic.bordGauche, Graphic.bordHaut + exe * Graphic.c, 10 * Graphic.c, Graphic.c, "grey");
      exe++;
      if (exe == 20) {
        clearInterval(root);
      }
    }, 100);
  };
}
