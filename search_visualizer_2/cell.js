WALL = 0;
GROUND = 1;
SLOWGROUND = 2;
VERYSLOWGROUND = 3;

CELL_SIZE = 25;

let Cell = function() {
  this.kind = int(random(4));
  this.visited = false;
};

Cell.prototype.getColor = function() {
  /*
    0 = WALL
    1 = GROUND
    2 = SLOW GROUND
    3 = VERY SLOW GROUND
  */
  colors = ['gray', 'white', 'lightgreen', 'mediumseagreen'];
  return colors[this.kind % colors.length];
};
