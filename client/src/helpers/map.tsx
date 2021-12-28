import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MAP_KEY } from "services/MAP_KEY";

const containerStyle = {
  width: "300px",
  height: "400px",
};

type Props = {
  location: { lat: number; lng: number };
};

const Map: React.FC<Props> = ({
  location = { lat: 50.45466, lng: 30.5238 },
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${MAP_KEY}`,
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={8}>
      <Marker position={location} />
    </GoogleMap>
  ) : (
    <span>LOADING</span>
  );
};

export default Map;
