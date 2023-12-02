// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <FileUpload />;
}

export default App;
