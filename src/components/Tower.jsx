import React from "react";
import Disk from "./Disk";

const Tower = ({ name, disks, moveDisk, setSelectedDisk, setSourceTower, selectedDisk }) => {
  const handleClick = () => {
    if (selectedDisk === null && disks.length > 0) {
      // Select the top disk (first in array)
      setSelectedDisk(disks[0]);
      setSourceTower(name);
    } else if (selectedDisk !== null) {
      // Only allow moving to empty tower or onto larger disk
      if (disks.length === 0 || disks[disks.length - 1] > selectedDisk) {
        moveDisk(name);
      }
    }
  };

  return (
    <div className="tower" onClick={handleClick}>
      <div className="peg"></div>
      {disks.map((disk, index) => (
        <Disk 
          key={index} 
          size={disk} 
          selected={selectedDisk === disk}
        />
      ))}
    </div>
  );
};

export default Tower;