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
  this.y = 0;



  this.test = function() {
    for (var i = 0; i < Taille(this.coord); i++) {
      for (var j = 0; j < Taille(this.coord[i]); j++) {
        if (grid[i + this.x][this.coord[i][j] + this.y][0] == true) {
          alert("YOU ARE A LOOSER !!!! ");
          clearInterval(time);
          Stop("c");
        }
      }
    }
  };
  //this.test();
  /** Methode Draw de l'objet Block
   *   Permet de crée le tetromino dans la grille
   *   @return grid La grille modifé
   **/
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
    stop =true;
	/*	RectanglePlein(this.bordGauche, this.bordHaut, 10*this.c, 20*this.c, "white");
    for (var i = 0; i < Taille(grid); i++) {
      for (var j = 0; j < Taille(grid[i]); j++) {
        if (grid[i][j][0]) {
          RectanglePlein(bord + j * c, bord + i * c, c, c, this.color);
        }
      }
    }*/
    return grid;
  };

  /** Methode Remove de l'objet Block
   *   Permet d'effaser le tetromino de la grille
   *   @return void
   **/
  this.remove = function(grid) {
    /*
    for (var i = 0; i < Taille(grid); i++) {
      for (var j = 0; j < Taille(grid[i]); j++) {
        if (grid[i][j][0]) {
          RectanglePlein(bord + j * c, bord + i * c, c, c, "white");
        }
      }
    }
    */
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
    grid = this.remove(grid);
    if (sens == 1 && this.rotation == 3) {
      this.rotation = 0;
    } else if (sens == -1 && this.rotation == 0) {
      this.rotation = 3;
    } else {
      this.rotation += sens;
    }
    this.coord = tetros[this.type][this.rotation];
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
