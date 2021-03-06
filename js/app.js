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
      cell.style.backgroundImage = "url('imgs/wave.png')";
      cell.style.backgroundSize = '40px 40px';
    }
 }

 for (let row of aiGridEl.rows) {
   for(let cell of row.cells) {
     cell.setAttribute('class', 'aicell');
     cell.style.backgroundImage = "url('imgs/wave.png')";
     cell.style.backgroundSize = '40px 40px';
     }
 }


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
const finishPlacingEl = document.querySelector('#finish-placing');
// let playerShipInds = [];
// let playerShipsLeft = [];
// let aiShipInds = [];
// let aiShipsLeft = [];


/** States Declaration  */
let shipSelected;
let playerGridShipIndex;
let playerGridHitIndex;
let startGuess = false;
let playerShipInds = [];
let playerShipsLeft = [];
let aiShipInds = [];
let aiShipsLeft = [];
let messageEl = '';

// Set up event listener
startEl.addEventListener('click', init);
replayEl.addEventListener('click', init);
longShipEl.addEventListener('click', changeChosenProperty);
midShipEl.addEventListener('click', changeChosenProperty);
shortShipEl.addEventListener('click', changeChosenProperty);
playerCellsEl.forEach(playerCell => {
  playerCell.addEventListener('click', addShip);
});
horizontalEl.addEventListener('click', changeDirection);
verticalEl.addEventListener('click', changeDirection);
finishPlacingEl.addEventListener('click', addAIShips);

