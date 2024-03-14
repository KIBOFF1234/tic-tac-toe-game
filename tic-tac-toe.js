let ticTAcToe = [[],[],[]];
let score = {
  wins: 0,
  losses: 0,
  ties: 0
};



let move = '';

let isTicked = false;
let isRestarted = true;
let isGameEnd = false;
let computerMove;

  
document.querySelector('.js-x-btn').addEventListener('click',()=> {
  
  if(!isTicked && isRestarted) {
    move = 'X'
    isTicked = true;
   isRestarted = false;
    confirmingMove(move);
    intervalIdX = setTimeout(()=> {
    document.querySelector(`.js-tick-icon-X`)
     .innerHTML = '';
  },2000);
  } 
});
 


  
document.querySelector('.js-o-btn').addEventListener('click',()=> {
  
  if(!isTicked && isRestarted) {
    move = 'O';
     isTicked = true;
     isRestarted = false;
    confirmingMove(move);
    intervalIdO = setTimeout(()=> {
      document.querySelector(`.js-tick-icon-O`)
       .innerHTML = '';
    },2000);
  }
  
});


function confirmingMove(move){
  
  document.querySelector(`.js-tick-icon-${move}`)
  .innerHTML= `<img src="images/check (1).png" alt="img is loading" class="tick-icon">`
 if(!isGameEnd)
  renderPlayerMove();
};

let playerMoves = 5;
let computerMoves = 4;
document.querySelectorAll('.cell')
 .forEach( (element,index) => {
 
   element.addEventListener('click', ()=>{
    playerMove(element,index)
  })
 });

 let timeOutId1;

function playerMove(element,index) {

  if(element.innerHTML === '' &&  isTicked && playerMoves > 0 && !isGameEnd) {
    playerMoves--;
    if(move === 'X')
      element.style.color = 'rgb(188, 34, 34)'; 
    if(move === 'O')
      element.style.color = 'rgb(2, 209, 140)'; 
    element.innerHTML = `${move}`;
  
  const row = Math.floor(index / 3 );
  const column = Math.floor(index % 3);
  ticTAcToe[row][column] = move;
  

  renderResult();
  clearTimeout(timeOutId1)

 timeOutId1 = setTimeout(() => {
    
    if(computerMoves > 0) {
      
    renderComputerMove()
    
    }else{
      renderResult();
    }
  }, 1000);
}
}

let rows = {};
let columns = {};
let diagonal = {};
let leftDiagonal = [];
let rightDiagonal = [];
 function renderComputerMove() {
  
  if(isTicked ) {

  const rowIndex = Math.floor(Math.random() * 3);
  const columnIndex =  Math.floor(Math.random() * 3);
  
  
  if(ticTAcToe[rowIndex][columnIndex] === undefined && !isGameEnd ) {
    computerMoves--;
    const cellIndex = rowIndex * 3 + columnIndex;
    const cellElem = document.querySelectorAll('.cell')[cellIndex]
    
    ticTAcToe[rowIndex][columnIndex] = computerMove;
     cellElem.innerHTML = computerMove;
     if(computerMove === 'X') {
       cellElem.style.color = 'rgb(188, 34, 34)';
     }
    else{
      cellElem.style.color = 'rgb(2, 209, 140)'
    }

    renderResult()
   
  }else if(isTicked){
    renderComputerMove();
  }
}
 }
 function renderResult() {
  ticTAcToe.forEach((value,index)=> {
   rows[`row${index}`] = value;
    
   
  })
  
  for(let col = 0 ;col < ticTAcToe.length; col++) {
    let array = [];
    for(let row = 0; row < ticTAcToe.length; row++) {
      
      array.push(ticTAcToe[row][col])
      
    
    columns[`col${col}`] = array;
  }
}
  leftDiagonal = [];
  rightDiagonal = [];
 
  for(let i = 0; i < ticTAcToe.length; i++) {
  leftDiagonal.push(ticTAcToe[i][i])
 }
  for(let i = 0; i < ticTAcToe.length; i++) {
    rightDiagonal.push(ticTAcToe[i][ticTAcToe.length - 1 - i]);
  }
 
 finalResult();
}

let timeOutId;
let result = '';

