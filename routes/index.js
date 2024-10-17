const router = require("express").Router();
const protectRoute = require("../middleware/protectRoute.js");

//! Auth Router
router.use("/api/v1/auth", require("./Auth.js"));

//! Task Router
router.use("/api/v1/task", protectRoute, require("./Task.js"));

//! Category Router
router.use("/api/v1/category", protectRoute, require("./Category.js"));

//! Admin Task Router
router.use("/api/v1/admintask", protectRoute, require("./AdminTask.js"));

module.exports = router;
