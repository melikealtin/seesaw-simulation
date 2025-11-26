import { Weight } from "./Weight.js";

export class Seesaw {
  constructor() {
    this.BOARD_LENGTH = 400;
    this.BOARD_WIDTH = 20;

    this.weights = [];
  }

  addWeight(x, weightValue, shouldDrop) {
    const weight = new Weight(x, weightValue, shouldDrop);
    this.weights.push(weight);
    return weight;
  }

  updateWeights() {
    for (let i = 0; i < this.weights.length; i++) {
      const weight = this.weights[i];
      weight.update();
    }
  }

  draw(ctx) {
    this.drawBoard(ctx);

    for (let i = 0; i < this.weights.length; i++) {
      const weight = this.weights[i];
      const isFalling = weight.isFalling === true;
      weight.draw(ctx, this.BOARD_LENGTH, this.BOARD_WIDTH, isFalling);
    }
  }

  drawBoard(ctx) {
    ctx.fillStyle = "#5D4037";

    const x = -this.BOARD_LENGTH / 2;
    const y = -this.BOARD_WIDTH / 2;

    ctx.fillRect(x, y, this.BOARD_LENGTH, this.BOARD_WIDTH);
  }
}
