import React from 'react';
import './Mainpage.css';
import Frame from '../Frame/Frame';
import userimage from "../../assets/user-image.png";

const Mainpage = () => {
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
            </div>
          </div>
          <div className="mainpage-balance-card">
            <p>Balance</p>
            <h3>100 WLD</h3>
          </div>
        </div>
        <div className="mainpage-button-container">
          <button className="mainpage-action-button mainpage-donation">Donation</button>
          <button className="mainpage-action-button mainpage-voting">Voting</button>
        </div>
      </div>
  );
};

export default Mainpage;
