PLAYER_SIZE = 20;

class Player {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(3, -2);
    this.position = createVector(0, 0);
    this.pixelPos = createVector(0, 0);
    this.maxspeed = 3;
    this.maxforce = 0.15;
  }
    
  run() {
    this.update();
    this.draw();
  }
    
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    
    this.pixelPos.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  arrive(target) {
    let desired = p5.Vector.sub(target, this.pixelPos);
    let d = desired.mag();
    desired.normalize();
    
    if (d < 100) { 
      let m = map(d, 0, 100, 0, this.maxspeed);
      desired.mult(m);
    } else { 
      desired.mult(this.maxspeed);
    }
    
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
 
  draw() {
    fill('red');
    ellipse(this.pixelPos.y, this.pixelPos.y, PLAYER_SIZE);
  }
  
  spawn(grid) {
    while (true) {
      this.position.x = int(random(grid.rows));
      this.position.y = int(random(grid.columns));
      if (grid.cells[this.position.x][this.position.y].kind != WALL) {
        let _x = grid.OFFSET_X + this.position.x * CELL_SIZE;
        let _y = grid.OFFSET_Y + this.position.y * CELL_SIZE;
        this.pixelPos = createVector(_x, _y);
        return 0;
      }
    }
  }
}
