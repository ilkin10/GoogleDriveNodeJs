import React, { useState } from "react";
import axios from "axios";
import "./AddFile.css"; // Import your CSS file for styling

export default function AddFile() {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleAddFile = (e) => {
    e.preventDefault();
    // Validate the folder name before adding (you can customize the validation logic)
    if (folderName.trim() !== "") {
      try {
        // Make a POST request to the server using Axios
        const response = axios.post("http://localhost:3001/addFolder", { folderName });
        // Assuming the server responds with the added folder details
        // Set success state and reset the input field
        setSuccess(true);
        setFolderName("");
      } catch (error) {
        console.error("Error adding folder:", error);
        // Set error state based on the response
        setError(error.response?.data?.error || "An error occurred");
      }
    }
  };

  return (
    <div className="add-file-container">
      <form onSubmit={handleAddFile}>
        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={handleInputChange}
        />
        <input type="submit" className="btn btn-primary button" value="Add Folder" />
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Folder added successfully!</div>}
    </div>
  );
}
