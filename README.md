# Grid Solver (Sudoku Solver)

A simple and interactive web app to solve 9x9 Sudoku grids.

Users can enter values manually, generate a random puzzle seed, validate the board, and solve the puzzle using a backtracking algorithm.

## Features

- 9x9 interactive Sudoku grid input
- Accepts only digits 1 to 9 in cells
- Real-time invalid cell detection (row, column, and 3x3 sub-grid conflicts)
- Visual highlighting for selected row, column, and sub-grid
- `Solve` button to solve puzzle using backtracking
- `Reset` button to restore the default puzzle
- `Random` button to generate a random valid seed puzzle
- Status messages for invalid grid, solved state, or unsolvable input

## How It Works

The solver uses a recursive backtracking approach:

1. Find an empty cell.
2. Try numbers 1 through 9.
3. Check if the number is valid in current row, column, and 3x3 box.
4. Recurse to solve the rest of the board.
5. Backtrack if no valid number works.

This guarantees a correct solution when one exists.

## Tech Stack

- React 19
- JavaScript (ES6+)
- Create React App (`react-scripts`)
- CSS for styling

## Project Structure

```text
sudoku-app/
	package.json          # Project scripts and dependencies
	README.md             # Project documentation
	public/
		index.html          # App HTML template
	src/
		App.js              # Main Sudoku UI and solver logic
		App.css             # Component styling
		index.js            # React app entry point
		index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm start` - Run the app in development mode
- `npm test` - Run tests in watch mode

