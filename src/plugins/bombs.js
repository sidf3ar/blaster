const NUM_FRAMES = 200;
const SIZE = 400;

export default class Bombs {
  constructor(game) {
    this.game = game;
    game.bombs = this;

    this.currentFrame = 0;
    this.lastFrameMS = 0;
    this.booming = false;
    this.bombFrames = [];
    // Generate shockwave frames.
    let k = 0;
    for (let i = 0; i < NUM_FRAMES; i++) {
      let frame = this.game.make.bitmapData(SIZE, SIZE);
      if (i < NUM_FRAMES / 2) {
        let scale = 1 + (i / 10);
        frame.context.strokeStyle = '#ffff00';
        frame.context.beginPath();
        frame.context.arc(SIZE / 2, SIZE / 2, 16 + i, 0, Math.PI * 2);
        frame.context.stroke();
      }
      for (let j = i - 1; j > i - 5; j--) {
        let innerFrame = this.bombFrames[j];
        frame.copy(innerFrame, 0, 0, SIZE, SIZE, 0, 0, SIZE, SIZE, 0, 0, 0, 1, 1, 0.21, 'overlay');
      }
      this.bombFrames.push(frame);
    }
  }

  boom(x, y) {
    this.booming = true;
    this.x = x;
    this.y = y;
    this.lastFrameMS = this.game.time.time;
    this.game.enemiesGroup.forEach(this.bombEnemy, this);
  }

  bombEnemy(enemy) {
    if (!enemy.alive) {
      return;
    }
    // If enemy within danger zone, insta-death.
    if (enemy.position.distance(this.game.player) < 100) {
      enemy.damage(100);
    }
  }

  update() {
    // TODO: Cooldown!
    // TODO: Expanding range of death!
    // TODO: Block bullets!
    // TODO: Shove enemies!
  }

  render() {
    if (this.booming) {
      this.game.context.drawImage(this.bombFrames[this.currentFrame].canvas, this.x - SIZE / 2, this.y - SIZE / 2);
      let delta = this.game.time.time - this.lastFrameMS;
      this.lastFrameMS = this.game.time.time;
      this.currentFrame += Math.round(delta / 16);
      if (this.currentFrame >= this.bombFrames.length) {
        this.booming = false;
        this.currentFrame = 0;
      }
    }
  }
}
