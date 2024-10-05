import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "./VoteList.css";

const VoteList = () => {
    const [selectedTab, setSelectedTab] = useState("vote");
    const navigate = useNavigate(); // Initialize navigate
    const location = useLocation(); // Get location to read state

    // Check for state passed from VoteDetails
    useEffect(() => {
        if (location.state && location.state.selectedTab) {
            setSelectedTab(location.state.selectedTab);
        }
    }, [location.state]);

    const handleVoteItemClick = () => {
        navigate("/VoteDetails"); // Navigate to /VoteDetails
    };

    const history = [
        { date: '06/10/2024', details: 'Mercy Malaysia' },
        { date: '12/05/2024', details: 'Rumah Hope' },
        { date: '31/01/2024', details: 'Flood Mitigation Project' },
    ];

    return (
        <div className="voting-list">
            <div className="vote-list-container">
                <div className="scrollable-content">
                    <div className="vote-list-title">
                        <h1>Project Voting</h1>
                    </div>

                    <div className="vote-about-bar">
                        <div
                            className={`vote-tab ${selectedTab === "vote" ? "active" : ""}`}
                            onClick={() => setSelectedTab("vote")}
                        >
                            Vote
                            {selectedTab === "vote" && <div className="vote-underline" />}
                        </div>
                        <div
                            className={`vote-tab ${selectedTab === "history" ? "active" : ""}`}
                            onClick={() => setSelectedTab("history")}
                        >
                            History
                            {selectedTab === "history" && <div className="vote-underline" />}
                        </div>
                    </div>

                    {selectedTab === "vote" && (
                        <div className="vote-about-content">
                            <ul>
                                <li className="vote-item1" onClick={handleVoteItemClick} style={{ cursor: 'pointer' }}>
                                    <span className="rank1">1</span>
                                    <div className="vote-box1">
                                        <span className="name1">Mercy Malaysia</span>
                                        <span className="number1">8,710</span>
                                    </div>
                                </li>
                                <li className="vote-item">
                                    <span className="rank">2</span>
                                    <div className="vote-box">
                                        <span className="name">SUKA Society</span>
                                        <span className="number">1,594</span>
                                    </div>
                                </li>
                                <li className="vote-item">
                                    <span className="rank">3</span>
                                    <div className="vote-box">
                                        <span className="name">Rumah Hope</span>
                                        <span className="number">827</span>
                                    </div>
                                </li>
                                <li className="vote-item">
                                    <span className="rank">4</span>
                                    <div className="vote-box">
                                        <span className="name">InnoMap</span>
                                        <span className="number">310</span>
                                    </div>
                                </li>
                                <li className="vote-item">
                                    <span className="rank">5</span>
                                    <div className="vote-box">
                                        <span className="name">Hati.my</span>
                                        <span className="number">92</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* History Content */}
                    {selectedTab === "history" && (
                        <div className="vote-history-content">
                            <div className="history-content">
                                <div className="history-title">
                                    <div className="history-date">Date</div>
                                    <div className="history-details">Details</div>
                                </div>

                                {history.map((item) => (
                                    <div key={item.date} className="history-item">
                                        <div className="history-date">{item.date}</div>
                                        <div className="history-details">{item.details}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VoteList;
