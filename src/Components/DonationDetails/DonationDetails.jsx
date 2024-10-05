import React, { useState, useRef } from "react";
import "./DonationDetails.css";
import back_button from "../../assets/back.png";
import who from "../../assets/who.jpg";
import who_logo from "../../assets/who-logo.jpg";

const DonationDetails = () => {
  // State to track the selected tab
  const [selectedTab, setSelectedTab] = useState("about");

  // Ref for scrolling to the make-donation section
  const makeDonationRef = useRef(null);

  // Transaction details array
  const transaction = [
    { date: '01/01/2024', details: 'COVID Test Kit', amount: '240.00' },
    { date: '12/02/2024', details: 'Hep B Vaccine', amount: '1302.00' },
    { date: '31/05/2024', details: 'Face Mask', amount: '500.00' },
  ];

  // Function to handle scrolling to the make-donation section
  const handleScrollToDonate = () => {
    makeDonationRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="donation-details">
      <div className="details-container">
        <div className="scrollable-content">
          <div className="top-title">
            <img src={back_button} alt="back" />
            <h1>Donation</h1>
          </div>
          <div className="project-pics">
            <div className="who-pics">
              <img src={who} alt="who" />
            </div>
            <div className="who-logo">
              <img src={who_logo} alt="who logo" />
            </div>
          </div>
          <div className="who-content">
            <div className="who-name">
              <h1>World Health Organization</h1>
            </div>
            <div className="donate-box">
              <div className="donate-info">
                <div className="fund-received">
                  <span className="info-font">Fund Received:</span>
                  <span>$1200.00</span>
                </div>
                <div className="number-of-donors">
                  <span className="info-font">No. of Donors:</span>
                  <span>37</span>
                </div>
              </div>
              <button className="donate-button" onClick={handleScrollToDonate}>Donate</button>
            </div>

            {/* Tab Bar for About and Transaction */}
            <div className="donate-about-bar">
              <div
                className={`tab ${selectedTab === "about" ? "active" : ""}`}
                onClick={() => setSelectedTab("about")}
              >
                About
                {selectedTab === "about" && <div className="underline" />}
              </div>
              <div
                className={`tab ${selectedTab === "transaction" ? "active" : ""}`}
                onClick={() => setSelectedTab("transaction")}
              >
                Transaction
                {selectedTab === "transaction" && <div className="underline" />}
              </div>
            </div>

            {/* About Content */}
            {selectedTab === "about" && (
              <div className="about-content">
                <p>We direct and coordinate the world's response to health emergencies. And we promote healthier lives – from pregnancy care through old age.</p>
              </div>
            )}

            {/* Transaction Content */}
            {selectedTab === "transaction" && (
              <div className="transaction-content">
                <div className="transaction-title">
                  <div className="title-date">Date</div>
                  <div className="title-details">Details</div>
                  <div className="title-amount">Amount</div>
                </div>
                {transaction.map((item) => (
                  <div key={item.date} className="transaction-item">
                    <div className="item-date">{item.date}</div>
                    <div className="item-details">{item.details}</div>
                    <div className="item-amount">{item.amount}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Make Donation Section */}
            <div className="make-donation" ref={makeDonationRef}>
              <form className="donation-form">
                {/* Coin dropdown */}
                <div className="form-group">
                  <label htmlFor="coin">Coin</label>
                  <select id="coin" name="coin">
                    <option value="usdt">USDT</option>
                    <option value="eth">ETH</option>
                    <option value="sol">SOL</option>
                  </select>
                </div>

                {/* Address input */}
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" 
                    readOnly 
                  />
                </div>

                {/* Network dropdown */}
                <div className="form-group">
                  <label htmlFor="network">Network</label>
                  <select id="network" name="network">
                    <option value="network-a">ERC20</option>
                    <option value="network-b">Arbitrum One</option>
                    <option value="network-c">BSC (BEP20)</option>
                  </select>
                </div>

                {/* Donation Amount input */}
                <div className="form-group">
                  <label htmlFor="donation-amount">Donation Amount</label>
                  <input 
                    type="number" 
                    id="donation-amount" 
                    name="donation-amount" 
                    placeholder="e.g., 10.00" 
                    min="0.01" 
                    step="0.01" 
                    required 
                  />
                </div>

                {/* Donate button */}
                <button type="submit" className="donate-button">Donate</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
