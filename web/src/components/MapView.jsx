// src/components/MapView.jsx
/*
  MapView component (disabled for now).

  Original interactive Google Maps code is commented below so you can re-enable it later.
  To restore:
   1) Replace this file with the commented block (uncomment).
   2) Ensure you have a Google Maps API key and @react-google-maps/api installed.
*/

/*

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function MapView({ lat, lng }) {
  if (!lat || !lng) {
    return <p className="text-gray-500 text-sm">📍 Location not available</p>;
  }

  const center = { lat: Number(lat), lng: Number(lng) };

  return (
    <div className="mt-2">
      <LoadScript googleMapsApiKey="YOUR_API_KEY_HERE">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "200px", borderRadius: "8px" }}
          zoom={14}
          center={center}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

*/

 // Placeholder while MapView is disabled
export default function MapView() {
  // returning null keeps imports safe but renders nothing
  return null;
}
