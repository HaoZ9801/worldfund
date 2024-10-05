import React, { useState, useRef } from "react";
import "./VoteList.css";

const VoteList = () => {
    const [selectedTab, setSelectedTab] = useState("vote");

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
                            
                        </div>
                        )}

                        {/* History Content */}
                        {selectedTab === "history" && (
                        <div className="vote-history-content">
                            <ul>
                            <li>Phase 1 - Emergency Response</li>
                            <li>Phase 2 - Recovery</li>
                            <li>Phase 3 - Prevention/Mitigation</li>
                            <li>Phase 4 - Preparedness</li>
                            </ul>
                        </div>
                        )}

                    </div>

                </div>
            </div>
        
    )
};

export default VoteList;