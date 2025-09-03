// models/PageMetadata.js
const mongoose = require("mongoose");

const pageMetadataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    //required: true,
  },
  description: String,
  image: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("PageMetadata", pageMetadataSchema);
