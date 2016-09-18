import { CELL_CLICK, CLEAR, RANDOMIZE, START } from '../actions/index';

function getRandomInt(min, max) {
    "use strict";
    let range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
}

const initialState = {
  width: 3,
  height: 3,
  generation: 0
};

initialState.cells = Array.from(
  {length: initialState.width * initialState.height}, () => getRandomInt(0, 1)
)
function findNeighbors(pos,dimension){
  let neighbors = [];
  const width = dimension[0];
  const height = dimension[1];
  //coord are coordinates in array: [y coordinate, x coordinate]
  let coord = pos.split("-").map(coord => parseInt(coord))
  //lets check all boundries - if it's at edge, crossover the otherside
  const upBoundary = coord[0] === 0 ? height - 1 : coord[0] - 1;
  const downBoundary = coord[0] === height - 1 ? 0 : coord[0] + 1;
  const leftBoundary = coord[1] === 0 ? width - 1 : coord[1] - 1;
  const rightBoundary = coord[1] === width - 1 ? 0 : coord[1] + 1;
  //lets gather all the 8-neighbors
  neighbors.push([upBoundary,coord[1]].join("-")) //top
  neighbors.push([upBoundary,rightBoundary].join("-")) //top-right
  neighbors.push([coord[0],rightBoundary].join("-")) //right
  neighbors.push([downBoundary,rightBoundary].join("-")) //bottom-right
  neighbors.push([downBoundary,coord[1]].join("-")) //bottom
  neighbors.push([downBoundary,leftBoundary].join("-")) //bottom-left
  neighbors.push([coord[0],leftBoundary].join("-")) //left
  neighbors.push([upBoundary,leftBoundary].join("-")) //top-left
  return neighbors
}

function deadOrAlive(neighborStatus,cellStatus){
  let count = 0
  // increment count if the neighbor cells is alive
  for(let i = 0 ; i < neighborStatus.length ; i++){
    if (neighborStatus[i] === 1){
      count += 1;
    }
  }
  if(count < 2){
    return 'dead'
  } else if (count > 3) {
    return 'dead'
  } else if ((count === 2 || 3) && cellStatus === 1 ){
    return 'alive'
  } else if( count === 3 && cellStatus === 0){
    return 'alive'
  } else{
    return 'dead'
  }
}

function nextGeneration(currentGeneration,state){
  //index will help pass the current state of each cell
  let index = 0;
  for (var coordinate in currentGeneration){
    //collect all neighbors
    let neighbors = findNeighbors(coordinate,[state.width,state.height])
    //obtain status of each current neighbor cell's status
    let neighborsStatus = neighbors.map(neighborsCoord => currentGeneration[neighborsCoord])
    // determine if current cell survives soley depending on neighbors' status
    const jam = deadOrAlive(neighborsStatus, state.cells[index])
    console.log(jam)
    index++;
  }

}

export default function(state = initialState, action){
  switch (action.type) {
    case CELL_CLICK:
      const cells = [...state.cells]; //copy the cells first
      const coord = state.width * action.payload.y + action.payload.x //index coordinates
      const val = cells[coord] //current status of selected cell
      //toggle the status
      cells[coord] = val === 1 ? 0 : 1
      return {
        ...state,
        cells
      };
    case START:
      nextGeneration(action.payload,state)
      return state

    case CLEAR:
      const clearCells = state.cells.map( val => 0)
      //use Object.assign to create new object and update the grid-cells
      return Object.assign({}, state, {cells: clearCells})

    case RANDOMIZE:
      const boardDimension = state.width * state.height
      //use Object.assign to create new object and randomize the grid-cells
      const randomCells = Array.from({length: boardDimension }, () => getRandomInt(0, 1))
      return Object.assign({}, state, {cells: randomCells})
    }

  return state;
}
