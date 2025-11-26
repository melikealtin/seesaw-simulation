export class Weight {
  constructor(x, weightValue, startFromTop) {
    this.radius = 20;
    this.x = x;
    this.weight = weightValue;

    this.isFalling = startFromTop;

    if (startFromTop === true) {
      this.currentY = -200;
    } else {
      this.currentY = -45;
    }

    this.restingY = -45;
    this.fallSpeed = 5;
  }

  update() {
    if (this.isFalling === true) {
      this.currentY = this.currentY + this.fallSpeed;

      if (this.currentY >= this.restingY) {
        this.currentY = this.restingY;
        this.isFalling = false;
      }
    }
  }

  draw(ctx, boardLength, boardWidth, isFalling) {
    const halfBoard = boardLength / 2;
    const relativeX = this.x - halfBoard;

    let drawY;

    if (isFalling === true) {
      drawY = this.currentY;
    } else {
      const halfWidth = boardWidth / 2;
      const offset = 5;
      drawY = -halfWidth - this.radius - offset;
    }

    ctx.fillStyle = "#3498DB";
    ctx.beginPath();
    ctx.arc(relativeX, drawY, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const text = this.weight + "kg";
    ctx.fillText(text, relativeX, drawY);
  }
}
