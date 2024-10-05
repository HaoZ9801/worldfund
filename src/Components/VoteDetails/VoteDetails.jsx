import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VoteDetails.css";
import back_button from "../../assets/back.png";
import mercy from "../../assets/mercy.jpg"; // Correctly import mercy image
import mercy_logo from "../../assets/mercy-logo.png"; // Correctly import mercy logo

const VoteDetails = () => {
  const [selectedTab, setSelectedTab] = useState("about");

  const navigate = useNavigate(); // Initialize navigate

  const handleBackButtonClick = () => {
    navigate("/VoteList"); // Navigate to /VoteList on click
  };
  
  return (
    <div className="vote-details">
      <div className="details-container">
        <div className="scrollable-content">
          <div className="vote-top-title">
            <img 
                src={back_button} 
                alt="back" 
                onClick={handleBackButtonClick} // Set onClick handler
                style={{ cursor: 'pointer' }} // Change cursor to pointer
                />
            <h1>Vote Project</h1>
          </div>

          <div className="vote-project-pics">
            <div className="mercy-pics">
              <img src={mercy} alt="mercy" /> {/* Use the correct image */}
            </div>
            <div className="mercy-logo">
              <img src={mercy_logo} alt="mercy logo" /> {/* Use the correct logo */}
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
                MERCY Malaysia is an international non-profit organisation focusing on providing medical relief, sustainable health-related development and risk reduction activities for vulnerable communities, in both crisis and non-crisis situation.
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
            <div className="supporters">
                <span>No. of Supporters</span>
                <h2>8,710</h2>
            </div>
            <button className="vote-now-button">Vote</button>
        </div>


        </div>
      </div>
    </div>
  );
};

export default VoteDetails;
