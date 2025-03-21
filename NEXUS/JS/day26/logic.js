let turn = 'O';
let total_turn = 0;

let winner = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let board_array = new Array(9).fill('E');

// Function to check winner
function checkWinner() {
    for (let [index0, index1, index2] of winner) {
        if (board_array[index0] !== 'E' && board_array[index0] === board_array[index1] && board_array[index1] === board_array[index2]) {
            return true;
        }
    }
    return false;
}

// Function to update player highlight
function updatePlayerIndicator() {
    let player1 = document.getElementById('player1');
    let player2 = document.getElementById('player2');

    if (turn === 'O') {
        player1.classList.add('active');
        player2.classList.remove('active');
    } else {
        player1.classList.remove('active');
        player2.classList.add('active');
    }
}

// Function to handle cell click
const printer = (event) => {
    const element = event.target;

    if (board_array[element.id] === 'E') {
        total_turn++;

        element.innerHTML = turn;
        board_array[element.id] = turn;

        if (checkWinner()) {
            document.getElementById('winning-message').innerHTML = `Winner is ${turn}`;
            board.removeEventListener('click', printer);
            return;
        }

        // Toggle turn
        turn = (turn === 'O') ? 'X' : 'O';
        updatePlayerIndicator();
    }

    if (total_turn == 9) {
        document.getElementById('winning-message').innerHTML = "Draw!";
    }
};

// Initialize board click listener
const board = document.querySelector('.board');
board.addEventListener('click', printer);

// Restart button logic
const Restart = document.getElementById('restartButton');
Restart.addEventListener('click', () => {
    const cell = document.getElementsByClassName('cell');
    Array.from(cell).forEach((value) => {
        value.innerHTML = '';
    });

    turn = 'O';
    total_turn = 0;
    board_array = new Array(9).fill('E');
    document.getElementById('winning-message').innerHTML = "";
    board.addEventListener('click', printer);

    // Reset player highlight
    updatePlayerIndicator();
});

// Set initial player highlight
updatePlayerIndicator();



// let turn='O';
// let total_turn=0;


// let winner=[
//     [0,1,2],[3,4,5],[6,7,8],
//     [0,3,6],[1,4,7],[2,5,8], 
//     [0,4,8],[2,4,6]
// ];
// let board_array=new Array(9).fill('E');
// function checkWinner()
// {
//     for(let [index0,index1,index2] of winner)
//     {
//         if(board_array[index0]!='E' && board_array[index0]===board_array[index1] && board_array[index1]===board_array[index2])
//         {
//             return 1;
//         }
//     }
//     return 0;
// }

// //print ho
// const printer=(event)=>{
//     const element= event.target;

//     if(board_array[element.id]==='E')
//     {
//         total_turn++;
//     if(turn==='O')
//     {
//         element.innerHTML='O';
//         board_array[element.id]='O';
//         if(checkWinner())
//         {
//             document.getElementById('winning-message').innerHTML="Winner is O";
//             board.removeEventListener('click',printer);
//             return;
//         }
//         turn='X';
//     }
//     else{
//         element.innerHTML='X';
//         board_array[element.id]='X';
//         if(checkWinner())
//         {
//             document.getElementById('winning-message').innerHTML="Winner is X";
//             board.removeEventListener('click',printer);
//             return;
//         }
//         turn='O';
//     }
//     if(total_turn==9)
//     {
//         document.getElementById('winning-message').innerHTML="Draw!";
//     }
//     }
// }



// const board=document.querySelector('.board');
// board.addEventListener('click',printer);


// const Restart=document.getElementById('restartButton');
// Restart.addEventListener('click',()=>{
//     const cell=document.getElementsByClassName('cell');
//     Array.from(cell).forEach((value)=>{
//         value.innerHTML='';
//     })


//     turn='O';
//     total_turn=0;
//     board_array=new Array(9).fill('E');
//     document.getElementById('winning-message').innerHTML="";
//     board.addEventListener('click',printer);

// })