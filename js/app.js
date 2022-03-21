
/** Class set up  */
class Ship {
  constructor(name, size, direction='horizontal', firstIndex=[0,0], lastIndex=[0,0], hit = false, sunk = false, chosen = false) {
    this.name = name;
    this.size = size;
    this.direction = direction;
    this.firstIndex = firstIndex;
    this.lastIndex = lastIndex;
    this.hit = hit;
    this.sunk = sunk;
    this.chosen = chosen;
  }
}


//Set the elements that I need to manipulate
const playerGridEl = document.querySelector('.playerGrid');
const aiGridEl = document.querySelector('.aiGrid');
/**
 * Set ids and classes for GRID
 */

 for (let row of playerGridEl.rows) {
    for(let cell of row.cells) {
      cell.setAttribute('class', 'pgcell');
    }
 }

 for (let row of aiGridEl.rows) {
   for(let cell of row.cells) {
     cell.setAttribute('class', 'aicell');
     }
 }


const howToPlayBtn = document.querySelector('#how-to-play');
const welcomeMessageEl = document.querySelector('#welcome-message');
const startEl = document.querySelector('#start');
const replayEl = document.querySelector('#replay');
const gridEl = document.querySelector('.grid');
const playerCellsEl = document.querySelectorAll('.pgcell');
const aiCellsEl = document.querySelectorAll('.aicell');
const longShipEl = document.querySelector('#ship1');
const midShipEl = document.querySelector('#ship2');
const shortShipEl = document.querySelector('#ship3');
const draggables = document.querySelectorAll('.ship');


/** States Declaration  */
let shipSelected;
let playerGridShipIndex;
let playerGridHitIndex;


// Set up event listener
howToPlayBtn.addEventListener('click', changePageWhenClicked);
startEl.addEventListener('click', init);
replayEl.addEventListener('click', handleReplayBtn);
longShipEl.addEventListener('click', changeChosenProperty);
midShipEl.addEventListener('click', changeChosenProperty);
shortShipEl.addEventListener('click', changeChosenProperty);
playerCellsEl.forEach(playerCell => {
  playerCell.addEventListener('click', addShip);
});
// for (let row of playerGridEl.rows) {
//   for(let cell of row.cells) {
//     cell.addEventListener('click', addShip);
//   }
// }
// for (let row of aiCellsEl.rows) {
//   for(let cell of row.cells) {
//     cell.addEventListener('click', addShip);
//   }
// }

const longShip = new Ship('longShip', 3);
const midShip = new Ship('midShip', 2);
const shortShip = new Ship('shortShip', 1);

function changeChosenProperty(e) {
  if (e.target.className === 'ship-block ship1') {
    longShip.chosen = true;
    midShip.chosen = false;
    shortShip.chosen = false;
  }
  if (e.target.className === 'ship-block ship2') {
    longShip.chosen = false;
    midShip.chosen = true;
    shortShip.chosen = false;
  }
  if (e.target.className === 'ship-block ship3') {
    longShip.chosen = false;
    midShip.chosen = false;
    shortShip.chosen = true;
  }

}

function addShip(e) {
  const ind = `${e.target.id}`.split('');
  ind.splice(0,1);
  ind[0] = parseInt(ind[0]);
  ind[1] = parseInt(ind[1]);
  console.log(ind);
  if (e.target.className === 'pgcell'){
    if (longShip.chosen === true) {
      if (checkInBound(3, ind)) {
        changeCellColor(3, ind);
      }
      else {
        console.log('Outta Bound');
      }
    }
    if (midShip.chosen === true) {
      if (checkInBound(2, ind)) {
        changeCellColor(2, ind);
      }
      else {
        console.log('Outta Bound');
      }
    }
    if (shortShip.chosen === true) {
      if (checkInBound(1, ind)) {
        changeCellColor(1, ind);
      }
      else {
        console.log('Outta Bound');
      }
    }
  }

}

/**
 *
 *  Given the length of the ship, and the index of grid
 *  Return true if it'll be in bound, false if else;
 */

function checkInBound(num, index) {
  if ((num === 3) && (index[1] <= 6)) return true;
  if ((num === 2) && (index[1] <= 7)) return true;
  if (num === 1) return true;
}

/**
 * After checking for valid location for
 * ship placement, change the color of the cells
 */
