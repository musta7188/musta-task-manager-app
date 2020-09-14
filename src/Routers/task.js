const express = require('express')
const router = new express.Router()

const auth = require('../middleware/auth')

const Task = require('../models/task')

router.get('/testtask', (req, resp) =>{
  resp.send("test task")
})

module.exports = router


//GET /tasks?completed=true
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt:asc/desc
router.get("/tasks", auth,  async (req, resp) => {

  const match = {}
  const sort = {}

  ///if filter is provided will se the value
  if(req.query.completed){
    //will set the value of completed in the object match equal to the return value boolean of the comparison "true" or "false"
    match.completed = req.query.completed === 'true'
  }

  if(req.query.sortBy){
    //GET /tasks?sortBy=createdAt:asc/desc
      const parts = req.query.sortBy.split(':')
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    
    // const tasks = await Task.find({owner: req.user._id});
    
     await req.user.populate({
       path: 'tasks',
       ///match is an object but since the object we ara assigning has the same name of the property we use the short syntax 
       match,
       options: {
         limit: parseInt(req.query.limit),
         skip: parseInt(req.query.skip),
         sort

       }
     }).execPopulate()
    ///alternative method to get all the tasks from that user 

    resp.status(201).send(req.user.tasks);
  } catch (e) {
    resp.status(500).send(e);
  }
});

router.get("/tasks/:id",auth, async (req, resp) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({_id, owner: req.user._id});
    if (!task) {
      return resp.status(404).send("task not found");
    }

    resp.status(200).send(task);
  } catch (e) {
    resp.status(500).send(e);
  }
});

router.post("/tasks", auth, async (req, resp) => {

///create a new task using all the info from the body plus adding the owner id from the auth req
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })



  try {
    await task.save(task);
    resp.status(201).send(task);
  } catch (e) {
    resp.status(500).send(e);
  }
});





router.patch("/tasks/:id", auth, async (req, resp) => {

  const updates = Object.keys(req.body);
  const updatesAllowed = ["description", "completed"];
  const isAllowed = updates.every((update) => updatesAllowed.includes(update));

  if (!isAllowed) {
    return resp.status(400).send({ error: "update not allowed" });
  }
  try {
    const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
    
    if (!task) {
      return resp.status(404).send({ error: "task not found" });
    }

    updates.forEach((update) => task[update] = req.body[update])

    await task.save()
   

    resp.status(200).send(task);
  } catch (e) {
    resp.status(500).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, resp) => {
  try {


    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});

    if (!task) {
      return resp.status(404).send({ error: "task not found" });
    }

    resp.status(200).send(task);
    
  } catch (e) {
    resp.send({ error: e });
  }
});