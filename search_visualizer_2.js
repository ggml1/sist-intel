GRID_ROWS = 10;
GRID_COLUMNS = 10;

function setup() {
  // DISPLAY
  createCanvas(1024,768);
  background(220);
  frameRate(30);
  
  // ENTITIES
  player = new Player();
  grid = new Grid(GRID_ROWS, GRID_COLUMNS);
  grid.generate();
  player.spawn();
  food = new Food();
  food.spawn();
  
  // BUTTONS
  button = createButton('BFS');
  button.position(20, 20);
  button.mousePressed(runBFS);
  
  button = createButton('DFS');
  button.position(65, 20);
  button.mousePressed(runDFS);
  
  button = createButton('Dijkstra');
  button.position(111, 20);
  button.mousePressed(runDijkstra);
  
  button = createButton('A*');
  button.position(174, 20);
  button.mousePressed(runAStar);
  
  button = createButton('Reset');
  button.position(207, 20);
  button.mousePressed(reset);
  
  // GRAPH UTILS
  graph = [];
  initializeGraph();
  
  // SEARCH UTILS
  queue = [];
  queueIndex = 0;
  visited = [];
  beforeOnPath = [];
  pathToFood = [];
  pathToFoodIndex = 0;
  
  // STATES
  entrypoint = true;
  visitingCells = false;
  highlightPath = false;
  
  // ALGORITHM CONTROLLER
  activeAlgorithm = null;
  
  grid.draw();
  player.draw();
  food.draw();
}

function draw() {
  if (entrypoint) {
    console.log("entrada");
    visitingCells = false;
    highlightPath = false;
    
  } else if (visitingCells) {
    console.log("visitando");
    let currentCell = queue[queueIndex];
    if (currentCell.x != player.position.x || currentCell.y != player.position.y) {
      // drawCell(currentCell, "yellow");
      grid.cells[currentCell.x][currentCell.y].cor = VISITED_CELL;
    }
    if (currentCell.x == food.position.x && currentCell.y == food.position.y) {
      food.draw(); // do not paint on top of food
      visitingCells = false;
      pathToFood = buildPathToFood();
      highlightPath = true;
    } else {
      visited[currentCell.x][currentCell.y] = true;
      queueIndex += 1;
      let nextCells = fetchNextCells(currentCell, activeAlgorithm);
      for (let i = 0; i < nextCells.length; i++) {
        queue.push(nextCells[i]);
      }
    }
  } else if (highlightPath) {
    if (pathToFoodIndex < pathToFood.length) {
      let cellOnPath = pathToFood[pathToFoodIndex];
      // drawCell(cellOnPath, "lightblue");
      grid.cells[cellOnPath.x][cellOnPath.y].cor = PATH_CELL;
      if (equalPos(cellOnPath, food.position)) {
        food.draw();
      }
      if (equalPos(cellOnPath, player.position)) {
        player.draw();
      }
      pathToFoodIndex += 1;
    } else {
      pathToFoodIndex = 0;
      followPath = true;
      highlightPath = false;
    }
  } else if (followPath) {
    if (pathToFoodIndex < pathToFood.length) {
      let nextCell = pathToFood[pathToFoodIndex];
      let nextCellPixelPos = getCellPixelMapping(nextCell);
      player.arrive(nextCellPixelPos);
      player.run();
      console.log("Player indo: ", player.pixelPos, nextCellPixelPos);
      if (player.pixelPos.dist(nextCellPixelPos) < 2) {
        let startIdx = pathToFoodIndex;
        while (pathToFoodIndex + 1 < pathToFood.length) {
          if (!(pathToFood[pathToFoodIndex + 1].x == pathToFood[startIdx].x || pathToFood[pathToFoodIndex + 1].y == pathToFood[startIdx].y)) {
            break;
          }
          pathToFoodIndex += 1;
        }
      }
    } else {
      followPath = false;
      entrypoint = true;
    }
  }
  grid.draw();
  player.draw();
  food.draw();
  /*
  player.arrive(food.getPos());
  player.run();
  player.position = food.position;
  */
}

function reset() {
  entrypoint = true;
  grid.draw();
  player.draw();
  food = new Food();
  food.spawn();
  food.draw();
}

function initializeGraph() {
  let dx = [0, 0, 1, -1];
  let dy = [1, -1, 0, 0];
  graph = [];
  for (let i = 0; i < GRID_ROWS; ++i) {
    graph.push([]);
    for (let j = 0; j < GRID_COLUMNS; ++j) {
      graph[i].push([]);
    }
  }
  for (let i = 0; i < GRID_ROWS; ++i) {
    for (let j = 0; j < GRID_COLUMNS; ++j) {
      // starting at grid[i][j]
      // sum of weights of each cell
      for (let k = 0; k < 4; ++k) {
        let nx = i + dx[k];
        let ny = j + dy[k];
        if (nx >= 0 && ny >= 0 && nx < GRID_ROWS && ny < GRID_COLUMNS) {
          if (grid.cells[nx][ny].kind != WALL) {
            let w1 = grid.cells[i][j];
            let w2 = grid.cells[nx][ny];
            graph[i][j].push([createVector(nx, ny), w1 + w2]); 
          }
        }
      }
    }
  }
}

function initializeVisited() {
  visited = [];
  beforeOnPath = [];
  for (let i = 0; i < GRID_ROWS; ++i) {
    visited.push([]);
    beforeOnPath.push([]);
    for (let j = 0; j < GRID_COLUMNS; ++j) {
      visited[i].push(false);
      beforeOnPath[i].push(null);
    }
  }
}

function runBFS() {
  console.log('Running BFS');
  initializeVisited();
  activeAlgorithm = 'BFS';
  queue = [];
  queue.push(player.position);
  entrypoint = false;
  visitingCells = true;
}

function runDFS() {
  console.log('Running DFS');
  initializeVisited();
  activeAlgorithm = 'DFS';
  queue = [];
  queue.push(player.position);
  entrypoint = false;
  visitingCells = true;
}

function runDijkstra() {
  console.log('Running Dijkstra');
  initializeVisited();
  activeAlgorithm = "Dijkstra";
  queue = [];
  queue.push([player.position, 0]);
  entrypoint = false;
  visitingCells = true;
}

function runAStar() {
  console.log('Running A*');
  initializeVisited();
  activeAlgorithm = "A*";
  queue = [];
  queue.push([player.position, 0]);
  entrypoint = false;
  visitingCells = true;
}