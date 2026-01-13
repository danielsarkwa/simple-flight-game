import { Group, Vector3 } from '../../libs/three137/three.module.js';
import { GLTFLoader } from '../../libs/three137/GLTFLoader.js';

class Obstacles {
  constructor(game) {
    this.assetsPath = game.assetsPath;
    this.loadingBar = game.loadingBar;
    this.game = game;
    this.scene = game.scene;
    this.loadStar();
    this.loadBomb();
    this.tmpPos = new Vector3();
  }

  loadStar() {
    const loader = new GLTFLoader().setPath(`${this.assetsPath}plane/`);
    this.ready = false;

    // Load a glTF resource
    loader.load(
      // resource URL
      'star.glb',
      // called when the resource is loaded
      (gltf) => {
        this.star = gltf.scene.children[0];

        this.star.name = 'star';

        if (this.bomb !== undefined) this.initialize();
      },
      // called while loading is progressing
      (xhr) => {
        this.loadingBar.update('star', xhr.loaded, xhr.total);
      },
      // called when loading has errors
      (err) => {
        console.error(err);
      }
    );
  }

  loadBomb() {
    const loader = new GLTFLoader().setPath(`${this.assetsPath}plane/`);

    // Load a glTF resource
    loader.load(
      // resource URL
      'bomb.glb',
      // called when the resource is loaded
      (gltf) => {
        this.bomb = gltf.scene.children[0];

        if (this.star !== undefined) this.initialize();
      },
      // called while loading is progressing
      (xhr) => {
        this.loadingBar.update('bomb', xhr.loaded, xhr.total);
      },
      // called when loading has errors
      (err) => {
        console.error(err);
      }
    );
  }

  initialize() {
    this.obstacles = [];

    const obstacle = new Group();

    obstacle.add(this.star);

    this.bomb.rotation.x = -Math.PI * 0.5; // rotate first bomb by 90deg
    this.bomb.position.y = 7.5; // position first bomb at the top
    obstacle.add(this.bomb);

    let rotate = true;

    for (let y = 7.5; y > -8; y -= 2.5) {
      // start at 7.5 position and decreate by an interval of 2.5 when generating the bomb
      rotate = !rotate;
      if (y == 0) continue; // skip the loop because the star is at point zero
      const bomb = this.bomb.clone(); // create a new mesh object
      bomb.rotation.x = rotate ? -Math.PI * 0.5 : 0; // add rotation based on the position for the bomb
      bomb.position.y = y;
      obstacle.add(bomb);
    }
    this.obstacles.push(obstacle);

    this.scene.add(obstacle);

    for (let i = 0; i < 3; i++) {
      const obstacle1 = obstacle.clone();

      this.scene.add(obstacle1);
      this.obstacles.push(obstacle1);
    }

    this.reset();

    this.ready = true;
  }

  reset() {
    this.obstacleSpawn = { pos: 20, offset: 5 };
    this.obstacles.forEach((obstacle) => this.respawnObstacle(obstacle));
  }

  respawnObstacle(obstacle) {
    this.obstacleSpawn.pos += 30;
    const offset = (Math.random() * 2 - 1) * this.obstacleSpawn.offset;
    this.obstacleSpawn.offset += 0.2;
    obstacle.position.set(0, offset, this.obstacleSpawn.pos);
    obstacle.children[0].rotation.y = Math.random() * Math.PI * 2;
    obstacle.userData.hit = false;
    obstacle.children.forEach((child) => {
      child.visible = true;
    });
  }

  update(pos) {}

  hit(obj) {}
}

export { Obstacles };
