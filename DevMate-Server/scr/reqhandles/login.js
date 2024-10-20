const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt =require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) return res.status(401).send(`invalid credentials`);

    const user = await User.findOne({ emailId: emailId });
    if(!user) return res.status(401).send(`invalid credentials`);

    const log = await bcrypt.compare(password, user.password);
    
    if(log) {
      const token = await jwt.sign({_id :user._id},"TonyStark@IronMan",{expiresIn:"7d"});
      
      res.cookie("F_2_0", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None", // Needed for cross-origin
        expires: new Date(Date.now() + 1 * 3600000),
      });
      res.json({message:"login successful",data:user});
    }
    else return res.status(401).send(`invalid credentials`);

  } catch (error) {
    
    res.status(401).send(`something gone wrong : ${error.message}`);
  }
};

module.exports = login;
