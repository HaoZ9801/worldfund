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

    const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
    const contractABI = [ // Replace with your contract's ABI
      "function donate() public payable"
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