aiCellsEl.forEach(aiCell => {
  aiCell.addEventListener('click', hitShip);
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
const ships = [longShip, midShip, shortShip];


const longShipAI = new Ship('longShipAI', 3);
const midShipAI = new Ship('midShipAI', 2);
const shortShipAI = new Ship('shortShipAI', 1);
const shipsAI = [shortShipAI, midShipAI, longShipAI];
const directions = ['horizontal', 'vertical'];


/**
 * This is for hitting ships on the ai grid
 * This will only happen when startGuess === true (after finish placing)
 * And using start hitting ships on ai grid;
 */

 let allIndexe = [];
 for (let i=0; i<=8; i++) {
   for (let j=0; j<=8; j++) {
     const indexInd = [i,j];
     allIndexe.push(indexInd);
   }
 }


function hitShip(e) {
    if ((startGuess === true) && (e.target.classList.contains('aicell'))) {

      const indNum = randNum(allIndexe.length);
      //selected index
      const inde = allIndexe[indNum];
      //joined of selected index
      const indeJoined = inde.join('').toString();
      allIndexe.splice(indNum, 1);
      const aiIndString = e.target.id.substring(1);

      const id = parseInt((e.target.id).substring(1));
      const ind = [Math.floor(id/10) , id%10];
     if (e.target.classList.contains('takenAI')) {
        //e.target.style.backgroundColor = 'black';
        e.target.style.backgroundImage = "url('imgs/xmark.png')";
        e.target.style.backgroundPosition = "center";
        e.target.style.backgroundSize = "40px 40px";
        let leftId = 0;
        for (var i = 0; i < aiShipsLeft.length; i++) {
          // This if statement depends on the format of your array
          if (aiShipsLeft[i][0] === ind[0] && aiShipsLeft[i][1] === ind[1]) {
              leftId = i;   // Found it
          }
      }
        console.log('aiSHipsLeft');
        console.dir(aiShipsLeft);
        messageEl = 'You hit an AI ship !!'
        aiShipsLeft.splice(leftId, 1);
        render();


        if (document.querySelector(`#p${indeJoined}`).classList.contains('taken')) {
          //document.querySelector(`#p${indeJoined}`).style.backgroundColor = 'black';
          document.querySelector(`#p${indeJoined}`).style.backgroundImage = "url('imgs/xmark.png')";
          document.querySelector(`#p${indeJoined}`).style.backgroundPosition = "center";
          document.querySelector(`#p${indeJoined}`).style.backgroundSize = "40px 40px";
          const id = parseInt((e.target.id).substring(1));
          const ind = [Math.floor(id/10) , id%10];
          const leftPId = 0;
          for (var i = 0; i < playerShipsLeft.length; i++) {
            if (playerShipsLeft[i][0] == ind[0] && playerShipsLeft[i][1] == ind[1]) {
                leftPId = i;
            }
        }
        playerShipsLeft.splice(leftPId, 1);
        messageEl = 'Your ship got hit!!'
        render();
        console.log('playerSHipsLest');
        console.dir(playerShipsLeft);
        }

      }

       if(e.target.classList.contains('takenAI') === false) {
        messageEl = 'You missed'
        if (document.querySelector(`#p${indeJoined}`).classList.contains('taken')) {
          //document.querySelector(`#p${indeJoined}`).style.backgroundColor = 'black';
          document.querySelector(`#p${indeJoined}`).style.backgroundImage = "url('imgs/xmark.png')";
          document.querySelector(`#p${indeJoined}`).style.backgroundPosition = "center";
          document.querySelector(`#p${indeJoined}`).style.backgroundSize = "40px 40px";
          const leftPId = playerShipsLeft.indexOf(inde);
          playerShipsLeft.splice(leftPId, 1);
          console.log('playerSHipsLest');
          console.dir(playerShipsLeft);
          messageEl = 'Your ship got hit!!'
          render();
        return;
      }
    }
    if (aiShipsLeft.length === 0) {
      messageEl = 'Congrats You WON !!';
      render();
      startGuess = false;
      return;
    }
    if (playerShipsLeft.length === 0) {
      messageEl = 'Sorry You LOST !!';
      render();
      startGuess = false;
      return;
    }
  }
}

/**
 *  This can be combined with randIndGenerator
 *  This generates a random index
 */

function randInd() {
  return [Math.floor(Math.random() * 10),Math.floor(Math.random() * 10)];
}

function randNum(num) {
  return Math.floor(Math.random() * num);
}

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

  if(isOverlap(e)) {
    messageEl = 'Overlapped !';
    render();
    return;
  }
   if (e.target.className === 'pgcell'){
    if ((longShip.chosen === true) && (longShip.placed === false)) {
      if (longShip.direction === 'horizontal') {
        if (checkInBoundHorizontal(3, ind)) {
          changeCellColorHorizontal(3, ind);
          longShip.placed = true;
          messageEl = 'You placed your long ship HORIZONTALLY!'
        }
        else {
          messageEl = 'Your ship will be out of bound !';
        }
      }
      if (longShip.direction === 'vertical') {
        if (checkInBoundVertical(3, ind)) {
          changeCellColorVertical(3, ind);
          longShip.placed = true;
          messageEl = 'You placed your long ship VERTICALLY!'
        }
        else {
          messageEl = 'Your ship will be out of bound !';
        }
        }
      }

    if ((midShip.chosen === true) && (midShip.placed === false)) {
      if (midShip.direction === 'horizontal') {
        if (checkInBoundHorizontal(2, ind)) {
          changeCellColorHorizontal(2, ind);
          midShip.placed = true;
          messageEl = 'You placed your mid ship HORIZONTALLY!'
        }
        else {
          messageEl = 'Your ship will be out of bound !';
        }
      }
      if(midShip.direction === 'vertical') {
        if (checkInBoundVertical(2, ind)) {
          changeCellColorVertical(2, ind);
          midShip.placed = true;
          messageEl = 'You placed your mid ship VERTICALLY!'
        }
        else {
          messageEl = 'Your ship will be out of bound !';
        }
      }
    }


    if ((shortShip.chosen === true) && (shortShip.placed === false)) {
      if (shortShip.direction === 'horizontal') {
        if (checkInBoundHorizontal(1, ind)) {
          changeCellColorHorizontal(1, ind);
          shortShip.placed = true;
          messageEl = 'You placed your short ship HORIZONTALLY!'
        }
        else {
          messageEl = 'Your ship will be out of bound !';
        }
      }
      if (shortShip.direction === 'vertical') {
        if (checkInBoundVertical(1, ind)) {
          changeCellColorVertical(1, ind);
          shortShip.placed = true;
          messageEl = 'You placed your short ship VERTICALLY!'
        }
        else {
          messageEl = 'Your ship will be out of bound !';
        }
      }

    }
    render();
  }
}

function addAIShips(e) {
  shipsAI.forEach( ship => {
    const num = Math.floor(Math.random() * 2);
    ship.direction = directions[num];
  });

  let randInds = rndIndGenerator();

  let size = 1;
  randInds.forEach(ind => {
    if (shipsAI[size-1].direction === 'horizontal') {
      //if(isOverlap(e) === false) {
        let newInd = [ Math.floor(Math.random() * 6),  Math.floor(Math.random() * 6)];
        changeCellColorHorizontalAI(size, newInd);
        shipsAI[size-1].placed = true;
        shipsAI[size-1].firstIndex = newInd;
        size++;
        //continue for to check hit or sunk
      //} else {
      //  return;

    }
     else if (shipsAI[size-1].direction === 'vertical') {
      if(isOverlap(e) === false) {
        let newInd = [ Math.floor(Math.random() * 7),  Math.floor(Math.random() * 7)];
        changeCellColorVerticalAI(size, newInd);
        shipsAI[size-1].placed = true;
        shipsAI[size-1].firstIndex = newInd;
        size++;
        //continue for to check hit or sunk
      //} else {

       // return;
      }
    }
  });


//   for (let row of playerGridEl.rows) {
//     for(let cell of row.cells) {
//       //cell.setAttribute('class', 'pgcell');
//       // cell.style.backgroundImage = "url('imgs/oceannew.png')";
//       // cell.style.backgroundSize = '40px 40px';
//     }
//  }

 for (let row of aiGridEl.rows) {
   for(let cell of row.cells) {
     //cell.setAttribute('class', 'aicell');
      cell.style.backgroundImage = "url('imgs/wave.png')";
      cell.style.backgroundSize = '40px 40px';
     }
 }
  finishPlacingEl.disabled = true;
  startGuess = true;
  playerShipsLeft = [...playerShipInds];
  aiShipsLeft = [...aiShipInds];

  messageEl = 'You have finished placing your ships, Computer has also placed their ships now you can hit your oponent';
  render();
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

    playerShipInds.push(index);
    playerShipInds.push(nextInd);
    playerShipInds.push(thirdInd);

    indexArr.forEach(ind => {
      const idName = ind.join('');
      const text = idName.toString();
      document.querySelector(`#p${text}`).style.backgroundImage = "url('imgs/ship.png')";
      document.querySelector(`#p${text}`).style.backgroundSize = "40px 40px";
      document.querySelector(`#p${text}`).classList.add('taken');
    });

  }

  if ( num === 2) {
    indexArr.push(index);
    indexArr.push(nextInd);

    playerShipInds.push(index);
    playerShipInds.push(nextInd);
    indexArr.forEach(ind => {
      const idName = ind.join('');

      const text = idName.toString();
      document.querySelector(`#p${text}`).style.backgroundImage = "url('imgs/ship.png')";
      document.querySelector(`#p${text}`).style.backgroundSize = "40px 40px";
      document.querySelector(`#p${text}`).classList.add('taken');
    });
  }

  if ( num === 1) {
    // indexArr.push(index);
    const indexName = index.join('');
    const text = indexName.toString();
    document.querySelector(`#p${text}`).style.backgroundImage = "url('imgs/ship.png')";
    document.querySelector(`#p${text}`).style.backgroundSize = "40px 40px";
    document.querySelector(`#p${text}`).classList.add('taken');
    playerShipInds.push(index);
  }


}

