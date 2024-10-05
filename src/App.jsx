import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes instead of Switch
import Frame from "./Components/Frame/Frame"; // Import the Frame component
import DonationDetails from "./Components/DonationDetails/DonationDetails"; // Import the DonationDetails component
import Mainpage from "./Components/Mainpage/Mainpage"; // Import the Mainpage component
import LoginCreatePage from "./Components/LoginCreatepage/LoginCreatepage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<Frame content={<h2>Welcome to the Mobile Frame!</h2>} />} />
          
          {/* Route for the Mainpage */}
          <Route path="/mainpage" element={<Frame content={<Mainpage />} />} />
          
          {/* Route for the DonationDetails page */}
          <Route path="/donation-details" element={<Frame content={<DonationDetails />} />} />

          {/* Route for the LoginCreatePage */}
          <Route path="/logincreatepage" element={<LoginCreatePage />} />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
