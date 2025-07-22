const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  page: {
    type: Array, // o: [mongoose.Schema.Types.Mixed] si quieres validar elementos más adelante
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Page", pageSchema);