function changeCellColorHorizontalAI(num, index) {
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
      const text = idName.toString();
      document.querySelector(`#a${text}`).style.backgroundImage = "url('imgs/ship.png')";
      document.querySelector(`#a${text}`).classList.add('takenAI');
    });
    aiShipInds.push(index);
    aiShipInds.push(nextInd);
    aiShipInds.push(thirdInd);
  }

  if ( num === 2) {
    indexArr.push(index);
    indexArr.push(nextInd);

    indexArr.forEach(index => {
      const idName = index.join('');
      const text = idName.toString();

      document.querySelector(`#a${text}`).style.backgroundImage = "url('imgs/ship.png')";
      document.querySelector(`#a${text}`).classList.add('takenAI');
    });
      aiShipInds.push(index);
      aiShipInds.push(nextInd);
  }

  if ( num === 1) {
    const indexName = index.join('');
    const text = indexName.toString();
    document.querySelector(`#a${text}`).style.backgroundImage = "url('imgs/ship.png')";
    document.querySelector(`#a${text}`).classList.add('takenAI');
    aiShipInds.push(index);
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
      const text = idName.toString();
      document.querySelector(`#p${text}`).style.backgroundImage = "url('imgs/ship.png')";
      document.querySelector(`#p${text}`).style.backgroundSize = "40px 40px";
      document.querySelector(`#p${text}`).classList.add('taken');
  });
      playerShipInds.push(index);
      playerShipInds.push(nextInd);
      playerShipInds.push(thirdInd);
  }

  if ( num === 2) {
    indexArr.push(index);
    indexArr.push(nextInd);

    indexArr.forEach(index => {
      const idName = index.join('');
      const text = idName.toString();
      document.querySelector(`#p${text}`).style.backgroundImage = "url('imgs/ship.png')";
      document.querySelector(`#p${text}`).style.backgroundSize = "40px 40px";
      document.querySelector(`#p${text}`).classList.add('taken');
    });
      playerShipInds.push(index);
      playerShipInds.push(nextInd);
  }

  if ( num === 1) {
    const indexName = index.join('');
    const text = indexName.toString();
    document.querySelector(`#p${text}`).style.backgroundImage = "url('imgs/ship.png')";
    document.querySelector(`#p${text}`).style.backgroundSize = "40px 40px";
    document.querySelector(`#p${text}`).classList.add('taken');
    playerShipInds.push(index);
  }
}


