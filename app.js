import { CanvasScene } from "./CanvasScene.js";

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("seesawCanvas");

  if (!canvas) {
    console.error("Canvas bulunamadı!");
    return;
  }

  const scene = new CanvasScene(canvas);

  const resetButton = document.getElementById("resetBtn");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      scene.resetSimulation();
    });
  }
});
