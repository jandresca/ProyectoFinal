const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  panelId: { type: mongoose.Schema.ObjectId, ref: "panel" },
  name: String,
  description: String,
  priority: Number,
  taskStatus: String,
  imageUrl: String,
  finalDate: Date,
  date: { type: Date, default: Date.now },
  
});


const task = mongoose.model("task", taskSchema);
module.exports = task;
