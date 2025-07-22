// models/PageContent.js
const mongoose = require("mongoose");

const pageContentSchema = new mongoose.Schema({
  pageId: {
    type: mongoose.Types.ObjectId,
    ref: "PageMetadata",
    required: true,
    unique: true, // 1 contenido por página
  },
  content: {
    type: Array, // o [mongoose.Schema.Types.Mixed] si es más dinámico
    required: true,
  },
});

module.exports = mongoose.model("PageContent", pageContentSchema);
