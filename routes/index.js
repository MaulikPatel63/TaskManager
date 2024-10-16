const router = require("express").Router();
const protectRoute = require("../middleware/protectRoute.js");

//! Auth Router
router.use("/api/v1/auth", require("./Auth"));

//! Task Router
router.use("/api/v1/task", protectRoute, require("./Task"));

//! Task Router
router.use("/api/v1/category", protectRoute, require("./Category"));

module.exports = router;
