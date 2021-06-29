WALL = 0;
GROUND = 1;
SLOWGROUND = 2;
VERYSLOWGROUND = 3;
VISITED_CELL = 4;
PATH_CELL = 5;

CELL_SIZE = 25;

let Cell = function() {
  this.kind = int(random(4));
  this.cor = this.kind;
  this.visited = false;
};

Cell.prototype.getColor = function() {
  /*
    0 = WALL
    1 = GROUND
    2 = SLOW GROUND
    3 = VERY SLOW GROUND
    4 = VISITED CELL
    5 = PATH_CELL
  */
  let colors = ['gray', 'white', 'lightgreen', 'mediumseagreen', 'yellow', 'lightblue'];
  return colors[this.cor % colors.length];
};

function drawCell(cell, cellColor) {
  let pixelPos = getCellPixelMapping(cell);
  fill(cellColor);
  rectMode(CENTER);
  rect(pixelPos.x, pixelPos.y, CELL_SIZE, CELL_SIZE);
}

function fetchNextCells(cell, algorithm) {
  let cells = [];
  if (algorithm == "BFS") {
    for (let i = 0; i < graph[cell.x][cell.y].length; ++i) {
      let nextCell = graph[cell.x][cell.y][i][0];
      if (!visited[nextCell.x][nextCell.y]) {
        beforeOnPath[nextCell.x][nextCell.y] = createVector(cell.x, cell.y);
        visited[nextCell.x][nextCell.y] = true;
        cells.push(nextCell);
      }
    }
  }
  return cells;
}

function getCellPixelMapping(cell) {
  let _x = GRID_OFFSET_X + (cell.x * CELL_SIZE);
  let _y = GRID_OFFSET_Y + (cell.y * CELL_SIZE);
  return createVector(_x, _y);
}

function buildPathToFood() {
  let path = [];
  let pos = food.position;
  while (pos != null) {
    path.push(pos);
    pos = beforeOnPath[pos.x][pos.y];
  }
  path.reverse();
  return path;
}

function equalPos(a, b) {
  return a.x == b.x && a.y == b.y;
}
