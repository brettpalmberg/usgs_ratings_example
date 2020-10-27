/// app.js
import React from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYnBhbG1iZXJnIiwiYSI6ImNrZ3JkYmhnYzBsbmgycXB3eHdjcnZsc3kifQ.kTW84CAUBB_wnFpT42nb3A";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -95.7129,
  latitude: 37.0902,
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

export default ({ data }) => {
  const layers = [new LineLayer({ id: "line-layer", data })];

  return (
    <DeckGL
      width={"100%"}
      height={600}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};
