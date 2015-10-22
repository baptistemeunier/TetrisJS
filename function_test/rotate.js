var tetros = [[[[0, 1, 2, 3]],[[0],[0],[0],[0]],[[0, 1, 2, 3]],[[0], [0], [0], [0]]], [[[0, 1], [0, 1] ], [[0, 1], [0, 1] ], [[0, 1], [0, 1] ], [[0, 1], [0, 1] ] ], [[[1], [0, 1, 2] ], [[0], [0, 1], [0] ], [[1], [0, 1], [1] ], [[1], [0, 1], [1] ] ], [[[2], [0, 1, 2]], [[0], [0], [0, 1]], [[0, 1, 2], [0]], [[0, 1], [1], [1]] ], [[[0], [0, 1, 2] ], [[0, 1], [0], [0] ], [[0, 1, 2], [2] ], [[1], [1], [0, 1] ] ], [[[0, 1], [1, 2] ], [[1], [0, 1], [0] ], [[0, 1], [1, 2] ], [[1], [0, 1], [0] ] ], [[[1, 2], [0, 1] ], [[0], [0, 1], [1] ], [[1, 2], [0, 1] ], [[0], [0, 1], [1] ] ] ];
var c = 30;   // Coté d'un block en pixel 
var bord =20; // Position du bord gauche en pixel
var bord_next = 3*bord+10*c; // Position du bord gauche cadre next

/** Creation de l'objet Block
 *   Crée le tetromino qui est utilisé dans le jeu
 *   
**/function Block(type, x, y){
  this.type     = type;
  this.rotation = 0;
  this.coord    = tetros[type][0];
  this.x        = 0;
  this.y        = 0;
  Ecrire(this.type);
  Ecrire(this.coord);
  this.draw();
}

/** Methode Draw de l'objet Block
 *   Permet de crée le tetromino dans la grille
 *   @return void
**/
Block.prototype.draw = function(){
  for(var i=0;i<Taille(this.coord);i++){
    for(var j=0;j<Taille(this.coord[i]);j++){
      grid[i+this.x][this.coord[i][j]+this.y][0] = true;
      grid[i+this.x][this.coord[i][j]+this.y][1] = "grey";
  }
  }
  for(var i=0;i<Taille(grid);i++){
    for(var j=0;j<Taille(grid[i]);j++){
      if(grid[i][j][0]){
          RectanglePlein(bord+j*c, bord+i*c, c, c, "grey");    
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
Block.prototype.rotate = function(){
  this.remove();
  this.rotation = (this.rotation==3)?0:this.rotation+1;
  Ecrire(this.rotation);
  this.coord    = tetros[this.type][this.rotation];
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

var block = new Block(Hasard(7), bord, bord);



var time = setInterval(function(){
block.rotate();
for(var i=0;i<Taille(grid);i++){
  var ret = "";
  for(var j=0;j<Taille(grid[i]);j++){
  ret += grid[i][j][0] + " : "; 
  }
  Ecrire(ret + " fin");
}

for(var i=0;i<Taille(grid);i++){
  var ret = "";
  for(var j=0;j<Taille(grid[i]);j++){
  ret += grid[i][j][1] + " : "; 
  }
  Ecrire(ret + " fin");
}
if(block.rotation == 0){
   clearInterval(time);
}
}, 4000);
