import React from "react";
import "./DonationDetails.css"; 
import back_button from "../../assets/back.png";
import who from "../../assets/WHO.png";
import who_logo from "../../assets/who-logo.png";


const DonationDetails = () => {
  return (
    <div className="donation-details">
      <div className="details-container">
        <div className="scrollable-content">
          <div className="top-title">
            <img src={back_button} alt='back'></img>
            <h1>Donation</h1>
          </div>
          <div className="project-pics">
            <div className="who-pics">
                <img src={who} alt = 'who'></img>
            </div>
            <div className="who-logo">
                <img src="{who_logo}"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
