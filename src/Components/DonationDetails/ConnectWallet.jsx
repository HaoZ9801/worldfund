import Web3 from 'web3';
import { useState, useEffect } from 'react';

const ConnectWallet = () => {
  const [account, setAccount] = useState(null); // To store connected account
  const [web3, setWeb3] = useState(null); // Web3 instance
  const [balance, setBalance] = useState(null); // Store account balance
  const [isSepolia, setIsSepolia] = useState(false); // Check if Sepolia network is selected

  // Function to check if the current network is Sepolia
  const checkNetwork = async (web3Instance) => {
    const chainId = await web3Instance.eth.getChainId();
    console.log("Connected to chain ID:", chainId);
    if (Number(chainId) === 11155111) {
      setIsSepolia(true);
    } else {
      alert('Please switch to the Sepolia test network in MetaMask.');
      setIsSepolia(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);
  
  // Function to connect to wallet
  const connectWallet = async () => {
    if (web3) {
      try {
        // Request wallet connection
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Request accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]); // Set the first account

        // Check network after requesting accounts
        await checkNetwork(web3Instance);

        // Fetch balance
        const balance = await web3Instance.eth.getBalance(accounts[0]);
        setBalance(web3Instance.utils.fromWei(balance, 'ether'));

        console.log('Connected account:', accounts[0]);
        console.log('Account balance:', balance);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet.');
    }
  };

  return (
    <div>
      {account && isSepolia ?(
        <div>
          <p>Connected account: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
