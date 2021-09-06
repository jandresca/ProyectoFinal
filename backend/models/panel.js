const mongoose = require("mongoose");

const panelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  name: String,
  description: String,
  theme: String,
  date: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const panel = mongoose.model("panel", panelSchema);
module.exports = panel;