document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("seesawCanvas");

  if (!canvas) {
    console.error("canvas element not found");
    return;
  }

  const ctx = canvas.getContext("2d");

  ctx.font = "20px Arial";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    "seesaw simulation will be here",
    canvas.width / 2,
    canvas.height / 2
  );
});
