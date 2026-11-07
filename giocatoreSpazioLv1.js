// Giocatore del livello 1 (spazio): segue il mouse.
// Lo sprite e' 458x544 (rapporto 0.84), prima veniva disegnato 60x60 e quindi deformato.
// Il corpo dell'hog (senza martello) sta nella parte destra dello sprite: l'hitbox e'
// un'ellisse centrata sul corpo e il mouse controlla il centro del corpo.
class GiocatoreSpazioLv1 {

    constructor(sizey, sizex) {
        this.sizex = sizex;
        this.sizey = sizey;
        this.x = 0; // angolo in alto a sinistra dello sprite (per il disegno)
        this.y = 0;
        // centro e semiassi dell'hitbox (corpo)
        this.offX = 0.66 * sizex;
        this.offY = 0.50 * sizey;
        this.rx = 0.25 * sizex;
        this.ry = 0.40 * sizey;
        this.cx = width / 2;
        this.cy = height / 2;
    }

    movimento() {
        // Il centro del corpo segue il mouse e non esce dal canvas
        this.cx = constrain(mouseX, this.rx, width - this.rx);
        this.cy = constrain(mouseY, this.ry, height - this.ry);
        this.x = this.cx - this.offX;
        this.y = this.cy - this.offY;
    }

    // Collisione ellisse (giocatore) - cerchio (asteroide): approssimazione con somma dei raggi
    collide(ast) {
        let nx = (ast.cx - this.cx) / (this.rx + ast.r);
        let ny = (ast.cy - this.cy) / (this.ry + ast.r);
        return nx * nx + ny * ny < 1;
    }

    display() {
        image(imgHogSpazio, this.x, this.y, this.sizex, this.sizey);
        if (debugHitbox) {
            push();
            noFill(); stroke(0, 255, 0); strokeWeight(2);
            ellipse(this.cx, this.cy, this.rx * 2, this.ry * 2);
            pop();
        }
    }
}
