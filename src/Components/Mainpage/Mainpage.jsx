import React from 'react';
import './Mainpage.css';
import Frame from '../Frame/Frame';
import userimage from "../../assets/user-image.png";

const Mainpage = () => {
  return (
      <div className="main-container">
        <div className="user-profile-card">
          <div className="user-info">
            <div className="user-image">
              {/* Replace with actual image source */}
              <img src={userimage} alt="User" />
            </div>
            <div className="user-details">
              <h2>John Doe</h2>
              <p>WorldID: JD123456</p>
            </div>
          </div>
          <div className="balance-card">
            <p>Balance</p>
            <h3>100 WLD</h3>
          </div>
        </div>
        <div className="button-container">
          <button className="action-button donation">Donation</button>
          <button className="action-button voting">Voting</button>
        </div>
      </div>
  );
};

export default Mainpage;