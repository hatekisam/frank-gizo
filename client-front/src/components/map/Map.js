import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "./Map.css";
const Map = () => {
  const position = [-1.9485237, 30.1269267];

  return (
    <MapContainer
      className="map"
      center={position}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Tooltip opacity={1} permanent>
          <b style={{fontSize:"16px"}}>SHDR Ltd</b> <br /> Construction Services.
        </Tooltip>
      </Marker>
    </MapContainer>
  );
};

export default Map;
