import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "./VoteList.css";
import Web3 from "web3";

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

const projectContract = new web3.eth.Contract(contractABI, contractAddress);

const VoteList = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {

            try {
                // Assuming getProjects returns an array of project objects
                const projectList = await projectContract.methods.getAllProjects().call();
                setProjects(projectList);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    console.log(projects)

    const [selectedTab, setSelectedTab] = useState("vote");
    const navigate = useNavigate(); // Initialize navigate
    const location = useLocation(); // Get location to read state

    // Check for state passed from VoteDetails
    useEffect(() => {
        if (location.state && location.state.selectedTab) {
            setSelectedTab(location.state.selectedTab);
        }
    }, [location.state]);

    const handleVoteItemClick = () => {
        navigate("/VoteDetails"); // Navigate to /VoteDetails
    };

    const history = [
        { date: '06/10/2024', details: 'Mercy Malaysia' },
        { date: '12/05/2024', details: 'Rumah Hope' },
        { date: '31/01/2024', details: 'Flood Mitigation Project' },
    ];

    return (
        <div className="voting-list">
            <div className="vote-list-container">
                <div className="scrollable-content">
                    <div className="vote-list-title">
                        <h1>Project Voting</h1>
                    </div>

                    <div className="vote-about-bar">
                        <div
                            className={`vote-tab ${selectedTab === "vote" ? "active" : ""}`}
                            onClick={() => setSelectedTab("vote")}
                        >
                            Vote
                            {selectedTab === "vote" && <div className="vote-underline" />}
                        </div>
                        <div
                            className={`vote-tab ${selectedTab === "history" ? "active" : ""}`}
                            onClick={() => setSelectedTab("history")}
                        >
                            History
                            {selectedTab === "history" && <div className="vote-underline" />}
                        </div>
                    </div>

                    {selectedTab === "vote" && (
                        <div className="vote-about-content">
                            <ul>
                            {projects.map((project, index) => (
                <li
                    key={project.uniqueHash} // Use uniqueHash as a key for each project
                    className={`vote-item ${index === 0 ? 'vote-item1' : ''}`} // Add custom class for the first item
                    onClick={handleVoteItemClick}
                    style={{ cursor: 'pointer' }}
                >
                    <span className={`rank ${index === 0 ? 'rank1' : ''}`}>{index + 1}</span>
                    <div className={`vote-box ${index === 0 ? 'vote-box1' : ''}`}>
                        <span className={`name ${index === 0 ? 'name1' : ''}`}>{project.projectType}</span>
                        <span className={`number ${index === 0 ? 'number1' : ''}`}>{project.voteCount.toString()}</span>
                    </div>
                </li>
            ))}
                                {/* <li className="vote-item1" onClick={handleVoteItemClick} style={{ cursor: 'pointer' }}>
                                    <span className="rank1">1</span>
                                    <div className="vote-box1">
                                        <span className="name1">Mercy Malaysia</span>
                                        <span className="number1">8,710</span>
                                    </div>
                                </li>
                                <li className="vote-item">
                                    <span className="rank">2</span>
                                    <div className="vote-box">
                                        <span className="name">Klang Ecoworld</span>
                                        <span className="number">1,594</span>
                                    </div>
                                </li>
                                <li className="vote-item">
                                    <span className="rank">3</span>
                                    <div className="vote-box">
                                        <span className="name">Rumah Hope</span>
                                        <span className="number">827</span>
                                    </div>
                                </li>
                                <li className="vote-item">
                                    <span className="rank">4</span>
                                    <div className="vote-box">
                                        <span className="name">InnoMap</span>
                                        <span className="number">310</span>
                                    </div>
                                </li>
                                <li className="vote-item">
                                    <span className="rank">5</span>
                                    <div className="vote-box">
                                        <span className="name">Hati.my</span>
                                        <span className="number">92</span>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    )}

                    {/* History Content */}
                    {selectedTab === "history" && (
                        <div className="vote-history-content">
                            <div className="history-content">
                                <div className="history-title">
                                    <div className="history-date">Date</div>
                                    <div className="history-details">Details</div>
                                </div>

                                {history.map((item) => (
                                    <div key={item.date} className="history-item">
                                        <div className="history-date">{item.date}</div>
                                        <div className="history-details">{item.details}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VoteList;
