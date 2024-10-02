const ethers = require('ethers');
const ABI = [{
  "inputs": [],
  "name": "totalSupply",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
];
console.log(ABI)
const provider = new ethers.providers.JsonRpcProvider("https://alloffline.online/");
const signer = new ethers.Wallet("0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356", provider);
const gameContract = new ethers.Contract("0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9", ABI, signer);

async function main() {
  const test = await gameContract.totalSupply();

  console.log(test);
}

main();