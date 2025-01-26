import Phaser from "phaser";

import HelloWorldScene from "./HelloWorldScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 600,
  backgroundColor: "#2d2d2d",
  pixelArt: true,

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [HelloWorldScene],
};

export default new Phaser.Game(config);

