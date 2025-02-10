const gameboard = document.querySelector('#gameboard');
const playerDisplay = document.querySelector('#player');
const infoDisplay = document.querySelector('#infoDisplay');
let playerGo = 'black';
playerDisplay.textContent = 'black';

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook   
]

function createBoard(){
    startPieces.forEach( (startPiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startPiece;
        square.firstChild?.setAttribute('draggable', true);
        square.setAttribute('square_id', i);
        // square.classList.add('beige');
        const row = Math.floor((63-i) / 8) + 1;
        if (row % 2 === 0){
            square.classList.add(i%2=== 0 ? "beige" : "brown");
        }
        else{
            square.classList.add(i%2=== 0 ? "brown" : "beige");
        }

        if( i <= 15){
            square.firstChild.firstChild.classList.add('black');
        }

        if( i >= 48){
            square.firstChild.firstChild.classList.add('white');
        }

        gameboard.append(square);
    })
}

createBoard();

const allSquares = document.querySelectorAll("#gameboard .square");

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop);
});

let startPositionId 
let draggedElem

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square_id');
    draggedElem = e.target;
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e){
    e.stopPropagation()
    const correctGo = draggedElem.firstChild.classList.contains(playerGo);
    const taken = e.target.classList.contains('piece');
    const validMove = checkIfValid(e.target);
    const oppGo = playerGo === 'white' ? 'black' : 'white';
    const takenByOpp = e.target.firstChild?.classList.contains(oppGo);

    if(correctGo){
        if(takenByOpp && validMove) {
            e.target.parentNode.append(draggedElem);
            e.target.remove();
            checkForWin();
            changePlayer();
            return
        }
        if(taken && !takenByOpp){
            infoDisplay.textContent = "invalid move";
            setTimeout(() => infoDisplay.textContent = "", 2000);
            return;
        }
        if(validMove){
            e.target.append(draggedElem);
            checkForWin();
            changePlayer();
        }
    }
}

function changePlayer(){
    if(playerGo === "black"){
        reverseIDs()
        playerGo = "white";
        playerDisplay.textContent = 'white';
    }
    else{
        revertIDs()
        playerGo = "black";
        playerDisplay.textContent = 'black';
    }
}

