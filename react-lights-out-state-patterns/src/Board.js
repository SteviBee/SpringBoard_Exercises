import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.3 }) {
  // SPB - array-of-arrays of true/false
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // hard coded values for testing:
    // let nrows = 3
    // let ncols = 4
    let initialBoard = [];
    // create array-of-arrays of true/false values - DONE 5/15

    // Create random true / false based on float: 0.5 is 50%, 0.3 is 30% chance true:
    function randomTrueFalse() {
      return Math.random() < chanceLightStartsOn
    } 

    // Add nrows
    for (let i = 0; i < nrows; i++) {
      initialBoard.push([])
    }

    // Add ncol
    for (let i = 0; i < initialBoard.length; i++) {
      let oneArray = initialBoard[i];
      for (let t = 0; t < ncols; t++) {
        oneArray.push((randomTrueFalse()))    
      }
      
    }
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won. DONE 5/15
    // WIN-State: is all false in every array-of-array value

    // Destructure arr-of-arr to send all booleans to answer for evaulation
    let answer = [];
    for (let i = 0; i < board.length; i++) {

      let currRow = board[i]
      for (let t = 0; t < currRow.length; t++) {
        if (currRow[t] === false) {
          answer.push(true)
        } else {
          answer.push(false)
        }
      } 
      
    }

    // Returns true if all values in an array are true
    function allTrue(arr) {
      return arr.every(el => el === true)
    }
    // Evaulated answer
    return allTrue(answer)
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      //  Make a (deep) copy of the oldBoard - use JSON to ensure deep copy
      let arrayCopy = JSON.parse(JSON.stringify(oldBoard));
      // const arrayCopy = oldBoard.map(row => [...row]);

      // in the copy, flip this cell and the cells around it
      flipCell(y, x, arrayCopy)
      flipCell(y, x - 1, arrayCopy)
      flipCell(y, x + 1, arrayCopy)
      flipCell(y - 1, x, arrayCopy)
      flipCell(y + 1 , x, arrayCopy)

      // return the copy
      return arrayCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon(board)) {
    return <div>You Win!</div>;
  }
 
  // make table board - loop over and put Cell component call in each cell
  let newGame = []
  for (let y = 0; y < nrows; y++) {
    let row = []
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />        
      )}
      // Add rows:
      newGame.push(<tr key={y}>{row}</tr>)
  }

  return (
    <div>
      <h1>Lights Out</h1>
      <table className="Board">   
       <tbody>{newGame}</tbody>
       {/* left this code in to remind myself what NOT to do */}
          {/* {newGame.map((rowArr, idx) => ( 
            <tr key={idx}>
              {rowArr.map((cell, i) => (
              <Cell 
              // Add anon wrapped event function
                flipCellsAroundMe={() => workingHard(i, idx)} 
                flipCellsAroundMe={() => flipCellsAround(i, idx)} 
                isLit={cell}
                key={i}
                />
              ))}
            </tr>
          ))} */}
      </table>
    </div>
  )
}

export default Board;
