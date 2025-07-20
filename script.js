const board = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");
const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, i) => {
    const cellDiv = document.createElement("div");
    cellDiv.className = "cell";
    cellDiv.dataset.index = i;
    cellDiv.addEventListener("click", handleCellClick);
    cellDiv.textContent = cell;
    board.appendChild(cellDiv);
  });
}

function handleCellClick(event) {
  const idx = event.target.dataset.index;
  if (!gameActive || gameState[idx] !== "") return;

  gameState[idx] = currentPlayer;
  event.target.textContent = currentPlayer;
  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (const [a, b, c] of winningConditions) {
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState.fill("");
  statusText.textContent = "Player X's Turn";
  createBoard();
}

// Initialize game
createBoard();
statusText.textContent = "Player X's Turn";
