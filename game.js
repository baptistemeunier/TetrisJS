var tetros = [[[[0, 1, 2, 3]],[[0],[0],[0],[0]],[[0, 1, 2, 3]],[[0], [0], [0], [0]]], [[[0, 1], [0, 1] ], [[0, 1], [0, 1] ], [[0, 1], [0, 1] ], [[0, 1], [0, 1] ] ], [[[1], [0, 1, 2] ], [[0], [0, 1], [0] ], [[1], [0, 1], [1] ], [[1], [0, 1], [1] ] ], [[[2], [0, 1, 2]], [[0], [0], [0, 1]], [[0, 1, 2], [0]], [[0, 1], [1], [1]] ], [[[0], [0, 1, 2] ], [[0, 1], [0], [0] ], [[0, 1, 2], [2] ], [[1], [1], [0, 1] ] ], [[[0, 1], [1, 2] ], [[1], [0, 1], [0] ], [[0, 1], [1, 2] ], [[1], [0, 1], [0] ] ], [[[1, 2], [0, 1] ], [[0], [0, 1], [1] ], [[1, 2], [0, 1] ], [[0], [0, 1], [1] ] ] ];
var color  = [ "cyan", "yellow", "purple", "orange", "blue", "red", "lime"];
var c = 30;   // Coté d'un block en pixel 
var bord =20; // Position du bord gauche en pixel
var bord_next = 3*bord+10*c; // Position du bord gauche cadre next

document.onkeyup = function(event){ 
  switch(event.keyCode){
      case 16:
    Ecrire("Touche MAJ : Rotation gauche (16)");
      break;

      case 35:
        Ecrire("Touche Fin : Rotation droite (35)");
        block.rotate();
      break;
      
      case 37:
        Ecrire("Touche <-  : Deplacement gauche (37)");
        block.move(-1);
      break;

      case 39:
        Ecrire("Touche ->  : Deplacement droite (39)");
        block.move(1);
     break;
     
      case 40:
        Ecrire("Touche BAS  : Deplacement Bas (40)");
        block.down();
      break;
    }
};

/** Creation de l'objet Block
 *   Crée le tetromino qui est utilisé dans le jeu
 *   
**/function Block(type, x, y){
  this.type     = type;
  this.rotation = 0;
  this.coord    = tetros[type][0];
  this.color    = color[type];
  this.x        = 0;
  this.y        = 0;
  Ecrire(this.type);
  Ecrire(this.coord);  
  Ecrire("X : " + this.x);
  Ecrire("Y : " + this.y);
  this.draw();
}

/** Methode Draw de l'objet Block
 *   Permet de crée le tetromino dans la grille
 *   @return void
**/
Block.prototype.draw = function(){
  for(var i=0;i<Taille(this.coord);i++){
    for(var j=0;j<Taille(this.coord[i]);j++){
      grid[i+this.x][this.coord[i][j]+this.y][0] = 2;
      grid[i+this.x][this.coord[i][j]+this.y][1] = this.color;
    }
  }
  for(var i=0;i<Taille(grid);i++){
    for(var j=0;j<Taille(grid[i]);j++){
      if(grid[i][j][0]){
          RectanglePlein(bord+j*c, bord+i*c, c, c, this.color);    
      }
    }
  }
};

/** Methode Draw de l'objet Block
 *   Permet de crée le tetromino dans la grille
 *   @return void
**/
Block.prototype.fixe = function(){
  for(var i=0;i<Taille(this.coord);i++){
    for(var j=0;j<Taille(this.coord[i]);j++){
      grid[i+this.x][this.coord[i][j]+this.y][0] = true;
  }
  }
  for(var i=0;i<Taille(grid);i++){
    for(var j=0;j<Taille(grid[i]);j++){
      if(grid[i][j][0]){
          RectanglePlein(bord+j*c, bord+i*c, c, c, this.color);    
      }
    }
  }
};

/** Methode Remove de l'objet Block
 *   Permet d'effaser le tetromino de la grille
 *   @return void
**/
Block.prototype.remove = function(){
  for(var i=0;i<Taille(grid);i++){
    for(var j=0;j<Taille(grid[i]);j++){
      if(grid[i][j][0]){
          RectanglePlein(bord+j*c, bord+i*c, c, c, "white");    
      }
    }
  }
  for(var i=0;i<Taille(this.coord);i++){
    for(var j=0;j<Taille(this.coord[i]);j++){
      grid[i+this.x][this.coord[i][j]+this.y][0] = false;
      grid[i+this.x][this.coord[i][j]+this.y][1] = undefined;
  }
  }
};

/** Methode Rotate de l'objet Block
 *   Permet de mettre le tetromino en rotation
 *   @return void
**/
Block.prototype.rotate = function(){  this.remove();
  this.rotation = (this.rotation==3)?0:this.rotation+1;
  this.coord    = tetros[this.type][this.rotation];
  this.draw();
};

/** Methode Rotate de l'objet Block
 *   Permet de mettre le tetromino en rotation
 *   @return void
**/
Block.prototype.down = function(){
  for(var i=0;i<Taille(this.coord);i++){
    for(var j=0;j<Taille(this.coord[i]);j++){
      next_empty = (grid[i+this.x+1]===undefined)?true:grid[i+this.x+1][this.coord[i][j]+this.y][0];
      Ecrire(next_empty);
      if(next_empty == true){
        Ecrire("break");
         this.fixe();
         return false;
      }
  }
  }
  this.remove();
  this.x++;
  this.draw();
};

Block.prototype.move = function(sens){
  for(var i=0;i<Taille(this.coord);i++){
    for(var j=0;j<Taille(this.coord[i]);j++){
      next_empty = (grid[i+this.x][this.coord[i][j]+this.y+sens]===undefined)?true:grid[i+this.x][this.coord[i][j]+this.y+sens][0];
      Ecrire(next_empty);
      if(next_empty == true){
        Ecrire("Imposible");
         return false;
      }
  }
  }
  this.remove();
  this.y += sens;
  this.draw();
};

/* Creation de la grille */
var grid = Tableau(20, 10);
for(var i=0;i<Taille(grid);i++){ // On initialise le tableau 
  for(var j=0;j<Taille(grid[i]);j++){
  grid[i][j] = Tableau(2);
    grid[i][j][0] = false;
  }
}
/* /Creation de la grille */

Rectangle(bord-1, bord-1, 10*c+1, 20*c+1);
Rectangle(bord_next, bord, 5*c, 3*c);
function run(){
 block = null;
 block = new Block(Hasard(7), bord, bord);
 time = null;
 time = setInterval(function() { interval(block); }, 1000);
}
function interval(b){
  for(var i=0;i<Taille(grid);i++){
    var ret = "";
    for(var j=0;j<Taille(grid[i]);j++){
      ret += grid[i][j][0] + " : "; 
    }
    Ecrire(ret + " fin");
  }
  if(b.down() == false){
    clearInterval(time);
    run();
  }
}
var block;
var time;
run();
