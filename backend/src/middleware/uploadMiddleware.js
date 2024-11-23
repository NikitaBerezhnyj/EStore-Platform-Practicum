const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const originalName = path.parse(file.originalname).name;
    const ext = path.extname(file.originalname);
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const timeString = today.toTimeString().split(" ")[0].replace(/:/g, "-");
    const newFileName = `${originalName}_${formattedDate}_${timeString}${ext}`;
    cb(null, newFileName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
