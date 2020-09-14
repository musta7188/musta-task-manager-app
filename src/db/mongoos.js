const mongoose = require("mongoose");

///connect to the database
///URl for the database plus the name of the app
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true, // ensure that the index get created allowing us to access quickly the data we need to access
  ///we avoid getting working about the below method we are using 
  useFindAndModify: false
});


