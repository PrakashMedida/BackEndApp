const validationData = require("../utils/validationData");

const editProfile = async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!validationData(req)) {
      throw new Error("Invalid Edit Request");
    }

    

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

   
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).json({message:"ERROR : " + err.message});
  }
};
module.exports = editProfile;
