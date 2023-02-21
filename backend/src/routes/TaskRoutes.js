const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/TaskController");
const TaskValidation = require("../middlewares/TaskValidation")

router.post("/", TaskValidation, TaskController.create);
router.put("/:id", TaskValidation, TaskController.update);

module.exports = router;
