import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes instead of Switch
import Frame from "./Components/Frame/Frame"; // Import the Frame component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the mobile frame */}
          <Route path="/" element={<Frame />} /> {/* Use element prop instead of component */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
