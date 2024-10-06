import { useState } from "react";
import { ethers } from "ethers"; // Make sure to install ethers.js

const MetaMask = () => {
  const [account, setAccount] = useState(null);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log('Connected accounts:', accounts);
      } catch (error) {
        console.error('User denied account access or error occurred:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  const transferFunds = async (amount) => {
    if (!account) {
      console.error("Connect to MetaMask first.");
      return;
    }

    const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; // Replace with your deployed contract address
    const contractABI = [ 
      {
        "inputs": [],
        "name": "donate",
        "outputs": [],
        "stateMutability": "payable",
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
            "name": "donor",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "DonationReceived",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "withdraw",
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
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Withdrawn",
        "type": "event"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      },
      {
        "inputs": [],
        "name": "getBalance",
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
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
    try {
      const tx = await contract.donate({ value: ethers.utils.parseEther(amount) });
      await tx.wait(); // Wait for the transaction to be mined
      console.log('Transaction successful:', tx);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return { account, connectMetaMask, transferFunds };
};

export default MetaMask;
