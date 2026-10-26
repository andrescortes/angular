import { afterNextRender, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import { 
  Engine, 
  Scene, 
  FreeCamera, 
  MeshBuilder, 
  HemisphericLight, 
  Vector3, 
  Color3, 
  StandardMaterial,
  Mesh
} from '@babylonjs/core';

@Component({
  selector: 'app-basic',
  imports: [],
  templateUrl: './basic.html',
  styleUrl: './basic.css',
})
export class Basic implements OnDestroy {
  canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>("renderCanvas");
  private engine!: Engine;
  private scene!: Scene;
  private obstacles: Mesh[] = [];
  private player!: Mesh;
  private playerVelocity = new Vector3(0, 0, 0);
  private isGrounded = false;
  private readonly GRAVITY = -0.015;
  private readonly JUMP_FORCE = 0.15;
  private readonly WALK_SPEED = 0.15;

  constructor() {
    afterNextRender(() => {
      const canvasEl = this.canvasRef().nativeElement;
      if (canvasEl) {
        this.initBabylon(canvasEl);
      }
    });
  }

  private initBabylon(canvas: HTMLCanvasElement): void {
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);

    // 1. Camera (Follows the player)
    const camera = new FreeCamera("fpsCamera", new Vector3(0, 2, -10), this.scene);
    camera.attachControl(canvas, false);
    camera.angularSensibility = 1000;

    // Pointer Lock
    canvas.addEventListener('click', () => {
      canvas.requestPointerLock();
    });

    // 2. Light
    const light = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);
    light.intensity = 0.7;

    // 3. Environment
    // Ground
    const ground = MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, this.scene);
    const groundMat = new StandardMaterial("groundMat", this.scene);
    groundMat.diffuseColor = new Color3(0.1, 0.1, 0.1);
    ground.material = groundMat;

    // Obstacles (Boxes)
    for (let i = 0; i < 20; i++) {
      const box = MeshBuilder.CreateBox(`box_${i}`, { size: 2 }, this.scene);
      box.position = new Vector3(
        Math.random() * 60 - 30,
        1,
        Math.random() * 60 - 30
      );
      const boxMat = new StandardMaterial(`boxMat_${i}`, this.scene);
      boxMat.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());
      box.material = boxMat;
      this.obstacles.push(box);
    }

    // 4. Player (Physical Sphere)
    this.player = MeshBuilder.CreateSphere("player", { diameter: 2 }, this.scene) as Mesh;
    this.player.position = new Vector3(0, 5, 0);
    this.player.isVisible = false; // Invisible player

    // 5. Input Handling
    const keys: Record<string, boolean> = {};
    window.addEventListener('keydown', (e) => keys[e.code] = true);
    window.addEventListener('keyup', (e) => keys[e.code] = false);

    // 6. Physics & Movement Loop
    this.scene.beforeRender = () => {
      // --- Movement (WASD) ---
      const moveDir = new Vector3(0, 0, 0);
      const forward = camera.getDirection(Vector3.Forward());
      const right = camera.getDirection(Vector3.Right());
      
      forward.y = 0;
      right.y = 0;
      forward.normalize();
      right.normalize();

      if (keys['KeyW']) moveDir.addInPlace(forward.scale(this.WALK_SPEED));
      if (keys['KeyS']) moveDir.addInPlace(forward.scale(-this.WALK_SPEED));
      if (keys['KeyA']) moveDir.addInPlace(right.scale(-this.WALK_SPEED));
      if (keys['KeyD']) moveDir.addInPlace(right.scale(this.WALK_SPEED));

      // --- Gravity ---
      this.playerVelocity.y += this.GRAVITY;

      // --- Jump ---
      if (keys['Space'] && this.isGrounded) {
        this.playerVelocity.y = this.JUMP_FORCE;
        this.isGrounded = false;
      }

      // Apply movement and gravity
      this.player.position.addInPlace(moveDir);
      this.player.position.addInPlace(this.playerVelocity);

      // --- Collision Detection ---
      this.isGrounded = false;

      // 1. Ground Collision
      if (this.player.position.y <= 1) { // 1 is half diameter of player
        this.player.position.y = 1;
        this.playerVelocity.y = 0;
        this.isGrounded = true;
      }

      // 2. Obstacle Collision
      for (const obstacle of this.obstacles) {
        const dist = Vector3.Distance(this.player.position, obstacle.position);
        const minSafeDist = 1.5; // radius of player + half size of box
        
        if (dist < minSafeDist) {
          const direction = this.player.position.subtract(obstacle.position).normalize();
          this.player.position = obstacle.position.add(direction.scale(minSafeDist));
        }
      }

      // 3. Boundary Collision
      const limit = 49;
      if (Math.abs(this.player.position.x) > limit) this.player.position.x = Math.sign(this.player.position.x) * limit;
      if (Math.abs(this.player.position.z) > limit) this.player.position.z = Math.sign(this.player.position.z) * limit;

      // --- Sync Camera to Player ---
      camera.position = this.player.position;
    };

    // 7. Render Loop
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    // 8. Resize handling
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }

  ngOnDestroy(): void {
    if (this.engine) {
      this.engine.dispose();
    }
  }
}
