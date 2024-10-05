import React from "react";
import "./DonationDetails.css"; // Optional: Create a CSS file for styling

const DonationDetails = () => {
  return (
    <div className="donation-details">
      <div className="details-container">
        <div className="scrollable-content">
          <h2>Donation Details</h2>
          <p>
            Thank you for considering a donation! Your contributions help us support various causes and make a difference in the community.
          </p>
          <h3>How to Donate</h3>
          <p>
            To make a donation, please follow these steps:
          </p>
          <ul>
            <li>Choose the amount you would like to donate.</li>
            <li>Select the cause you want to support.</li>
            <li>Fill out the donation form.</li>
            <li>Submit your donation securely.</li>
          </ul>
          <h3>Contact Us</h3>
          <p>
            If you have any questions, feel free to reach out to us at <a href="mailto:info@example.com">info@example.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
