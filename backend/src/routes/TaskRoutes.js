const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/TaskController");
const TaskValidation = require("../middlewares/TaskValidation")

router.post("/task", TaskValidation, TaskController.create);

module.exports = router;
