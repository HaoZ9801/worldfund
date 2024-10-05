import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/worldanimation.json';
import batterylogo from '../../assets/battery.png'
import './LoginCreatePage.css';

const LoginCreatePage = () => {
  return (
    <div className="mobile-frame"> {/* Add the mobile frame */}
      <div className="frame-header">
        <span className="time">12:34</span>
        <img
          src={batterylogo} /* Add your battery icon image path */
          alt="Battery"
          className="battery-icon"
        />
      </div>
      <div className="frame-screen">
        <div className="login-container">
          <h1 className="login-title">WorldFund</h1>
          
          <div className="animation-container">
            <Lottie animationData={animationData} loop={true} />
          </div>
          
          <div className="button-container">
            <button className="login-button">Create Account</button>
            <button className="login-button">Login with Existing Account</button>
          </div>
        </div>
      </div>
      <div className="frame-footer">
        
      </div>
    </div>
  );
};

export default LoginCreatePage;
