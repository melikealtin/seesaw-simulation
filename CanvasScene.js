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

    this.startAnimationLoop();
  }

  startAnimationLoop() {
    const loop = () => {
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
