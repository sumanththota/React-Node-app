const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ message: "File uploaded successfully" });
  console.log(req.body);
  console.log(req.file);
});

app.get("/api/download", (req, res) => {
  // You need to implement logic to provide the processed file for download
  // This can involve reading the file from the server or generating it on-the-fly

  // For demonstration purposes, let's assume a sample text file
  const filePath = path.join(__dirname, "uploads", "example-file.txt");
  res.download(filePath, "processed-file.txt");
});

app.get("/api/data", (req, res) => {
  const dataToSend = { message: "Hello from the server!" };
  res.json(dataToSend);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
