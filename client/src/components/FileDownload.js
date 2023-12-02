import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const FileDownload = () => {
  const [downloadedFile, setDownloadedFile] = useState(null);

  const handleFileDownload = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/download", {
        responseType: "blob",
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a download link and simulate a click to trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "downloaded-file.txt";
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleFileDownload}
        id="downloadButton"
        class="file-download-button"
      >
        Download Processed File
      </button>
    </div>
  );
};

export default FileDownload;
