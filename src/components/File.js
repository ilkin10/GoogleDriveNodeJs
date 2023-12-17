import React, { useState } from "react";
import axios from "axios";
import fileIcon from "../images/icons8-file-48.png";
import dots from "../images/icons8-menu-vertical-64.png";
import "./File.css";

const File = ({ file, onDelete }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleDelete = async () => {
    try {
      // Make an API request to delete the file
      await axios.delete(`http://localhost:3001/deleteFile/${file._id}`);
      // Call the parent component's onDelete function to update the state
      // Show a success alert
      alert("File deleted successfully");
      onDelete(file._id);
    } catch (error) {
      console.error(file._id);
      // Show an error alert if deletion fails
      alert(file._id);
    }
  };
  

  return (
    <div className="file">
      <img src={fileIcon} alt="fileicon" />
      <h3>{file.name}</h3>
      <img src={dots} alt="dots" onClick={toggleSideMenu} />

      {isSideMenuOpen && (
        <div className="file-options">
          {/* Options for the side menu */}
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default File;

