const express = require("express");
const {
  categoryAdd,
  categoryGet,
  categoryGetByID,
  categoryUpdate,
  categoryDelete,
  categoryGetByName,
} = require("../controllers/CategoryController.js");

const router = express.Router();

router.post("/category-add", categoryAdd);
router.get("/category-get", categoryGet);
router.get("/category-get/:id", categoryGetByID);
router.get("/category-get-name", categoryGetByName);
router.put("/category-update", categoryUpdate);
router.delete("/category-delete", categoryDelete);

module.exports = router;
