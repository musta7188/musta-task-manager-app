const express = require("express");
const router = new express.Router();
const sharp = require("sharp");

const auth = require("../middleware/auth");
const Task = require("../models/task");
const User = require("../models/user");

const {sendWelcomeEmail, sendCancelAccount} = require('../emails/account')


const multer = require("multer");


module.exports = router;

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    //anything after this will wait until the user is saved
    await user.save();
    sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }

  //anything after this will wait until the user is saved
});

router.post("/users/login", async (req, resp) => {
  try {
    ///costume function
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    resp.send({ user, token });
  } catch (e) {
    resp.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenObject) => {
      ///it filter all the tokens that are not equal to the current token
      return tokenObject.token !== req.token;
    });

    await req.user.save();

    res.send({ message: "user log out" });
  } catch (e) {
    res.status(500).send(e);
  }
});

///this route log out from all the device
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send({ message: "user log out" });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

const upload = multer({
  // dest: 'profileImage',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("file must be an image"));
    }
    callback(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    ///this format the image before you saved by resizing it and transform it in a png and then ina buffer to save in the db
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;

    ///below how to run the binary saved string in db
    //<img src="data:image/jpg;base64,(here goas the binary string)">
    ///site to use //jsbin.com/
    await req.user.save();

    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete(
  "/users/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;

    await req.user.save();

    res.status(200).send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    ///declare the type of data we will rendere
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

///auth is our middleware function that run before the rest of the function run

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, resp) => {
  ////grap all the keys sent from the body
  const updates = Object.keys(req.body);

  ///create all the properties you allow to update
  const allowedUpdates = ["name", "email", "password", "age"];

  ///loop in every key sent and check if include the allowed properties
  const isValidOperation = updates.every((update) => {
    ///check if the allowed properties includes the sent one and return boolean value
    return allowedUpdates.includes(update);
  });
  ////if return false will send an error back to the clients
  if (!isValidOperation) {
    return resp.status(400).send({ error: "invalid updates" });
  }

  try {
    ///since we are looping thought different properties and we cannot hard coded or know the exact one we are updating
    ///this will create a dynamic way to update the filed we want to update
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    resp.send(req.user);
  } catch (e) {
    resp.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    sendCancelAccount(user.email, user.name)
    res.send(user);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});
