import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Mainpage.css';
import userimage from "../../assets/user-image.jpg";
import { useEffect, useState } from 'react';
const Mainpage = () => {
  const [nullifierHash, setNullifierHash] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

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

  // Utility function to format the hash
  const formatHash = (hash) => {
    if (hash.length > 4) {
      return `${hash.slice(0, 4)}...${hash.slice(-2)}`; // Shorten the hash
    }
    return hash; // Return as is if it's too short
  };

  const handleDonationClick = () => {
    navigate('/DonationList'); // Navigate to the donation details page
  };

  const handleVotingClick = () => {
    navigate('/VoteList'); // Navigate to the voting details page
  };

  return (
    <div className="main-page">
      <div className="mainpage-container">
        
                <div className="scrollable-content">
        <div className='mainpage-background'></div>
        <div className="mainpage-user-profile-card">
          <div className="mainpage-user-image">
                <img src={userimage} alt="User" />
              </div>

          <div className='mainpage-content-box'>
            <div className="mainpage-user-info">
              
              <div className="mainpage-user-details">
                <h2>John Doe</h2>
                <p>WorldID: JD123456</p>
                <p>Hash: {formatHash(nullifierHash)}</p>
              </div>
            </div>
            <div className="mainpage-balance-card">
              <p>Balance</p>
              <h3>100 WLD</h3>
            </div>
          </div>
        </div>
        <div className="mainpage-button-container">
          <button 
            className="mainpage-action-button mainpage-donation" 
            onClick={handleDonationClick} // Add onClick event handler
          >
            Donation
          </button>
          <button className="mainpage-action-button mainpage-voting" onClick={handleVotingClick}>
            Voting
          </button>
            <div className="mp-mainpage-button-container">
              <div className="mp-mainpage-card">
                <button 
                  className="mp-mainpage-action-button mp-mainpage-donation" 
                  onClick={handleDonationClick}
                >
                  Donation
                </button>
                <button 
                  className="mp-mainpage-action-button mp-mainpage-voting" 
                  onClick={handleVotingClick}
                >
                  Voting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;

