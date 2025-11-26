import { Weight } from "./Weight.js";
import { Seesaw } from "./Seesaw.js";

export class CanvasScene {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");

    this.nextWeight = this.getRandomWeight();
    this.logs = [];

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.seesaw = new Seesaw();

    this.loadSavedState();
    this.setupClickListener();
    this.startAnimationLoop();
  }

  getRandomWeight() {
    const random = Math.random() * 10;
    const weight = Math.floor(random) + 1;
    return weight;
  }

  setupClickListener() {
    const self = this;
    this.canvas.addEventListener("click", function (event) {
      self.handleClick(event);
    });
  }

  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const scaleX = this.canvas.width / rect.width;
    const adjustedX = clickX * scaleX;

    const halfBoard = this.seesaw.BOARD_LENGTH / 2;
    const boardX = adjustedX - this.centerX + halfBoard;

    if (boardX < 0) {
      return;
    }
    if (boardX > this.seesaw.BOARD_LENGTH) {
      return;
    }

    this.seesaw.addWeight(boardX, this.nextWeight, true);

    let side = "left";
    if (boardX > this.seesaw.centerPoint) {
      side = "right";
    }

    const distance = boardX - this.seesaw.centerPoint;
    let positiveDistance = distance;
    if (distance < 0) {
      positiveDistance = distance * -1;
    }
    const roundedDistance = Math.round(positiveDistance);

    const message =
      this.nextWeight + "kg on " + side + ", " + roundedDistance + "px";
    this.addLog(message);

    this.nextWeight = this.getRandomWeight();
    this.updateDashboard();
    this.saveState();
  }

  addLog(message) {
    this.logs.unshift(message);

    if (this.logs.length > 10) {
      this.logs.pop();
    }

    const logContainer = document.getElementById("logContainer");
    if (!logContainer) {
      return;
    }

    let html = "";
    for (let i = 0; i < this.logs.length; i++) {
      html = html + '<div class="log-item">' + this.logs[i] + "</div>";
    }
    logContainer.innerHTML = html;
  }

  updateDashboard() {
    this.updateLeftWeight();
    this.updateRightWeight();
    this.updateNextWeight();
    this.updateAngle();
  }

  updateLeftWeight() {
    const element = document.getElementById("leftWeight");
    if (element === null) {
      return;
    }
    const weight = this.seesaw.getLeftSideWeight();
    const roundedWeight = weight.toFixed(1);
    const text = roundedWeight + " kg";
    element.textContent = text;
  }

  updateRightWeight() {
    const element = document.getElementById("rightWeight");
    if (element === null) {
      return;
    }
    const weight = this.seesaw.getRightSideWeight();
    const roundedWeight = weight.toFixed(1);
    const text = roundedWeight + " kg";
    element.textContent = text;
  }

  updateNextWeight() {
    const element = document.getElementById("nextWeight");
    if (element === null) {
      return;
    }
    const text = this.nextWeight + " kg";
    element.textContent = text;
  }

  updateAngle() {
    const element = document.getElementById("tiltAngle");
    if (element === null) {
      return;
    }
    const angle = this.seesaw.currentAngle;
    const roundedAngle = angle.toFixed(1);
    const text = roundedAngle + "°";
    element.textContent = text;
  }

  saveState() {
    const weightsData = [];

    for (let i = 0; i < this.seesaw.weights.length; i++) {
      const currentWeight = this.seesaw.weights[i];
      const weightData = {
        x: currentWeight.x,
        weight: currentWeight.weight,
        id: currentWeight.id,
        color: currentWeight.color,
      };
      weightsData.push(weightData);
    }

    const state = {
      weights: weightsData,
      nextWeight: this.nextWeight,
      logs: this.logs,
    };

    const stateString = JSON.stringify(state);
    localStorage.setItem("seesaw_state", stateString);
  }

  loadSavedState() {
    const savedString = localStorage.getItem("seesaw_state");

    if (savedString === null) {
      return;
    }

    const state = JSON.parse(savedString);

    if (state.weights) {
      for (let i = 0; i < state.weights.length; i++) {
        const savedWeight = state.weights[i];
        const weight = new Weight(savedWeight.x, savedWeight.weight, false);
        weight.id = savedWeight.id;
        weight.color = savedWeight.color;
        this.seesaw.weights.push(weight);
      }
    }

    this.seesaw.calculateTargetAngle();
    this.seesaw.currentAngle = this.seesaw.targetAngle;

    if (state.nextWeight) {
      this.nextWeight = state.nextWeight;
    }

    if (state.logs) {
      this.logs = state.logs;
    }

    this.updateDashboard();
  }

  resetSimulation() {
    this.seesaw.reset();
    this.logs = [];
    this.nextWeight = this.getRandomWeight();
    this.clearLogs();
    this.updateDashboard();
    this.saveState();
  }

  clearLogs() {
    const logContainer = document.getElementById("logContainer");
    if (logContainer === null) {
      return;
    }
    logContainer.innerHTML = "";
  }

  startAnimationLoop() {
    const self = this;

    function loop() {
      self.seesaw.updateWeights();
      self.seesaw.updateAngle();
      self.render();
      self.updateDashboard();
      requestAnimationFrame(loop);
    }

    loop();
  }

  render() {
    const x = 0;
    const y = 0;
    const width = this.width;
    const height = this.height;
    this.ctx.clearRect(x, y, width, height);

    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.seesaw.draw(this.ctx);
    this.ctx.restore();
  }
}
