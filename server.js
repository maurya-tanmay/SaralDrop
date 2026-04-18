const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

let filesDB = {};

// Upload Route
app.post("/upload", upload.single("file"), (req, res) => {
  const code = Math.floor(1000 + Math.random() * 9000).toString();

  filesDB[code] = {
    path: req.file.path,
    name: req.file.originalname
  };

  res.json({ code });
});

// Download + Auto Delete
app.get("/download/:code", (req, res) => {
  const code = req.params.code;

  if (!filesDB[code]) {
    return res.status(404).send("Invalid Code");
  }

  const file = filesDB[code];

  res.download(file.path, file.name, (err) => {
    if (!err) {
      fs.unlinkSync(file.path);
      delete filesDB[code];
      console.log("File deleted after download");
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});