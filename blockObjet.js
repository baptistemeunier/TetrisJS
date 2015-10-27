/** Creation de l'objet Block
 *   Crée le tetromino qui est utilisé dans le jeu
 *
 **/

function Block(type) {

  this.type = type;
  this.rotation = 0;
  this.coord = tetros[type][0];
  this.color = color[type];
  this.x = 0;
  this.y = 5;

  /* Gestion des controles en jeu */

  this.draw = function(grid) {
    for(var i = 0; i < Taille(this.coord); i++) {
      for (var j = 0; j < Taille(this.coord[i]); j++) {
        grid[i + this.x][this.coord[i][j] + this.y][0] = 2;
        grid[i + this.x][this.coord[i][j] + this.y][1] = this.color;
      }
    }
    Graphic.majGrid(grid);
    return grid;
  };
  /** Methode Fixe de l'objet Block
   *   @return void
   **/
  this.fixe = function(grid) {
    for (var i = 0; i < Taille(this.coord); i++) {
      for (var j = 0; j < Taille(this.coord[i]); j++) {
        grid[i + this.x][this.coord[i][j] + this.y][0] = true;
      }
    }
    stop = true;
    return grid;
  };
	this.hardDrop = function(grid){
    	do{
          grid = this.down(grid);
        }while(stop == false);
      return grid;
    };
  /** Methode Remove de l'objet Block
   *   Permet d'effaser le tetromino de la grille
   *   @return void
   **/
  this.remove = function(grid) {
    for (var i = 0; i < Taille(this.coord); i++) {
      for (var j = 0; j < Taille(this.coord[i]); j++) {
        grid[i + this.x][this.coord[i][j] + this.y][0] = false;
        grid[i + this.x][this.coord[i][j] + this.y][1] = undefined;
      }
    }
    return grid;
  };

  /** Methode Rotate de l'objet Block
   *   Permet de mettre le tetromino en rotation
   *   @return void
   **/
  this.rotate = function(grid, sens) {
    var rotation, coord;
    grid = this.remove(grid);
    if (sens == 1 && this.rotation == 3) {
      rotation = 0;
    } else if (sens == -1 && this.rotation == 0) {
      rotation = 3;
    } else {
      rotation = this.rotation + sens;
    }
    coord = tetros[this.type][rotation];
    for(var i = 0; i < Taille(coord); i++) {
      for (var j = 0; j < Taille(coord[i]); j++) {
        if(grid[i + this.x][coord[i][j] + this.y] == undefined || grid[i + this.x][coord[i][j] + this.y][0] == true){
			return grid;
        }
      }
    }
    this.rotation = rotation;
    this.coord = coord;
    this.draw(grid);
	return grid;
  };

  /** Methode Rotate de l'objet Block
   *   Permet de mettre le tetromino en rotation
   *   @return void
   **/
  this.down = function(grid) {
    for (var i = 0; i < Taille(this.coord); i++) {
      for (var j = 0; j < Taille(this.coord[i]); j++) {
        next_empty = (grid[i + this.x + 1] === undefined) ? true : grid[i + this.x + 1][this.coord[i][j] + this.y][0];
        if (next_empty == true) {
          Ecrire("break");
          return this.fixe(grid);
        }
      }
    }
    this.remove(grid);
    this.x++;
    this.draw(grid);
    return grid;
  };

  this.move = function(grid, sens) {
    for (var i = 0; i < Taille(this.coord); i++) {
      for (var j = 0; j < Taille(this.coord[i]); j++) {
        next_empty = (grid[i + this.x][this.coord[i][j] + this.y + sens] === undefined) ? true : grid[i + this.x][this.coord[i][j] + this.y + sens][0];
        if (next_empty == true) {
          Ecrire("Imposible");
          return grid;
        }
      }
    }
    grid = this.remove(grid);
    this.y += sens;
    this.draw(grid);
    return grid;
  };

}
