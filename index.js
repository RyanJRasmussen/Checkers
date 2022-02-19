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
let selectedPiece;


let blacksTurn = true;
let redPieces = document.querySelectorAll(".red");
let blackPieces = document.querySelectorAll(".black");
let turntracker = document.querySelector('#turntracker');

function changeTurn(){

    if(blacksTurn === true){
        turntracker.textContent = "Black's Turn"
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

    if(event.target.classList.contains("black-square")){
        if(event.target.innerHTML === ""){
            event.target.style.backgroundColor = "green"
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
let previousSquare;
let chosenPiecePosition;
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



document.addEventListener("drop", (event) => {
    event.preventDefault();
    let originalSquare = movedPiece.parentNode
    let chosenSquare = event.target
    // move piece to the div of the square it is dropped onto
    if(event.target.classList.contains("black-square")){
            event.target.style.backgroundColor = "";
            if(event.target.innerHTML === ""){
                changeActiveLayout(chosenSquare, originalSquare)
                console.log(activePositions)

                movedPiece.parentNode.removeChild(movedPiece)
                event.target.append(movedPiece)
                changeTurn()
            }
    }

}, false);