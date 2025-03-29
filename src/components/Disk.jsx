import React from "react";
import "../styles/TowerOfHanoi.css";

const Disk = ({ size, selected }) => {
  return (
    <div 
      className={`disk ${selected ? 'selected' : ''}`}
      data-size={size}
    ></div>
  );
};

export default Disk;