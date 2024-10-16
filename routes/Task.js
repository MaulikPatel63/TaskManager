const express = require("express");
const {
  taskAdd,
  taskGet,
  taskGetByID,
  taskUpdate,
  taskDelete,
  taskGetByTitle,
  taskGetByCategory,
  taskGetByStatus,
} = require("../controllers/TaskController");

const router = express.Router();

router.post("/task-add", taskAdd);
router.get("/task-get", taskGet);
router.get("/task-get-status", taskGetByStatus);
router.get("/task-get/:id", taskGetByID);
router.get("/task-get-category/:id", taskGetByCategory);
router.get("/task-get-title/", taskGetByTitle);
router.put("/task-update/:id", taskUpdate);
router.delete("/task-delete/:id", taskDelete);

module.exports = router;
