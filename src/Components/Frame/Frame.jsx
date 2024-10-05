import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Frame.css";

const Frame = () => {
  return (
    <div className="mobile-frame">
      <div className="frame-header">
        
        <span className="time">12:30</span>
        
      </div>

      <div className="frame-screen">
        <p>Welcome to the Mobile Frame!</p>
        <Link to="/home" className="button">Go to Home</Link>
      </div>

      <div className="frame-footer">
        
      </div>
    </div>
  );
};

export default Frame;
