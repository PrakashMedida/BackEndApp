const User = require("../models/User")


const users = async(req,res)=>{
    try {
        const userData =await User.find({})
        res.send(userData);
        
    } catch (error) {
        res.send("something wrong!");
    }
}

module.exports = users;