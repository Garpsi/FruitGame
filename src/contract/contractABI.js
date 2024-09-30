[
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "position",
        type: "uint8",
      },
    ],
    name: "advanceStage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "busd",
        type: "uint256",
      },
    ],
    name: "giveUserBUSD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "farmbucks",
        type: "uint256",
      },
    ],
    name: "giveUserFarmbucks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "position",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "farmbucks",
        type: "uint256",
      },
    ],
    name: "investIntoPlant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "plantType",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "position",
        type: "uint8",
      },
    ],
    name: "plantTree",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "accounts",
    outputs: [
      {
        internalType: "uint256",
        name: "farmBucks",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalBusdDeposited",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "busdApproved",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalFarmbucksClaimed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalBUSDClaimed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalFarmbucksPending",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dailyReturn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "pos",
        type: "uint8",
      },
    ],
    name: "getLandPlot",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "plantType",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "stage",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "totalFB",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastClaim",
            type: "uint256",
          },
        ],
        internalType: "struct FakeMiner.Land",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "pos",
        type: "uint8",
      },
    ],
    name: "getLandPlotContents",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "plants",
    outputs: [
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RETURN_DENOM",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];