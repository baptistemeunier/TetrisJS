/** Objet Graphic
 * 
 * Classe contenant toutes les variables nessessaire à la partie graphique du tetris
 * Elle permet l'affichage de tout les elements graphiques.
 *
 * @author Baptiste Meunier baptistemeunier0@gmail.com 
 * @since v0.1.0--alpha
 *
**/

function Graphic(){

	this.c              = 40;               // Longeur en px d'un coté d'un bloc
	this.bordGauche     = 20;               // Position x du bord gauche du plateau (en px)
	this.bordHaut       = 20;               // Position y du bord haut (en px)

	/** Methode initialiser
	*   Crée le plateau de jeu, le cadre next, le cadre l'information avec (Niveau et score).
	*   @return void
	**/
	this.initialiser = function(){
		Rectangle(this.bordGauche-1, this.bordHaut-1, 10*this.c+2, 20*this.c+2);
		Rectangle(3*this.bordGauche+10*this.c, this.bordHaut, 5*this.c, 3*this.c);
		Rectangle(3*this.bordGauche+10*this.c, this.bordHaut+4*this.c, 5*this.c, 16*this.c);
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
	this.drawInfo = function(level, score, line){
		RectanglePlein(3*this.bordGauche+10*this.c+1, this.bordHaut+4*this.c+1, 5*this.c-2, 16*this.c-2, "white");
		Texte(3*this.bordGauche+10*this.c+this.c/4, this.bordHaut+5*this.c, "Niveau : " + level, "black");
		Texte(3*this.bordGauche+10*this.c+this.c/4, this.bordHaut+6*this.c, "Score : " + score, "black");
		Texte(3*this.bordGauche+10*this.c+this.c/4, this.bordHaut+7*this.c, "Ligne : " + line, "black");
	};

	/** Methode drawNextBlock
	*   Affiche le block a venir
	*
	*   @params block l'id du block entre 0 et 6
	*   @return void
	**/
	this.drawNextBlock = function(block){
		var coord = tetros[block][0];
		RectanglePlein(3*this.bordGauche+10*this.c+this.c/2, this.bordHaut+this.c/2, 4*this.c, 2*this.c, "white");
		for(var i=0;i<Taille(coord);i++){
			for(var j=0;j<Taille(coord[i]);j++){
				RectanglePlein(3*this.bordGauche+10*this.c+this.c/2+coord[i][j]*this.c, this.bordHaut+this.c/2+i*this.c, this.c, this.c, color[block]);    
			}
		}
	};
}
