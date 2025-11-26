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
      "#2C3E50",
      "#E74C3C",
      "#E67E22",
      "#F39C12",
      "#27AE60",
      "#3498DB",
      "#9B59B6",
      "#D35400",
      "#F1C40F",
      "#34495E",
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
