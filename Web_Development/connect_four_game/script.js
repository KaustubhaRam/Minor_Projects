const ROWS = 6;
const COLS = 7;
const board = [];
let currentPlayer = 'red';

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear the board
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            board[row][col] = '';
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const col = parseInt(event.target.dataset.col);
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === '') {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            cell.classList.add(currentPlayer);
            if (checkWin(row, col)) {
                setTimeout(() => alert(`${currentPlayer.toUpperCase()} wins!`), 10);
                removeEventListeners();
            } else if (board.flat().every(cell => cell !== '')) {
                setTimeout(() => alert('Draw!'), 10);
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
            break;
        }
    }
}

function removeEventListeners() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
           checkDirection(row, col, 0, 1) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal \
           checkDirection(row, col, 1, -1);  // Diagonal /
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countInDirection(row, col, rowDir, colDir);
    count += countInDirection(row, col, -rowDir, -colDir);
    return count >= 4;
}

function countInDirection(row, col, rowDir, colDir) {
    let count = 0;
    let newRow = row + rowDir;
    let newCol = col + colDir;
    while (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === currentPlayer) {
        count++;
        newRow += rowDir;
        newCol += colDir;
    }
    return count;
}

document.getElementById('reset').addEventListener('click', () => {
    currentPlayer = 'red';
    createBoard();
});

createBoard();
