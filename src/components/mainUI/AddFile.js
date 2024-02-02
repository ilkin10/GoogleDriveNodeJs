import React, { useState } from "react";
import axios from "axios";
import "./AddFile.css"; // Import your CSS file for styling

const AddFile = () => {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleAddFolder = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server using Axios
      const response = await axios.post("http://localhost:3001/addFolder", {
        folderName,
      });

      console.log(response.data);
      // Assuming the server responds with the added folder details
      // Set success state and reset the input field
      setSuccess(true);
      setFolderName("");
    } catch (error) {
      console.error("Error adding folder:", error);
      // Set error state based on the response
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="add-file-container">
      <form onSubmit={handleAddFolder}>
        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={handleInputChange}
        />
        <button type="submit">Add Folder</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div style={{color: "white"}} className="success-message">Folder added successfully!</div>
      )}
    </div>
  );
};

export default AddFile;
