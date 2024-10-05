import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Mainpage.css';
import userimage from "../../assets/user-image.png";

const Mainpage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleDonationClick = () => {
    navigate('/DonationList'); // Navigate to the donation details page
  };

  const handleVotingClick = () => {
    navigate('/VoteList'); // Navigate to the donation details page
  };

  return (
    <div className="main-page">
      <div className="mainpage-container">
        
                <div className="scrollable-content">
        <div className="mainpage-user-profile-card">
          <div className="mainpage-user-info">
            <div className="mainpage-user-image">
              <img src={userimage} alt="User" />
            </div>
            <div className="mainpage-user-details">
              <h2>John Doe</h2>
              <p>WorldID: JD123456</p>
            </div>
          </div>
          <div className="mainpage-balance-card">
            <p>Balance</p>
            <h3>100 WLD</h3>
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
        </div>
      </div>
      </div>
      </div>
  );
};

export default Mainpage;
