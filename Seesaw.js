export class Seesaw {
  constructor() {
    this.BOARD_LENGTH = 400;
    this.BOARD_WIDTH = 10;
  }

  draw(ctx) {
    ctx.fillStyle = "#5D4037";

    const x = -this.BOARD_LENGTH / 2;
    const y = -this.BOARD_WIDTH / 2;

    ctx.fillRect(x, y, this.BOARD_LENGTH, this.BOARD_WIDTH);
  }
}
