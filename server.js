const cloudinary = require("cloudinary").v2;
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

// server untuk Uploader menggunakan Cloudinary.
cloudinary.config({
  cloud_name: "nama cloud kamu", // Ganti dengan nama Cloudinary kamu
  api_key: "API key kamu", // Ganti dengan API Key Cloudinary kamu
  api_secret: "API Secret kamu", // Ganti dengan API Secret Cloudinary kamu
});

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const imagePath = path.join(__dirname, req.file.path);

  cloudinary.uploader.upload(imagePath, (error, result) => {
    fs.unlinkSync(imagePath);

    if (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary." });
    }

    res.json({ url: result.secure_url });
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
