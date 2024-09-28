window.onload = function() {
    // Retrieve player data from local storage
    const player1Name = localStorage.getItem('player1Name');
    const player2Name = localStorage.getItem('player2Name');
    const player1Symbol = localStorage.getItem('player1Symbol');
    const player2Symbol = localStorage.getItem('player2Symbol');
    
    let currentTurn = 0;
    let mat = [["", "", ""], ["", "", ""], ["", "", ""]];
    const box = document.getElementsByClassName("box");
    const winnerDisplay = document.getElementById('winnerDisplay');

    winnerDisplay.textContent = `${player1Name} vs. ${player2Name}: Game started!`;

    // Add event listeners to each box for the player's move
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`b${i * 3 + j + 1}`).addEventListener('click', () => move(document.getElementById(`b${i * 3 + j + 1}`), i, j));
        }
    }

    function move(box, i, j) {
        if (mat[i][j] === "") {
            let currentPlayerName = currentTurn % 2 === 0 ? player1Name : player2Name;
            let currentPlayerSymbol = currentTurn % 2 === 0 ? player1Symbol : player2Symbol;

            // Update UI and game state
            box.textContent = currentPlayerSymbol;
            mat[i][j] = currentPlayerSymbol;
            box.style.fontSize = "50px";
            currentTurn++;

            // Check if the current move results in a winner
            if (checkWinner()) {
                winnerDisplay.textContent = `${currentPlayerName} wins!`;
                disableBoard();
            } else if (currentTurn === 9) {
                winnerDisplay.textContent = "It's a tie! Game Over.";
                resetBoard();
            }
        }
    }

    function checkWinner() {
        // Check rows, columns, and diagonals for a winner
        for (let i = 0; i < 3; i++) {
            // Check rows
            if (mat[i][0] === mat[i][1] && mat[i][1] === mat[i][2] && mat[i][0] !== "") {
                return true;
            }
            // Check columns
            if (mat[0][i] === mat[1][i] && mat[1][i] === mat[2][i] && mat[0][i] !== "") {
                return true;
            }
        }
        // Check diagonals
        if (mat[0][0] === mat[1][1] && mat[1][1] === mat[2][2] && mat[0][0] !== "") {
            return true;
        }
        if (mat[0][2] === mat[1][1] && mat[1][1] === mat[2][0] && mat[0][2] !== "") {
            return true;
        }
        return false;
    }

    function disableBoard() {
        // Disable all boxes after game over
        for (let i = 0; i < 9; i++) {
            box[i].style.pointerEvents = "none";
        }
    }

    function resetBoard() {
        setTimeout(() => {
            mat = [["", "", ""], ["", "", ""], ["", "", ""]];
            for (let i = 0; i < 9; i++) {
                box[i].textContent = "";
                box[i].style.pointerEvents = "auto";
            }
            winnerDisplay.textContent = `${player1Name} vs. ${player2Name}: New Game!`;
            currentTurn = 0;
        }, 3000); // Restart game after 3 seconds
    }
};
