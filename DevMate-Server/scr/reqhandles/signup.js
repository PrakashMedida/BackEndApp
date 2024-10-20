const User = require("../models/User");
const bcript=require("bcrypt");
const validator =require("validator")
const signup = async (req, res) => {
  const { firstName, lastName, emailId,password } = req.body;

  try {
    // validation
    if(!validator.isEmail(emailId) || !validator.isStrongPassword(password) ) throw new Error("it's not strong enough!");

    // password hashing
    const passwordHash = await bcript.hash(password,10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });
    await user.save();

    res.json({message:`your account is ready! ${firstName}`});
  } catch (error) {
    res.status(401).json({message:`somthing gone wrong : ${error.message}`});
  }
};

module.exports = signup;
