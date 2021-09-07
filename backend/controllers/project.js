const Panel = require("../models/panel");
const User = require("../models/user");
const Project = require("../models/project");

//registrar projectos
const registerProject = async (req, res) => {
  if (!req.body.projectName || !req.body.name)
    return res.status(400).send("Incomplete data");

  const existingProject = await Project.findOne({
    projectName: req.body.projectName,
  });
  if (existingProject)
    return res.status(400).send("The Project already exists");

  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send("user not found");

  let panel = await Panel.findOne({ name: req.body.name });
  if (!panel) return res.status(400).send("Panel not found");

  const project = new Project({
    userCreator: req.user._id,
    panelId: panel._id,
    userId: req.user._id,
    projectName: req.body.projectName,
    status: true,
  });

  const result = await project.save();
  if (!result) return res.status(400).send("Failed to register Project");
  return res.status(200).send({ result });
};

//registrar en el proyecto usuarios
const shareProjectUser = async (req, res) => {
  if (!req.body.email || !req.body.projectName)
    return res.status(400).send("Incomplete data");

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("user not found");

  const project1 = await Project.findOne({ projectName: req.body.projectName });
  if (!project1) return res.status(400).send("project not found");

  const project = new Project({
    userCreator: project1.userCreator,
    panelId: project1.panelId,
    userId: user._id,
    projectName: project1.projectName,
    status: true,
  });

  const result = await project.save();
  if (!result) return res.status(400).send("Failed to register project");
  return res.status(200).send({ result });
};

//eliminar usuarios del proyecto
const deleteUserProject = async (req, res) => {
  if (!req.body.userId || !req.body.panelId)
    return res.status(400).send("Incomplete data");

  //busco los siguientes parametros para recuperar el id del registro del project
  const projects = await Project.findOne({
    userId: req.body.userId,
    status: "true",
    panelId: req.body.panelId,
    userCreator: req.user._id,
  });
  if (!projects) return res.status(400).send("Error delete user ");

  //verifico si el userCreator es igual al usuario del req.user (token)
  if (projects.userCreator != req.user._id) {
    return res.status(400).send("Error delete user ");
  }
  const project = await Project.findByIdAndUpdate(projects._id, {
    status: false,
  });
  if (!project) return res.status(400).send("Error delete user ");
  return res.status(200).send({ project });
};

//listo los usuarios del proyecto
const listProjectUser = async (req, res) => {
  const project = await Project.find({
    userCreator: req.user._id,
    status: "true",
    panelId: req.params.id,
  }).populate("userId");

  const project1 = await Project.findOne({
    userCreator: req.user._id,
    status: "true",
    panelId: req.params.id,
    userId: req.user._id,
  });

  if (project1.userCreator != req.user._id) {
    return res.status(400).send("Error list user");
  }

  if (!project || project.length === 0)
    return res.status(400).send("Empty project list");
  return res.status(200).send({ project });
};

module.exports = {
  registerProject,
  listProjectUser,
  deleteUserProject,
  shareProjectUser,
};