function changeCellColorVerticalAI(num, index) {
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
      const text = idName.toString();
      document.querySelector(`#a${text}`).style.backgroundImage = "url('imgs/ship.png')";
      document.querySelector(`#a${text}`).classList.add('takenAI');
    });
    aiShipInds.push(index);
    aiShipInds.push(nextInd);
    aiShipInds.push(thirdInd);
  }

  if ( num === 2) {
    indexArr.push(index);
    indexArr.push(nextInd);

    indexArr.forEach(index => {
      const idName = index.join('');
      const text = idName.toString();
      document.querySelector(`#a${text}`).style.backgroundImage = "url('imgs/ship.png')";
      document.querySelector(`#a${text}`).classList.add('takenAI');
    });
    aiShipInds.push(index);
    aiShipInds.push(nextInd);
  }

  if ( num === 1) {
    const indexName = index.join('');
    const text = indexName.toString();
    document.querySelector(`#a${text}`).style.backgroundImage = "url('imgs/ship.png')";
    document.querySelector(`#a${text}`).classList.add('takenAI');
    aiShipInds.push(index);
  }
}

function isOverlap(e) {
  if (e.target.classList.contains('taken')) {
    return true;
  }
  else if(e.target.classList.contains('takenAI')){
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

//generate random numbers

function rndIndGenerator() {
  randInds = [];
  let allIndexes = [];
  for (let i=0; i<=6; i++) {
    for (let j=0; j<=6; j++) {
      const indexInd = [i,j];
      allIndexes.push(indexInd);
    }
  }
  const num1 = Math.floor(Math.random() * allIndexes.length);
  const longShipRand = allIndexes[num1];
  allIndexes.splice(num1, 1);
  const num2 = Math.floor(Math.random() * allIndexes.length);
  const midShipRand = allIndexes[num2];
  allIndexes.splice(num2, 1);
  const num3 = Math.floor(Math.random() * allIndexes.length);
  const shortShipRand = allIndexes[num3];
  allIndexes.splice(num3, 1);

  randInds.push(longShipRand);
  randInds.push(midShipRand);
  randInds.push(shortShipRand);
  return randInds;
}


function init() {

 for (let row of playerGridEl.rows)
 {
     for(let cell of row.cells)
     {
      cell.style.backgroundImage = "url('imgs/wave.png')";
      cell.style.backgroundSize = '40px 40px';
      cell.classList.remove('taken');
     }
 }

 for (let row of aiGridEl.rows) {
   for(let cell of row.cells) {
    cell.style.backgroundImage = "url('imgs/wave.png')";
    cell.style.backgroundSize = '40px 40px';
    cell.classList.remove('takenAI');
     }
 }

 ships.forEach(ship => {
   ship.placed = false;
   ship.direction = 'horizontal';
   ship.chosen = false;
 });

 finishPlacingEl.disabled = false;

 playerShipInds = [];
 aiShipInds = [];
 playerShipsLeft = [];
 aiShipsLeft = [];
 startGuess = false;
 messageEl = 'Hello Welcome !';
 render();
 for (let i=0; i<=8; i++) {
  for (let j=0; j<=8; j++) {
    const indexInd = [i,j];
    allIndexe.push(indexInd);
  }
}
}

function render() {
  document.querySelector('#message').innerHTML = messageEl;
}

function handleReplayBtn(e) {
  init();
}

