import React, { useState } from "react";
import folderIcon from "../images/folderIcon.png";
import dots from "../images/icons8-menu-vertical-64.png";
import "./Folder.css";
import File from "./File";

export default function Folder({folder}) {
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleFiles = () => {
    setIsFilesOpen(!isFilesOpen);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <div className="folder">
      <img src={folderIcon} alt="foldericon" onClick={toggleFiles}></img>
      <h2 onClick={toggleFiles}>{folder.name}</h2>
      <img src={dots} alt="dots" onClick={toggleSideMenu}></img>

      {isFilesOpen && (
        <div className="files">
          {/* Display your files here */}
          <File></File>
          <File></File>
          <File></File>
        </div>
      )}

      {isSideMenuOpen && (
        <div className="side-menu">
          {/* Options for the side menu */}
          <p>Delete</p>
          <p>Properties</p>
          {/* ... */}
        </div>
      )}
    </div>
  );
}
