// Filename - App.js

import axios from "axios";

import React, { Component } from "react";
import "./AddFolder.css";

class AddFolder extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  onFileUpload = () => {
    // ILKIIIIINNNNNNNNNNN
    
  };
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div className="file-details">
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
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

  render() {
    return (
      <div className="add-folder-container">
        <h3>File Upload using React!</h3>
        <div className="file-input-container">
          <input
            type="file"
            className="custom-file-input"
            onChange={this.onFileChange}
          />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default AddFolder;
