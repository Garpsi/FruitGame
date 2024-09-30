import React, {useState} from 'react';

import green1 from '../assets/green1.png';
import green2 from '../assets/green2.png';
import green3 from '../assets/green3.png';
import green4 from '../assets/green4.png';
import blue1 from '../assets/blue1.png';
import blue2 from '../assets/blue2.png';
import blue3 from '../assets/blue3.png';
import blue4 from '../assets/blue4.png';
import orange1 from '../assets/orange1.png';
import orange2 from '../assets/orange2.png';
import orange3 from '../assets/orange3.png';
import orange4 from '../assets/orange4.png';
import red1 from '../assets/red1.png';
import red2 from '../assets/red2.png';
import red3 from '../assets/red3.png';
import red4 from '../assets/red4.png';


const Nav = ({ onTreePurchase, selectedTile, isTileSelected, showTreeInfo, onTreeRemove }) => {

  const treeData = [
    {
      id: 1,
      name: 'Green Tree',
      images: [green1, green2, green3, green4],
      price: '50 FB',
      levels: [
        { exp: '100', image: green1, description: '2% per day' },
        { exp: '300', image: green2, description: '2.2% per day' },
        { exp: '500', image: green3, description: '2.4% per day' },
        { exp: '1000', image: green4, description: '2.6% per day' },
      ],
    },
    {
      id: 2,
      name: 'Blue ',
      images: [blue1, blue2, blue3, blue4],
      price: '250 FB',
      levels: [
        { exp: '120', image: blue1, description: '2% per day' },
        { exp: '320', image: blue2, description: '2% per day' },
        { exp: '520', image: blue3, description: '2% per day' },
        { exp: '1020', image: blue4, description: '2% per day' },
      ],
    },
    {
      id: 3,
      name: 'Orange ',
      images: [orange1, orange2, orange3, orange4],
      price: '1000 FB',
      levels: [
        { exp: '150', image: orange1, description: '2% per day' },
        { exp: '350', image: orange2, description: '2% per day' },
        { exp: '600', image: orange3, description: '2% per day' },
        { exp: '1200', image: orange4, description: '2% per day' },
      ],
    },
    {
      id: 4,
      name: 'Red ',
      images: [red1, red2, red3, red4],
      price: '5000 FB',
      levels: [
        { exp: '180', image: red1, description: '2% per day' },
        { exp: '380', image: red2, description: '2% per day' },
        { exp: '680', image: red3, description: '2% per day' },
        { exp: '1500', image: red4, description: '2% per day' },
      ],
    },
  ];
  
  return (
    <div>
      <div className="menu">
        {showTreeInfo && selectedTile ? (
          <div className="menu__tree--info">
            <div className="menu__tree--info--top">
              <h2 className="menu__tree--name">Tree {selectedTile.plantType} - Level {selectedTile.stage}</h2>
              <button className="menu__btn--remove" onClick={() => onTreeRemove()}>
                Remove
              </button>
            </div>
            <div className="menu__tree--info--middle">
              <div className="unclaimed">
                <h3>Unclaimed Rewards:</h3>
                <h1 className="unclaimed__amount">40.5 FB</h1>
              </div>
              <div className="menu__btns">
                <button className="menu__btn--compound">Compound</button>
                <button className="menu__btn--claim">Claim</button>
              </div>
            </div>
            <div class="menu__tree--info--bottom">
              <h3 class="tree__progress--amount">
                LEVEL PROGRESS:
                <span class="tree__progress--number">240/450 (Level {selectedTile.stage + 1})</span>
                
              </h3>
              <div id="tree__progress">
                <div id="tree__progress--bar"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`menu__trees ${!isTileSelected ? 'opacity' : ''}`}>
            {/* Tree 1 */}
            {treeData.map((tree) => (
              <div
                key={tree.id}
                className="menu__tree"
              >
                <img className="menu__tree--img" src={tree.images[0]} alt={tree.name} />
                <input
                  id={`tree${tree.id}`}
                  className="menu__tree--input"
                  onClick={() => onTreePurchase(tree.id)}
                  type="button"
                  value={tree.price}
                  disabled={!isTileSelected}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;


{/* <div className="menu__tree">
          <img className="menu__tree--img" src={tree1} alt="Tree 1" />
          <input
            id="tree1"
            className="menu__tree--input"
            onClick={() => onTreePurchase(1)}
            // onMouseOver={() => onTreeHover(1)}
            onMouseLeave={onTreeLeave}
            type="button"
            value="50 FB"
            disabled={!isTileSelected}
          />
        </div>
        <div className="menu__tree">
          <img className="menu__tree--img" src={tree2} alt="Tree 2" />
          <input
            id="tree2"
            className="menu__tree--input"
            onClick={() => onTreePurchase(2)}
            // onMouseOver={() => onTreeHover(2)}
            onMouseLeave={onTreeLeave}
            type="button"
            value="250 FB"
            disabled={!isTileSelected}
          />
        </div>
        <div className="menu__tree">
          <img className="menu__tree--img" src={tree3} alt="Tree 3" />
          <input
            id="tree3"
            className="menu__tree--input"
            onClick={() => onTreePurchase(3)}
            // onMouseOver={() => onTreeHover(3)}
            onMouseLeave={onTreeLeave}
            type="button"
            value="1000 FB"
            disabled={!isTileSelected}
          />
        </div>
        <div className="menu__tree">
          <img className="menu__tree--img" src={tree4} alt="Tree 4" />
          <input
            id="tree4"
            className="menu__tree--input"
            onClick={() => onTreePurchase(4)}
            // onMouseOver={() => onTreeHover(4)}
            onMouseLeave={onTreeLeave}
            type="button"
            value="5000 FB"
            disabled={!isTileSelected}
          />
        </div> */}