import React from 'react';

const TreeInfo = ({ treeData }) => {
  if (!treeData) return null;  // If no tree is hovered, don't display anything

  return (
    <div className="tree-info">
      <h3>{treeData.name}</h3>
      <div className="tree-levels">
        {treeData.levels.map((level, index) => (
          <div key={index} className="tree-level">
            <h3>Level {index + 1}</h3>
            <img className="tree-info__img" src={level.image} alt={`Tree ${treeData.name} Level ${index + 1}`} />
            <p>EXP: {level.exp}</p>
            <p>{level.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeInfo;
