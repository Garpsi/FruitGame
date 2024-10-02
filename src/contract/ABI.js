const ABI = [
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "start",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "duration",
						"type": "uint32"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint16",
								"name": "numerator",
								"type": "uint16"
							},
							{
								"internalType": "uint16",
								"name": "denominator",
								"type": "uint16"
							}
						],
						"internalType": "struct Fraction",
						"name": "percentage",
						"type": "tuple"
					}
				],
				"internalType": "struct Boost",
				"name": "btype",
				"type": "tuple"
			}
		],
		"name": "addBoostType",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "allowed",
				"type": "bool"
			}
		],
		"name": "allowSpending",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "adr",
				"type": "address"
			}
		],
		"name": "authorize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "buyBoost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "compound",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Compounded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "compoundFor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "referer",
				"type": "address"
			}
		],
		"name": "depositWithRefer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "start",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "duration",
						"type": "uint32"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint16",
								"name": "numerator",
								"type": "uint16"
							},
							{
								"internalType": "uint16",
								"name": "denominator",
								"type": "uint16"
							}
						],
						"internalType": "struct Fraction",
						"name": "percentage",
						"type": "tuple"
					}
				],
				"internalType": "struct Boost",
				"name": "btype",
				"type": "tuple"
			}
		],
		"name": "editBoostType",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "indexes",
				"type": "uint256[]"
			},
			{
				"components": [
					{
						"internalType": "uint256[]",
						"name": "pricePerLevel",
						"type": "uint256[]"
					},
					{
						"components": [
							{
								"internalType": "uint16",
								"name": "numerator",
								"type": "uint16"
							},
							{
								"internalType": "uint16",
								"name": "denominator",
								"type": "uint16"
							}
						],
						"internalType": "struct Fraction[]",
						"name": "yieldPerLevel",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "uint16",
								"name": "numerator",
								"type": "uint16"
							},
							{
								"internalType": "uint16",
								"name": "denominator",
								"type": "uint16"
							}
						],
						"internalType": "struct Fraction[]",
						"name": "taxPerLevel",
						"type": "tuple[]"
					}
				],
				"internalType": "struct TreeType[]",
				"name": "ttypes",
				"type": "tuple[]"
			}
		],
		"name": "editMultipleTreeTypes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256[]",
						"name": "pricePerLevel",
						"type": "uint256[]"
					},
					{
						"components": [
							{
								"internalType": "uint16",
								"name": "numerator",
								"type": "uint16"
							},
							{
								"internalType": "uint16",
								"name": "denominator",
								"type": "uint16"
							}
						],
						"internalType": "struct Fraction[]",
						"name": "yieldPerLevel",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "uint16",
								"name": "numerator",
								"type": "uint16"
							},
							{
								"internalType": "uint16",
								"name": "denominator",
								"type": "uint16"
							}
						],
						"internalType": "struct Fraction[]",
						"name": "taxPerLevel",
						"type": "tuple[]"
					}
				],
				"internalType": "struct TreeType",
				"name": "ttype",
				"type": "tuple"
			}
		],
		"name": "editTreeType",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "allowed",
				"type": "bool"
			}
		],
		"name": "FarmBuckApproval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FarmBuckPurchase",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Invested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "investInTree",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mintPrivateSaleBucks",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "plantFirstTree",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "redeemBUSD",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RedeemBUSD",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "redeemBUSDFor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "redeemFarmbuck",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RedeemFarmBuck",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "redeemFarmbuckFor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "removeBoostType",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"name": "setBoostsAvailable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "setPrivateSaleMintAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "numerator",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "denominator",
						"type": "uint16"
					}
				],
				"internalType": "struct Fraction",
				"name": "fr",
				"type": "tuple"
			}
		],
		"name": "setRefererAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "allow",
				"type": "bool"
			}
		],
		"name": "setTransferAllowed",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "adr",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "TreePlant",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "adr",
				"type": "address"
			}
		],
		"name": "unauthorize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowedToSpend",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "farmer",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "boostTypes",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "start",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "duration",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "numerator",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "denominator",
						"type": "uint16"
					}
				],
				"internalType": "struct Fraction",
				"name": "percentage",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentLevel",
				"type": "uint256"
			}
		],
		"name": "canTreeLevelUp",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "getAvailableYield",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "booster",
				"type": "address"
			}
		],
		"name": "getCurrentBoost",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "start",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "duration",
						"type": "uint32"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint16",
								"name": "numerator",
								"type": "uint16"
							},
							{
								"internalType": "uint16",
								"name": "denominator",
								"type": "uint16"
							}
						],
						"internalType": "struct Fraction",
						"name": "percentage",
						"type": "tuple"
					}
				],
				"internalType": "struct Boost",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "getMyPlotState",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint24",
						"name": "currentLevel",
						"type": "uint24"
					},
					{
						"internalType": "uint32",
						"name": "lastYield",
						"type": "uint32"
					},
					{
						"internalType": "uint256",
						"name": "investedBucks",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "yieldedBucks",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "yieldedBUSD",
						"type": "uint256"
					}
				],
				"internalType": "struct Tree",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "getPlotState",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint24",
						"name": "currentLevel",
						"type": "uint24"
					},
					{
						"internalType": "uint32",
						"name": "lastYield",
						"type": "uint32"
					},
					{
						"internalType": "uint256",
						"name": "investedBucks",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "yieldedBucks",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "yieldedBUSD",
						"type": "uint256"
					}
				],
				"internalType": "struct Tree",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			}
		],
		"name": "getTreeType",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256[]",
						"name": "pricePerLevel",
						"type": "uint256[]"
					},
					{
						"components": [
							{
								"internalType": "uint16",
								"name": "numerator",
								"type": "uint16"
							},
							{
								"internalType": "uint16",
								"name": "denominator",
								"type": "uint16"
							}
						],
						"internalType": "struct Fraction[]",
						"name": "yieldPerLevel",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "uint16",
								"name": "numerator",
								"type": "uint16"
							},
							{
								"internalType": "uint16",
								"name": "denominator",
								"type": "uint16"
							}
						],
						"internalType": "struct Fraction[]",
						"name": "taxPerLevel",
						"type": "tuple[]"
					}
				],
				"internalType": "struct TreeType",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "plot",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "level",
				"type": "uint256"
			}
		],
		"name": "getTreeTypePrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "investment",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "numerator",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "denominator",
						"type": "uint16"
					}
				],
				"internalType": "struct Fraction",
				"name": "yield",
				"type": "tuple"
			}
		],
		"name": "getYieldByTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "adr",
				"type": "address"
			}
		],
		"name": "isAuthorized",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxYieldTime",
		"outputs": [
			{
				"internalType": "uint40",
				"name": "",
				"type": "uint40"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "spendingAllowed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
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
]

module.exports = { ABI };