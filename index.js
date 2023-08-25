//Players
const X = "x";
const O = "o";
startGame();

// Grid Combinations to win
const WIN_COMBO = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6], // Diagonal from top-right to bottom-left
];

// Count Individual wins and Draw
let winsX = 0;
let winsO = 0;
let draws = 0;

//function to take ID
function updateScoreboard() {
    document.getElementById("winsX").textContent = winsX;
    document.getElementById("winsO").textContent = winsO;
    document.getElementById("draws").textContent = draws;
  }

  //individual cell elements
const cellElements = document.querySelectorAll("[data-cell]");
//next bit
let nextTurn = false;
// Table//All cells/<div</div>
const board = document.getElementById("board");


//Dialogue Box Elements for Win/Draw
const winnerMessageElement = document.getElementById("winnerMessage");
const winnerTextElement = document.querySelector("[winnerText]");
const winnerModal = document.getElementById("winnerModal");



//Dialog Box At Beginning of Website/ POP UP
const modal = document.getElementById("modal");

// Get the "Play" button within the modal
const playButton = document.getElementById("okBtn");

// Add an event listener to the "Play" button to open the modal
// playButton.addEventListener("click", () => {
//     startGame();
//     closeModal(); // Close the modal
//   });


  //############################################################################//
  const opponentRadio = document.getElementById("r0");
  const aiRadio = document.getElementById("r1");
  //############################################################################//

  playButton.addEventListener("click", () => {
    if (aiRadio.checked) {
        console.log("ai-checked");
        startGame();
     
    } else if (opponentRadio.checked) {
        console.log("opponent-checked");
      startGame();
    }
    closeModal();
  });
  
  //############################################################################//
  //############################################################################//

// Function to open the modal
function closeModal() {
    modal.style.display = "none";
  }






function startGame() {
   nextTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X);
        cell.classList.remove(O);
        cell.removeEventListener('click', handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  winnerMessageElement.classList.remove("show");


}

//############################################################################//
//##################################### Core Logic of Game AI #######################################//
//##################################### Core Logic of Game AI ######################################//
//############################################################################//
// Minimax function for AI move
  //############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//


//function for cell bit 
function handleClick(e) {
  const cell = e.target;
  const currentTarget = nextTurn ? O : X;
  //1
  settleOn(cell, currentTarget);
  if (checkWin(currentTarget)) {
    console.log("winner");
    endGame(false);
  } else if(isDraw()){
endGame(true);
  }else {
    //2
    swapTurns();
    //3
    setBoardHover();
  }

}

// selected cell bit display
function settleOn(cell, currentTarget) {
  cell.classList.add(currentTarget);
}

// next player turn
function swapTurns() {
  nextTurn = !nextTurn;
}

// hover next player bit
function setBoardHover() {
  board.classList.remove(X);
  board.classList.remove(O);
  if (nextTurn) {
    board.classList.add(O);
  } else {
    board.classList.add(X);
  }
}

//function after win 
function endGame(draw) {
  if(draw) {
    console.log("its a draw");
    winnerTextElement.innerText = "Draw!";
    draws++;
  } else {
    console.log("Player has Won, Game Over!");
    winnerTextElement.innerText = `${
      nextTurn ? "Player with O Wins" : "Player with X Wins"
    }`;
    if (nextTurn) {
        winsO++;
      } else {
        winsX++;
      }
  }
updateScoreboard();
  winnerMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X) || cell.classList.contains(O);
  });
}

// check winner
function checkWin(currentTarget) {
  return WIN_COMBO.some((combo) => {
    return combo.every((index) => {
      return cellElements[index].classList.contains(currentTarget);
    });
  });
}



//Reset Button
const restartButton = document.getElementById("reset");
restartButton.addEventListener("click", playAgain);

//function reset / play-again
function playAgain() {
    console.log("Calling startGame");
    startGame();
    winnerMessageElement.classList.remove("show");

  }

//Game-Restart Button
const resetButton = document.getElementById("game-restart");
resetButton.addEventListener("click", resetGame);



//function Restart Game
function resetGame() {
    winsX = 0;
    winsO = 0;
    draws = 0;
    updateScoreboard();
    startGame();
  }

 // close button/ dialogue box 
function closeWinnerModal() {
    winnerMessageElement.classList.remove("show");
  }
  