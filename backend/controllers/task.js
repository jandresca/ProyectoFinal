const Task = require("../models/task");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const User = require("../models/user");
const Panel = require("../models/panel");

const saveTask = async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.priority)
    return res.status(400).send("Incomplete data");

    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(400).send("user not found");

  const task = new Task({
    userId: req.user._id,
    panelId: req.body.panelId,
    name: req.body.name,
    description: req.body.description,
    priority: req.body.priority,
    taskStatus: "to-do", 
  });

  const result = await task.save();
  if (!result) return res.status(400).send("Error registering task");
  return res.status(200).send({ result });
};

const listTask = async (req, res) => {
  
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid id");

  const task = await Task.find(
    {panelId: req.params._id}
  ).sort( { priority: 1 } );

  if (!task || Task.length === 0)
    return res.status(400).send("You have no assigned tasks");
  return res.status(200).send({ task });
};

const listTaskTemp = async (req, res) => {
  const task = await Task.find();
  if (!task || task.length === 0)
    return res.status(400).send("You have no assigned tasks");
  return res.status(200).send({ task });
}
const saveTaskImg = async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.priority)
    return res.status(400).send("Incomplete data");

  let imageUrl = "";
  if (req.files.image) {
    if (req.files.image.type != null) {
      const url = req.protocol + "://" + req.get("host") + "/";
      const serverImg =
        "./uploads/" + moment().unix() + path.extname(req.files.image.path);
      fs.createReadStream(req.files.image.path).pipe(
        fs.createWriteStream(serverImg)
      );
      imageUrl =
        url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
    }
  }

  const task = new Task({
    userId: req.user._id,
    panelId: req.body.panelId,
    name: req.body.name,
    description: req.body.description,
    priority: req.body.priority,
    taskStatus: "to-do",
    imageUrl: imageUrl,
  });

  const result = await task.save();
  if (!result) return res.status(400).send("Error registering task");
  return res.status(200).send({ result });
};

const updateTask = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  let validIdPanel = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validIdPanel) return res.status(400).send("Invalid id");

  if (!req.body._id || !req.body.taskStatus)
    return res.status(400).send("Incomplete data");

  const task = await Task.findByIdAndUpdate(req.body._id, {
    userId: req.body.userId,
    taskStatus: req.body.taskStatus,
  });

  if (!task) return res.status(400).send("Task not found");
  return res.status(200).send({ task });
};

const deleteTask = async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid id");

  const task = await Task.findByIdAndDelete(req.params._id);
  if (!task) return res.status(400).send("Task not found");
  return res.status(200).send({ message: "Task deleted" });
};

const sharePanelTask = async (req, res) => {
  
  if (!req.body.email || !req.body.name)
    return res.status(400).send("Incomplete data");

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("user not found");

  let panel = await Panel.findOne({ name: req.body.name });
  if (!panel) return res.status(400).send("Panel not found");

  const task = new Task({
    userId: req.user._id,
    panelId: panel._id,
    name: req.body.name,
    description: req.body.description,
    priority:req.body.priority,
    taskStatus: "to-do",
  });

  const result = await task.save();
  if (!result) return res.status(400).send("Error registering task");
  return res.status(200).send({ result });

}

module.exports = { saveTask, listTask, updateTask, deleteTask, saveTaskImg, sharePanelTask , listTaskTemp};
