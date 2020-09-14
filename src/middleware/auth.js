
///verify the authentication token

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const auth = async (req, res, next) => {

  try {
    ///get the auth from the header delete the Barer word and get the token
    const token = await req.header('Authorization').replace("Bearer ", '')

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
     ///{ _id: '5f54f5a91423b349b55d363b', iat: 1599404256 }

    ///find the user with the correct id that has that token stored in the array of tokens
    const user = await User.findOne({_id: decoded._id,"tokens.token": token});



    if (!user) {
      throw new Error();
    }

    ///we add to the request the current token, in way that if you log out you target just the token of the current device you are logged in
    req.token = token

    ///store the user in the req
    req.user = user;

    next();
  } catch (e) {

    res.status(401).send({error: "please log in"});

  }
};

module.exports = auth;
