
/** Creation de l'objet Block
 *   Crée le tetromino qui est utilisé dans le jeu
 *
**/
function Block(type, x, y){

  this.type     = type;
  this.rotation = 0;
  this.coord    = tetros[type][0];
  this.color    = color[type];
  this.x        = 0;
  this.y        = 0;
  
  /** Methode Draw de l'objet Block
   *   Permet de crée le tetromino dans la grille
   *   @return void
   **/
  this.draw = function(){
    for(var i=0;i<Taille(this.coord);i++){
      for(var j=0;j<Taille(this.coord[i]);j++){
        grid[i+this.x][this.coord[i][j]+this.y][0] = 2;
        grid[i+this.x][this.coord[i][j]+this.y][1] = this.color;
      }
    }
    for(var i=0;i<Taille(grid);i++){
      for(var j=0;j<Taille(grid[i]);j++){
        if(grid[i][j][0]){
            RectanglePlein(bord+j*c, bord+i*c, c, c, grid[i][j][1]);    
        }
      }
    }
  };
  /** Methode Fixe de l'objet Block
   *   @return void
  **/
  this.fixe = function(){
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
  this.remove = function(){
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
  this.rotate = function(sens){  this.remove();
  if(sens==1 && this.rotation==3){
    this.rotation = 0;
    }else if(sens==-1 && this.rotation==0){
    this.rotation = 3;
    }else{
    this.rotation+= sens; 
    }
    this.coord    = tetros[this.type][this.rotation];
    this.draw();
  };
  
  /** Methode Rotate de l'objet Block
   *   Permet de mettre le tetromino en rotation
   *   @return void
  **/
  this.down = function(){
    for(var i=0;i<Taille(this.coord);i++){
      for(var j=0;j<Taille(this.coord[i]);j++){
        next_empty = (grid[i+this.x+1]===undefined)?true:grid[i+this.x+1][this.coord[i][j]+this.y][0];
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
  
  this.move = function(sens){
    for(var i=0;i<Taille(this.coord);i++){
      for(var j=0;j<Taille(this.coord[i]);j++){
        next_empty = (grid[i+this.x][this.coord[i][j]+this.y+sens]===undefined)?true:grid[i+this.x][this.coord[i][j]+this.y+sens][0];
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
  
}
