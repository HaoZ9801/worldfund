import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Navbar.css"; // Import the CSS file for styles
import home_icon from '../../assets/home.png'; // Import the home icon
import news_icon from '../../assets/news.png'; // Import the news icon
import person_icon from '../../assets/person.png'; // Import the person icon

const Navbar = () => {
  return (
    <nav className="app-navbar">
      <Link to="/VoteDetails" className="nav-item">
        <img src={news_icon} alt="News" className="nav-icon" />
      </Link>
      <Link to="/main" className="nav-item">
        <img src={home_icon} alt="Home" className="nav-icon" />
      </Link>
      <Link to="/profile" className="nav-item">
        <img src={person_icon} alt="Profile" className="nav-icon" />
      </Link>
    </nav>
  );
};

export default Navbar;
