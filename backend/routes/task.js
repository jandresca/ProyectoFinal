const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const Upload = require("../middleware/file");
const multiparty = require("connect-multiparty");
const mult = multiparty();

router.post("/saveTask", taskController.saveTask);
router.post(
  "/saveTaskImg",
  mult,
  Upload,
  Auth,
  ValidateUser,
  taskController.saveTaskImg
);
router.get("/listTask/:_id", Auth, ValidateUser, taskController.listTask);
router.put("/updateTask", Auth, ValidateUser, taskController.updateTask);
router.delete(
  "/deleteTask/:_id",
  Auth,
  ValidateUser,
  taskController.deleteTask
);
router.post("/sharePanelTask",Auth, ValidateUser, taskController.sharePanelTask);

module.exports = router;
