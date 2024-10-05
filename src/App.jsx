import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes instead of Switch
import Frame from "./Components/Frame/Frame"; // Import the Frame component
import DonationDetails from "./Components/DonationDetails/DonationDetails"; // Import the DonationDetails component
import Mainpage from "./Components/Mainpage/Mainpage"; // Import the Mainpage component
import LoginCreatePage from "./Components/LoginCreatepage/LoginCreatepage";
import VoteList from "./Components/VoteList/VoteList";
import VoteDetails from "./Components/VoteDetails/VoteDetails";
import DonationList from "./Components/DonationList/DonationList";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<LoginCreatePage />} />
          
          {/* Route for the Mainpage */}
          <Route path="/mainpage" element={<Frame content={<Mainpage />} />} />
          
          {/* Route for the DonationDetails page */}
          <Route path="/donation-details" element={<Frame content={<DonationDetails />} />} />
          <Route path="/VoteDetails" element={<Frame content={<VoteDetails />} />} />
          <Route path="/VoteList" element={<Frame content={<VoteList />} />} />
          <Route path="/DonationList" element={<Frame content={<DonationList />} />} />
          

        </Routes>
      </div>
    </Router>
  );
};

export default App;
