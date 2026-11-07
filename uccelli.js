class Uccelli {
  constructor(x, y, xVel) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.imgWidth = 70;  // dimensioni disegnate
    this.imgHeight = 80;
  }

  movimento() {
    this.x -= this.xVel;
  }

  // Hitbox leggermente piu' piccola dello sprite
  hitbox() {
    return { l: this.x + 12, r: this.x + this.imgWidth - 12, t: this.y + 18, b: this.y + this.imgHeight - 18 };
  }

  display() {
    image(imgUccello, this.x, this.y, this.imgWidth, this.imgHeight);
    if (debugHitbox) disegnaHitbox(this.hitbox());
  }
}
