const router = require("express").Router();
const protectRoute = require("../middleware/protectRoute.js");

//! Auth Router
router.use("/api/v1/auth", require("./Auth"));

//! Task Router
router.use("/api/v1/task", protectRoute, require("./Task"));

//! Category Router
router.use("/api/v1/category", protectRoute, require("./Category"));

//! Admin Task Router
router.use("/api/v1/admintask", protectRoute, require("./AdminTask"));

module.exports = router;
