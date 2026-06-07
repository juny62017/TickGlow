let allBoxes = document.querySelectorAll(".box");

let statusText = document.querySelector(".status-text");

let restartBtn = document.querySelector(".restart-btn");

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameRunning = true;

let winningPatterns = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];

for (let i = 0; i < allBoxes.length; i++) {

    allBoxes[i].onclick = function () {

        if (gameRunning === false) {
            return;
        }

        if (board[i] !== "") {
            return;
        }

        playerMove(i);
    };
}

function playerMove(index) {

    board[index] = currentPlayer;

    allBoxes[index].innerText = currentPlayer;

    allBoxes[index].classList.add("x-style");

    let playerWon = checkWinner("X");

    if (playerWon === true) {

        statusText.innerText = "You Won";

        gameRunning = false;

        return;
    }

    let drawMatch = checkDraw();

    if (drawMatch === true) {

        statusText.innerText = "Match Draw";

        gameRunning = false;

        return;
    }

    statusText.innerText = "Bot Thinking...";

    disableBoard();

    setTimeout(function () {

        botMove();

    }, 600);
}

function botMove() {

    let emptyBoxes = [];

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            emptyBoxes.push(i);

        }
    }

    if (emptyBoxes.length === 0) {

        enableBoard();

        return;
    }

    let randomNumber =
        Math.floor(Math.random() * emptyBoxes.length);

    let botIndex = emptyBoxes[randomNumber];

    board[botIndex] = "O";

    allBoxes[botIndex].innerText = "O";

    allBoxes[botIndex].classList.add("o-style");

    let botWon = checkWinner("O");

    if (botWon === true) {

        statusText.innerText = "Bot Won";

        gameRunning = false;

        return;
    }

    let drawMatch = checkDraw();

    if (drawMatch === true) {

        statusText.innerText = "Match Draw";

        gameRunning = false;

        return;
    }

    statusText.innerText = "Your Turn";

    enableBoard();
}

function checkWinner(player) {

    for (let i = 0; i < winningPatterns.length; i++) {

        let firstBox = winningPatterns[i][0];

        let secondBox = winningPatterns[i][1];

        let thirdBox = winningPatterns[i][2];

        if (
            board[firstBox] === player &&
            board[secondBox] === player &&
            board[thirdBox] === player
        ) {

            allBoxes[firstBox].style.background = "#1e3a8a";

            allBoxes[secondBox].style.background = "#1e3a8a";

            allBoxes[thirdBox].style.background = "#1e3a8a";

            return true;
        }
    }

    return false;
}

function checkDraw() {

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            return false;
        }
    }

    return true;
}

function disableBoard() {

    for (let i = 0; i < allBoxes.length; i++) {

        allBoxes[i].style.pointerEvents = "none";

    }
}

function enableBoard() {

    for (let i = 0; i < allBoxes.length; i++) {

        allBoxes[i].style.pointerEvents = "auto";

    }
}

restartBtn.onclick = function () {

    board = ["", "", "", "", "", "", "", "", ""];

    gameRunning = true;

    statusText.innerText = "Your Turn";

    for (let i = 0; i < allBoxes.length; i++) {

        allBoxes[i].innerText = "";

        allBoxes[i].classList.remove("x-style");

        allBoxes[i].classList.remove("o-style");

        allBoxes[i].style.background = "#1e293b";
    }
};