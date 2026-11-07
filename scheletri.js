class Scheletri {
  constructor(x, y, xVel) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.imgWidth = 65;  // dimensioni disegnate
    this.imgHeight = 70;
  }

  movimento() {
    this.x -= this.xVel;
  }

  // Hitbox leggermente piu' piccola dello sprite
  hitbox() {
    return { l: this.x + 10, r: this.x + this.imgWidth - 10, t: this.y + 14, b: this.y + this.imgHeight - 8 };
  }

  display() {
    image(imgLarry, this.x, this.y, this.imgWidth, this.imgHeight);
    if (debugHitbox) disegnaHitbox(this.hitbox());
  }
}
