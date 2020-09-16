require('../src/db/mongoos')

const Task = require('../src/models/task')
const User = require('../src/models/user')


///how to get the user from the id///check model
const findUserFromTask = async () => {

    const task = await Task.findById('5f550cc5fccfc14f6f13211b')

    ///is going to find the user that is related to this task and converted from an id to an object
    await task.populate('owner').execPopulate()
    console.log(task.owner)

}

 findUserFromTask()


///how to get tasks from user///check model//
const findTaskFromUser = async () => {

  const user = await User.findById('5f550cbdfccfc14f6f132119')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)

}

findTaskFromUser()