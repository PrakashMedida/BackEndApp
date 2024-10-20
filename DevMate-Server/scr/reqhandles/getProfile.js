const getProfile = async (req, res) => {
    
      try {
        const loggedInUser =req.user;
    res.json({message:"profile",data:loggedInUser});
        
      } catch (error) {
        res.status(400).send("ERR : "+error.message);
      }
};
module.exports = getProfile;
