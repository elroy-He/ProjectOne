/** Class set up  */
class Ship {
  constructor(name, size, direction='horizontal', firstIndex=[0,0], lastIndex=[0,0], hit = false, sunk = false, chosen = false, placed = false) {
    this.name = name;
    this.size = size;
    this.direction = direction;
    this.firstIndex = firstIndex;
    this.lastIndex = lastIndex;
    this.hit = hit;
    this.sunk = sunk;
    this.chosen = chosen;
    this.placed = placed;
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
const horizontalEl = document.querySelector('#horizontal');
const verticalEl = document.querySelector('#vertical');

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
horizontalEl.addEventListener('click', changeDirection);
verticalEl.addEventListener('click', changeDirection);


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
const ships = [longShip, midShip, shortShip];

function changeChosenProperty(e) {
  if (e.target.className === 'ship-block-ship1') {
    longShip.chosen = true;
    midShip.chosen = false;
    shortShip.chosen = false;
  }
  if (e.target.className === 'ship-block-ship2') {
    longShip.chosen = false;
    midShip.chosen = true;
    shortShip.chosen = false;
  }
  if (e.target.className === 'ship-block-ship3') {
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

  if(isOverlap(e)) return;
  if (e.target.className === 'pgcell'){
    if ((longShip.chosen === true) && (longShip.placed === false)) {
      if (longShip.direction === 'horizontal') {
        if (checkInBoundHorizontal(3, ind)) {
          changeCellColorHorizontal(3, ind);
          longShip.placed = true;
        }
        else {
          console.log('Outta Bound');
        }
      } else {
        if (checkInBoundVertical(3, ind)) {
          changeCellColorVertical(3, ind);
          longShip.placed = true;
        }
        else {
          console.log('Outta Bound');
        }
        }
      }

    if ((midShip.chosen === true) && (midShip.placed === false)) {
      if (midShip.direction === 'horizontal') {
        if (checkInBoundHorizontal(2, ind)) {
          changeCellColorHorizontal(2, ind);
          midShip.placed = true;
        }
        else {
          console.log('Outta Bound miShip');
        }
      } else {
        if (checkInBoundVertical(2, ind)) {
          changeCellColorVertical(2, ind);
          midShip.placed = true;
        }
        else {
          console.log('Outta Bound');
        }
      }

    }
    if ((shortShip.chosen === true) && (shortShip.placed === false)) {
      if (shortShip.direction === 'horizontal') {
        if (checkInBoundHorizontal(1, ind)) {
          changeCellColorHorizontal(1, ind);
          shortShip.placed = true;
        }
        else {
          console.log('Outta Bound');
        }
      } else {
        if (checkInBoundVertical(1, ind)) {
          changeCellColorVerticals(1, ind);
          shortShip.placed = true;
        }
        else {
          console.log('Outta bound')
        }
      }

    }
  }
}



/**
 *
 *  Given the length of the ship, and the index of grid
 *  Return true if it'll be in bound, false if else;
 */

function checkInBoundHorizontal(num, index) {
  if ((num === 3) && (index[1] <= 6)) return true;
  if ((num === 2) && (index[1] <= 7)) return true;
  if (num === 1) return true;
}

function checkInBoundVertical(num, index) {
  if ((num === 3) && (index[0] <= 6)) return true;
  if ((num === 2) && (index[0] <= 7)) return true;
  if (num === 1) return true;
}
/**
 * After checking for valid location for
 * ship placement, change the color of the cells
 */
function changeCellColorHorizontal(num, index) {
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
      document.querySelector(`#p${text}`).classList.add('taken');
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
      document.querySelector(`#p${text}`).classList.add('taken');
    });
  }


  if ( num === 1) {
    // indexArr.push(index);
    const indexName = index.join('');
    const text = indexName.toString();
    document.querySelector(`#p${text}`).style.backgroundColor = 'blue';
    document.querySelector(`#p${text}`).classList.add('taken');
  }

}

function changeCellColorVertical(num, index) {
  const indexArr = [];
  const nextInd = [];
  const thirdInd = [];
  nextInd[0] = index[0] + 1;
  nextInd[1] = index[1];
  thirdInd[0] = index[0] + 2;
  thirdInd[1] = index[1];

  if ( num === 3) {
    indexArr.push(index);
    indexArr.push(nextInd);
    indexArr.push(thirdInd);

    indexArr.forEach(index => {
      const idName = index.join('');
      //console.log(idName);
      const text = idName.toString();
      document.querySelector(`#p${text}`).style.backgroundColor = 'blue';
      document.querySelector(`#p${text}`).classList.add('taken');
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
      document.querySelector(`#p${text}`).classList.add('taken');
    });
  }


  if ( num === 1) {
    // indexArr.push(index);
    const indexName = index.join('');
    const text = indexName.toString();
    document.querySelector(`#p${text}`).style.backgroundColor = 'blue';
    document.querySelector(`#p${text}`).classList.add('taken');
  }
}


function isOverlap(e) {
  if (e.target.classList.contains('taken')) {
    return true;
  }
  return false;
}

function changeDirection(e) {
  if(e.target.id === 'vertical') {
    ships.forEach( ship => {
      ship.direction = 'vertical';
    });
  } else if (e.target.id === 'horizontal' ){
    ships.forEach( ship => {
      ship.direction = 'horizontal';
  });
  }
}

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


// function createPlayerGrid() {

//   for (let i=0; i<9; i++) {
//     const row = document.createElement('div');
//     row.setAttribute('class', `row${i}`);
//     playerGridEl.appendChild(row);
//     for (let j=0; j<9; j++) {
//       const grid = document.createElement("span");
//       grid.innerHTML = `${i}${j}`;
//       grid.setAttribute("id", `playerGrid${i}${j}`);
//       grid.setAttribute("class", `pg-cell`);
//       row.appendChild(grid);
//     }
//   }
//   //console.log(playerGridEl);
//   // return playerGridEl;
// }


// function setAIGridAttributes() {
//   for (let i=0; i<9; i++) {
//     row.setAttribute('class', `row${i}`);
//     aiGridEl.appendChild(row);
//     for (let j=0; j<9; j++) {
//       const grid = document.createElement("span");
//       grid.innerHTML = `${i}${j}`;
//       grid.setAttribute("id", `aiGrid${i}${j}`);
//       grid.setAttribute("class", `ai-cell`);
//       row.appendChild(grid);
//     }
//   }

// }


