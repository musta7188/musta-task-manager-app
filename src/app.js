
const express = require("express");

///will ensure that the index is connected to the db, so we do need to require anything specific
require("./db/mongoos");

const UserRouter = require('./Routers/user')
const TaskRouter = require('../src/Routers/task')

const app = express();


///transform the JSON data as an object to be able to access
app.use(express.json());
app.use(UserRouter)
app.use(TaskRouter)


module.exports = app