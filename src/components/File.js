import React, { useState } from "react";
import fileIcon from "../images/icons8-file-48.png";
import dots from "../images/icons8-menu-vertical-64.png";
import "./File.css";

export default function File() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <div className="file">
      <img src={fileIcon} alt="fileicon" />
      <h3>Salam men faylam</h3>
      <img src={dots} alt="dots" onClick={toggleSideMenu} />

      {isSideMenuOpen && (
        <div className="file-options">
          {/* Options for the side menu */}
          <button>Delete</button>
          <button>Properties</button>
        </div>
      )}
    </div>
  );
}
