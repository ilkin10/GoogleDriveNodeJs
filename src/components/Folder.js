import React, { useState } from "react";
import axios from "axios";
import folderIcon from "../images/folderIcon.png";
import dots from "../images/icons8-menu-vertical-64.png";
import "./Folder.css";
import File from "./File";
import AddFolder from "./AddFolder"; // Assuming you have an AddFolder component

export default function Folder({ folder, onDelete }) {
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAddFileDialogOpen, setIsAddFileDialogOpen] = useState(false);

  const toggleFiles = () => {
    setIsFilesOpen(!isFilesOpen);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleDelete = async () => {
    // Check if folder._id is available
    if (!folder._id) {
      console.error("Folder ID is missing");
      return;
    }

    try {
      // Make a DELETE request to the server to delete the folder by ID
      await axios.delete(`http://localhost:3001/deleteFolder/${folder._id}`);
      onDelete(folder._id);
      // Notify the parent component about the deletion
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const openAddFileDialog = () => {
    setIsAddFileDialogOpen(true);
  };

  const closeAddFileDialog = () => {
    setIsAddFileDialogOpen(false);
  };

  return (
    <div className="folder">
      <img src={folderIcon} alt="foldericon" onClick={toggleFiles} />
      <h2 onClick={toggleFiles}>{folder.name}</h2>
      <img src={dots} alt="dots" onClick={toggleSideMenu} />

      {isFilesOpen && (
        <div className="files">
          {/* Display your files here */}
          <File />
          <File />
          <File />
        </div>
      )}

      {isSideMenuOpen && (
        <div className="side-menu">
          {/* Options for the side menu */}
          <button className="btn btn-danger button" onClick={handleDelete}>
            Delete Folder
          </button>
          <button className="btn btn-primary button">Properties</button>
          <button
            className="btn btn-success button"
            onClick={openAddFileDialog}
          >
            Add File
          </button>
          {/* ... */}
        </div>
      )}

      {isAddFileDialogOpen && (
        <div className="add-file-dialog">
          <AddFolder onClose={closeAddFileDialog} />
        </div>
      )}
    </div>
  );
}
