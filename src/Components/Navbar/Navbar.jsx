import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Navbar.css"; // Import the CSS file for styles
import home_icon from '../../assets/home.png';
import news_icon from '../../assets/news.png';
import person_icon from '../../assets/person.png';

const Navbar = () => {
    return (
      <nav className="app-navbar-unique">
        <Link to="" className="nav-item-unique">
          <img src={news_icon} alt="News" className="nav-icon-unique" />
        </Link>
        <Link to="/mainpage" className="nav-item-unique">
          <img src={home_icon} alt="Home" className="nav-icon-unique" />
        </Link>
        <Link to="" className="nav-item-unique">
          <img src={person_icon} alt="Profile" className="nav-icon-unique" />
        </Link>
      </nav>
    );
};

export default Navbar;
