const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]")
const message = document.querySelector("[data-message]")
const winningMessage = document.querySelector(".winning-message")
const restartButton = document.querySelector(".winning-message-button")
const player1 = document.querySelector(".firstPlayer")
const player2 = document.querySelector(".secondPlayer")
const screenEntrance = document.querySelector(".entrance-players")
let screenPlayer1 = document.querySelector(".player1")
let screenPlayer2 = document.querySelector(".player2")
let player1Total = 0
let player2Total = 0

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [0, 3, 6],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const startGame = () => {
  isCircleTurn = false;
  
  for(const cell of cellElements) {
    cell.classList.remove("circle")
    cell.classList.remove("xis")
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true})
  }
  
  

  isCircleTurn = false;
  
  screenPlayer1.innerText = `O(A) ${player1.value} é o X e está com = ${player1Total}`
  
  screenPlayer2.innerText = `O(A) ${player2.value} é a O e está com = ${player2Total}`
  
  setBoardHoverClass()
  
  screenEntrance.style.display = "none"
  
  winningMessage.style.display = "none"
  
}

const endGame = (isDraw) => {
  if(isDraw) {
  message.textContent = 'Empate'
  } else {
  if(isCircleTurn) {
    message.textContent = "Círculo Venceu"
    player2Total++
  } else {
    message.textContent = " O X venceu"
    player1Total++
  }
  winningMessage.style.display = "flex"
}
}


const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer)
    })
  })
}

const checkForDraw = () => {
  return [... cellElements].every(cell => {
   return cell.classList.contains('xis') || cell.classList.contains('circle')
  })
}

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd)
}

const setBoardHoverClass = () => {
  board.classList.remove("circle")
  board.classList.remove("xis")
  
  if (isCircleTurn) {
    board.classList.add("circle")
  } else {
    board.classList.add("xis")
  }
}

const swapTurn = () => {
  isCircleTurn = !isCircleTurn
  setBoardHoverClass()
}

const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? 'circle' : 'xis';
  
  placeMark(cell, classToAdd)
  
  const isWin = checkForWin(classToAdd)
  const isDraw = checkForDraw()
  
  if(isWin) {
    endGame(false)
  } else if (isDraw) {
    endGame(true)
  } else {
  swapTurn()
  }
}

for (const cell of cellElements) {
  cell.addEventListener('click', handleClick, {once: true})

}



restartButton.addEventListener("click", startGame)