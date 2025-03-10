import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'

import { TURNS } from './constant'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { saveGameStorage, resetGameStorage } from './logic/storage'

import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'


function App() {

  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  
  console.log(board);

  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null) // null No winner - false a tie



  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }


  const updateBoard = (index) => {
    if(board[index] || winner ) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // SAVE GAME
    saveGameStorage({board: newBoard, turn: newTurn})

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner){
      // alert(`El ganador es ${newWinner}`)
      confetti()
      setWinner( (prevWinner) => {
        console.log(`Ganador: ${newWinner}, el anterior era ${prevWinner}`);
        return newWinner; 
      })
    } else if ( checkEndGame(newBoard) ) {
      setWinner(false);
    }

    // check 
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Reset del juego</button>

      <section className="game">
        {
          board.map( (square, index) => {
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}> 
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X} >{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
