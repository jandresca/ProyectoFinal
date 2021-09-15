const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/role");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const Admin = require("../middleware/admin");

router.post(
  "/registerRole",
  Auth,
  ValidateUser,
  Admin,
  RoleController.registerRole
);
router.get("/listRole", Auth, ValidateUser, Admin, RoleController.listRole);
router.get("/findRole/:_id", Auth, ValidateUser, Admin, RoleController.findRole);
router.put("/updateRole", Auth, ValidateUser, Admin, RoleController.updateRole);

module.exports = router;
