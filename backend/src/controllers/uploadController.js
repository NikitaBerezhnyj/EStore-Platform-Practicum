const path = require("path");

exports.uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const filePath = path.join("uploads", req.file.filename);

    res.status(200).send({
      message: "File uploaded successfully",
      path: filePath
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
