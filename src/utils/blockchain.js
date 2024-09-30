import { createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { metaMask, walletConnect } from 'wagmi/connectors';

import { useConnect, useDisconnect } from 'wagmi';
import { metaMask, walletConnect } from 'wagmi/connectors';
import { ethers } from 'ethers';
import { contractABI } from '../contract/contractABI';

const contractAddress = "0xf0BC4E444573Bd2023F17a787e22e4e6F689dE73";
let contract, signer;

export const config = createConfig({
  connectors: [
    metaMask(),
    walletConnect({ projectId: 'WALLETCONNECT_PROJECT_ID' }) // Replace with your WalletConnect Project ID
  ],
  chains: [mainnet]
});


export const connectToContract = (provider) => {
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, contractABI, signer);
};

export const plantTree = async (treeType, position) => {
  try {
    await contract.plantTree(signer.getAddress(), treeType, position);
  } catch (error) {
    console.error("Error planting tree:", error);
  }
};