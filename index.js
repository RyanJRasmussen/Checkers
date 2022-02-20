//piece position representations
let startingPositions = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]
]



//reset button logic

// let resetButton = document.querySelector('button')
// resetButton.onclick = function(){
//     for (let i = 0; i < allSquares.length; i++) {        
//         allSquares[i].innerHTML = ''
//     }
//     setBoard()
// }

let activePositions = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]
]

let boardPositions = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
]

//function to create a new div with class piece, color and position to be determined by 2D array above
function makePiece(squareID, color){
    let newPiece = document.createElement('div')
    newPiece.setAttribute('id', 'piece')
    newPiece.setAttribute('class', color)
    newPiece.setAttribute('draggable', 'true')
    newPiece.setAttribute('ondragstart', '"event.dataTransfer.setData("text/plain", null)"')
    let selectedSquare = document.getElementById(squareID)
    selectedSquare.appendChild(newPiece)
}   

function setBoard(){
    for (let i = 0; i < 8; i++) {
        for (let e = 0; e < 8; e++) {
            let position = boardPositions[i][e];
            if(0 < startingPositions[i][e] && startingPositions[i][e] === 1){
                makePiece(position, 'black');
            } else if(startingPositions[i][e] === 2){
                makePiece(position, 'red')
            }
        }
    }
}
setBoard()




let redScore = 0;
let blackScore = 0;



let blacksTurn = true;
let allPieces = document.getElementsByClassName('pieces')
let redPieces = document.querySelectorAll(".red");
let blackPieces = document.querySelectorAll(".black");
let turntracker = document.querySelector('#turntracker');


function changeTurn(){
    if(blacksTurn === true){
        turntracker.textContent = "Black's turn"
        for (let i = 0; i < redPieces.length; i++){
            blackPieces[i].setAttribute('draggable', 'true')
            redPieces[i].setAttribute('draggable', 'false')
        }
        blacksTurn = false
    } else {
        for(let i = 0; i < blackPieces.length; i++){
            turntracker.textContent = "Red's turn"
            redPieces[i].setAttribute('draggable', 'true')
            blackPieces[i].setAttribute('draggable', 'false')
        }
        blacksTurn = true
    }
}
changeTurn()




let movedPiece;
    
//creating drag event
//the next 3 listeners will affect the pieces themselves

document.addEventListener("drag", (event) => {
event.target.style.backgroundColor = "grey"
}, false)


//at the beginning of a drag event, the target of the event is changed to the color green
document.addEventListener("dragstart", (event) => {
    movedPiece = event.target;
    event.target.style.opacity = "0.2"

}, false)

document.addEventListener("dragend", (event) => {
    event.target.style.opacity = "1"
    event.target.style.backgroundColor = ''
}, false)



//this stuff will happen to the squares the pieces are placed on/in

document.addEventListener("dragover", (event) => {
    // allows piece to be dropped onto a square
    event.preventDefault();
}, false);

document.addEventListener("dragenter", (event) => {
    // change the squares color when hovered over
    // only allows hover events if the square is empty
    let originalSquare = movedPiece.parentNode
    let chosenSquare = event.target

    if(chosenSquare.classList.contains("black-square") && chosenSquare.innerHTML === ""){
        if(limitMoves(chosenSquare, originalSquare, movedPiece)){
            chosenSquare.style.backgroundColor = "green"
        }
    }
}, false)

document.addEventListener("dragleave", (event) => {
    //change square color back to default when the selected piece leaves it
    if(event.target.classList.contains("black-square")){
            event.target.style.backgroundColor = "";
    }
}, false);


let movedPieceID;
let row;
let allSquares = document.getElementsByClassName('square')



//function to change 2d array each time a move is made

