import Phaser from "phaser";
export default class HelloWorldScene extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "../public/assets/basic_grass.tmj");
    this.load.image("tiles", "../public/assets/tiles.png"); // Add this line - adjust path as needed

    this.load.spritesheet("dude", "https://labs.phaser.io/assets/sprites/dude.png", { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("default", "tiles"); // First argument should match your Tiled tileset name

    // Create layer with error checking
    const layer = map.createLayer(0, tileset, 0, 0);
    if (!layer) {
      console.error("Failed to create layer");
    }
    this.player = this.physics.add.sprite(100, 100, "dude");

    // Player animations
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "down",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Remove gravity
  }

  update() {
    if (!this.cursors || !this.player) {
      return;
    }

    // Reset velocity each frame
    this.player.setVelocity(0);

    // Grid-like movement speed
    const speed = 160;

    // Handle movement in four directions
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play("down", true);
    } else {
      this.player.anims.play("turn");
    }
  }
}
