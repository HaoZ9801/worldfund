import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Frame.css";
import battery_icon from '../../assets/battery.png';

const Frame = () => {
  return (
    <div className="mobile-frame">
      <div className="frame-header">
        
        <span className="time">12:30</span>
        <img src={battery_icon} alt="Battery Icon" className="battery-icon" />
        
      </div>

      <div className="frame-screen">
        
      </div>

      <div className="frame-footer">
        
      </div>
    </div>
  );
};

export default Frame;
