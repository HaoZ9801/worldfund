import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VoteDetails.css";
import back_button from "../../assets/back.png";
import mercy from "../../assets/mercy.jpg"; // Correctly import mercy image
import mercy_logo from "../../assets/mercy-logo.png"; // Correctly import mercy logo
import Web3 from "web3";
import {ethers} from 'ethers';


const web3 = new Web3('https://sepolia-rpc.scroll.io/')
const contractAddress = "0x8dAc40e42538B825ac57b0C107CCd3d107664DAC"
const contractABI = [
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
const contractVotingAddress = "0xc7c099cce495cD7D688b6483c2407A98d57589db"
const contractVotingABI = [
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
]

const projectContract = new web3.eth.Contract(contractABI, contractAddress);
const votingContract = new web3.eth.Contract(contractVotingABI, contractVotingAddress);
import mercy from "../../assets/mercy.jpg";
import mercy_logo from "../../assets/mercy-logo.png";

const VoteDetails = () => {
  console.log(ethers);

  const [nullifierHash, setNullifierHash] = useState("");

    useEffect(() => {
        const fetchFileContent = async () => {
            try {
                const response = await fetch("/public/tempStorage/storage.txt"); // Adjust the path if necessary
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const text = await response.text();
                setNullifierHash(text); // Set the content to state
            } catch (error) {
                console.error("Error fetching file:", error);
            }
        };

        fetchFileContent();
    }, []);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentAccount, setCurrentAccount] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {

            try {
                // Assuming getProjects returns an array of project objects
                const projectList = await projectContract.methods.getAllProjects().call();
                setProjects(projectList);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
              setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    console.log(projects)

  const [selectedTab, setSelectedTab] = useState("about");
  const navigate = useNavigate(); // Initialize navigate

  const handleBackButtonClick = () => {
    navigate("/VoteList"); // Navigate to /VoteList on click
  };

  const connectAccount = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask to use this feature.");
        return null; // Return null if MetaMask is not installed
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Get the first account
        setCurrentAccount(account); // Update the state with the connected account
        console.log("Connected account:", account);
        return account; // Return the connected account
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        return null; // Return null if there is an error
    }
};


  const handleVote = async () => {
    const connectedAccount = await connectAccount();
    if (!nullifierHash || !projects.length || !connectedAccount) {
      console.error("Missing necessary data for voting.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum); // Use ethers.js
    const signer = provider.getSigner();

    const votingContract = new ethers.Contract(contractVotingAddress, contractVotingABI, signer);

    try {
      const tx = await votingContract.methods.castVote(nullifierHash, projects[0].uniqueHash).send({ from: connectedAccount });
      console.log("Vote cast successfully:", tx);
    } catch (error) {
      console.error("Error casting vote:", error);
    }

    navigate("/VoteList", { state: { selectedTab: "history" } });
  };

  return (
    <div className="vote-details">
      <div className="details-container">
        <div className="scrollable-content">
          <div className="vote-top-title">
            <img 
                src={back_button} 
                alt="back" 
                onClick={handleBackButtonClick} 
                style={{ cursor: 'pointer' }} 
            />
            <h1>Vote Project</h1>
          </div>

          <div className="vote-project-pics">
            <div className="mercy-pics">
              <img src={mercy} alt="mercy" />
            </div>
            <div className="mercy-logo">
              <img src={mercy_logo} alt="mercy logo" />
            </div>
          </div>

          <div className="mercy-content">
            <div className="mercy-name">
              <h1>Mercy Malaysia</h1>
            </div>

            <div className="vote-about-bar">
              <div
                className={`vote-tab ${selectedTab === "about" ? "active" : ""}`}
                onClick={() => setSelectedTab("about")}
              >
                About
                {selectedTab === "about" && <div className="vote-underline" />}
              </div>
              <div
                className={`vote-tab ${selectedTab === "milestone" ? "active" : ""}`}
                onClick={() => setSelectedTab("milestone")}
              >
                Milestone
                {selectedTab === "milestone" && <div className="vote-underline" />}
              </div>
            </div>

            {/* About Content */}
            {selectedTab === "about" && (
              <div className="vote-about-content">
                <p>
                MERCY Malaysia is an international non-profit organisation focusing on providing medical relief, sustainable health-related development and risk reduction activities for vulnerable communities, in both crisis and non-crisis situations.
                </p>
              </div>
            )}

            {/* Milestone Content */}
            {selectedTab === "milestone" && (
              <div className="vote-milestone-content">
                <ul>
                  <li>Phase 1 - Emergency Response</li>
                  <li>Phase 2 - Recovery</li>
                  <li>Phase 3 - Prevention/Mitigation</li>
                  <li>Phase 4 - Preparedness</li>
                </ul>
              </div>
            )}
          </div>

          <div className="voting-box">
            <div className="funds">
              <span>Funds</span>
              <h2>$356,000</h2>
            </div>
            {loading ? ( // Show loading state while fetching
        <p>Loading...</p>
      ) : (
        <div className="supporters">
          <span>No. of Supporters</span>
          <h2>{projects[0].voteCount.toString()}</h2>
        </div>
      )}
      {loading ? ( // Show loading state while fetching
        <p>Loading...</p>
      ) : (
            <button className="vote-now-button" onClick={handleVote}>Vote</button>
      )}
        </div>


        </div>
      </div>
    </div>
  );
};

export default VoteDetails;
