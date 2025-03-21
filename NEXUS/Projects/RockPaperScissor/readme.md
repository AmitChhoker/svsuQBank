// Select elements
const choices = document.querySelectorAll(".choice");
const startBtn = document.getElementById("start-btn");
const winnerDisplay = document.getElementById("winner");
const player1Text = document.getElementById("player1");
const player2Text = document.getElementById("player2");

let player1Choice = "";
let player2Choice = "";

// Function to determine the winner
function getWinner(p1, p2) {
    if (p1 === p2) return "It's a Tie! 😃";
    if ((p1 === "rock" && p2 === "scissor") ||
        (p1 === "scissor" && p2 === "paper") ||
        (p1 === "paper" && p2 === "rock")) {
        return "Player 1 Wins! 🎉";
    }
    return "Player 2 Wins! 🎉";
}

// Handle player choice selection
choices.forEach(choice => {
    choice.addEventListener("click", (event) => {
        const selectedChoice = event.target.getAttribute("data-choice");

        // If Player 1 hasn't chosen, assign to Player 1
        if (!player1Choice) {
            player1Choice = selectedChoice;
            player1Text.textContent = `Player 1: ${player1Choice}`;
        } 
        // Otherwise, assign to Player 2
        else if (!player2Choice) {
            player2Choice = selectedChoice;
            player2Text.textContent = `Player 2: ${player2Choice}`;
        }
    });
});

// Add event listener to Start button
startBtn.addEventListener("click", function() {
    if (player1Choice && player2Choice) {
        const result = getWinner(player1Choice, player2Choice);
        winnerDisplay.textContent = result;
    } else {
        winnerDisplay.textContent = "Both players must choose! ⚠️";
    }

    // Reset selections for the next round
    player1Choice = "";
    player2Choice = "";
    player1Text.textContent = "Player 1: ";
    player2Text.textContent = "Player 2: ";
});
