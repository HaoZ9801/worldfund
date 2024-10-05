import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Frame.css";
import battery_icon from '../../assets/battery.png'; // Import the battery icon

const Frame = ({ content }) => {
  return (
    <div className="mobile-frame">
      <div className="frame-header">
        <span className="time">12:30</span>
        <img src={battery_icon} alt="Battery Icon" className="battery-icon" />
      </div>

      <div className="frame-screen">
        {content} {/* Render the passed content here */}
      </div>

      <div className="frame-footer">
        <Link to="/" className="home-button">🏠</Link> {/* Update this link if needed */}
      </div>
    </div>
  );
};

export default Frame;
