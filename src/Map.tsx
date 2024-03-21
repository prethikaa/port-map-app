import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

// Define props interface for MapComponent
interface MapComponentProps {
  ports: any[];
  selectedPort: any | null;
  handlePortClick: (port: any) => void;
  animateMarker: boolean;
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  setAnimateMarker: (animate: boolean) => void;
  listmenuOpen: boolean;
  setListmenuOpen: any;
  mapOptions: {
    center: { lat: number; lng: number };
    zoom: number;
  };
}

// MapComponent
const MapComponent: React.FC<MapComponentProps> = ({
  ports,
  selectedPort,
  handlePortClick,
  animateMarker,
  showPopup,
  setShowPopup,
  setAnimateMarker,
  listmenuOpen,
  mapOptions,
  setListmenuOpen,
}) => {
  // SVG icon for marker
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path fill="#8B0000" d="M320 96a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm21.1 80C367 158.8 384 129.4 384 96c0-53-43-96-96-96s-96 43-96 96c0 33.4 17 62.8 42.9 80H224c-17.7 0-32 14.3-32 32s14.3 32 32 32h32V448H208c-53 0-96-43-96-96v-6.1l7 7c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97 263c-9.4-9.4-24.6-9.4-33.9 0L7 319c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l7-7V352c0 88.4 71.6 160 160 160h80 80c88.4 0 160-71.6 160-160v-6.1l7 7c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-56-56c-9.4-9.4-24.6-9.4-33.9 0l-56 56c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l7-7V352c0 53-43 96-96 96H320V240h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H341.1z"/>
    </svg>
  `;
  // Data URL for SVG icon
  const dataUrl = `data:image/svg+xml;base64,${btoa(svgIcon)}`;

  return (
    <div
      style={{
        position: "relative",
        height: "92vh",
      }}
      className={listmenuOpen ? "map-margin" : ""}
    >
      <div style={{ height: "100%", width: "100%" }}>
        {/* GoogleMap component */}
        <GoogleMap
          center={mapOptions.center}
          zoom={mapOptions.zoom}
          mapContainerStyle={{ height: "100%", width: "100%" }}
        >
          {/* Map markers */}
          {ports.map(
            (port) =>
              port.coordinates && (
                <Marker
                  key={port.id}
                  position={{
                    lat: port.coordinates.coordinates[1],
                    lng: port.coordinates.coordinates[0],
                  }}
                  onClick={() => {
                    handlePortClick(port);
                    setListmenuOpen(true);
                  }}
                  icon={{
                    url: dataUrl,
                    scaledSize: new window.google.maps.Size(20, 20),
                  }}
                  //   checking port coordinates to highlight marker using bounce animmation
                  animation={
                    animateMarker &&
                    selectedPort &&
                    selectedPort.coordinates.coordinates[1] ===
                      port.coordinates.coordinates[1] &&
                    selectedPort.coordinates.coordinates[0] ===
                      port.coordinates.coordinates[0]
                      ? window.google.maps.Animation.BOUNCE
                      : undefined
                  }
                >
                  {/* Popup with port details */}
                  {showPopup && selectedPort && (
                    <div
                      className="box"
                      onClick={() => {
                        setShowPopup(false); //hide popup
                        setAnimateMarker(false); //stop animation marker
                      }}
                    >
                      {/* Port details to display in the popup */}
                      <p className="modal-p">
                        <strong>{selectedPort["Main Port Name"]}</strong>
                        <br></br>
                        Located in {selectedPort["Country Code"]}
                        <br></br>
                        Anchorage Depth -{" "}
                        {selectedPort["Anchorage Depth (m)"] == "0"
                          ? "NA"
                          : selectedPort["Anchorage Depth (m)"] + "m"}
                        <br></br>
                        <strong>Entrance Restriction:</strong>
                        <br></br>
                        Heavy Swell -
                        {selectedPort["Entrance Restriction - Heavy Swell"] ==
                        "Yes"
                          ? "Yes"
                          : "No"}
                        || Ice -{" "}
                        {selectedPort["Entrance Restriction - Ice"] == "Yes"
                          ? "Yes"
                          : "No"}
                        || Tide -{" "}
                        {selectedPort["Entrance Restriction - Tide"] == "Yes"
                          ? "Yes"
                          : "No"}
                      </p>
                      {/*close popup */}
                      <span
                        className="close-button"
                        onClick={() => {
                          setShowPopup(false);
                          setAnimateMarker(false);
                        }}
                      >
                        ✕
                      </span>
                    </div>
                  )}
                </Marker>
              )
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComponent;
