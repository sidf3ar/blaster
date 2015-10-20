'use strict';

let keyConfig = {
  moveUp: Phaser.Keyboard.W,
  moveDown: Phaser.Keyboard.S,
  moveLeft: Phaser.Keyboard.A,
  moveRight: Phaser.Keyboard.D,

  shootUp: Phaser.Keyboard.I,
  shootDown: Phaser.Keyboard.K,
  shootLeft: Phaser.Keyboard.J,
  shootRight: Phaser.Keyboard.L,

  save: function () {
    // TODO: Get this working.
  },

  load: function () {
    // TODO: Get this working.
  },

  reset: function () {
    // TODO: Get this working.
  }
};

// Dupe as defaults for easy restting.
keyConfig.defaults = Object.assign({}, keyConfig);

export default keyConfig;