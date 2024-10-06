import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Mainpage.css';
import userimage from "../../assets/user-image.png";
import { useEffect, useState } from 'react';
const Mainpage = () => {

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

    // Utility function to format the hash
    const formatHash = (hash) => {
      if (hash.length > 4) {
          return `${hash.slice(0, 4)}...${hash.slice(-2)}`; // Shorten the hash
      }
      return hash; // Return as is if it's too short
  };


  // fs.readFile(filePath, 'utf8', (err, data) => {
  //   if (err) {
  //     console.error('Error reading file:', err);
  //     return;
  //   }
  //   console.log('File content:', data);
  //   nullifierHash = data;
  // });
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
            <div className="mainpage-user-details">
              <h2>John Doe</h2>
              <p>WorldID: JD123456</p>
              <p>Hash: {formatHash(nullifierHash)}</p>
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
