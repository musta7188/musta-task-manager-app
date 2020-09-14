const mongoose = require("mongoose");
const validator = require("validator")


const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    ///the data store is going to be and Id and this is how we create the relationship between the collections
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  }

}, {
  timestamps: true
})




const Task = mongoose.model("Task", TaskSchema )


module.exports = Task