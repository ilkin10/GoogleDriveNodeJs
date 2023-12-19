import React, { useState, useEffect } from "react";
import axios from "axios";
import folderIcon from "../images/folderIcon.png";
import dots from "../images/icons8-menu-vertical-64.png";
import "./Folder.css";
import File from "./File";
import AddFolder from "./AddFolder";
import ShareFolder from "./ShareFolder"; // Import the new ShareFolder component

export default function Folder({ folder, onDelete }) {
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAddFileDialogOpen, setIsAddFileDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false); // New state for share dialog
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [files, setFiles] = useState([]);

  const toggleFiles = () => {
    setIsFilesOpen(!isFilesOpen);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);

    if (folder._id) {
      console.log(`Folder ID: ${folder._id}`);
      // Fetch files when opening the side menu
      fetchFiles();
    } else {
      console.error("Folder ID is missing");
    }
  };

  const handleDeleteFile = (deletedFileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file._id !== deletedFileId));
  };

  const handleDelete = async () => {
    if (!folder._id) {
      console.error("Folder ID is missing");
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/deleteFolder/${folder._id}`);
      onDelete(folder._id);
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const openAddFileDialog = () => {
    setIsAddFileDialogOpen(true);
  };

  const closeAddFileDialog = () => {
    setIsAddFileDialogOpen(false);
    setSelectedFile(null);
    setFolderName("");
  };

  const openShareDialog = () => {
    setIsShareDialogOpen(true);
  };

  const closeShareDialog = () => {
    setIsShareDialogOpen(false);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

  const onFileUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folderId", folder._id);

      const response = await axios.post("http://localhost:3001/uploadFile", formData);

      if (response.status === 200) {
        alert("File uploaded successfully");
        setSelectedFile(null);
        setFolderName("");
        fetchFiles();
      } else if (response.status === 400) {
        alert("File with this name already exists in the folder");
      } else {
        console.error("Error uploading file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getFiles?folderId=${folder._id}`);
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [folder._id]);

  return (
    <div className="folder">
      <img src={folderIcon} alt="foldericon" onClick={toggleFiles} />
      <h2 onClick={toggleFiles}>{folder.name}</h2>
      <img src={dots} alt="dots" onClick={toggleSideMenu} />

      {isFilesOpen && (
        <div className="files">
          {files.map((file) => (
            <File key={file._id} file={file} onDelete={handleDeleteFile} />
          ))}
        </div>
      )}

      {isSideMenuOpen && (
        <div className="side-menu">
          <button className="btn btn-danger button" onClick={handleDelete}>
            Delete Folder
          </button>
          <button className="btn btn-primary button" onClick={openShareDialog}>
            Share
          </button>
          <button className="btn btn-success button" onClick={openAddFileDialog}>
            Add File
          </button>
        </div>
      )}

      {isAddFileDialogOpen && (
        <div className="add-file-dialog">
          <AddFolder
            folderId={folder._id}
            onClose={closeAddFileDialog}
            onFileChange={onFileChange}
            onFolderNameChange={onFolderNameChange}
            onFileUpload={onFileUpload}
          />
        </div>
      )}

      {isShareDialogOpen && (
        <div>
          <ShareFolder onClose={closeShareDialog} />
        </div>
      )}
    </div>
  );
}
