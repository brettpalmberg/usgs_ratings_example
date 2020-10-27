import React, { useState } from "react";
import RatingsList from "./ratingslist.js";
import Map from "./map.js";
import Chart from "./chart.js";

function App() {
  const [siteSelected, setSiteSelected] = useState(null);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div></div>
        </div>
      </div>
      <div className="row" style={{ height: 600 }}>
        <div className="col">
          <h3>{`Selected Site: ${
            siteSelected || "None (click on row in table)"
          }`}</h3>
        </div>
        <div className="col">
          <Map />
        </div>
        <div className="col">
          <Chart />
        </div>
      </div>
      <div className="row">
        <RatingsList
          siteSelected={siteSelected}
          setSiteSelected={setSiteSelected}
        />
      </div>
    </div>
  );
}

export default App;
