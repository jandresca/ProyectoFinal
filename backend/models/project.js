const mongoose = require("mongoose");

const panelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  panelId: { type: mongoose.Schema.ObjectId, ref: "panel" },
  name: String,
  description: String,
  theme:String,
  date: { type: Date, default: Date.now },
});

const panel = mongoose.model("panel", panelSchema);
module.exports = panel;
