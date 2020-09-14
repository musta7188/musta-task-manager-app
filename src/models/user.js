const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("./task");
/// we will costumize the schema before passed to the user

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true, ///validation this filed is required
    trim: true, /// avoid space in the name
  },
  age: {
    type: Number,
    default: 0, //default value
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive Number");
      }
    },
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email not valid ");
      }
    },
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minLength: 6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password cannot be 'password'");
      }
      if (value.length < 6) {
        throw new Error("password cannot be shorter then 6 digit");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ], 
  ///allow to store the buffer with the binary image data along side with the user
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
});

//// the virtual method allow to create a virtual attribute/property on the Model/Class without to store it in the DB
///will refer the task to we can find all the tasks related to the user and create a relationship between the models
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
  ///localFiled and foreignFiled is what create the relation between the ref task,
  /// which is the owner ID in the Task model and the User id in the User model
});

////methods are method accessible on the instance of the model (instance method in ruby)
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "SecretWord");

  ///after adding token as property for the user schema and value equal to array of object with multiple token inside in case it log in from
  ////multiple device, we use the concat method to add all the token
  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

//////toJSON change the way how the user data is sent back
userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();
  ///delete from the user object the two properties we do not wan to send back
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar

  return userObject;
};

///statics method are accessible on the model for example the User Model (class method in Ruby for example )
///this costume method will be part of the user object whenever is called to check email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  ///if user is found it check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

///.pre allow us to do something before the user schema in this case to hash the password before saving
///// first is to save and second is the function to run, (we can just use a normal function not a arrow function)
userSchema.pre("save", async function (next) {
  ///this give us access to the current object or current user that is about to be saved
  const user = this;

  ///check if the password has been changed or modified
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  ///next tell the function that we done with our task and that the program can go ahead
  next();
});

///delete the user task when the user is deleted
userSchema.pre("remove", async function (next) {
  const user = this;

  await Task.deleteMany({ owner: req.user._id });

  next();
});

///the second argument the object get converted into a schema
////for the user password security authentication we need to create the schema first and then pass that in
const User = mongoose.model("User", userSchema);
module.exports = User;
