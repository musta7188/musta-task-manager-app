const { request } = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')


const userOneID = new mongoose.Types.ObjectId()

const userOne = {
  _id: userOneID,
  name: 'Mike',
  email: 'mike@email.com',
  password: 'testLogin',
  tokens: [{
    token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
  }]
}


const setUpDataBase = async () =>{
  await User.deleteMany()
  await new User(userOne).save()

}

module.exports = {
  userOneID,
  userOne,
  setUpDataBase

}