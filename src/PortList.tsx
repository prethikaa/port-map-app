import React from "react";

// Define props interface for PortList component
interface PortListProps {
  ports: any[];
  selectedPort: any | null;
  handlePortClick: (port: any) => void;
  listClickable: boolean;
  listmenuOpen: boolean;
  toggleMenu: () => void;
}

// PortList component
const PortList: React.FC<PortListProps> = ({
  ports,
  selectedPort,
  handlePortClick,
  listClickable,
  listmenuOpen,
  toggleMenu,
}) => {
  return (
    <div style={{ position: "relative", zIndex: "1" }}>
      {/* Navigation */}
      <nav role="navigation">
        {/* List menu header */}
        <div
          style={{ display: "flex", backgroundColor: "#222831" }}
          onClick={toggleMenu}
        >
          {/* List menu toggle button (hamburger) */}
          <div id="menuToggle">
            <input type="checkbox" checked={listmenuOpen} />
            <span></span>
            <span></span>
            <span></span>
          </div>
          {/* Menu title - Port List */}
          <h1 id="menuToggle">Port List</h1>
        </div>
        {/* List of ports */}
        <ul id="menu" style={{ display: listmenuOpen ? "block" : "none" }}>
          {/* Map through ports array */}
          {ports.map((port) => (
            <div className="container transition" key={port.id}>
              <div className="wrap">
                {/* checking port coordinates to animate marker on map and do transition on port name */}
                <a
                  className={`swipe alink ${
                    selectedPort &&
                    selectedPort.coordinates.coordinates[1] ===
                      port.coordinates.coordinates[1] &&
                    selectedPort.coordinates.coordinates[0] ===
                      port.coordinates.coordinates[0]
                      ? "purple-transition"
                      : listClickable
                      ? ""
                      : "no-click"
                  }`}
                  href=""
                  onClick={(e) => {
                    if (listClickable) {
                      handlePortClick(port);
                      e.currentTarget.classList.toggle("clicked");
                    }
                    e.preventDefault();
                  }}
                >
                  {/* Port Name */}
                  <li style={{ padding: "0.75rem", position: "relative" }}>
                    {port["Main Port Name"]}
                  </li>
                </a>
              </div>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PortList;
