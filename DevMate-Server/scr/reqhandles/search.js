const User = require("../models/User");


const search = async(req,res)=>{
    const search=req.body.firstName.toLowerCase().trim();

    try {
        const userData = await User.find({firstName : search })
        if(!userData) throw new Error("user not found");

        res.send(userData);
    } catch (error) {
        res.send("user is not found!");
    }
}


module.exports =search;
