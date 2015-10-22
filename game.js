var tetros = JSON.parse(readFile("data/tetrominos.json"));
var color  = [ "cyan", "yellow", "purple", "orange", "blue", "red", "lime"];
var c = 30;   // Coté d'un block en pixel 
var bord =20; // Position du bord gauche en pixel
var bord_next = 3*bord+10*c; // Position du bord gauche cadre next
includeFile("blockObjet.js");
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
 block.draw();
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
