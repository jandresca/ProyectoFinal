const Panel = require("../models/panel");
const mongoose = require("mongoose");

const registerPanel = async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.theme)
    return res.status(400).send("Incomplete data");

  const existingPanel = await Panel.findOne({ name: req.body.name });
  if (existingPanel) return res.status(400).send("The Panel already exists");

  const panel = new Panel({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    theme: req.body.theme,
    dbStatus: true,
  });

  const result = await panel.save();
  if (!result) return res.status(400).send("Failed to register panel");
  return res.status(200).send({ result });
};

const listPanel = async (req, res) => {
  const panel = await Panel.find({ userId: req.user._id });
  if (!panel || panel.length === 0)
    return res.status(400).send("Empty panel list");
  return res.status(200).send({ panel });
};

const updatePanel = async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  if (
    !req.body._id ||
    !req.body.description ||
    !req.body.name ||
    !req.body.theme
  )
    return res.status(400).send("Incomplete data");

  const panel = await Panel.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
    theme: req.body.theme,
  });
  if (!panel) return res.status(400).send("Error editing panel");
  return res.status(200).send({ panel });
};

module.exports = { registerPanel, listPanel, updatePanel };
