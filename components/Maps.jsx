import React, { useState } from "react";
import Map from "react-map-gl";
function Maps() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: 37.7577,
    latitude: -122.4376,
    zoom: 11,
  });
  return (
    <Map
      mapStyle="mapbox://styles/alfredocorwin1/cl9p6c0fc000514qvxx54iwgz"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
    />
  );
}

export default Maps;
