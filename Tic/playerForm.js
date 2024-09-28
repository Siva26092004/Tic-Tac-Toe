document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const player1Name = document.getElementById('player1Name').value;
    const playerSymbol = document.getElementById('playerSymbol').value;
    const player2Name = document.getElementById('player2Name').value;
    const player1Symbol = playerSymbol;
    const player2Symbol = playerSymbol === 'X' ? 'O' : 'X';

    // Save player details to local storage to pass them to the game page
    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player2Name', player2Name);
    localStorage.setItem('player1Symbol', player1Symbol);
    localStorage.setItem('player2Symbol', player2Symbol);

    // Redirect to the game page
    window.location.href = "gamePage.html";
});
