import { useState } from 'react'

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const winner = calculateWinner(board)

  function handleClick(index) {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }

  function calculateWinner(squares) {
    const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white font-sans">
      <h1 className="text-4xl font-bold mb-8 text-cyan-400">Jogo da Velha Distribuído</h1>
      
      <div className="grid grid-cols-3 gap-2 bg-gray-700 p-3 rounded-xl shadow-2xl">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 bg-gray-800 flex items-center justify-center text-5xl font-bold hover:bg-gray-600 transition-colors rounded-lg shadow-inner"
          >
            <span className={cell === 'X' ? 'text-cyan-400' : 'text-rose-400'}>{cell}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 text-2xl font-semibold h-8">
        {winner ? (
          <p className="text-emerald-400 animate-pulse">Vencedor: {winner} 🎉</p>
        ) : board.every(Boolean) ? (
          <p className="text-yellow-400">Deu Velha! 👵</p>
        ) : (
          <p>Próximo a jogar: <span className={isXNext ? 'text-cyan-400' : 'text-rose-400'}>{isXNext ? 'X' : 'O'}</span></p>
        )}
      </div>

      <button 
        onClick={() => setBoard(Array(9).fill(null))} 
        className="mt-8 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-bold transition-transform active:scale-95 shadow-lg"
      >
        Reiniciar Jogo
      </button>
    </div>
  )
}