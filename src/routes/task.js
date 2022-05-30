const router = require("express").Router();
const taskController = require("../controllers/taskController.js")
const {verifyToken} = require("../middleware/verifyToken.js")

router.post("/", verifyToken, taskController.createTask);
router.get("/", verifyToken, taskController.readAll);
router.get("/search", verifyToken, taskController.getTaskByStatus);
router.get("/:id", verifyToken, taskController.readOne);
router.put("/:id", verifyToken, taskController.update);
router.delete("/:id", verifyToken, taskController.deleteOne);

module.exports = router;
