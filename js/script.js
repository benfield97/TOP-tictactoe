// Game state
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let singlePlayer = false;

// DOM elements
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const singlePlayerCheckbox = document.getElementById('single-player');
const startButton = document.getElementById('start-button');
const gameBoardElement = document.getElementById('game-board');
const settingsElement = document.getElementById('settings');

// Disable game board initially
gameBoardElement.classList.add('disabled');

// Win combinations
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Check if current player has won
function checkWin() {
    for (const combo of winCombos) {
        if (
            gameBoard[combo[0]] &&
            gameBoard[combo[0]] === gameBoard[combo[1]] &&
            gameBoard[combo[0]] === gameBoard[combo[2]]
        ) {
            return true;
        }
    }

    return false;
}

// Reset the game state
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    player1 = '';
    player2 = '';
    singlePlayer = false;

    player1NameInput.value = '';
    player2NameInput.value = '';
    singlePlayerCheckbox.checked = false;

    cells.forEach(cell => cell.textContent = '');
}

// Make an AI move
function makeAIMove() {
    let move;
    do {
        move = Math.floor(Math.random() * gameBoard.length);
    } while (gameBoard[move] !== '');

    gameBoard[move] = 'O';
    cells[move].textContent = 'O';

    if (checkWin()) {
        alert(`Player ${player2} wins!`);
        resetGame();
        endGame();
    } else {
        currentPlayer = 'X';
    }
}

// Handle cell click
function handleCellClick(e) {
    const i = Array.from(cells).indexOf(e.target);

    if (gameBoard[i] === '') {
        gameBoard[i] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin()) {
            alert(`Player ${currentPlayer === 'X' ? player1 : player2} wins!`);
            resetGame();
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            if (singlePlayer && currentPlayer === 'O') {
                makeAIMove();
            }
        }
    }
}

// Start the game
function startGame() {
    player1 = player1NameInput.value || 'Player 1';
    player2 = singlePlayerCheckbox.checked ? 'Computer' : (player2NameInput.value || 'Player 2');
    singlePlayer = singlePlayerCheckbox.checked;
    currentPlayer = 'X';

    gameBoardElement.classList.remove('disabled');
    settingsElement.classList.add('disabled');
    startButton.textContent = 'Restart Game';
}

// End the game
function endGame() {
    gameBoardElement.classList.add('disabled');
    settingsElement.classList.remove('disabled');
    startButton.textContent = 'Start Game';
}

// Add event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', () => {
    resetGame();
    gameBoardElement.classList.add('disabled');
    settingsElement.classList.remove('disabled');
    startButton.textContent = 'Start Game';
});
startButton.addEventListener('click', startGame);

// Initialize game
resetGame();
