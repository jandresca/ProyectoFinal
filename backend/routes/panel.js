const express = require("express");
const router = express.Router();
const PanelController = require("../controllers/panel");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");

router.post("/registerPanel", Auth, ValidateUser, PanelController.registerPanel);
router.get("/listPanel", Auth, ValidateUser, PanelController.listPanel);
router.put("/updatePanel", Auth, ValidateUser, PanelController.updatePanel);
// router.delete(
//   "/deletePanel/:_id",
//   Auth,
//   ValidateUser,
//   PanelController.deletePanel
// );

module.exports = router;