function changeCellColor(num, index) {
  const indexArr = [];
  const nextInd = [];
  const thirdInd = [];
  nextInd[0] = index[0];
  nextInd[1] = index[1] + 1;
  thirdInd[0] = index[0];
  thirdInd[1] = index[1] + 2;

  if ( num === 3) {
    indexArr.push(index);
    indexArr.push(nextInd);
    indexArr.push(thirdInd);

    indexArr.forEach(index => {
      const idName = index.join('');
      //console.log(idName);
      const text = idName.toString();
      document.querySelector(`#p${text}`).style.backgroundColor = 'blue';
    });
  }
  if ( num === 2) {
    indexArr.push(index);
    indexArr.push(nextInd);

    indexArr.forEach(index => {
      const idName = index.join('');
      console.log(idName);
      const text = idName.toString();
      //console.log(text);
      document.querySelector(`#p${text}`).style.backgroundColor = 'blue';
    });
  }

  if ( num === 1) {
    // indexArr.push(index);
    const indexName = index.join('');
    const text = indexName.toString();
    document.querySelector(`#p${text}`).style.backgroundColor = 'blue';
  }

}

// draggables.forEach(draggable => {
//   draggable.addEventListener('dragstart', dragStart);
//   draggable.addEventListener('dragend', dragEnd);
// });

// longShipEl.addEventListener('dragstart', dragStart);
// midShipEl.addEventListener('dragstart', dragStart);
// shortShipEl.addEventListener('dragstart', dragStart);
// longShipEl.addEventListener('dragend', dragEnd);
// midShipEl.addEventListener('dragstend', dragEnd);
// shortShipEl.addEventListener('dragend', dragEnd);
//add EventListener for each cell



// console.log(createPlayerGrid());
// console.log(createAIGrid());




// console.dir(playerCellsEl);
// controrllers

// dragStart function
// function dragStart(e) {
//   //e.dataTransfer.setData('text/pain', e.target.id);
//   //e.target.classList.add('hide');
//   setTimeout(() => {
//     e.target.className += 'dragging';
//   }, 0);
// }
// function dragEnd(e) {
//   //e.dataTransfer.setData('text/pain', e.target.id);
//   //e.target.classList.add('hide');
//   setTimeout(() => {
//     e.target.className -= 'dragging';
//   }, 0);
// }

/**
 * Drop and Drag function declarations
 *  dragEnter dragOver dragLeave drop
 */

// function dragEnter(e) {
//   e.preventDefault();
//   e.target.className += 'drag-over';
//   console.log('working');
// }


// function dragOver(e) {
//   e.preventDefault();
//   e.target.className += 'drag-over';
//   console.log('dragOver')
// }

// function dragLeave(e) {
//   //e.preventDefault();
//   e.target.className -= 'drag-over';
// }

// function drop(e) {
//   //e.preventDefault();
//   e.target.className -= 'drag-over';
// }


function init(e) {
  welcomeMessageEl.id = 'welcome-message';

 for (let row of playerGridEl.rows)
 {
     for(let cell of row.cells)
     {
      cell.style.backgroundColor = '#027910';
      //cell.style.border = '1px solid #19C52D'
     }
 }

 for (let row of aiGridEl.rows) {
   for(let cell of row.cells) {
    cell.style.backgroundColor = '#027910';
    //cell.style.border = '1px solid #19C52D';
     }
 }
}


function handleReplayBtn(e) {
  init();
}

function changePageWhenClicked(e) {
  welcomeMessageEl.id = 'game-instruction';
  welcomeMessageEl.innerHTML = "To start the game, please press START button ";
  welcomeMessageEl.style.color = 'purple';
  welcomeMessageEl.style.fontSize = '25px';
}


function createPlayerGrid() {

  for (let i=0; i<9; i++) {
    const row = document.createElement('div');
    row.setAttribute('class', `row${i}`);
    playerGridEl.appendChild(row);
    for (let j=0; j<9; j++) {
      const grid = document.createElement("span");
      grid.innerHTML = `${i}${j}`;
      grid.setAttribute("id", `playerGrid${i}${j}`);
      grid.setAttribute("class", `pg-cell`);
      row.appendChild(grid);
    }
  }
  //console.log(playerGridEl);
  // return playerGridEl;
}


function setAIGridAttributes() {
  for (let i=0; i<9; i++) {
    row.setAttribute('class', `row${i}`);
    aiGridEl.appendChild(row);
    for (let j=0; j<9; j++) {
      const grid = document.createElement("span");
      grid.innerHTML = `${i}${j}`;
      grid.setAttribute("id", `aiGrid${i}${j}`);
      grid.setAttribute("class", `ai-cell`);
      row.appendChild(grid);
    }
  }

}


