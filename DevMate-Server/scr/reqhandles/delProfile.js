const User = require("../models/User");

const delProfile = async (req, res) => {

    const {_id}=req.user;
    const delatedUser= await User.findByIdAndDelete(_id);
    res.send(delatedUser);
};
module.exports=delProfile;
