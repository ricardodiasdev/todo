const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/TaskController");
const TaskValidation = require("../middlewares/TaskValidation");
const MacaddressValidation = require("../middlewares/MacaddressValidation");

router.post("/", TaskValidation, TaskController.create);
router.put("/:id", TaskValidation, TaskController.update);
router.get("/filter/all", MacaddressValidation, TaskController.all);
router.get("/:id", TaskController.show);
router.delete("/:id", TaskController.delete);
router.put("/:id/:done", TaskController.done);
router.get("/filter/late", MacaddressValidation, TaskController.late);
router.get("/filter/today", MacaddressValidation, TaskController.today);


module.exports = router;
