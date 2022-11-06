import React, { useState } from "react";
import Map, { Marker } from "react-map-gl";
import ReactMapGl from "react-map-gl";
function Maps() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: 45,
    latitude: -70,
    zoom: 11,
  });
  return (
    <></>
    // <Map
    //   mapStyle="mapbox://styles/alfredocorwin1/cl9p6c0fc000514qvxx54iwgz"
    //   mapboxAccessToken={process.env.mapbox_key}
    //   {...viewport}
    // />
    // <ReactMapGl
    //   mapStyle={"mapbox://styles/alfredocorwin1/cl9p6c0fc000514qvxx54iwgz"}
    //   mapboxAccessToken={process.env.mapbox_key}
    //   {...viewport}
    // ></ReactMapGl>
  );
}

export default Maps;
