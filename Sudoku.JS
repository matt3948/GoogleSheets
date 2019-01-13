function solve(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("board");
  var board = sheet.getRange("E8:M16").getValues();
  sheet.getRange('C6').clearContent();
  sheet.getRange('E18:M26').clearContent();
        var solver = new Solver();
        for(var row = 0; row < 9; row++){
            for(var column = 0; column < 9; column ++){              
              var value = board[column,row].toString();
              var find = ',';
              var re = new RegExp(find, 'g');
              value = value.replace(re, '');
              value = value.substring(column, column+1);              
              solver.active_grid[row][column] = value;
            }
        }
        if(solver.solve()) {
                  Logger.log('Begin Print: ' + solver.active_grid);
                  var board = sheet.getRange('E18:M26');
                  board.setValues(solver.active_grid);    
          sheet.getRange('C6').setValue('Solution Found!');
        }else{
          sheet.getRange('C6').setValue("No solutions found!");
        }
    }

function Solver() {
    this.active_grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
};

Solver.prototype.valid_row = function (active_row, active_column) {
  var current_value = this.active_grid[active_row][active_column];
  for (var column = 0; column < 9; column++) {
    if (column != active_column && this.active_grid[active_row][column] == current_value) {
      return false;
    }
  }
  return true;
};

Solver.prototype.valid_column = function (active_row, active_column) {
  var current_value = this.active_grid[active_row][active_column];
  for (var row = 0; row < 9; row++) {
    if (row != active_row && this.active_grid[row][active_column] == current_value) {
      return false;
    }
  }
  return true;
};

Solver.prototype.validate_box = function (active_row, active_column) {
    var value = this.active_grid[active_row][active_column];
    var box_row = Math.floor(active_row / 3);
    var box_column = Math.floor(active_column / 3);

    for (var row = box_row * 3; row < box_row * 3 + 3; row++) {
        for (var column = box_column * 3; column < box_column * 3 + 3; column++) {
            if (row != active_row && column != active_column && this.active_grid[row][column] == value) {
                return false;
            }
        }
    }
    return true;
};

Solver.prototype.backtrack = function (active_row, active_column) {
    active_column++;
    if (active_column > 8) {
        active_column = 0;
        active_row++;
        if (active_row > 8) {
            return true;
        }
    }

    if (this.active_grid[active_row][active_column] != 0) {
        if (!(this.valid_row(active_row, active_column) && this.valid_column(active_row, active_column) && this.validate_box(active_row, active_column))){
            return false;
        }
        return this.backtrack(active_row, active_column);
    } else {
        for (var x = 1; x < 10; x++) {
            this.active_grid[active_row][active_column] = x;
            if (this.valid_row(active_row, active_column) &&  this.valid_column(active_row, active_column) && this.validate_box(active_row, active_column)){
                if (this.backtrack(active_row, active_column)) {
                    return true;
                }
            }
        }
        this.active_grid[active_row][active_column] = 0;
        return false;
    }
};

Solver.prototype.solve = function () {
    return this.backtrack(0, -1);
};  