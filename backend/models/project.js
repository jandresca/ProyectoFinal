const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userCreator: { type: mongoose.Schema.ObjectId, ref: "user" },
  panelId: { type: mongoose.Schema.ObjectId, ref: "panel" },
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  status: Boolean,
  date: { type: Date, default: Date.now },
});

const project = mongoose.model("project", projectSchema);
module.exports = project;
