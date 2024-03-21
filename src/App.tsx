import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import PortList from "./PortList";
import MapComponent from "./Map";

//App component
const App: React.FC = () => {
  // create state variables
  const [ports, setPorts] = useState<any[]>([]); // stores port api data fetched from server
  const [selectedPort, setSelectedPort] = useState<any | null>(null); // stores currently selected port
  const [listmenuOpen, setListmenuOpen] = useState<boolean>(false); // controls the list menu state to toggle
  const [clickedPortId, setClickedPortId] = useState<string | null>(null); // stores the ID of the clicked port
  const [showPopup, setShowPopup] = useState<boolean>(false); // controls the visibility of popups
  const [animateMarker, setAnimateMarker] = useState<boolean>(false); // controls marker animation on the map
  const [mapOptions, setMapOptions] = useState({
    center: { lat: 0, lng: 0 },
    zoom: 2,
  }); // stores map center and zoom level and set to default value
  const [listClickable, setListClickable] = useState<boolean>(true); // controls whether ports in the list are clickable

  // useEffect hook to fetch port data from the api when component mounts
  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/fetchPorts");
        setPorts(response.data);
      } catch (error: any) {
        console.error("Error fetching ports:", error.message);
      }
    };

    fetchPorts();
  }, []);

  // Function to handle port click events
  const handlePortClick = (port: any) => {
    setSelectedPort(port); // set the selected port
    setClickedPortId(port.id); // set the ID of the clicked port
    setShowPopup(true); // show popup for the clicked port
    setAnimateMarker(true); // animate marker on the map

    // Set map center and zoom to new values
    const newZoom = 5;
    const newCenter = {
      lat: port.coordinates.coordinates[1],
      lng: port.coordinates.coordinates[0],
    };
    setMapOptions({
      zoom: newZoom,
      center: newCenter,
    });

    //set timer for marker animation
    setTimeout(() => {
      setAnimateMarker(false);
    }, 5000);

    //set time for map center and zoom level and list clickable option
    setTimeout(() => {
      setMapOptions({
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });
      setListClickable(true);
    }, 2000);

    setListClickable(false);
  };

  // Function to toggle the menu
  const toggleMenu = () => {
    setListmenuOpen(!listmenuOpen);
  };

  return (
    <div>
      {/* Render PortList component */}
      <PortList
        ports={ports}
        selectedPort={selectedPort}
        handlePortClick={handlePortClick}
        listClickable={listClickable}
        listmenuOpen={listmenuOpen}
        toggleMenu={toggleMenu}
      />
      {/* Render MapComponent */}
      <MapComponent
        ports={ports}
        selectedPort={selectedPort}
        handlePortClick={handlePortClick}
        animateMarker={animateMarker}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        setAnimateMarker={setAnimateMarker}
        listmenuOpen={listmenuOpen}
        mapOptions={mapOptions}
        setListmenuOpen={setListmenuOpen}
      />
      {/* footer div */}
      <div
        style={{ backgroundColor: "black", height: "20px", width: "100%" }}
      ></div>
    </div>
  );
};

export default App;
