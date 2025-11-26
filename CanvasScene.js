import { Seesaw } from "./Seesaw.js";

export class CanvasScene {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.seesaw = new Seesaw();

    this.nextWeight = this.getRandomWeight();

    this.setupClickListener();
    this.startAnimationLoop();
  }

  getRandomWeight() {
    const random = Math.random() * 10;
    const weight = Math.floor(random) + 1;
    return weight;
  }

  setupClickListener() {
    this.canvas.addEventListener("click", (event) => {
      this.handleClick(event);
    });
  }

  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const scaleX = this.canvas.width / rect.width;
    const adjustedX = clickX * scaleX;

    const halfBoard = this.seesaw.BOARD_LENGTH / 2;

    const boardX = adjustedX - this.centerX + halfBoard;

    if (boardX < 0 || boardX > this.seesaw.BOARD_LENGTH) {
      return;
    }

    this.seesaw.addWeight(boardX, this.nextWeight, true);

    this.nextWeight = this.getRandomWeight();
  }

  startAnimationLoop() {
    const loop = () => {
      this.seesaw.updateWeights();
      this.render();
      requestAnimationFrame(loop);
    };

    loop();
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);

    this.seesaw.draw(this.ctx);

    this.ctx.restore();
  }
}
