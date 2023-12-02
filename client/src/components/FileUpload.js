import React, { useState } from "react";
import axios from "axios";
import FileDownload from "./FileDownload.js";
import "../App.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3001/api/upload", formData);
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div class="container">
      <div class="header">
        <h1>File Upload and Download</h1>
      </div>
      <div class="file-upload-section">
        <input type="file" id="fileInput" onChange={handleFileChange} />
        <label for="fileInput">Choose File</label>
        {file && (
          <section>
            File details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        )}

        {file && (
          <button id="uploadButton" onClick={handleFileUpload}>
            Upload a file
          </button>
        )}
        <FileDownload />
      </div>
    </div>
  );
};

export default FileUpload;
