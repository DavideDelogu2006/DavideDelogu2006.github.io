class Nuvole {
    constructor(x, y, xVel) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.imgWidth = 80; // Larghezza dell'immagine dello scheletro
        this.imgHeight = 70; // Altezza dell'immagine dello scheletro
    }

    movimento() {
        // Aggiornamento delle posizioni
        this.x -= this.xVel;

        // Controllo se è completamente fuori schermo, se sì, lo rimuovo
        if (this.x < -100) {
            nuvole.splice(nuvole.indexOf(this), 1);
        }
    }

    display() {
        fill(250);
        noStroke();
        ellipse(this.x, this.y, 70, 50);
        ellipse(this.x + 10, this.y + 10, 70, 50);
        ellipse(this.x - 20, this.y + 10, 70, 50);
    }
}