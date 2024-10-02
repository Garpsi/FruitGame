import { createConfig } from 'wagmi';
import { bscTestnet, mainnet } from 'wagmi/chains';
import { metaMask, walletConnect } from 'wagmi/connectors';
import { ethers } from 'ethers';
import { getProvider, getSigner } from './web3Provider';
import contractABI from '../contract/contractABI';

const contractAddress = "0xf0BC4E444573Bd2023F17a787e22e4e6F689dE73";
let contract, signer;

export const config = createConfig({
  connectors: [
    metaMask(),
    walletConnect({ projectId: '9f2835db7c879e6e306273f80eb5f909' }) // Replace with your WalletConnect Project ID
  ],
  chains: [bscTestnet]
});


export const connectToContract = (provider) => {
  provider = getProvider();
  signer = getSigner(provider);
  contract = new ethers.Contract(contractAddress, contractABI, signer);
};

// Fetch information about a specific land plot
export const getLandPlot = async (userAddress, position) => {
  try {
    const landPlot = await contract.getLandPlot(userAddress, position);
    return {
      plantType: landPlot.plantType,
      stage: landPlot.stage,
      totalFB: landPlot.totalFB,
      lastClaim: landPlot.lastClaim
    };
  } catch (error) {
    console.error("Error fetching land plot details:", error);
    throw error;
  }
}

// Fetch content details of a specific land plot
export const getLandPlotContents = async (userAddress, position) => {
  try {
    const plotContents = await contract.getLandPlotContents(userAddress, position);
    return plotContents;
  } catch (error) {
    console.error("Error fetching land plot contents:", error);
    throw error;
  }
};

// // Fetch user Farm Bucks
// export const getFarmBucks = async () => {
//   try {
//     const userAddress = await signer.getAddress();
//     const accountInfo = await contract.accounts(userAddress);
//     return accountInfo.farmBucks;
//   } catch (error) {
//     console.error("Error fetching Farm Bucks:", error);
//     throw error;
//   }
// };

// Plant a tree
export const plantTree = async (treeType, position) => {
  try {
    const userAddress = await signer.getAddress();
    const tx = await contract.plantTree(userAddress, treeType, position);
    await tx.wait();  // Wait for transaction confirmation
    return tx;
  } catch (error) {
    console.error("Error planting tree:", error);
    throw error;
  }
};

// // Compound Farm Bucks to upgrade tree
// export const compoundFarmBucks = async (position, amount) => {
//   try {
//     const tx = await contract.investIntoPlant(position, amount);
//     await tx.wait();  // Wait for transaction confirmation
//     return tx;
//   } catch (error) {
//     console.error("Error compounding Farm Bucks:", error);
//     throw error;
//   }
// };

// // Claim Farm Bucks
// export const claimFarmBucks = async (position) => {
//   try {
//     const tx = await contract.giveUserFarmbucks(position);
//     await tx.wait();  // Wait for transaction confirmation
//     return tx;
//   } catch (error) {
//     console.error("Error claiming Farm Bucks:", error);
//     throw error;
//   }
// };