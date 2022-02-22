// // class Piece{
// //     constructor(color, location, isKing, isCaptured, id){
// //         this.color = color;
// //         this.location = location;
// //         this.isKing = isKing;
// //         this.isCaptured = isCaptured;
// //         this.id = id;

// //         function getAvailableSquares(){}
// //         function promoteToKing(){}
// //         function capture(){}
// //     }
// // }

// // class Player {
// //     constructor(score, color){}
// // }



// // let allPieces = [];

// // let pawn1 = new Piece('blue', 'a1', false, false, 1);




// function getMiddleSquareId(originalCoords, newCoords){
//     let middleSquareCoords = [(originalCoords[0] + newCoords[0])/2, (originalCoords[1] + newCoords[1])/2]
//     let middleSquareId = boardPositions[middleSquareCoords[1]][middleSquareCoords[0]]
//     return middleSquareId
// }

// function middleSquareDifferentColor(originalCoords, newCoords){
//     let middleSquare = document.getElementById(getMiddleSquareId(originalCoords, newCoords))
//     if(middleSquare.childElement.classList.contains('red') && movedPiece.classList.contains('black')){
//         return true
//     } else if(middleSquare.childElement.classList.contains('black') && movedPiece.classList.contains('red')){
//         return true
//     }
// }


// //Not DRY, how to check colors without making a new function???
// function limitColors(chosenSquare, originalSquare){
//     let originalCoords = findOriginalSquareCoordinates(originalSquare)
//     let newCoords = findChosenSquareCoordinates(chosenSquare)

//     if(movedPiece.classList.contains('king')){
//         if((originalCoords[1] === newCoords[1] - 1 || originalCoords[1] === newCoords[1] + 1) 
//         && 
//         (originalCoords[0] === newCoords[0] - 1 || originalCoords[0] === newCoords[0] + 1 )){
//             return true
//         } else if(originalCoords[1] === newCoords[1] - 2 || originalCoords[1] === newCoords[1] + 2 
//             && (originalCoords[0] === newCoords[0] - 2 || originalCoords[0] === newCoords[0] + 2) &&
//             middleSquareDifferentColor(originalCoords, newCoords))
//         {
//             return true
//         }
//     } else if(movedPiece.classList.contains('black')){
//         if(originalCoords[1] === newCoords[1] + 1 
//             && (newCoords[0] === originalCoords[0] + 1 
//             || newCoords[0] === originalCoords[0] -1)){
//             return true
//         } else if(originalCoords[1] === newCoords[1] + 2 
//             && (originalCoords[0] === newCoords[0] - 2 
//             || originalCoords[0] === newCoords[0] + 2) 
//             && middleSquareDifferentColor(originalCoords, newCoords)){
//             return true
//         }
//     } else {
//         if(originalCoords[1] === newCoords[1] - 1 
//             && (newCoords[0] === originalCoords[0] + 1 
//             || newCoords[0] === originalCoords[0] -1)){
//             return true
//         } else if(originalCoords[1] === newCoords[1] - 2 
//             && (originalCoords[0] === newCoords[0] - 2 
//             || originalCoords[0] === newCoords[0] + 2) 
//             && middleSquareDifferentColor(originalCoords, newCoords)){
//             return true
//         }
//     }
// }



// function limitMoves(chosenSquare, originalSquare){
//     let originalCoords = findOriginalSquareCoordinates(originalSquare)
//     let newCoords = findChosenSquareCoordinates(chosenSquare)

//     if(movedPiece.classList.contains('king')){
//         if((originalCoords[1] === newCoords[1] - 1 || originalCoords[1] === newCoords[1] + 1) 
//         && 
//         (originalCoords[0] === newCoords[0] - 1 || originalCoords[0] === newCoords[0] + 1 )){
//             return true
//         } else if(originalCoords[1] === newCoords[1] - 2 || originalCoords[1] === newCoords[1] + 2 
//             && (originalCoords[0] === newCoords[0] - 2 || originalCoords[0] === newCoords[0] + 2) &&
//             middleSquareDifferentColor(originalCoords, newCoords))
//         {
//             let middleSquare = document.getElementById(getMiddleSquareId(originalCoords, newCoords))
//             middleSquare.innerHTML = ""
//             return true
//         }
//     } else if(movedPiece.classList.contains('black')){
//         if(originalCoords[1] === newCoords[1] + 1 
//             && (newCoords[0] === originalCoords[0] + 1 
//             || newCoords[0] === originalCoords[0] -1)){
//             return true
//         } else if(originalCoords[1] === newCoords[1] + 2 
//             && (originalCoords[0] === newCoords[0] - 2 
//             || originalCoords[0] === newCoords[0] + 2) && middleSquareDifferentColor(originalCoords, newCoords)){
//                 let middleSquare = document.getElementById(getMiddleSquareId(originalCoords, newCoords))
//                 middleSquare.innerHTML = ""
//                 blackScore += 1
//                 return true
//         }
//     } else {
//         if(originalCoords[1] === newCoords[1] - 1 
//             && (newCoords[0] === originalCoords[0] + 1 
//             || newCoords[0] === originalCoords[0] -1)){
//             return true
//         } else if(originalCoords[1] === newCoords[1] - 2 
//             && (originalCoords[0] === newCoords[0] - 2 
//             || originalCoords[0] === newCoords[0] + 2) && middleSquareDifferentColor(originalCoords, newCoords)){
//             let middleSquare = document.getElementById(getMiddleSquareId(originalCoords, newCoords))
//             middleSquare.innerHTML = ""
//             redScore += 1
//             return true
//         }
//     }
// }