const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Auth = async (req, res, next) => {
  try {
    const { F_2_0 } = req.cookies;
    if (!F_2_0) {
      throw new Error("login");
    }
    const decodeString = await jwt.verify(F_2_0, "process.env.SALT");
    const { _id } = decodeString;
    const isuser = await User.findById({ _id });
    if (!isuser) {
      throw new Error("userNot Found!");
    }
    req.user=isuser;
    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
  
};

module.exports = Auth;
