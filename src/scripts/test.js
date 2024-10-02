const { ethers } = require("hardhat");
require('dotenv').config();
const { ABI } = require("../contract/ABI.js");

// async function main() {
//   // Get the contract factory
//   const ContractFactory = await ethers.getContractFactory("TreeFarm");  // Replace "YourContract" with your actual contract name

//   // Deploy the contract
//   const contract = await ContractFactory.deploy();  // If your contract has a constructor, pass the necessary arguments
//   await contract.deployed();  // Wait for the contract to be deployed

//   console.log("Contract deployed to address:", contract.address);

//   // Interact with the contract (example function call)
//   const result = await contract.decimals();  // Replace `someFunction` with an actual contract function
//   console.log("Function result:", result);
// }

async function main() {
  const provider = new ethers.JsonRpcProvider("https://alloffline.online")
  const privateKey = process.env.PRIVATE_KEY;
  const signer = new ethers.Wallet(privateKey, provider);
  const gameContract = new ethers.Contract("0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9", ABI, signer);
  const name = await gameContract.name();
  console.log("Token Name:", name);
  // try {
  //   // Calling a view function, replace with the actual function you want to test
  //   const decimals = await gameContract.decimals();
  //   console.log("Total Supply:", decimals);
  // } catch (error) {
  //   console.error("Error calling contract function:", error);
  // }
  }

// async function main() {
//   const provider = new ethers.JsonRpcProvider("https://alloffline.onlie");

//   try {
//     const blockNumber = await provider.getBlockNumber();
//     console.log("Latest block number:", blockNumber);
//   } catch (error) {
//     console.error("Error connecting to RPC:", error);
//   }
// }

// async function main() {
//   // Push the contract details to Ethernal
//   await hre.ethernal.push({
//     name: 'TestingFruity',  // Or your contract's name
//     address: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
//   });
//   console.log(address)
// }

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
