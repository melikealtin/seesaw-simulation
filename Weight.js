export class Weight {
  constructor(x, weightValue, startFromTop) {
    this.radius = 20;
    this.x = x;
    this.weight = weightValue;
    this.id = Date.now() + Math.random();
    this.color = this.getColor(weightValue);

    this.isFalling = startFromTop;

    if (startFromTop === true) {
      this.currentY = -200;
    } else {
      this.currentY = -45;
    }

    this.restingY = -45;
    this.fallSpeed = 5;
  }

  getColor(weightValue) {
    const colors = [
      "#ff6f91",
      "#ff8aa6",
      "#c9b9ff",
      "#7a6f9b",
      "#5b4b7a",
      "#3c3a4a",
      "#36334a",
      "#2a2538",
      "#d89b3a",
      "#6aa38f",
    ];

    const index = weightValue - 1;
    const maxIndex = colors.length - 1;

    if (index < 0) {
      return colors[0];
    }
    if (index > maxIndex) {
      return colors[0];
    }

    return colors[index];
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

      if (drawY > -40) {
        return;
      }
    } else {
      const halfWidth = boardWidth / 2;
      const offset = 5;
      drawY = -halfWidth - this.radius - offset;
    }

    ctx.fillStyle = this.color;
    ctx.beginPath();
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    ctx.arc(relativeX, drawY, this.radius, startAngle, endAngle);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const text = this.weight + "kg";
    ctx.fillText(text, relativeX, drawY);
  }
}
