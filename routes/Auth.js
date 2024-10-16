const express = require("express");
const {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  logout,
  authCheck,
  updateRole,
} = require("../controllers/AuthController");
const { authorize } = require("../middleware/roleMiddleware");
const protectRoute = require("../middleware/protectRoute.js");
const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/password-reset", requestPasswordReset);
router.post("/password-reset/:token", resetPassword);
router.get("/authCheck", authCheck);
router.post("/logout", logout);
router.put("/updateRole", protectRoute, authorize("admin"), updateRole);

module.exports = router;
