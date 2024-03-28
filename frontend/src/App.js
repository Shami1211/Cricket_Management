import React from "react";
import { Route, Routes } from "react-router";

import AddItem from "./Components/Items/Add-Items/AddItem";
import ItemDetails from "./Components/Items/Item/ItemDetails";
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          

          {/*Items*/}
          <Route path="/" element={<AddItem />} />
          <Route path="/itemdetails" element={<ItemDetails />} />
         
  
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
