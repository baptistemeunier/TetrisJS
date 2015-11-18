/** Objet Block
 * 
 * Classe contenant le tetromino qui est utilisé dans le jeu et ses mouvement 
 *
 * @author Baptiste Meunier baptistemeunier0@gmail.com 
 * @since v0.1.0--alpha
 *
 **/

function Block(type) {

  this.type = type; // Entier : Type de piece crée.
  this.rotation = 0; // Entier : Rotation en cours (entre 0 et 3)
  this.coord = tetros[type][0]; // Tableau : Coordonnée de la piece sur la grille
  this.color = color[type]; // Chaine : Couleur de la piece 
  this.x = 0; // Entier : Position sur X
  this.y = 5; // Entier : Position sur Y
  this.isDown = false; // Boolean : L'objet est t'il bloqué ?
  /** Methode Draw de l'objet Block
   *   Permet de de mettre à jour la grille
   *   @return Tableau grid : La grille de jeu
   **/
  this.draw = function(grid) { /* On parcours les coordonnées de la piéce */
    for (var i = 0; i < Taille(this.coord); i++) {
      for (var j = 0; j < Taille(this.coord[i]); j++) {
        grid[i + this.x][this.coord[i][j] + this.y][0] = 2; // Puis on modifie la grille
        grid[i + this.x][this.coord[i][j] + this.y][1] = this.color;
      }
    }
    Graphic.majGrid(grid);
    return grid;
  };
  /** Methode Fixe de l'objet Block
   *   Permet de bloquer l'object sur la grille
   *   @return Tableau grid : La grille de jeu
   **/
  this.fixe = function(grid) { /* On parcours les coordonnées de la piéce */
    for (var i = 0; i < Taille(this.coord); i++) {
      for (var j = 0; j < Taille(this.coord[i]); j++) {
        grid[i + this.x][this.coord[i][j] + this.y][0] = true; // Puis on modifie la grille
      }
    }
    this.isDown = true; // L'objet est bloqué
    return grid;
  };

  /** Methode hardDrop de l'objet Block
   *   Faire decendre l'object jusqu'a trouvée un obstacle
   *   @return Tableau grid : La grille de jeu
   **/
  this.hardDrop = function(grid) {
    do { // Faire
      grid = this.down(grid); // Decendre la piéce
    } while (this.isDown == false); // Tant que l'object n'est pas bloqué
    return grid;
  };
  /** Methode Remove de l'objet Block
   *   Permet d'effacer le tetromino de la grille
   *   @return Tableau grid : La grille de jeu
   **/
  this.remove = function(grid) { /* On parcours les coordonnées de la piéce */
    for (var i = 0; i < Taille(this.coord); i++) {
      for (var j = 0; j < Taille(this.coord[i]); j++) {
        grid[i + this.x][this.coord[i][j] + this.y][0] = false; // Puis on modifie la grille
        grid[i + this.x][this.coord[i][j] + this.y][1] = undefined;
      }
    }
    return grid;
  };

  /** Methode Rotate de l'objet Block
   *   Permet de mettre le tetromino en rotation
   *   @return Tableau grid : La grille de jeu
   **/
  this.rotate = function(grid, sens) {
    grid = this.remove(grid); // On efface la piéce de la grille
    var rotation = (sens == 1 && this.rotation == 3) ? 0 : ((sens == -1 && this.rotation == 0) ? 3 : this.rotation + sens); // On definit la nouvelle rotation
    var coord = tetros[this.type][rotation]; // On cherche les nouveaux coordonnées
    /* On parcours les coordonnées de la piéce */
    for (var i = 0; i < Taille(coord); i++) {
      for (var j = 0; j < Taille(coord[i]); j++) {
        if (grid[i + this.x][coord[i][j] + this.y] == undefined || grid[i + this.x][coord[i][j] + this.y][0] == true) { // Si il y collision  
          return grid; // On annule le deplacement
        }
      }
    } /* On met a jour les variables de la piece */
    this.rotation = rotation;
    this.coord = coord;

    this.draw(grid); // On affiche la piece sur la grille avec les nouvelles coordonnées
    return grid;
  };

  /** Methode down de l'objet Block
   *   Fait decendre la piéce d'une case 
   *   @return Tableau grid : La grille de jeu
   **/
  this.down = function(grid) { /* On parcours les coordonnées de la piéce */
    for (var i = 0; i < Taille(this.coord); i++) {
      for (var j = 0; j < Taille(this.coord[i]); j++) {
        if (((grid[i + this.x + 1] === undefined) ? true : grid[i + this.x + 1][this.coord[i][j] + this.y][0]) == true) { // Si il y collision
          return this.fixe(grid); // On fixe la piéce
        }
      }
    }
    this.remove(grid); // On efface la piece de la grille
    this.x++; // La position sur X augmente de 1
    this.draw(grid); // On affiche la piece sur la grille
    return grid;
  };

  /** Methode move de l'objet Block
   *   Deplace la piece 
   *   @return Tableau grid : La grille de jeu
   **/
  this.move = function(grid, sens) { /* On parcours les coordonnées de la piéce */

    for (var i = 0; i < Taille(this.coord); i++) {
      for (var j = 0; j < Taille(this.coord[i]); j++) {
        if (((grid[i + this.x][this.coord[i][j] + this.y + sens] === undefined) ? true : grid[i + this.x][this.coord[i][j] + this.y + sens][0]) == true) { // Si il y collision
          return grid; // On annule le deplacement
        }
      }
    }
    grid = this.remove(grid); // On efface la piece de la grille
    this.y += sens; // La position sur Y se met à jour
    this.draw(grid); // On affiche la piece sur la grille
    return grid;
  };
}
