// document.addEventListener("DOMContentLoaded", () => {
//     let player1Choice = "";
//     let player2Choice = "";
    
//     // Select all choices and the start button
//     const choices = document.querySelectorAll(".choice");
//     const startBtn = document.getElementById("start-btn");
//     const winnerDisplay = document.getElementById("winner");

//     // Function to get the winner
//     function getWinner(p1, p2) {
//         if (p1 === p2) return "It's a Tie! 😃";
//         if ((p1 === "rock" && p2 === "scissor") ||
//             (p1 === "scissor" && p2 === "paper") ||
//             (p1 === "paper" && p2 === "rock")) 
//         {
//             return "Player 1 Wins! 🎉";
//         }
//         return "Player 2 Wins! 🎉";
//     }

//     // Handle player selection
//     choices.forEach(choice => {
//         choice.addEventListener("click", (event) => {
//             const selectedChoice = event.target.getAttribute("data-choice");

//             // If Player 1 hasn't selected, assign to Player 1
//             if (!player1Choice) {
//                 player1Choice = selectedChoice;
//                 document.getElementById("player1").textContent = `Player 1: ${player1Choice}`;
//             } 
//             // Otherwise, assign to Player 2
//             else if (!player2Choice) {
//                 player2Choice = selectedChoice;
//                 document.getElementById("player2").textContent = `Player 2: ${player2Choice}`;
//             }
//         });
//     });



document.addEventListener("DOMContentLoaded", () => {
    let player1Choice = "";
    let player2Choice = "";

    // Select all choices and the start button
    const choices = document.querySelectorAll(".choice");
    const startBtn = document.getElementById("start-btn");
    const winnerDisplay = document.getElementById("winner");

    // Function to get the winner
    function getWinner(p1, p2) {
      if (p1 === p2) {
        return "It's a Tie! 😃";
      }
      if (
        (p1 === "rock" && p2 === "scissors") ||
        (p1 === "scissors" && p2 === "paper") ||
        (p1 === "paper" && p2 === "rock")) 
      {
        return "Player 1 Wins! 🎉";
      }
      return "Player 2 Wins! 🎉";
    }

    // Handle player selection
    choices.forEach((choice) => {
      choice.addEventListener("click", (event) => {
        const selectedChoice = event.target.getAttribute("data-choice");

        // If Player 1 hasn't selected, assign to Player 1
        if (!player1Choice) {
          player1Choice = selectedChoice;
          document.getElementById("player1").textContent = `Player 1: ${player1Choice}`;
        }
        // Otherwise, assign to Player 2
        else if (!player2Choice) {
          player2Choice = selectedChoice;
          document.getElementById("player2").textContent = `Player 2: ${player2Choice}`;
        }
      });
    });

    // Start button logic
    startBtn.addEventListener("click", () => {
      if (player1Choice && player2Choice) {
        // Call the getWinner function to determine the result
        const result = getWinner(player1Choice, player2Choice);
        winnerDisplay.textContent = result;

        // Log the values for debugging
        console.log("Player 1 Choice:", player1Choice);
        console.log("Player 2 Choice:", player2Choice);

        // Reset choices after a short delay
        setTimeout(() => {
          player1Choice = "";
          player2Choice = "";
          document.getElementById("player1").textContent = "Player 1: ";
          document.getElementById("player2").textContent = "Player 2: ";
        }, 2000); // 2 seconds delay before resetting
      } else {
        winnerDisplay.textContent = "Both players must choose! ⚠️";
      }
    });
  });





//     // Start button logic
//     startBtn.addEventListener("click", () => {
//         if (player1Choice && player2Choice) {
//             const result = getWinner(player1Choice, player2Choice);
//             winnerDisplay.textContent = result;
//         } else {
//             winnerDisplay.textContent = "Both players must choose! ⚠️";
//         }

//         // Reset selections
//         player1Choice = "";
//         player2Choice = "";
//         document.getElementById("player1").textContent = "Player 1: ";
//         document.getElementById("player2").textContent = "Player 2: ";
//     });
// });



// Select elements
// const choices = document.querySelectorAll(".choice");
// const startBtn = document.getElementById("start-btn");
// const winnerDisplay = document.getElementById("winner");
// const player1Text = document.getElementById("player1");
// const player2Text = document.getElementById("player2");

// let player1Choice = "";
// let player2Choice = "";

// // Function to determine the winner
// function getWinner(p1, p2) {
//     if (p1 === p2) return "It's a Tie! 😃";
//     if ((p1 === "rock" && p2 === "scissor") ||
//         (p1 === "scissor" && p2 === "paper") ||
//         (p1 === "paper" && p2 === "rock")) 
//     {
//         return "Player 1 Wins! 🎉";
//     }
//     return "Player 2 Wins! 🎉";
// }

// // Handle player choice selection
// choices.forEach(choice => {
//     choice.addEventListener("click", (event) => {
//         const selectedChoice = event.target.getAttribute("data-choice");

//         // If Player 1 hasn't chosen, assign to Player 1
//         if (!player1Choice) {
//             player1Choice = selectedChoice;
//             player1Text.textContent = `Player 1: ${player1Choice}`;
//         } 
//         // Otherwise, assign to Player 2
//         else if (!player2Choice) {
//             player2Choice = selectedChoice;
//             player2Text.textContent = `Player 2: ${player2Choice}`;
//         }
//     });
// });

// // Add event listener to Start button
// startBtn.addEventListener("click", function() {
//     if (player1Choice && player2Choice) {
//         const result = getWinner(player1Choice, player2Choice);
//         winnerDisplay.textContent = result;
//     } else {
//         winnerDisplay.textContent = "Both players must choose! ⚠️";
//     }

//     // Reset selections for the next round
//     player1Choice = "";
//     player2Choice = "";
//     player1Text.textContent = "Player 1: ";
//     player2Text.textContent = "Player 2: ";
// });



// const player1=document.getElementById('player1');
// const player2=document.getElementById('player2');

// let player1Choice = "";
// let player2Choice = "";

// //How to get Winner by logic
// function getWinner(p1,p2){
//     if(p1===p2)
//     {
//         return "It's Tie!";
//     }
//     if ((p1 === "rock" && p2 === "scissor") || (p1 === "scissor" && p2 === "paper") ||(p1 === "paper" && p2 === "rock")) 
//     {
//         return "Player 1 Wins!";
//     }
//     return "Player 2 Wins!";
// }

// //Handle the Choices of both players
// const choices=document.querySelector('.choice');
// const winner=document.getElementById('winner');
// choices.forEach((choice)=>{
//     choice.addEventListener('click',(event)=>{
//         const selected=event.target.getAttribute('data-choice');

//         if(!player1Choice) 
//         {
//             player1Choice = selected;
//             player1.textContent = `Player 1: ${player1Choice}`;
//         } 
//         else if(!player2Choice) 
//         {
//             player2Choice = selected;
//             player2.textContent = `Player 2: ${player2Choice}`;
//         }
//     });
// });

// const startbtn=document.getElementById('start-btn');
// startbtn.addEventListener('click',function(){
//     if(player1Choice && player2Choice)
//     {
//         const result = getWinner(player1Choice, player2Choice);
//         winner.textContent = result;
//     }
//     else 
//     {
//         winner.textContent = "Both players must choose! ⚠️";
//     }

//     player1Choice = "";
//     player2Choice = "";
//     player1.textContent = "Player 1: ";
//     player2.textContent = "Player 2: ";
// });
