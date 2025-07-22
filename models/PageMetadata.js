// models/PageMetadata.js
const mongoose = require("mongoose");

const pageMetadataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  image: String, // opcional, si manejas imágenes para mostrar en el dashboard
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("PageMetadata", pageMetadataSchema);
