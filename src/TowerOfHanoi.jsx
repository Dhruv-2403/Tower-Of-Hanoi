import React, { useState } from "react";
import Tower from "./components/Tower";
import "./styles/TowerOfHanoi.css";

const TowerOfHanoi = () => {
  const [towers, setTowers] = useState({
    A: [3, 2, 1],
    B: [],
    C: []
  });
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [sourceTower, setSourceTower] = useState(null);
  const [moves, setMoves] = useState(0);

  const moveDisk = (tower) => {
    if (selectedDisk !== null) {
      if (towers[tower].length === 0 || towers[tower].slice(-1)[0] > selectedDisk) {
        const newTowers = { ...towers };
        newTowers[sourceTower].pop();
        newTowers[tower].push(selectedDisk);
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
      </div>
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
    </div>
  );
};

export default TowerOfHanoi;