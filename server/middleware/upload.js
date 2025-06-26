const multer = require("multer");

// Use memory storage to avoid filesystem issues on platforms like Vercel/Render
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
