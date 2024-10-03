/**
@type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require('hardhat-ethernal');
require('@nomicfoundation/hardhat-ignition')

const { RPC_URL, PRIVATE_KEY, ETHERNAL_EMAIL, ETHERNAL_PASSWORD } = process.env;

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },  // Match the Solidity version in your contract
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",  // Local Hardhat node URL
    },
  },
};

/**module.exports = {
  solidity: "0.8.10",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200  // You can adjust this value to balance deployment cost vs execution cost
    }
  },
  defaultNetwork: "TestingFruity",  // Use the Hardhat default local network
  networks: {
    hardhat: {
      chainId: 1337,  // The default chain ID for Hardhat's local network
    },
    localhost: {
      url: "http://127.0.0.1:8545",  // The default local Hardhat node
    },
    TestingFruity: {
        url: "https://alloffline.online",
        chainId: 1337,
        accounts: [`${PRIVATE_KEY}`]
    }
   },
   ethernal: {
    uploadAst: true,
    disableSync: false,
    email: ETHERNAL_EMAIL,   // Pass the email from .env
    password: ETHERNAL_PASSWORD  // Pass the password from .env
 },
} */