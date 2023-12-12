import React, { useState } from "react";
import "./AddFile.css"; // Import your CSS file for styling

export default function AddFile({ onAddFile }) {
  const [folderName, setFolderName] = useState("");

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleAddFile = () => {
    // Validate the folder name before adding (you can customize the validation logic)
    if (folderName.trim() !== "") {
      // Call the parent component's function to add the file with the provided folder name
      onAddFile(folderName);
      // Reset the input field
      setFolderName("");
    }
  };

  return (
    <div className="add-file-container">
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={handleInputChange}
      />
      <button onClick={handleAddFile}>Add Folder</button>
    </div>
  );
}
