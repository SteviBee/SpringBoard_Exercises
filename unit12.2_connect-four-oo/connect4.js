/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// Creating a game class to easily reset game and to update to OOP


function playerColorInput(){
  let submit = document.querySelector("#submitBtn")

  submit.addEventListener("click", this.handlePlayerColorClick)
}

function handlePlayerColorClick(){ 
  let p1Color = document.querySelector("#p1-input")
  let p2Color = document.querySelector("#p2-input")

  let p1 = new Player(p1Color.value)
  let p2 = new Player(p2Color.value)

  new Game(7, 6, p1, p2);

  // TAQ - IDK why i couldn't get this to work via not doing default!
  // e.preventDefault()
}

playerColorInput();

class Game {
  constructor (width, height, p1, p2) {
    // Creates an array with the player objects stored in it for tracking purpose
    this.players = {"p1": p1, "p2": p2}

    // The rest of the class variables:
    this.width = width;
    this.height = height
    this.currPlayer = 1;
    this.board = [];  
    this.gameOver = false;
    this.gameStart = false;
    this.makeBoard();
    this.makeHtmlBoard();
    this.startGame();
  }
  

  startGame(){
    let startBtn = document.querySelector("#startBtn")
    let top = document.querySelector("#column-top");
    top.style.pointerEvents = "none";

    startBtn.addEventListener("click", this.startGameEvent.bind(this))
  }

  startGameEvent(evt) {
    let top = document.querySelector("#column-top");
    let startBtn = document.querySelector("#startBtn")

    startBtn.innerHTML = "Reset"

    if(this.gameStart === false) {
      top.style.pointerEvents = "auto";
      return this.gameStart = true;
    } else {
      top.style.pointerEvents = "none";
      // 10/9/21 - Not Sure this is the best way to restart and it might lead to other things but it works:
      window.location.reload();
      return this.gameStart = false;
  
    }
  }


  // const WIDTH = 7;
  // const HEIGHT = 6;

  // let currPlayer = 1; // active player: 1 or 2
  // let board = []; // array of rows, each row is array of cells  (board[y][x])

  /** makeBoard: create in-JS board structure:
   *   board = array of rows, each row is array of cells  (board[y][x])
   */

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */

  makeHtmlBoard() {
    const board = document.getElementById('board');

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    this.handleGameClickFn = this.handleClick.bind(this);
    top.addEventListener('click', this.handleGameClickFn);

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${this.currPlayer}`);
    piece.style.top = -50 * (y + 2);
    
    // console.log("Game instance curplay:", this.currPlayer)

    // // Adding COLOR from user input:
    // // this.players.p1
    // console.log("current player value", this.players.p1.color)
    if (this.currPlayer === 1) {
      piece.style.backgroundColor = this.players.p1.color
    } else {
      piece.style.backgroundColor = this.players.p2.color
    }

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */

  endGame(msg) {
    let element = document.querySelector("#column-top");

    element.removeEventListener("click", this.handleGameClickFn)
    setTimeout(()=>alert(msg), 500)
    // OLD Code - Keep so I know what NOT todo:
    // let newMsg = msg;
    // function end(newMsg) {
    //   alert(newMsg)
    // }
    // setTimeout(end(newMsg), 500)
    this.gameOver = true;
  }

  /** handleClick: handle click of column top to play piece */

  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
  

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    
    // check for win
    if (this.checkForWin()) {  
      return this.endGame(`Player ${this.currPlayer} won!`)       
    }
    
    // check for tie
    // TODO - Check if this ARROW FUNCTION needs to be re-writen 
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
      
    // switch players
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  // MIGHT HAVE FGUCKED THIS UP ---- 10/7/21
  checkForWin() {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    const _win = cells =>
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );


    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
  // TODO - Idk if this is correct to call these methods and fillin the board
  // TODO - above this IDK if the board is being filled correctly via board or this.board
  // nowMakeBoard() {
  //   return this.makeBoard();
  // }
  // nowMakeHtmlBoard() {
  //   return this.makeHtmlBoard();
  // }

  
  // MEGA CLASS ENDED HERE FOR GAME 
}

class Player {
  constructor(color){
    this.color = color
  }
}

// TAQ - Player class and what todo
// new Player(1, "black", "grey")
// new Game(7, 6, p1, p2);