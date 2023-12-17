// AddFolder.js
import axios from "axios";
import React, { useState, useRef } from "react";
import "./AddFolder.css";

const AddFolder = ({ folderId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folderId", folderId);

      const response = await axios.post("http://localhost:3001/uploadFile", formData);

      if (response.status === 400) {
        alert("File with this name already exists in the folder");
      } else if (response.status === 200) {
        alert("File Added Successfully");
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        console.log(selectedFile);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div className="file-details">
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div className="choose-message">
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div className="add-folder-container">
      <h3>File Upload</h3>
      <div className="file-input-container">
        <input type="file" className="custom-file-input" onChange={onFileChange} ref={fileInputRef} />
        <br></br>
        <br></br>
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData()}
    </div>
  );
};

export default AddFolder;
