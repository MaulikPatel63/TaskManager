const express = require("express");
const {
  admintaskAdd,
  admintaskGet,
  admintaskGetByID,
  admintaskUpdate,
  admintaskDelete,
  admintaskGetByTitle,
  admintaskGetByCategory,
} = require("../controllers/AdminTaskController");
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post("/admintask-add", authorize("admin"), admintaskAdd);
router.get("/admintask-get", authorize("admin"), admintaskGet);
router.get("/admintask-get/:id", authorize("admin"), admintaskGetByID);
router.get("/admintask-get-category/:id", authorize("admin"), admintaskGetByCategory);
router.get("/admintask-get-title/", authorize("admin"), admintaskGetByTitle);
router.put("/admintask-update/:id", authorize("admin"), admintaskUpdate);
router.delete("/admintask-delete/:id", authorize("admin"), admintaskDelete);

module.exports = router;
