import React, { useState, useEffect } from 'react';

import tree1 from '../assets/tree1.png';
import tree2 from '../assets/tree2.png';
import tree3 from '../assets/tree3.png';
import tree4 from '../assets/tree4.png';

const TreeDisplay = ({ handleTileClick, allLand }) => {

  const treeImages = {
    1: tree1,
    2: tree2,
    3: tree3,
    4: tree4,
  };

  useEffect(() => {
    // When the allLand array changes, this component will re-render
    console.log("allLand array changed", allLand);
  }, [allLand]);

  return (
    <div className="wrapper">
      <div className="cube__container">
        <div className="underground1"></div>
        <div className="underground2"></div>
        {allLand.map((land, index) => (
          <button 
            key={index} 
            className="cube" 
            onClick={() => handleTileClick(index)}
          >
            {land.plantType !== 0 && (
              <img
                src={treeImages[land.plantType]}
                alt={`Tree ${land.plantType}`}
                className={`tree treestage${land.stage}`}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TreeDisplay;
