function Score() {
  this.data = JSON.parse(readFile("data/score.json")); // Liste de pieces
  this.read = function() {
    for (var i = 0; i < Taille(this.data); i++) {
      Ecrire(this.data[i].pseudo + " : " + this.data[i].score);
    }
  };
  this.add = function(name, score) {
    for (var i = Taille(this.data) - 1; i >= 0; i--) {
      if (this.data[i].score > score) {
        this.data.push({
          "pseudo": name,
          "score": score
        });
        this.data.sort(function(key1, key2) {
          return key1.score < key2.score;
        });
        this.data.pop();
        writeFile("data/score.json", JSON.stringify(this.data));
        return true;
      }
    }
  };
}