function checkIfValid(target){
    const targetID = Number(target.getAttribute('square_id')) || Number(target.parentNode.getAttribute('square_id'));
    const startID = Number(startPositionId)
    const piece = draggedElem.id;
    console.log(targetID)
    console.log(startID)
    console.log(piece)

    switch(piece) {
        case 'pawn': 
            const startRow = [8,9,10,11,12,13,14,15];
            if(
                startRow.includes(startID) && startID + 8*2 === targetID ||
                startID + 8 === targetID && !document.querySelector(`[square_id="${startID + 8}"]`).firstChild ||
                startID + 8 - 1 === targetID && document.querySelector(`[square_id="${startID + 8 - 1}"]`).firstChild ||
                startID + 8 + 1 === targetID && document.querySelector(`[square_id="${startID + 8 + 1}"]`).firstChild
              ) 
              { 
                return true;
            }
            break;
        case 'knight':
            if(
                startID + 8 * 2 - 1 === targetID ||
                startID + 8 * 2 + 1 === targetID ||
                startID - 8 * 2 - 1 === targetID ||
                startID - 8 * 2 + 1 === targetID ||
                startID + 8 - 2 === targetID ||
                startID + 8 + 2 === targetID ||
                startID - 8 - 2 === targetID ||
                startID - 8 + 2 === targetID 
            )
            {
                return true;
            }
            break;
        case 'bishop':
            if(
                startID + 8 + 1 === targetID ||
                startID + 8 *2 + 2 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild ||
                startID + 8 *3 + 3 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 + 2}"]`).firstChild ||
                startID + 8 *4 + 4 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 + 3}"]`).firstChild ||
                startID + 8 *5 + 5 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 + 4}"]`).firstChild ||
                startID + 8 *6 + 6 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5 + 5}"]`).firstChild ||  
                startID + 8 *7 + 7 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5 + 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*6 + 6}"]`).firstChild ||
                
                startID - 8 - 1 === targetID ||
                startID - 8 *2 - 2 === targetID &&  !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild ||
                startID - 8 *3 - 3 === targetID && !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 - 2}"]`).firstChild ||
                startID - 8 *4 - 4 === targetID && !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 - 3}"]`).firstChild ||
                startID - 8 *5 - 5 === targetID && !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 - 4}"]`).firstChild ||
                startID - 8 *6 - 6 === targetID && !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5 - 5}"]`).firstChild ||  
                startID - 8 *7 - 7 === targetID && !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5 - 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*6 - 6}"]`).firstChild ||

                startID - 8 + 1 === targetID ||
                startID - 8 *2 + 2 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild ||
                startID - 8 *3 + 3 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 + 2}"]`).firstChild ||
                startID - 8 *4 + 4 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 + 3}"]`).firstChild ||
                startID - 8 *5 + 5 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 + 4}"]`).firstChild ||
                startID - 8 *6 + 6 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5 + 5}"]`).firstChild ||  
                startID - 8 *7 + 7 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5 + 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*6 + 6}"]`).firstChild ||
                
                startID + 8 - 1 === targetID ||
                startID + 8 *2 - 2 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild ||
                startID + 8 *3 - 3 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 - 2}"]`).firstChild ||
                startID + 8 *4 - 4 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 - 3}"]`).firstChild ||
                startID + 8 *5 - 5 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 - 4}"]`).firstChild ||
                startID + 8 *6 - 6 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5 - 5}"]`).firstChild ||  
                startID + 8 *7 - 7 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5 - 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*6 - 6}"]`).firstChild
            )
            {
                return true;
            }
            break;
        case 'rook':
            if(
                startID + 8 == targetID ||
                startID + 8*2 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild ||
                startID + 8*3 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2}"]`).firstChild ||
                startID + 8*4 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3}"]`).firstChild ||
                startID + 8*5 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4}"]`).firstChild ||
                startID + 8*6 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5}"]`).firstChild ||  
                startID + 8*7 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*6}"]`).firstChild ||
                
                startID - 8 == targetID ||
                startID - 8*2 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild ||
                startID - 8*3 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2}"]`).firstChild ||
                startID - 8*4 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3}"]`).firstChild ||
                startID - 8*5 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4}"]`).firstChild ||
                startID - 8*6 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5}"]`).firstChild ||  
                startID - 8*7 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*6}"]`).firstChild ||
                
                startID + 1 == targetID ||
                startID + 2 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild ||
                startID + 3 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 2}"]`).firstChild ||
                startID + 4 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 3}"]`).firstChild ||
                startID + 5 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 4}"]`).firstChild ||
                startID + 6 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 5}"]`).firstChild ||  
                startID + 7 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 6}"]`).firstChild ||
                
                startID - 1 == targetID ||
                startID - 2 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild ||
                startID - 3 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 2}"]`).firstChild ||
                startID - 4 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 3}"]`).firstChild ||
                startID - 5 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 4}"]`).firstChild ||
                startID - 6 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 5}"]`).firstChild ||  
                startID - 7 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 6}"]`).firstChild
            )
            {
                return true;
            }
            break;
        case 'queen':
            if(
                startID + 8 + 1 === targetID ||
                startID + 8 *2 + 2 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild ||
                startID + 8 *3 + 3 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 + 2}"]`).firstChild ||
                startID + 8 *4 + 4 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 + 3}"]`).firstChild ||
                startID + 8 *5 + 5 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 + 4}"]`).firstChild ||
                startID + 8 *6 + 6 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5 + 5}"]`).firstChild ||  
                startID + 8 *7 + 7 === targetID && !document.querySelector(`[square_id= "${startID + 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5 + 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*6 + 6}"]`).firstChild ||
                
                startID - 8 - 1 === targetID ||
                startID - 8 *2 - 2 === targetID &&  !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild ||
                startID - 8 *3 - 3 === targetID && !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 - 2}"]`).firstChild ||
                startID - 8 *4 - 4 === targetID && !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 - 3}"]`).firstChild ||
                startID - 8 *5 - 5 === targetID && !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 - 4}"]`).firstChild ||
                startID - 8 *6 - 6 === targetID && !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5 - 5}"]`).firstChild ||  
                startID - 8 *7 - 7 === targetID && !document.querySelector(`[square_id= "${startID - 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5 - 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*6 - 6}"]`).firstChild ||

                startID - 8 + 1 === targetID ||
                startID - 8 *2 + 2 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild ||
                startID - 8 *3 + 3 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 + 2}"]`).firstChild ||
                startID - 8 *4 + 4 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 + 3}"]`).firstChild ||
                startID - 8 *5 + 5 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 + 4}"]`).firstChild ||
                startID - 8 *6 + 6 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5 + 5}"]`).firstChild ||  
                startID - 8 *7 + 7 === targetID && !document.querySelector(`[square_id= "${startID - 8 + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2 + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3 + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4 + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5 + 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*6 + 6}"]`).firstChild ||
                
                startID + 8 - 1 === targetID ||
                startID + 8 *2 - 2 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild ||
                startID + 8 *3 - 3 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 - 2}"]`).firstChild ||
                startID + 8 *4 - 4 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 - 3}"]`).firstChild ||
                startID + 8 *5 - 5 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 - 4}"]`).firstChild ||
                startID + 8 *6 - 6 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5 - 5}"]`).firstChild ||  
                startID + 8 *7 - 7 === targetID && !document.querySelector(`[square_id= "${startID + 8 - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2 - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3 - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4 - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5 - 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*6 - 6}"]`).firstChild ||

                startID + 8 == targetID ||
                startID + 8*2 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild ||
                startID + 8*3 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2}"]`).firstChild ||
                startID + 8*4 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3}"]`).firstChild ||
                startID + 8*5 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4}"]`).firstChild ||
                startID + 8*6 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5}"]`).firstChild ||  
                startID + 8*7 === targetID && !document.querySelector(`[square_id= "${startID + 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*5}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 8*6}"]`).firstChild ||
                
                startID - 8 == targetID ||
                startID - 8*2 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild ||
                startID - 8*3 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2}"]`).firstChild ||
                startID - 8*4 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3}"]`).firstChild ||
                startID - 8*5 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4}"]`).firstChild ||
                startID - 8*6 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5}"]`).firstChild ||  
                startID - 8*7 === targetID && !document.querySelector(`[square_id= "${startID - 8}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*5}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 8*6}"]`).firstChild ||
                
                startID + 1 == targetID ||
                startID + 2 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild ||
                startID + 3 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 2}"]`).firstChild ||
                startID + 4 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 3}"]`).firstChild ||
                startID + 5 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 4}"]`).firstChild ||
                startID + 6 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 5}"]`).firstChild ||  
                startID + 7 === targetID && !document.querySelector(`[square_id= "${startID + 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID + 6}"]`).firstChild ||
                
                startID - 1 == targetID ||
                startID - 2 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild ||
                startID - 3 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 2}"]`).firstChild ||
                startID - 4 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 3}"]`).firstChild ||
                startID - 5 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 4}"]`).firstChild ||
                startID - 6 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 5}"]`).firstChild ||  
                startID - 7 === targetID && !document.querySelector(`[square_id= "${startID - 1}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 2}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 3}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 4}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 5}"]`).firstChild && !document.querySelector(`[square_id= "${startID - 6}"]`).firstChild
            )
            {
                return true;
            }
            break;
        case 'king':
            if(
                startID + 1 === targetID ||
                startID - 1 === targetID ||
                startID + 8 === targetID ||
                startID - 8 === targetID ||
                startID + 8 - 1 === targetID ||
                startID + 8 + 1 === targetID ||
                startID - 8 + 1 === targetID ||
                startID - 8 - 1 === targetID
            )
            {
                return true;
            }


    }

}

function checkForWin() {
    const bothKings = Array.from(document.querySelectorAll("#king"));
    if(!bothKings.some(king => king.firstChild.classList.contains('white'))){
        infoDisplay.innerHTML = "Black wins!"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => {
            if(square.firstChild){
                square.firstChild.setAttribute('draggable',false);
            }
        });
    }
    if(!bothKings.some(king => king.firstChild.classList.contains('black'))){
        infoDisplay.innerHTML = "Black wins!"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => {
            if(square.firstChild){
                square.firstChild.setAttribute('draggable',false);
            }
        });
    }
}

function reverseIDs() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) => square.setAttribute('square_id', (8 * 8 -1) -i))
}

function revertIDs() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) => square.setAttribute('square_id', i))
}