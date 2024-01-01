
let currentPlayer = 'Red';
const restart = document.getElementById('restart');
const tableRows =document.querySelector('.grid').rows;
const header = document.getElementById('header');
let numMoves = 0;
const BOARD_SIZE = 7;

restart.addEventListener('click', handdleRestart);
for (let i=0; i < tableRows.length; i ++) {
    tableRows[i].addEventListener('click', handdleRow);
}

function handdleRow(event) {
    const colList =this;
    
    for (let i=0; i < colList.cells.length; i ++) {
        const tableData = colList.cells[i];
        
        if (tableData.innerHTML === '<div id="circle"></div>') {
            divColor = document.createElement('div');
            divColor.classList.add(currentPlayer);
            tableData.innerHTML = '';
            tableData.appendChild(divColor);
        
            if (didPlayerWin()){
                document.getElementById('header').textContent = `Player ${currentPlayer} won`;
                endGame();
            } else if (numMoves === BOARD_SIZE * 7){
                endGame();
            } else {
                currentPlayer = currentPlayer === 'Red' ? 'Black' : 'Red';
                createPlayerHeader();
            }
            
            
            return
        }
    }
}

function handdleRestart(){
    currentPlayer ='Red';
    createPlayerHeader();

    for (let i=0; i < BOARD_SIZE ; i ++) {
        for (let j=0; j < BOARD_SIZE ; j ++) {
            tableRows[i].cells[j].innerHTML = `<div id="circle"></div>`;
        }
    }

    for (let i=0; i < tableRows.length; i ++) {
        tableRows[i].addEventListener('click', handdleRow);
    }
    restart.style.visibility ='hidden';
}

function createPlayerHeader() {
    header.textContent = `Player ${currentPlayer}'s Turn`;
}

function endGame() {
    for (let i=0; i < tableRows.length; i ++) {
        tableRows[i].removeEventListener('click', handdleRow);
    }
    restart.style.visibility ='visible';
}

function didPlayerWin() {
    let count = 0;

    for (let i=0; i < BOARD_SIZE ; i ++) {
        for (let j=0; j < BOARD_SIZE ; j ++) {
            if (tableRows[j].cells[i].innerHTML === `<div class="${currentPlayer}"></div>`) {
                count ++;
                if (count === 4){
                    return true;
                }
            } else {
                count =0;
            }
        }
        count = 0;
    }
        
    return false;
}
