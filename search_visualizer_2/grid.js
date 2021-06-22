let Grid = function(rows, columns) {
  this.rows = rows;
  this.columns = columns;
  this.OFFSET_X = 100;
  this.OFFSET_Y = 100;
};

Grid.prototype.generate = function() {
  this.cells = [];
  for (i = 0; i < this.rows; ++i) {
    row = [];
    for (j = 0 ; j < this.columns; ++j) {
      row.push(new Cell());
    }
    this.cells.push(row);
  }
};

Grid.prototype.draw = function() {
  for (i = 0; i < this.rows; ++i) {
    for (j = 0; j < this.columns; ++j) {
      posX = this.OFFSET_X + CELL_SIZE * i;
      posY = this.OFFSET_Y + CELL_SIZE * j;
      fill(this.cells[i][j].getColor());
      rectMode(CENTER);
      rect(posX, posY, CELL_SIZE, CELL_SIZE);
    }
  }
};
