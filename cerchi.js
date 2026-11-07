// Asteroidi del livello 1.
// Posizione = CENTRO (cx, cy). L'hitbox e' un cerchio di raggio r centrato sull'asteroide,
// quindi coincide con quello che si vede (prima la collisione era calcolata sull'angolo in alto a sinistra).
class Cerchi {
  constructor(cx, cy, xVel, yVel) {
    this.cx = cx;
    this.cy = cy;
    this.xVel = xVel;
    this.yVel = yVel;
    this.w = 96;  // dimensioni disegnate (stesse proporzioni dell'immagine originale 360x271)
    this.h = 72;
    this.r = 34;  // raggio hitbox (un filo piu' piccolo dello sprite: il giocatore sfiora senza perdere)
    this.entrato = false; // true quando e' completamente entrato nello schermo da sinistra
    this.angolo = random(TWO_PI);
    this.rotazione = random(-0.025, 0.025);
  }

  movimento() {
    this.cx += this.xVel;
    this.cy += this.yVel;
    this.angolo += this.rotazione;

    if (!this.entrato && this.cx - this.r > 0) this.entrato = true;

    // Rimbalzo sui bordi (a sinistra solo dopo essere entrato)
    if (this.entrato) {
      if (this.cx - this.r < 0) { this.cx = this.r; this.xVel = Math.abs(this.xVel); }
    }
    if (this.cx + this.r > width) { this.cx = width - this.r; this.xVel = -Math.abs(this.xVel); }
    if (this.cy - this.r < 0) { this.cy = this.r; this.yVel = Math.abs(this.yVel); }
    if (this.cy + this.r > height) { this.cy = height - this.r; this.yVel = -Math.abs(this.yVel); }
  }

  display() {
    push();
    translate(this.cx, this.cy);
    rotate(this.angolo);
    imageMode(CENTER);
    image(imgAsteroide, 0, 0, this.w, this.h);
    pop();
    if (debugHitbox) {
      push();
      noFill(); stroke(255, 0, 0); strokeWeight(2);
      ellipse(this.cx, this.cy, this.r * 2);
      pop();
    }
  }
}

// Urti elastici tra asteroidi (massa uguale): si scambiano la componente di velocita' lungo la normale
function risolviUrtiAsteroidi() {
  for (let i = 0; i < cerchi.length; i++) {
    for (let j = i + 1; j < cerchi.length; j++) {
      let a = cerchi[i], b = cerchi[j];
      if (!a.entrato || !b.entrato) continue;
      let dx = b.cx - a.cx, dy = b.cy - a.cy;
      let d = Math.sqrt(dx * dx + dy * dy);
      let minD = a.r + b.r;
      if (d > 0 && d < minD) {
        let nx = dx / d, ny = dy / d;
        let rel = (a.xVel - b.xVel) * nx + (a.yVel - b.yVel) * ny;
        if (rel > 0) { // si stanno avvicinando
          a.xVel -= rel * nx; a.yVel -= rel * ny;
          b.xVel += rel * nx; b.yVel += rel * ny;
        }
        let spinta = (minD - d) / 2; // li separo per evitare che restino incollati
        a.cx -= nx * spinta; a.cy -= ny * spinta;
        b.cx += nx * spinta; b.cy += ny * spinta;
      }
    }
  }
}
