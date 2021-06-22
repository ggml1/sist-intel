GRID_ROWS = 25;
GRID_COLUMNS = 25;

function setup() {
  createCanvas(1024,768);
  background(220);
  player = new Player();
  grid = new Grid(GRID_ROWS, GRID_COLUMNS);
  grid.generate();
  player.spawn(grid);
  food = new Food();
  food.spawn(grid, player);
  
  foodActive = false;
  
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
  
  seeking = false;
}

function draw() {
  grid.draw();
  player.draw();
  food.draw();
  
  player.arrive(food.getPos());
  player.run();
  player.position = food.position;
}

function initializeGraph() {
  let dx = [0, 0, 1, -1];
  let dy = [1, -1, 0, 0];
  let graph = [];
  for (i = 0; i < GRID_ROWS; ++i) {
    graph.push([]);
    for (j = 0; j < GRID_COLUMNS; ++j) {
      graph[i].push([]);
    }
  }
  for (i = 0; i < GRID_ROWS; ++i) {
    for (j = 0; j < GRID_COLUMNS; ++j) {
      // starting at grid[i][j]
      // sum of weights of each cell
      for (k = 0; k < 4; ++k) {
        let nx = i + dx[k];
        let ny = j + dy[k];
        if (nx >= 0 && ny >= 0 && nx < GRID_ROWS && ny < GRID_COLUMNS) {
          let w1 = grid.cells[i][j];
          let w2 = grid.cells[nx][ny];
          graph[i][j].push((nx, ny, w1 + w2));
        }
      }
    }
  }
}

function runBFS() {
  console.log('ok BFS');
  // initializeGraph();
}

function runDFS() {
  console.log('ok DFS')
}

function runDijkstra() {
  console.log('ok Dijkstra')
}

function runAStar() {
  console.log('ok A*')
}
