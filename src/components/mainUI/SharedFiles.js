import React, { useState, useEffect } from "react";
import axios from "axios";
import folderIcon from "./images/folderIcon.png";
import fileIcon from "./images/icons8-file-48.png";
import "../Folder.css";
import "../File.css";

export default function SharedFiles({ userId }) {
  const [sharedFolders, setSharedFolders] = useState([]);
  const [isFilesOpen, setIsFilesOpen] = useState(false);

  const toggleFiles = () => {
    setIsFilesOpen(!isFilesOpen);
  };

  useEffect(() => {
    // Fetch shared folders when the component mounts
    fetchSharedFolders();
  }, []);

  const fetchSharedFolders = async () => {
    try {
      // Make a GET request to fetch shared folders
      const response = await axios.get(
        `http://localhost:3001/getSharedFolders?userId=${userId}`
      );

      setSharedFolders(response.data);
    } catch (error) {
      console.error("Error fetching shared folders:", error);
    }
  };

  return (
    <div>
      <h1 style={{color:"white"}}>Shared Files</h1>
      {sharedFolders.map((folder) => (
        <div className="folder" key={folder.folderId}>
          <img src={folderIcon} alt="foldericon" />
          <h2 onClick={toggleFiles}>{folder.folderName}</h2>
          {folder.files.length > 0 ? (
            <div >
              {folder.files.map((file) => (
                <div className="file">
                  <img src={fileIcon} alt="fileicon" />
                <h3 key={file._id}>{file.name}</h3>
              </div>
              ))}
            </div>
          ) : (
            <p>No files in this folder</p>
          )}
        </div>
      ))}
    </div>
  );
}
