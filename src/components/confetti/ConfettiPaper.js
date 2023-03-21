import Vector2 from "./Vector2";

const DEG_TO_RAD = Math.PI / 180;

export default class ConfettiPaper {
  constructor(x, y, frontImage, backImage, size = 10) {
    this.position = new Vector2(x, y);
    this.basePosition = new Vector2(x, y);
    this.rotationSpeed = (Math.random() * 600 + 800);
    this.angle = DEG_TO_RAD * Math.random() * 360;
    this.rotation = Math.random() * 360;
    this.cosA = 1.0;
    this.size = size;
    this.oscillationSpeed = (Math.random() * 1.75 + 0.5);
    this.oscillationAmplitude = 60.0;
    this.speedY = (Math.random() * 60 + 50.0);
    this.movementOffset = Math.random();
    this.active = true;

    this.frontImage = this.MakeImage(frontImage);
    this.backImage = this.MakeImage(backImage);
  }

  MakeImage(src) {
    const image = new Image();
    image.src = src;
    return image;
  }

  Update(time, respawn = true) {
    if(!respawn && !this.active) {
      return;
    }

    this.active = true;

    this.rotation = (this.rotationSpeed * time + this.movementOffset * 360) % 360;
    this.cosA = Math.cos(DEG_TO_RAD * this.rotation);
    this.position.x = this.basePosition.x + Math.cos(time * this.oscillationSpeed + this.movementOffset * 2 * Math.PI) * this.oscillationAmplitude;
    const newY = (this.basePosition.y + this.speedY * time) % ConfettiPaper.bounds.y;

    // If newY is smaller than current y, it 'respawned'
    if (!respawn && newY < this.position.y) {
      this.active = false;
      return;
    }

    this.position.y = newY;
  }

  Draw (context) {
    if(!this.active) {
      return;
    }

    if (this.cosA > 0) {
      context.drawImage(this.frontImage, ~~this.position.x, ~~this.position.y, ~~this.size, ~~(this.size * Math.abs(this.cosA)))
    } else {
      context.drawImage(this.backImage, ~~this.position.x, ~~this.position.y, ~~this.size, ~~(this.size * Math.abs(this.cosA)))
    }

    context.save();
    context.translate(~~this.position.x, ~~this.position.y);
    context.rotate(this.angle);
    context.restore();
  }
}