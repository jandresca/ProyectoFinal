const express = require("express");
const router = express.Router();
const PanelController = require("../controllers/panel");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");

router.post("/|", Auth, ValidateUser, PanelController.registerPanel);
router.get("/listPanel", Auth, ValidateUser, PanelController.listPanel);
router.put("/updatePanel", Auth, ValidateUser, PanelController.updatePanel);
router.put(
  "/deletePanel/:_id",
  Auth,
  ValidateUser,
  PanelController.deletePanel
);
router.get("/listPanel2/:_id", Auth, ValidateUser, PanelController.listPanel2);
router.get("/findPanel/:_id", Auth, ValidateUser, PanelController.findPanel);

module.exports = router;