import { Weight } from "./Weight.js";

export class Seesaw {
  constructor() {
    this.BOARD_LENGTH = 400;
    this.BOARD_WIDTH = 20;
    this.MAX_TILT_ANGLE = 30;
    this.TILT_SENSITIVITY = 0.5;
    this.ANIMATION_SPEED = 0.1;

    this.FULCRUM_HEIGHT = 40;
    this.FULCRUM_WIDTH = 40;

    this.weights = [];
    this.currentAngle = 0;
    this.targetAngle = 0;
    this.centerPoint = this.BOARD_LENGTH / 2;
  }

  addWeight(x, weightValue, shouldDrop) {
    const weight = new Weight(x, weightValue, shouldDrop);
    this.weights.push(weight);

    if (shouldDrop === false) {
      this.calculateTargetAngle();
    }

    return weight;
  }

  updateWeights() {
    let needsRecalculation = false;

    for (let i = 0; i < this.weights.length; i++) {
      const weight = this.weights[i];
      const wasFalling = weight.isFalling;

      weight.update();

      if (wasFalling === true && weight.isFalling === false) {
        needsRecalculation = true;
      }
    }

    if (needsRecalculation) {
      this.calculateTargetAngle();
    }
  }

  calculateTotalMoment() {
    let totalMoment = 0;

    for (let i = 0; i < this.weights.length; i++) {
      const weight = this.weights[i];

      if (weight.isFalling === false) {
        const distance = weight.x - this.centerPoint;
        const moment = weight.weight * distance;
        totalMoment = totalMoment + moment;
      }
    }

    return totalMoment;
  }

  calculateTargetAngle() {
    const totalMoment = this.calculateTotalMoment();
    let angle = totalMoment * this.TILT_SENSITIVITY;

    if (angle > this.MAX_TILT_ANGLE) {
      angle = this.MAX_TILT_ANGLE;
    }
    if (angle < -this.MAX_TILT_ANGLE) {
      angle = -this.MAX_TILT_ANGLE;
    }

    this.targetAngle = angle;
  }

  updateAngle() {
    const difference = this.targetAngle - this.currentAngle;

    let positiveDifference = difference;
    if (difference < 0) {
      positiveDifference = difference * -1;
    }

    if (positiveDifference < 0.01) {
      this.currentAngle = this.targetAngle;
    } else {
      const change = difference * this.ANIMATION_SPEED;
      this.currentAngle = this.currentAngle + change;
    }
  }

  getLeftSideWeight() {
    let total = 0;

    for (let i = 0; i < this.weights.length; i++) {
      const weight = this.weights[i];
      if (weight.x < this.centerPoint) {
        total = total + weight.weight;
      }
    }

    return total;
  }

  getRightSideWeight() {
    let total = 0;

    for (let i = 0; i < this.weights.length; i++) {
      const weight = this.weights[i];
      if (weight.x > this.centerPoint) {
        total = total + weight.weight;
      }
    }

    return total;
  }

  reset() {
    this.weights = [];
    this.currentAngle = 0;
    this.targetAngle = 0;
  }

  draw(ctx) {
    this.drawBase(ctx);

    ctx.save();
    const angleInDegrees = this.currentAngle;
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    ctx.rotate(angleInRadians);
    this.drawBoard(ctx);

    for (let i = 0; i < this.weights.length; i++) {
      const weight = this.weights[i];
      if (weight.isFalling === false) {
        const isFalling = false;
        weight.draw(ctx, this.BOARD_LENGTH, this.BOARD_WIDTH, isFalling);
      }
    }

    ctx.restore();

    for (let i = 0; i < this.weights.length; i++) {
      const weight = this.weights[i];
      if (weight.isFalling === true) {
        const isFalling = true;
        weight.draw(ctx, this.BOARD_LENGTH, this.BOARD_WIDTH, isFalling);
      }
    }
  }

  drawBoard(ctx) {
    ctx.fillStyle = "#d19a66";
    ctx.fillRect(
      -this.BOARD_LENGTH / 2,
      -this.BOARD_WIDTH / 2,
      this.BOARD_LENGTH,
      this.BOARD_WIDTH
    );
    ctx.fillStyle = "#b67a3a";
    ctx.fillRect(-2, -this.BOARD_WIDTH / 2, 4, this.BOARD_WIDTH);

    this.drawRuler(ctx);
  }

  drawRuler(ctx) {
    const halfBoard = this.BOARD_LENGTH / 2;
    const tickY = -this.BOARD_WIDTH / 2;

    ctx.strokeStyle = "#5b4b7a";
    ctx.fillStyle = "#5b4b7a";
    ctx.font = "bold 8px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    for (let i = -200; i <= 200; i += 50) {
      const x = i;

      ctx.beginPath();
      ctx.moveTo(x, tickY);

      let tickHeight = 4;
      if (i === 0) {
        tickHeight = 6;
      }

      ctx.lineTo(x, tickY - tickHeight);
      ctx.lineWidth = 1;
      ctx.stroke();

      if (i !== 0) {
        let label = i;
        if (i < 0) {
          label = i * -1;
        }
        ctx.fillText(label + "", x, tickY - tickHeight - 2);
      }
    }
  }

  drawBase(ctx) {
    ctx.fillStyle = "#5b4b7a";
    ctx.beginPath();

    const topY = this.BOARD_WIDTH / 2;
    ctx.moveTo(0, topY);

    const bottomY = topY + this.FULCRUM_HEIGHT;
    const leftX = -this.FULCRUM_WIDTH / 2;
    const rightX = this.FULCRUM_WIDTH / 2;

    ctx.lineTo(leftX, bottomY);
    ctx.lineTo(rightX, bottomY);
    ctx.closePath();
    ctx.fill();
  }
}
