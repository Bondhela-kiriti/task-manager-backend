const Task = require("../models/Task");
const protect = require("../middleware/auth")



// create task

const createTask = async (req, res) =>{
  try{
    const task=await Task.create({
      user: req.user, title: req.body.title
    })
    res.json(task)
    
  }
  catch(err){
    res.status(500).json({ message: err.message });
    console.log(err)
  }
}

// get tasks
const getTasks = async (req, res) =>{
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// update task 
const updateTask = async (req, res) =>{
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
// delete task 

const deleteTask = async (req, res) =>{
  try{
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    res.json(task);
  }
  catch(err){
    res.status(500).json({ message: err.message });
    console.log(err)
  }
  
}

module.exports = { getTasks, createTask, updateTask, deleteTask }