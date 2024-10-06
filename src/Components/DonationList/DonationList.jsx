import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DonationList.css";
import right_arrow from '../../assets/next.png'


const DonationList = () => {

    const navigate = useNavigate(); // Initialize navigate

    const handleNextButtonClick = () => {
        navigate("/donation-details"); // Navigate to /VoteList on click
    };

    return (
        <div className="donation-list">
            <div className="donation-list-container">
                <div className="scrollable-content">
                    <div className="donation-list-title">
                        <h1>Donate Now</h1>
                    </div>

                    <div className="donation-list-projects">
                <div className="donation-project" >
                    <div className="project-name">World Health Organization (WHO)</div>
                    <div className="project-footer">
                        <div className="small-box" style={{ backgroundColor: '#F1D3CE'}}> 
                            <p>Health</p>
                        </div>
                        <img src={right_arrow} alt='next' onClick={handleNextButtonClick} />
                    </div>
                </div>

                <div className="donation-project">
                    <div className="project-name">World Wildlife Fund (WWF)</div>
                    <div className="project-footer">
                    <div className="small-box" style={{ backgroundColor: '#FFE9D0'}}>
                        <p>Animals</p>
                        </div>
                        <img src={right_arrow} alt='next'/>
                    </div>
                </div>

                <div className="donation-project">
                    <div className="project-name">Greenpeace International</div>
                    <div className="project-footer2">
                    <div className="small-box" style={{ backgroundColor: '#E7FBE6'}}>
                        <p>Environment</p>
                        </div>
                        <img src={right_arrow} alt='next'/>
                    </div>
                </div>

                <div className="donation-project">
                    <div className="project-name">Wikimedia Foundation</div>
                    <div className="project-footer2">
                    <div className="small-box" style={{ backgroundColor: '#D1E9F6'}}>
                        <p>Education</p>
                        </div>
                        <img src={right_arrow} alt='next'/>
                    </div>
                </div>

                </div>
                </div>
            </div>
        </div>
    );
};

export default DonationList;
