
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");

router.post("/registerProject", Auth, ValidateUser, projectController.registerProject);
router.post("/shareProjectUser", Auth, ValidateUser, projectController.shareProjectUser);

router.get("/listProjectUser/:id", Auth, ValidateUser, projectController.listProjectUser);
router.get("/listProjectUserP", Auth, ValidateUser, projectController.listProjectUserP);
router.put("/deleteUserProject", Auth, ValidateUser, projectController.deleteUserProject);


module.exports = router;
