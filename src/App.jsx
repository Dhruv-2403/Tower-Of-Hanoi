import React, { useState, useEffect } from 'react';
import Tower from './components/Tower';
import './styles/TowerOfHanoi.css';

function App() {
  const Towers = {
    A: [1, 2, 3],  // Smallest (1) on top, largest (3) on bottom
    B: [],
    C: []
  };

  const [towers, setTowers] = useState(Towers);
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [sourceTower, setSourceTower] = useState(null);
  const [moves, setMoves] = useState(0);
  const [minMoves] = useState(Math.pow(2, Towers.A.length) - 1);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
  
    if (towers.C.length === 3) {
      setGameWon(true);
      setGameOver(true);
      alert(`Congratulations! You won in ${moves} moves! The minimum required moves were ${minMoves}.`);
    }

    else if (moves > minMoves && !gameOver) {
      setGameOver(true);
      alert(`Game Over! You took ${moves} moves. The minimum required moves were ${minMoves}.`);
    }
  }, [moves, minMoves, gameOver, towers.C.length]);

  const restartGame = () => {
    setTowers(initialTowers);
    setSelectedDisk(null);
    setSourceTower(null);
    setMoves(0);
    setGameOver(false);
    setGameWon(false);
  };

  const moveDisk = (tower) => {
    if (gameOver) return;
    
    if (selectedDisk !== null) {
      // Can't move to the same tower
      if (tower === sourceTower) {
        setSelectedDisk(null);
        setSourceTower(null);
        return;
      }

      // Can only move to empty tower or onto larger disk
      if (towers[tower].length === 0 || towers[tower][towers[tower].length - 1] > selectedDisk) {
        const newTowers = { ...towers };
        newTowers[sourceTower].shift(); // Remove from start (top)
        newTowers[tower].unshift(selectedDisk); // Add to start (top)
        setTowers(newTowers);
        setMoves(moves + 1);
      }
      setSelectedDisk(null);
      setSourceTower(null);
    }
  };

  return (
    <div className="game-container">
      <h1 className="title">Tower of Hanoi</h1>
      <div className="stats-container">
        <div className="moves">Moves: {moves}</div>
        <div className="min-moves">Minimum Moves: {minMoves}</div>
      </div>
      {gameOver && <div className="game-over">{gameWon ? 'You Won!' : 'Game Over!'}</div>}
      <div className="towers">
        {Object.keys(towers).map((tower) => (
          <Tower 
            key={tower} 
            name={tower} 
            disks={towers[tower]} 
            moveDisk={moveDisk} 
            setSelectedDisk={setSelectedDisk} 
            setSourceTower={setSourceTower} 
            selectedDisk={selectedDisk} />
        ))}
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

export default App; 
