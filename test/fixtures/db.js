const { request } = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneID = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneID,
  name: 'Mike',
  email: 'mike@email.com',
  password: 'userOne123',
  tokens: [{
    token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
  }]
}

const userTwoID = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoID,
  name: 'Mustafa',
  email: 'mustafa@email.com',
  password: 'userTwo123',
  tokens: [{
    token: jwt.sign({_id: userTwoID}, process.env.JWT_SECRET)
  }]
}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "first task",
  completed: false,
  owner: userOneID
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "second task",
  completed: true,
  owner: userOneID
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "third task",
  completed: false,
  owner: userTwoID
}



const setUpDataBase = async () =>{
  await User.deleteMany()
  await Task.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}

module.exports = {
  userOneID,
  userOne,
  setUpDataBase,
  taskOne,
  userTwo

}