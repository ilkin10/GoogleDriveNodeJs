import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Folder.css"; // Ensure you have the appropriate styles for the Folder component
import Folder from "./Folder"; // Import the Folder component

export default function FolderList() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    // Fetch folders when the component mounts
    fetchFolders();
  }, []); // Empty dependency array ensures it only runs once on mount

  const fetchFolders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getFolders");
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  return (
    <div className="folder-list">
      {/* Display your folders here */}
      {folders.map((folder) => (
        <Folder key={folder._id} folder={folder} />
      ))}
    </div>
  );
}
