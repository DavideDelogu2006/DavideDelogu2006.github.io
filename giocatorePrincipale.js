class Giocatore {
  constructor(sizey, sizex, y) {
    this.x = 300;
    this.y = y;
    this.sizex = sizex;
    this.sizey = sizey;
    this.numeroSalti = 0;
  }

  mostraMovimentoDestra() {
    image(imgGiocatore, this.x, this.y, this.sizex, this.sizey);
  }

  mostraFermoDestra() {
    image(imgGiocatoreFermoDestra, this.x, this.y, 85, 85);
  }

  mostraLupo(){
    image(imgLupo, this.x - 100, this.y, this.sizex, this.sizey);
  }

  salto() {
    if (jump) { //se jump=true
      if (puoSaltare) { // e se nsalti<2
        this.y += ySpeed; //Faccio salatare
      }
      if (this.y < height - 290) { //Poi faccio scendere verso la posizione inizale
        ySpeed += GRAVITA; //Gravità
      } else { //Quando tocca il terreno
        this.y = height - 290;
        puoSaltare = true;
        this.numeroSalti = 0;
      }
      this.mostraFermoDestra(); //Quando salta mostro l'immagine ferma

      if (this.y >= height - 290) { //Quando tocca
        jump = false;
      }
    } else { //Quando tocca mostra la corsa
      this.mostraMovimentoDestra();
    }
  }

  // Hitbox del giocatore (leggermente piu' piccola dello sprite, come Dino Run)
  hitbox() {
    return { l: this.x + HIT_G_X, r: this.x + this.sizex - HIT_G_X, t: this.y + HIT_G_Y, b: this.y + this.sizey - HIT_G_Y };
  }

  controllaCollisione(nemici) {
    let g = this.hitbox();
    if (debugHitbox) disegnaHitbox(g);
    for (let i = 0; i < nemici.length; i++) {
      let n = nemici[i].hitbox();
      if (g.r > n.l && g.l < n.r && g.b > n.t && g.t < n.b) {
        livello = 5; // Game over
        return;
      }
    }
  }
}
