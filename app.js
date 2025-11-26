import { CanvasScene } from "./CanvasScene.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("seesawCanvas");

  if (!canvas) {
    console.error("canvas element not found");
    return;
  }

  const scene = new CanvasScene(canvas);
});
