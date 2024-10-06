import Web3 from "web3";
import dotenv from "dotenv"

dotenv.config();

// Replace this with your own values
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Do not expose this key in production

const ABI_PROJECT = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_projectType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "createProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_uniqueHash",
				"type": "bytes32"
			}
		],
		"name": "incrementVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "uniqueHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "projectType",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "ProjectCreated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllProjects",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "projectType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "bytes32",
						"name": "uniqueHash",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					}
				],
				"internalType": "struct ProjectRegistry.Project[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_uniqueHash",
				"type": "bytes32"
			}
		],
		"name": "getProject",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "projectType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "bytes32",
						"name": "uniqueHash",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					}
				],
				"internalType": "struct ProjectRegistry.Project",
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
				"internalType": "bytes32",
				"name": "_uniqueHash",
				"type": "bytes32"
			}
		],
		"name": "getProjectVoteCount",
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
		"name": "projectHashes",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "projects",
		"outputs": [
			{
				"internalType": "string",
				"name": "projectType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "uniqueHash",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const BYTECODE_PROJECT = process.env.BYTECODE_PROJECT; // Your contract bytecode

const ABI_VOTE = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hashNullifier",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_projectHash",
				"type": "bytes32"
			}
		],
		"name": "castVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_projectRegistry",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "hashNullifier",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "projectHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "VoteCasted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllVotes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "hashNullifier",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "projectHash",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct VotingSystem.Vote[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hashNullifier",
				"type": "bytes32"
			}
		],
		"name": "getVotesByHash",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "hashNullifier",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "projectHash",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct VotingSystem.Vote[]",
				"name": "",
				"type": "tuple[]"
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
		"name": "votes",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "hashNullifier",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "projectHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const BYTECODE_VOTE = process.env.BYTECODE_VOTE; // Your contract bytecode

const deploy = async () => {
    const web3 = new Web3(`https://scroll-sepolia.infura.io/v3/${INFURA_PROJECT_ID}`);
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY); // Create account object from private key
    web3.eth.accounts.wallet.add(account); // Add account to Web3 wallet
    web3.eth.defaultAccount = account.address; // Set the default account

    const fromAddress = account.address;

    let nonce = await web3.eth.getTransactionCount(fromAddress, 'pending');
    console.log(nonce);

   // Deploy ContractA
   const contractA = new web3.eth.Contract(ABI_PROJECT);

   const gasEstimateA = await contractA.deploy({
    data: BYTECODE_PROJECT,
    arguments: [] // Constructor arguments if needed
}).estimateGas();
   const resultA = await contractA
       .deploy({
           data: BYTECODE_PROJECT,
           arguments: [] // Constructor arguments for ContractA
       })
       .send({
           from: fromAddress,
           gas: gasEstimateA,
       });

   console.log("ContractA deployed at address:", resultA.options.address);

   // Deploy ContractB, passing the address of ContractA
   const contractB = new web3.eth.Contract(ABI_VOTE);

   // Estimate gas for ContractB deployment
   const gasEstimateB = await contractB.deploy({
    data: BYTECODE_VOTE,
    arguments: [resultA.options.address] // Constructor arguments for ContractB
}).estimateGas();
   const resultB = await contractB
       .deploy({
           data: BYTECODE_VOTE,
           arguments: [resultA.options.address] // Constructor arguments for ContractB
       })
       .send({
           from: fromAddress,
           gas: gasEstimateB,
        //    gasPrice: web3.utils.toWei('7', 'gwei'), 
       });

   console.log("ContractB deployed at address:", resultB.options.address);
};

deploy()
    .then(() => console.log("Deployment successful!"))
    .catch((error) => console.error("Error during deployment:", error));
