
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const validator = require("validator")

///connect to the database
///URl for the database plus the name of the app
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true, // ensure that the index get created allowing us to access quickly the data we need to access
});

const User = mongoose.model("User", {
  name: {
    type: String,
    require: true, ///validation this filed is required 
    trim: true /// avoid space in the name
  },
  age: {
    type: Number,
    default: 0, //default value 
    validate(value){
      if(value < 0){
        throw new Error('Age must be a positive Number')
      }
    }
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("email not valid ")
      }
      
    }
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minLength: 6,
    validate(value){

      if(value.toLowerCase().include('password')){
        throw new Error("password cannot be 'password'")
      } 
    }

  }
});


const User3 = new User({
  name: "alexander ",
  email: "alex76@EMAIL.COM ",
  password: "m3asdasdasd"
});

User3.save()
.then((user) => {
  console.log(user);
})
.catch((error) => {
  console.log(error);
});

//////task schema and new model
const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }

})

const Task1 = new Task({
  description: "take the dog out",
})

Task1.save().then((resp) => {
  console.log(resp)
}).catch((error) => {
  console.log(error)
})