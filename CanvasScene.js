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
    this.updateDashboard();
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
    this.updateDashboard();
  }

  updateDashboard() {
    this.updateLeftWeight();
    this.updateRightWeight();
    this.updateNextWeight();
    this.updateAngle();
  }

  updateLeftWeight() {
    const element = document.getElementById("leftWeight");
    if (!element) return;

    const weight = this.seesaw.getLeftSideWeight();
    const roundedWeight = weight.toFixed(1);
    element.textContent = roundedWeight + " kg";
  }

  updateRightWeight() {
    const element = document.getElementById("rightWeight");
    if (!element) return;

    const weight = this.seesaw.getRightSideWeight();
    const roundedWeight = weight.toFixed(1);
    element.textContent = roundedWeight + " kg";
  }

  updateNextWeight() {
    const element = document.getElementById("nextWeight");
    if (!element) return;

    element.textContent = this.nextWeight + " kg";
  }

  updateAngle() {
    const element = document.getElementById("tiltAngle");
    if (!element) return;

    const angle = this.seesaw.currentAngle;
    const roundedAngle = angle.toFixed(1);
    element.textContent = roundedAngle + "°";
  }

  startAnimationLoop() {
    const loop = () => {
      this.seesaw.updateWeights();
      this.seesaw.updateAngle();
      this.render();
      this.updateDashboard();
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
