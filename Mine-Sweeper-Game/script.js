const grid = document.getElementById("grid");
let lockGame = false;
const testMode = true; // true will show mines
generateGrid();

// Function to generate a 10x10 grid
function generateGrid() {
  lockGame = false;
  grid.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    let row = grid.insertRow(i);
    for (let j = 0; j < 10; j++) {
      let cell = row.insertCell(j);
      cell.onclick = function () {
        init(this);
      };
      cell.setAttribute("mine", "false");
    }
  }
  generateMines();
}

// Function to randomly place mines in the grid
function generateMines() {
  let minesPlaced = 0;
  while (minesPlaced < 15) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let cell = grid.rows[row].cells[col];
    if (cell.getAttribute("mine") === "false") {
      cell.setAttribute("mine", "true");
      minesPlaced++;
      if (testMode) {
        cell.innerHTML = "X";
      }
    }
  }
}

// Function to highlight all mines in red
function revealMines() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = grid.rows[i].cells[j];
      if (cell.getAttribute("mine") === "true") {
        cell.className = "mine";
      }
    }
  }
}

// Function to check if the game is complete
function checkGameComplete() {
  let gameComplete = true;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (
        grid.rows[i].cells[j].getAttribute("mine") === "false" &&
        grid.rows[i].cells[j].innerHTML === ""
      ) {
        gameComplete = false;
      }
    }
  }
  if (gameComplete) {
    alert("You Found All Mines!");
    revealMines();
  }
}

// Function to handle cell click events
function init(cell) {
  // If the game is locked, do nothing
  if (lockGame) {
    return;
  } else {
    // If the clicked cell contains a mine, reveal all mines and lock the game
    if (cell.getAttribute("mine") === "true") {
      revealMines();
      lockGame = true;
    } else {
      // Mark the cell as active
      cell.className = "active";
      let mineCount = 0;
      let cellRow = cell.parentNode.rowIndex;
      let cellCol = cell.cellIndex;
      for (
        let i = Math.max(cellRow - 1, 0);
        i <= Math.min(cellRow + 1, 9);
        i++
      ) {
        for (
          let j = Math.max(cellCol - 1, 0);
          j <= Math.min(cellCol + 1, 9);
          j++
        ) {
          if (grid.rows[i].cells[j].getAttribute("mine") === "true") {
            mineCount++;
          }
        }
      }
      cell.innerHTML = mineCount;
      if (mineCount === 0) {
        for (
          let i = Math.max(cellRow - 1, 0);
          i <= Math.min(cellRow + 1, 9);
          i++
        ) {
          for (
            let j = Math.max(cellCol - 1, 0);
            j <= Math.min(cellCol + 1, 9);
            j++
          ) {
            if (grid.rows[i].cells[j].innerHTML === "") {
              init(grid.rows[i].cells[j]);
            }
          }
        }
      }
      // Check if the game is complete after each click
      checkGameComplete();
    }
  }
}