function finalResult () {

  let allXInRows = false;
  let allOInRows = false;
  let allXInCol = false;
  let allOInCol = false;
  let allXInDiagonal = false;
  let allOInDiagonal = false;
  
 
    for(let i = 0; i < ticTAcToe.length; i++) {

      rowArray = rows[`row${i}`];
      let allX = 0;
      rowArray.forEach((value)=> {
        if(value === 'X')
          allX++;
        
      })
     if(allX === 3) {
      
   
       allXInRows = true;
       break;
     }
    }

    for(let i = 0; i < ticTAcToe.length; i++) {

      rowArray = rows[`row${i}`];
      let allO = 0;
      rowArray.forEach((value)=> {
        if(value === 'O')
          allO++;
      })
     if(allO === 3) {
    
       
       allOInRows = true;
       break;
     }
    }
   
 
  for(let i = 0; i < ticTAcToe.length; i++) {
   const colArray  = columns[`col${i}`];
   let allX = 0;
   colArray.forEach((value) => {
     if(value === 'X') {
      allX++;
     }
   });
   if(allX === 3) {

     allXInCol = true;
     break;
   }

  }

  for(let i = 0; i < ticTAcToe.length; i++) {
    const colArray  = columns[`col${i}`];
    let allO = 0;
    colArray.forEach((value) => {
      if(value === 'O') {
       allO++;
      }
    });
    if(allO === 3) {

      allOInCol = true;
      break;
    }
 
   }

   if(move === 'X' && computerMove === 'O') {
   leftDiagonal = leftDiagonal.filter(value => value === 'X');
   if(leftDiagonal.length === 3) {
    allXInDiagonal = true;
   }

   rightDiagonal = rightDiagonal.filter(value => value === 'X')
   if(rightDiagonal.length === 3) {
    allXInDiagonal = true;
   }
  }else{
    leftDiagonal = leftDiagonal.filter(value => value === 'O');
   if(leftDiagonal.length === 3) {
    allOInDiagonal = true;
   }

   rightDiagonal = rightDiagonal.filter(value => value === 'O')
   if(rightDiagonal.length === 3) {
    allOInDiagonal = true;
  }
}
if(move === 'X' && computerMove === 'O') {
  if(allXInRows || allXInCol || allXInDiagonal) {
    score.wins++;
    isTicked = false;
    result = 'you win';
 }else if(allOInRows || allOInCol || allOInDiagonal) {
  score.losses++;
  isTicked = false;
  result = 'You lose';
 }else if(playerMoves === 0 && computerMoves === 0) {
  result = 'Tie';
  score.ties++;
}
 
}else if(move === 'O' && computerMove === 'X') {
  if(allXInRows || allXInCol || allXInDiagonal) {
    isTicked = false;
    result = 'You lose';
     score.losses++;
 }else if(allOInRows || allOInCol || allOInDiagonal) {
   result = 'you win';
   isTicked = false;
   score.wins++;
 }else if(playerMoves === 0 && computerMoves === 0) {
   result = 'tie';
   score.ties++;
 }
 
}
if(result) {
 
  isGameEnd = true;
 
  document.querySelector('.js-result')
  .innerHTML = `${result}`;
}

clearTimeout(timeOutId)
 timeOutId = setTimeout(() => {
  if(result) {
    document.querySelector('.js-result').classList.add('scale');
  }
  
  document.querySelector('.js-score-board')
  .innerHTML = `wins: ${score.wins} losses: ${score.losses} ties: ${score.ties}`;
  



 
  setTimeout(() => {
    if(result){
      document.querySelector('.js-result').classList.remove('scale')
    }
    result = '';
    document.querySelector('.js-result')
    .innerHTML = `${result}`;
    
  }, 2000);
  
},2000)

}
 function renderPlayerMove() {
 
  if(move === 'X') {
    computerMove = 'O';
  }else{
    computerMove = 'X';
  }

  displayMoves();
  
  
 }

 function displayMoves() {
  document.querySelector('.js-render-move')
  .innerHTML = `You: <span class="move js-move-1"> ${move}</span> computer: <span class="move js-move-2 "> ${computerMove}</span> 

  <button class="restart-btn js-restart-btn">Restart Game</button>
  `
  document.querySelector('.js-score-board')
   .innerHTML = `wins: ${score.wins} losses: ${score.losses} ties: ${score.ties}`
  if(move === 'X') {
    document.querySelector('.js-move-1').classList.add('move-x');
    document.querySelector('.js-move-2').classList.add('move-o');
   }else{
    document.querySelector('.js-move-1').classList.add('move-o');
    document.querySelector('.js-move-2').classList.add('move-x');
   }
   restartGame();
 }
 
 
 function restartGame() {
  document.querySelector('.js-restart-btn')
   .addEventListener('click', ()=> {
    playerMoves = 5;
    computerMoves = 4;
    rows = {};
    columns = {};
    ticTAcToe = [[],[],[]];
     leftDiagonal = [];
     rightDiagonal = [];
     document.querySelector(`.js-tick-icon-${move}`).innerHTML = ''
     document.querySelector('.js-render-move').innerHTML = '';
     isTicked = false;
     isRestarted = true;
     isGameEnd = false;
     move = '';
     computerMove = '';
     document.querySelectorAll('.cell').forEach((moveElement)=> {
    moveElement.innerHTML = '';
  })
 })
 }

 