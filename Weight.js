export class Weight {
  constructor(x, weightValue, startFromTop) {
    this.x = x;
    this.weight = weightValue;
    this.isFalling = startFromTop;

    this.currentY = -50;
    this.radius = 20;
  }

  update() {}

  draw(ctx) {}
}