function changeActiveLayout(chosenSquare, originalSquare){

    for (let i = 0; i < 8; i++) {
        for (let e = 0; e < 8; e++) {
    if(blacksTurn){
                if(chosenSquare.id === boardPositions[i][e]){
                    activePositions[i][e] = 2
                }
    } else {
                if(chosenSquare.id === boardPositions[i][e]){
                    activePositions[i][e] = 1
                }
            }
        if(originalSquare.id === boardPositions[i][e]){
            activePositions[i][e] = 0;
            }
        }
    }
}

// function checkMoveLegality(chosenSquare, originalSquare){
//     if(movedPiece.classList.contains('king')){

//     } else if(movedPiece.classList.contains('black')){
        
//         for (let i = 0; i < array.length; i++) {
//             for (let e = 0; e < array.length; e++) {
//                 let chosenSquare.id === boardPositions[i][e]
//             }
//         }
//     } else {

//     }
// }


function findChosenSquareCoordinates(chosenSquare){
    let x;
    let y;
    for (let i = 0; i < 8; i++) {
        for (let e = 0; e < 8; e++) {
            if(chosenSquare.id === boardPositions[i][e]){
                x = e;
                y = i;
            }
        }
    }
    return [x, y]
}

function findOriginalSquareCoordinates(originalSquare){
    let a;
    let b;
    for (let i = 0; i < 8; i++) {
        for (let e = 0; e < 8; e++) {
            if(originalSquare.id === boardPositions[i][e]){
                a = e;
                b = i;
            }
        }
    }
    return [a, b]
}

function kingMe(chosenSquare){
    if(movedPiece.classList.contains("red") && chosenSquare.classList.contains("row1") && !movedPiece.classList.contains("king")){
        movedPiece.classList.add("king")
    } else if (movedPiece.classList.contains("black") && chosenSquare.classList.contains("row8") && !movedPiece.classList.contains("king")){
        movedPiece.classList.add("king")
    }
}

function differentColor(chosenSquare){
    findChosenSquareCoordinates(chosenSquare)
    // if same color, return true
}


function limitMoves(chosenSquare, originalSquare, movedPiece){

//coordinates to compare
    let originalCoords = findOriginalSquareCoordinates(originalSquare)
    let newCoords = findChosenSquareCoordinates(chosenSquare)

    if(movedPiece.classList.contains('king')){
        if((originalCoords[1] === newCoords[1] - 1 || originalCoords[1] === newCoords[1] + 1) 
        && 
        (originalCoords[0] === newCoords[0] - 1 || originalCoords[0] === newCoords[0] + 1 )){
            return true
        } else if(originalCoords[1] === newCoords[1] - 2 || originalCoords[1] === newCoords[1] + 2 
            && (originalCoords[0] === newCoords[0] - 2 || originalCoords[0] === newCoords[0] + 2 ))
            {
            return true
        }
    } else if(movedPiece.classList.contains('black')){
        if(originalCoords[1] === newCoords[1] + 1 && (newCoords[0] === originalCoords[0] + 1 || newCoords[0] === originalCoords[0] -1)){
            return true
        }
    } else {
        if(originalCoords[1] === newCoords[1] - 1 
            && (newCoords[0] === originalCoords[0] + 1 
            || newCoords[0] === originalCoords[0] -1)){
            return true
        }
    }
}


function movePieceToNewDiv(chosenSquare, originalSquare){
    chosenSquare.style.backgroundColor = "";
    changeActiveLayout(chosenSquare, originalSquare)
    originalSquare.removeChild(movedPiece)
    chosenSquare.append(movedPiece)
}



document.addEventListener("drop", (event) => {
    // event.preventDefault();
    let originalSquare = movedPiece.parentNode
    let chosenSquare = event.target

    if(chosenSquare.classList.contains("black-square") && chosenSquare.innerHTML === ""){
        if(limitMoves(chosenSquare, originalSquare, movedPiece)){
            movePieceToNewDiv(chosenSquare, originalSquare)
            kingMe(chosenSquare)
            changeTurn()
        }
    }
}, false);