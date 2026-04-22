import React, { useState } from "react";
import "./App.css";

const SIZE = 9;

const defaultPuzzle = [
  ["5", "3", "", "", "7", "", "", "", ""],
  ["6", "", "", "1", "9", "5", "", "", ""],
  ["", "9", "8", "", "", "", "", "6", ""],
  ["8", "", "", "", "6", "", "", "", "3"],
  ["4", "", "", "8", "", "3", "", "", "1"],
  ["7", "", "", "", "2", "", "", "", "6"],
  ["", "6", "", "", "", "", "2", "8", ""],
  ["", "", "", "4", "1", "9", "", "", "5"],
  ["", "", "", "", "8", "", "", "7", "9"],
];

export default function App() {
  const [grid, setGrid] = useState(defaultPuzzle);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState({ row: -1, col: -1 });
  const [invalidCells, setInvalidCells] = useState([]);

  const isValid = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (x !== col && board[row][x] == num) return false;
      if (x !== row && board[x][col] == num) return false;
    }

    let sr = Math.floor(row / 3) * 3;
    let sc = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) {
        let r = sr + i,
          c = sc + j;
        if ((r !== row || c !== col) && board[r][c] == num) return false;
      }

    return true;
  };

  const findInvalidCells = (board) => {
    let invalid = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] !== "" && !isValid(board, i, j, board[i][j])) {
          invalid.push(`${i}-${j}`);
        }
      }
    }
    return invalid;
  };

  const solveSudoku = (board) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === "") {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, i, j, num)) {
              board[i][j] = num;
              if (solveSudoku(board)) return true;
              board[i][j] = "";
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleChange = (row, col, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const newGrid = grid.map((r) => [...r]);
      newGrid[row][col] = value;
      setGrid(newGrid);

      const invalid = findInvalidCells(newGrid);
      setInvalidCells(invalid);
    }
  };

  const handleSolve = () => {
    const newGrid = grid.map((r) => [...r]);

    const invalid = findInvalidCells(newGrid);
    if (invalid.length > 0) {
      setInvalidCells(invalid);
      setMessage("❌ Invalid Grid");
      return;
    }

    if (solveSudoku(newGrid)) {
      setGrid(newGrid);
      setMessage("✅ Solved!");
    } else {
      setMessage("❌ No Solution");
    }
  };

  const handleReset = () => {
    setGrid(defaultPuzzle);
    setInvalidCells([]);
    setMessage("");
  };

  const handleRandom = () => {
    let newGrid = Array(9)
      .fill()
      .map(() => Array(9).fill(""));

    for (let i = 0; i < 20; i++) {
      let r = Math.floor(Math.random() * 9);
      let c = Math.floor(Math.random() * 9);
      let num = Math.floor(Math.random() * 9) + 1;

      if (isValid(newGrid, r, c, num)) {
        newGrid[r][c] = num;
      }
    }

    setGrid(newGrid);
    setInvalidCells([]);
    setMessage("");
  };

  const isHighlighted = (i, j) => {
    return (
      i === selected.row ||
      j === selected.col ||
      (Math.floor(i / 3) === Math.floor(selected.row / 3) &&
        Math.floor(j / 3) === Math.floor(selected.col / 3))
    );
  };

  return (
    <div className="container">
      <h1>Sudoku Solver</h1>

      <div className="grid">
        {grid.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => {
              const isInvalid = invalidCells.includes(`${i}-${j}`);

              return (
                <input
                  key={j}
                  value={cell}
                  onFocus={() => setSelected({ row: i, col: j })}
                  onChange={(e) => handleChange(i, j, e.target.value)}
                  className={`cell 
                    ${isHighlighted(i, j) ? "highlight" : ""}
                    ${isInvalid ? "invalid" : ""}`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="buttons">
        <button onClick={handleSolve}>Solve</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleRandom}>Random</button>
      </div>

      <p className="message">{message}</p>
    </div>
  );
}