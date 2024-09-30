import React, { useState, useEffect } from 'react';

import { WagmiProvider, useAccount } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletOptions } from './components/WalletOptions'

import { Account } from './utils/account.tsx';
import { config } from './config.ts';

import Nav from './components/Nav';
import TreeDisplay from './components/TreeDisplay';
import MenuMiddle from './components/MenuMiddle';
import TreeInfo from './components/TreeInfo';



function App() {
  const queryClient = new QueryClient()

  const [allLand, setAllLand] = useState(Array(12).fill({ plantType: 0, stage: 0 }));
  const [selection, setSelection] = useState(0);
  const [tileSelect, setTileSelect] = useState(null);
  const [showUnselect, setShowUnselect] = useState(false);
  const [showTreeInfo, setShowTreeInfo] = useState(false);
  const [selectedTree, setSelectedTree] = useState(null);

  const handleTileClick = (index) => {
    // Selecting a tile and allowing the user to plant a tree on that tile
    setTileSelect(index);
    setSelection(1);  // Allow tree planting
    setShowUnselect(true);

    const chosenTile = allLand[index];
    if (chosenTile.plantType !== 0) {
      // If a tree exists on the tile, show tree info
      setShowTreeInfo(true);
    } else {
      // Otherwise, show the tree selection menu
      setShowTreeInfo(false);
    }
  };

  const unselectTile = () => {
    setSelection(0);
    setTileSelect(null);
    setShowUnselect(false);
    setShowTreeInfo(false);  // Hide tree info
  };

  const handleTreeInfo = (treeData) => {
    setSelectedTree(treeData); // Set the selected tree data for displaying information
  };

  const handleTreePurchase = async (treeId) => {
    if (selection === 1 && tileSelect !== null) {
      // Perform the tree planting action here, like interacting with the smart contract
      console.log(`Planting tree ${treeId} on tile ${tileSelect}`);

      // Simulate a tree being planted by updating the allLand array
      const updatedLand = [...allLand];
      updatedLand[tileSelect] = { plantType: treeId, stage: 1 }; // Assuming the tree starts at stage 1
      setAllLand(updatedLand);

      // Reset selection and tile after purchase
      setSelection(0);
      setTileSelect(null);
      setShowUnselect(false);
      setShowTreeInfo(false);
    }
  };

  const handleTreeRemove = () => {
    console.log('Removing tree from plot number:', tileSelect); 
    const updatedLand = [...allLand];
    updatedLand[tileSelect] = { plantType: 0, stage: 0 };  // Remove tree from plot
    setAllLand(updatedLand);
    unselectTile();  // Reset selection after removing tree
  };

  function ConnectWallet() {
    const { isConnected } = useAccount()

    // useEffect(() => {
    //   if (isConnected) {
    //     // Logic to load land and trees after connecting the wallet
    //     loadLandAndTrees();
    //   }
    // }, [isConnected]);

    if (isConnected) {
      // const selectedTile = tileSelect !== null ? allLand[tileSelect] : null;

      return (
        <>
          <div className="top__section">
            <Nav 
              onTreePurchase={handleTreePurchase}         
              selectedTile={tileSelect !== null ? allLand[tileSelect] : null} 
              isTileSelected={selection === 1}
              onTreeRemove={handleTreeRemove}
              showTreeInfo={showTreeInfo}
            />
            {selectedTree && <TreeInfo treeData={selectedTree} />}
            {/* {selection === 1 && selectedTile && selectedTile.plantType !== 0 && (
              <MenuMiddle />
            )} */}
            {showUnselect && (
              <div className="unselect">
                <button className="unselect__btn" onClick={unselectTile}>Unselect</button>
              </div>
            )}
            <Account />
          </div>
          <TreeDisplay allLand={allLand} handleTileClick={handleTileClick} />
          {/* <CurrencySection userAddress={address} farmBucks={farmBucks} /> */}
        </>
      );
    } else {
      return (
        <div className="section__login">
          <h1 className="login__name">FruitGame</h1>
          <div className="btns__login">
            <WalletOptions />
          </div>
        </div>
      );
    }
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
          <div className="App">
            <ConnectWallet />
          </div>
        </QueryClientProvider> 
    </WagmiProvider>
  );
}

export default App;
