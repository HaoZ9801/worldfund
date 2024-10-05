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
    navigate('/donation-details'); // Navigate to the donation details page
  };

  const handleVotingClick = () => {
    navigate('/VoteDetails'); // Navigate to the donation details page
  };

  return (
      <div className="mainpage-container">
        <div className="mainpage-user-profile-card">
          <div className="mainpage-user-info">
            <div className="mainpage-user-image">
              <img src={userimage} alt="User" />
            </div>
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
  );
};

export default Mainpage;
