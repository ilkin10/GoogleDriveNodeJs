import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SharedFiles({ userId }) {
  const [sharedFolders, setSharedFolders] = useState([]);

  useEffect(() => {
    // Fetch shared folders when the component mounts
    fetchSharedFolders();
  }, []);

  const fetchSharedFolders = async () => {
    try {
      // Make a GET request to fetch shared folders
      const response = await axios.get(`http://localhost:3001/getSharedFolders?userId=${userId}`);

      setSharedFolders(response.data);
    } catch (error) {
      console.error('Error fetching shared folders:', error);
    }
  };

  return (
    <div>
      <h2>Shared Files</h2>
      {sharedFolders.map((folder) => (
        <div key={folder.folderId}>
          <h3>{folder.folderName}</h3>
          {folder.files.length > 0 ? (
            <ul>
              {folder.files.map((file) => (
                <li key={file._id}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <p>No files in this folder</p>
          )}
        </div>
      ))}
    </div>
  );
}
