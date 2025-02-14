const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });
upload.single("file");

module.exports = upload;
