const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  panelId: { type: mongoose.Schema.ObjectId, ref: "panel" },
  name: String,
  description: String,
  taskStatus: String,
  imageUrl: String,
  date: { type: Date, default: Date.now },
});

const board = mongoose.model("board", boardSchema);
module.exports = board;
