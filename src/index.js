
const express = require("express");

///will ensure that the index is connected to the db, so we do need to require anything specific
require("./db/mongoos");

const UserRouter = require('./Routers/user')
const TaskRouter = require('../src/Routers/task')

const app = express();
const port = process.env.PORT



///transform the JSON data as an object to be able to access
app.use(express.json());
app.use(UserRouter)
app.use(TaskRouter)


app.listen(port, () => {
  console.log("Server is up on port " + port);
});

