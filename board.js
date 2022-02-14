// let chessBoard = document.querySelector('#chessBoard')
// chessBoard.style.display = 'inline-flex'
// let coordinateLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
// let coordinateNumbers = [8,7,6,5,4,3,2,1]

// function makeChessBoard(){
//     for (let i = 0; i < 8; i++) {
//         let row = document.createElement('div')
//         row.style.display = 'flex'
//         row.style.flexWrap = 'wrap'
//         row.setAttribute('class', 'row')
//         row.style.width = '800px'
//         for(let e = 0; e < 8; e++){
//             let square = document.createElement('div')
//             //square id/class. How to get A1-H8?
//             square.style.width = '100px'
//             square.style.height = '100px'

//             if(e % 2 === 0){
//                 square.style.backgroundColor = 'white'
//             } else {
//                 square.style.backgroundColor = 'black'
//             }
//             square.setAttribute('class', 'chessSquare')
//             square.setAttribute('id', coordinateLetters[i] + coordinateNumbers[e])
//             row.append(square)
//         }
//         chessBoard.appendChild(row)
//     }
// }
// makeChessBoard()



// for (let e = 0; e < array.length; e++) {
//     let testRow = document.createElement('div')
//     testRow.style.display = 'flex'
//     testRow.style.width = '800px'
//     testRow.style.height = '100px'
//     for (let i = 0; i < 8; i++) {
//         let testSquare = document.createElement('div')
//         testSquare.style.width = '100px'
//         testSquare.style.width = '100px'
//         if(i % 2 === 1){
//             testSquare.style.backgroundColor = 'black'
//         } else {
//             testSquare.style.backgroundColor = 'white'
//         }
//         testRow.append(testSquare)
//     }
//     chessBoard.append(testRow)
// }