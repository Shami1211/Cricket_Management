import React from "react";
import { Route, Routes } from "react-router";

import AddRate from "./Components/Rates/Add-Rates/AddRate";
import RateDetails from "./Components/Rates/Rate/RateDetails";
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          

          {/*Ratings*/}
          <Route path="/" element={<AddRate />} />
          <Route path="/ratedetails" element={<RateDetails />} />
          <Route path="/ratedetails" element={<RateDetails />} />
  
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
