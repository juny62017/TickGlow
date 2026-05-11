let allBoxes = document.querySelectorAll(".box");

let statusText = document.querySelector(".status-text");

let restartBtn = document.querySelector(".restart-btn");

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameRunning = true;

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

    statusText.innerText = "Your Turn";

    enableBoard();
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

    }
};