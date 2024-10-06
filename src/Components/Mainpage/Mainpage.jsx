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
    navigate('/VoteList'); // Navigate to the voting details page
  };

  return (
    <div className="mp-main-page">
      <div className="mp-mainpage-container">
        <div className="mp-scrollable-content">
          <div className="mp-mainpage-user-profile-card">
            <div className="mp-mainpage-user-info">
              <div className="mp-mainpage-user-image">
                <img src={userimage} alt="User" />
              </div>
              <div className="mp-mainpage-user-details">
                <h2>John Doe</h2>
                <p>WorldID: JD123456</p>
              </div>
            </div>
            <div className="mp-mainpage-balance-card">
              <p>Balance</p>
              <h3>100 WLD</h3>
            </div>
          </div>
          <div className="mp-mainpage-button-container">
            <button 
              className="mp-mainpage-action-button mp-mainpage-donation" 
              onClick={handleDonationClick} // Add onClick event handler
            >
              Donation
            </button>
            <button className="mp-mainpage-action-button mp-mainpage-voting" onClick={handleVotingClick}>
              Voting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
