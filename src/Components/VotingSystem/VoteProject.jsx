import Web3 from 'web3';

const web3 = new Web3(window.ethereum); // Use MetaMask provider
await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access

// Set up the contract instance
const contract = new web3.eth.Contract(abi, address);
