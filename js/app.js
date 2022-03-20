

/** Class set up  */
class Ship {
  constructor(name, size, direction='horizontal', firstIndex=[0,0], lastIndex=[0,0] ) {
    this.name = name;
    this.size = size;
    this.direction = direction;
    this.firstIndex = firstIndex;
    this.lastIndex = lastIndex;
    this.hit = false;
    this.sunk = false;
  }
}


//Set the elements that I need to manipulate
const playerGridEl = document.querySelector('.playerGrid');
const aiGridEl = document.querySelector('.aiGrid');
/**
 * Set ids and classes for GRID
 */

 for (let row of playerGridEl.rows)
 {
     for(let cell of row.cells)
     {
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

/** States Declaration  */
let shipSelected;
let playerGridShipIndex;
let playerGridHitIndex;


// Set up event listener
howToPlayBtn.addEventListener('click', changePageWhenClicked);
startEl.addEventListener('click', init);
replayEl.addEventListener('click', handleReplayBtn);

// console.log(createPlayerGrid());
// console.log(createAIGrid());




// console.dir(playerCellsEl);
// controrllers
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



const longShip = new Ship(3);
const midShip = new Ship(2);
const shortShip = new Ship(1);


