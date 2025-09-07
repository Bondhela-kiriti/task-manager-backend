const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskcontrollers");
const protect = require("../middleware/auth")


const router = express.Router()

router.get("/",protect,  getTasks)
router.post("/",protect, createTask)
router.put("/:id", protect,updateTask)
router.delete("/:id",protect, deleteTask)


module.exports = router 